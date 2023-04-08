from api.extensions import flask_bcrypt
from api.models import User
from api.schemas import RegisterSchema
from api.utils import load_user, send_email, validate_json
from flask import Blueprint
from flask_login import login_user, logout_user
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
    def post(self):
        print("logged in")


class Logout(Resource):
    def post(self):
        print("logged out")


api.add_resource(Register, "/register")
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
