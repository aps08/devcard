from datetime import datetime, timezone

from api.extensions import flask_bcrypt, jwt
from api.models import TokenBlocklist, User
from api.schemas import LoginSchema, RegisterSchema
from api.utils import load_user, role_required, send_email, validate_json
from flask import Blueprint, make_response
from flask_jwt_extended import create_access_token, current_user, get_jwt, jwt_required
from flask_login import login_required, login_user, logout_user
from flask_restful import Api, Resource

auth_resource = Blueprint("auth", __name__)
api = Api(auth_resource)


class Register(Resource):
    @validate_json(RegisterSchema)
    def post(self, data):
        password_hash = flask_bcrypt.generate_password_hash(data["password"]).decode("utf-8")
        user = User(email=data["email"], password=password_hash)
        json_data, status_code = user.add_user()
        if status_code == 200:
            send_email("Welcom to Devcard", [data["email"]], "register.html", email=data["email"])
        return json_data, status_code


class Login(Resource):
    @validate_json(LoginSchema)
    def post(self, data):
        user = load_user(data["email"])
        if user and flask_bcrypt.check_password_hash(user.password, data["password"]):
            login_user(user)
            access_token = create_access_token(identity=data["email"])
            response = {"access_token": access_token, "access_type": user.role.name}
            return response, 200
        else:
            return {"error": "Invalid email or password"}, 400


class Logout(Resource):
    @jwt_required()
    def post(self):
        logout_user()
        jti = get_jwt()["jti"]
        now = datetime.now(timezone.utc)
        blacked = TokenBlocklist(jti, now)
        blacked.add_to_blacklist()
        return {}, 200


api.add_resource(Register, "/register")
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
