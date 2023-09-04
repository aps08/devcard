import os

from api.extensions import flask_bcrypt, db
from api.models import PersonalInfo, ProfessionalInfo, TokenBlocklist, User
from api.schemas import LoginSchema, RegisterSchema
from api.utils import create_verification_link, load_user, send_email, validate_json, get_signed_url
from flask import Blueprint
from flask_jwt_extended import create_access_token, get_jwt, jwt_required
from flask_login import login_user, logout_user
from flask_restful import Api, Resource

auth_resource = Blueprint("auth", __name__)
api = Api(auth_resource)


class Register(Resource):
    @validate_json(RegisterSchema)
    def post(self, data):
        """
        Responsible for registering a new user.

        argument:
            data: dictionary contains email and password
        return:
            message: success or failed message
        """
        already_exists = not User.query.filter_by(email=data["email"]).first() is not None
        if already_exists:
            password_hash = flask_bcrypt.generate_password_hash(data["password"]).decode("utf-8")
            user = User(email=data["email"], password=password_hash)
            professional = ProfessionalInfo(user.professional_id, user.user_id)
            personal = PersonalInfo(user.personal_id, user.user_id)
            db.session.add_all([user, professional, personal])
            _, url = create_verification_link(user.user_id)
            send_email("Welcome to Devcard", [user.email], "register.html", email=user.email, url=url)
            return {"message": "Verification email sent."}, 200
        else:
            return {"message": "Email already exists. "}, 400


class Login(Resource):
    @validate_json(LoginSchema)
    def post(self, data):
        """
        Responsible for Singing in a registered user.

        argument:
            data: dictionary contains email and password
        return:
            response: error message or access token
        """
        user = load_user(data["email"])
        if user and flask_bcrypt.check_password_hash(user.password, data["password"]):
            if user.verified:
                login_user(user)
                user_identity = {"email": data["email"], "user_id": user.user_id}
                access_token = create_access_token(identity=user_identity)
                return {"X-ACCESS-TOKEN": access_token}, 200
            else:
                send, url = create_verification_link(user.user_id)
                if send and url:
                    send_email("Verify Email", [user.email], "register.html", email=user.email, url=url)
                return {"message": "Please verify your email."}, 400
        else:
            return {"message": "Invalid email or password"}, 400


class Logout(Resource):
    @jwt_required()
    def post(self):
        """
        Responsible for signing out a user.
        Make the jwt token invalid for next request
        by marking it as blacklisted.
        """
        logout_user()
        jti = get_jwt()["jti"]
        blocked = TokenBlocklist(jti)
        db.session.add(blocked)
        db.session.commit()
        return {"message": "Logout successful"}, 200


api.add_resource(Register, "/register")
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
