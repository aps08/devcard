import json
import os
from zipfile import ZipFile
from uuid import uuid4
from datetime import datetime

from api.extensions import db, flask_bcrypt
from api.models import (
    EmailVerification,
    EmailVerificationSchema,
    PersonalInfo,
    PersonalInfoSchema,
    ProfessionalInfo,
    ProfessionalInfoSchema,
    TokenBlocklist,
    User,
    UserSchema,
)
from api.schemas import EmailSchema, PasswordChangeSchema, PersonalInfoChangeSchema, ProfessionalInfoChangeSchema
from api.utils import (
    create_verification_link,
    send_email,
    validate_json,
    upload_file_s3,
    upload_image_s3,
    get_signed_url,
    cache_invalidation,
)
from flask import Blueprint, request
from flask_jwt_extended import get_jwt, get_jwt_identity, jwt_required
from flask_restful import Api, Resource

user_resource = Blueprint("user", __name__)
api = Api(user_resource)


class Account(Resource):
    @jwt_required()
    def get(self):
        """
        Responsible for sending all user data
        to the registered email on requests.
        It also uploads the zipped version to s3.
        return:
            message: message for indicating success or failure of the request
        """
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
        current_timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S%f")
        file_path = f"data{user_id}_{current_timestamp}.json"
        zip_file_path = file_path.replace("json", "zip")
        with open(file_path, "w") as file:
            json.dump(user_data, file, indent=3)
        with ZipFile(zip_file_path, "w") as zip_file:
            zip_file.write(file_path)
        upload_file_s3(file_path, "data/export/")
        send_email("Your Information", [user_info.email], "userinfo.html", zip_file_path)
        os.remove(zip_file_path)
        return {"message": "Your information is sent to your verified email."}, 200

    @jwt_required()
    def delete(self):
        """
        Responsible for deleting the user account and
        black listing the jwt token.

        return:
            message: message for indicating success or failure of the request
        """
        user_id = get_jwt_identity()["user_id"]
        User.query.filter_by(user_id=user_id).delete()
        PersonalInfo.query.filter_by(user_id=user_id).delete()
        ProfessionalInfo.query.filter_by(user_id=user_id).delete()
        EmailVerification.query.filter_by(user_id=user_id).delete()
        jti = get_jwt()["jti"]
        blacked = TokenBlocklist(jti)
        db.session.add(blacked)
        db.session.commit()
        return {"message": "We are sad to say good bye. Your account has been deleted."}, 200

    @jwt_required()
    def post(self):
        """
        Responsible for updating user avatar.
        New image object is created for userin s3,
        if default image was getting uses, otherwise
        user's image object gets overridden by the new
        one.

        request:
            contains image file and url of the old image
        return:
            image: new image signed url
            message: message for indicating success or failure of the request
        """
        user_id = get_jwt_identity()["user_id"]
        image = request.files["image"]
        old_image_url = request.form["url"]
        if ".net" in old_image_url:
            old_image_path = old_image_url.split("?")[0].split(".net")[1]
            cache_invalidation(old_image_path)
        file_name = image.filename
        if file_name:
            ext = file_name.split(".")[-1]
            current_timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f")
            new_path = f"{user_id}_{current_timestamp}.{ext}"
            image.save(new_path)
            cloudfront_domain = upload_image_s3(new_path, "data/image/")
            num_updated = User.query.filter(User.user_id == user_id).update({User.image: cloudfront_domain})
            db.session.commit()
            if cloudfront_domain:
                signed_url = get_signed_url(cloudfront_domain)
                return {"image": signed_url, "message": "Image updated successfully."}, 200
            else:
                return {"message": "Something went wrong."}, 400
        else:
            return {"message": "No image found."}, 400


class Profile(Resource):
    @jwt_required()
    def get(self):
        """
        Responsible for returning user data.
        retrun:
            response: object containing user data
        """
        user_email = get_jwt_identity()["email"]
        user = User.query.filter_by(email=user_email).first()
        if user:
            signed_url = None
            if user.image:
                signed_url = get_signed_url(user.image)
            professional_info_schema = ProfessionalInfoSchema()
            personal_info_schema = PersonalInfoSchema()
            response = {
                "profile": {
                    "user": user.role.role_name,
                    "image": signed_url,
                    "credit": user.credits,
                    "email": user.email,
                },
                "personal": personal_info_schema.dump(user.personal),
                "professional": professional_info_schema.dump(user.professional),
            }
            return response, 200
        else:
            return {"message": "User doesn't exists"}, 400

    @jwt_required()
    @validate_json(PasswordChangeSchema)
    def post(self, data):
        """
        Responsible for updating user password.

        argument:
            data: dictionary containing old and new password
        return:
            message: message for indicating success or failure of the request
        """
        user_email = get_jwt_identity()["email"]
        current_user = User.query.filter_by(email=user_email).first()
        if data["old_password"] == data["new_password"]:
            return {"message": "Both old and new password cannot be same."}
        if flask_bcrypt.check_password_hash(current_user.password, data["old_password"]):
            new_password_hash = flask_bcrypt.generate_password_hash(data["new_password"]).decode("utf-8")
            num_updated = User.query.filter(User.email == user_email).update({User.password: new_password_hash})
            db.session.commit()
            send_email("Password changed", [user_email], "changepassword.html")
            return {"message": "Password changed successfully."}, 200
        else:
            return {"error": "Old password doesn't match"}, 400

    @jwt_required()
    @validate_json(EmailSchema)
    def put(self, data):
        """
        Responsible for changing email address

        argument:
            data: dictionary containing email
        return:
            message: message for indicating success or failure of the request
        """
        user_id = get_jwt_identity()["user_id"]
        user = User.query.filter_by(email=data["email"]).first()
        if user:
            return {"message": "Email already exists."}, 400
        else:
            num_updated = User.query.filter(User.user_id == user_id).update(
                {User.email: data["email"], User.verified: False}
            )
            db.session.commit()
            url = create_verification_link(user_id)
            send_email("Verify Email", [data["email"]], "register.html", email=data["email"], url=url)
            return {"message": "Verification email sent to new email address."}, 200


class Personal(Resource):
    @jwt_required()
    @validate_json(PersonalInfoChangeSchema)
    def put(self, data):
        """
        Responsible for updating the personal
        information of user.
        """
        user_id = get_jwt_identity()["user_id"]
        new_id = uuid4().hex
        personal = PersonalInfo(new_id, user_id, **data)
        User.query.filter(User.user_id == user_id).update({User.personal_id: new_id})
        db.session.add(personal)
        db.session.commit()
        personal_data = PersonalInfo.query.filter_by(personal_id=new_id).first()
        if personal_data:
            personal_info_schema = PersonalInfoSchema()
            latest_personal_data = personal_info_schema.dump(personal_data)
            return {"message": "Personal information updated successfully", "data": latest_personal_data}, 200
        else:
            return {"message": "Something went wrong, please try again."}, 400


class Professional(Resource):
    @jwt_required()
    @validate_json(ProfessionalInfoChangeSchema)
    def put(self, data):
        """
        Responsible for updating the professional
        information of user.
        """
        print(data)
        user_id = get_jwt_identity()["user_id"]
        new_id = uuid4().hex
        professional = ProfessionalInfo(new_id, user_id, **data)
        User.query.filter(User.user_id == user_id).update({User.professional_id: new_id})
        db.session.add(professional)
        db.session.commit()
        professional_data = ProfessionalInfo.query.filter_by(professional_id=new_id).first()
        if professional_data:
            professional_info_schema = ProfessionalInfoSchema()
            latest_professional_data = professional_info_schema.dump(professional_data)
            return {"message": "Personal information updated successfully", "data": latest_professional_data}, 200
        else:
            return {"message": "Something went wrong, please try again."}, 400


api.add_resource(Account, "/account")
api.add_resource(Profile, "/profile")
api.add_resource(Personal, "/personal")
api.add_resource(Professional, "/professional")
