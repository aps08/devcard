from api.extensions import flask_bcrypt
from api.models import User
from api.schemas import RegisterSchema
from flask import Blueprint, request
from flask_restful import Api, Resource
from marshmallow import ValidationError

auth_resource = Blueprint("auth", __name__)
api = Api(auth_resource)


class Register(Resource):
    def post(self):
        try:
            data = RegisterSchema().load(request.json)
        except ValidationError as err:
            messages = list(err.messages.values())
            return {"error": messages}, 422
        password_hash = flask_bcrypt.generate_password_hash(data["password"]).decode("utf-8")
        user = User(email=data["email"], password=password_hash)
        json_data, status_code = user.add_user()
        if status_code == 201:
            print("send email logic here")
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
