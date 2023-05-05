from api.extensions import flask_bcrypt
from api.models import PersonalInfo, ProfessionalInfo, TokenBlocklist, User
from api.schemas import LoginSchema, RegisterSchema
from api.utils import (
    create_verification_link,
    get_email,
    load_user,
    send_email,
    update_verification,
    validate_json,
)
from flask import Blueprint
from flask_jwt_extended import create_access_token, get_jwt, jwt_required
from flask_login import login_user, logout_user
from flask_restful import Api, Resource

auth_resource = Blueprint("auth", __name__)
api = Api(auth_resource)


class Register(Resource):
    @validate_json(RegisterSchema)
    def post(self, data):
        password_hash = flask_bcrypt.generate_password_hash(data["password"]).decode("utf-8")
        user = User(email=data["email"], password=password_hash)
        if not user.check_email_exists():
            user_id, professional_id, personal_id = user.add_user()
            professional = ProfessionalInfo(professional_id, user_id)
            personal = PersonalInfo(personal_id, user_id)
            professional.add_professional_info()
            personal.add_personal_info()
            url = create_verification_link(user_id)
            send_email("Welcom to Devcard", [user.email], "register.html", email=user.email, url=url)
            return {"message": "A verification email has been sent to your email, which is valid for 7 days."}, 200
        else:
            return {"message": "Email already exists. Try Singing In."}, 200


class Login(Resource):
    @validate_json(LoginSchema)
    def post(self, data):
        user = load_user(data["email"])
        if user and flask_bcrypt.check_password_hash(user.password, data["password"]):
            if user.verified:
                login_user(user)
                access_token = create_access_token(identity=data["email"])
                response = {"access_token": access_token, "access_type": user.role.role_name}
                return response, 200
            else:
                url = create_verification_link(user.user_id)
                send_email("Verify Email", [user.email], "register.html", email=user.email, url=url)
                return {
                    "message": "Email not verified. A verification mail has been sent to your registered email."
                }, 200
        else:
            return {"error": "Invalid email or password"}, 400


class Logout(Resource):
    @jwt_required()
    def post(self):
        logout_user()
        jti = get_jwt()["jti"]
        blacked = TokenBlocklist(jti)
        blacked.add_to_blacklist()
        return {}, 200


api.add_resource(Register, "/register")
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
