from datetime import datetime

from api.extensions import db, flask_bcrypt
from api.models import EmailVerification, FeedbackContact, User
from api.schemas import EmailSchema, PasswordChangeSchema
from api.utils import (
    create_verification_link,
    get_email,
    send_email,
    update_verification,
    validate_json,
)
from flask import Blueprint
from flask_jwt_extended import get_current_user, get_jwt_identity, jwt_required
from flask_login import current_user
from flask_restful import Api, Resource

user_resource = Blueprint("user", __name__)
api = Api(user_resource)


class Account(Resource):
    def get(self):
        # directly create the logic to get all data from the tables
        # using the data create a json
        # zip that json
        # send that zip file to the user
        pass

    def put(self):
        # directly change the user type to contributor
        # no input data is required
        pass

    def delete(self):
        # delete account
        pass


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
