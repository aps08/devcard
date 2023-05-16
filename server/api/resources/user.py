import json
import os
import zipfile
from datetime import datetime

from api.extensions import db, flask_bcrypt
from api.models import (
    EmailVerification,
    EmailVerificationSchema,
    PersonalInfo,
    PersonalInfoSchema,
    ProfessionalInfo,
    ProfessionalInfoSchema,
    User,
    UserSchema,
)
from api.schemas import EmailSchema, PasswordChangeSchema
from api.utils import create_verification_link, send_email, validate_json
from flask import Blueprint
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import Api, Resource

user_resource = Blueprint("user", __name__)
api = Api(user_resource)


class Account(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()["user_id"]
        user_info = User.query.filter_by(user_id=user_id).first()
        personal_infos = PersonalInfo.query.filter_by(user_id=user_id).all()
        professional_infos = ProfessionalInfo.query.filter_by(user_id=user_id).all()
        email_infos = EmailVerification.query.filter_by(user_id=user_id).all()

        user_schema = UserSchema()
        personal_info_schema = PersonalInfoSchema()
        professional_info_schema = ProfessionalInfoSchema()
        email_info_schema = EmailVerificationSchema()
        user_data = {
            "user_info": user_schema.dump(user_info),
            "personal_info": [personal_info_schema.dump(info) for info in personal_infos],
            "professional_info": [professional_info_schema.dump(info) for info in professional_infos],
            "email_info": [email_info_schema.dump(info) for info in email_infos],
        }

        current_timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f")
        file_path = f"data{user_id}_{current_timestamp}.json"
        zip_file_path = file_path.replace("json", "zip")
        with open(file_path, "w") as file:
            json.dump(user_data, file, indent=3)
        with zipfile.ZipFile(zip_file_path, "w") as zip_file:
            zip_file.write(file_path)

        send_email("Your Information", [user_info.email], "userinfo.html", zip_file_path)
        os.remove(file_path)
        os.remove(zip_file_path)

        return {"message": "Your information is sent to your verified email."}, 200

    @jwt_required()
    def put(self):
        # directly change the user type to contributor
        # no input data is required
        return {"message": "Your are a contributor now."}, 200

    @jwt_required()
    def delete(self):
        # delete account
        return {"message": "We are very sad to say good bye to you. Your account has been deleted."}, 200


class Profile(Resource):
    @jwt_required()
    @validate_json(PasswordChangeSchema)
    def post(self, data):
        user_email = get_jwt_identity()["email"]
        current_user = User.query.filter_by(email=user_email).first()

        if flask_bcrypt.check_password_hash(current_user.password, data["old_password"]):
            new_password_hash = flask_bcrypt.generate_password_hash(data["new_password"]).decode("utf-8")
            num_updated = User.query.filter(User.email == user_email).update({User.password: new_password_hash})
            db.session.commit()
            send_email("Password changed", [user_email], "changepassword.html")
            return {"message": "Password Changed successful"}, 200
        else:
            return {"error": "Old password doesn't match"}, 400

    @jwt_required()
    @validate_json(EmailSchema)
    def put(self, data):
        user_details = get_jwt_identity()
        user_email = user_details["email"]
        user_id = user_details["user_id"]

        num_updated = User.query.filter(User.email == user_email).update(
            {User.email: data["email"], User.verified: False}
        )
        db.session.commit()
        url = create_verification_link(user_id)

        send_email("Verify Email", [data["email"]], "register.html", email=user_email, url=url)
        return {
            "message": "A verification email has been send to your email. Kindly verify email and login again."
        }, 200


api.add_resource(Account, "/account")
api.add_resource(Profile, "/profile")
