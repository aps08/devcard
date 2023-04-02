from api.extensions import db, flask_bcrypt
from api.models import User
from api.schemas import RegisterSchema
from flask import Blueprint, jsonify, request
from flask_login import login_required
from flask_restful import Api, Resource
from marshmallow import ValidationError

auth_resource = Blueprint('auth', __name__)
api = Api(auth_resource)

class Register(Resource):
    def post(self):
        try:
            data = RegisterSchema().load(request.json)
        except ValidationError as err:
            messages = list(err.messages.values())
            return {"error": messages}, 422
        if User.query.filter_by(email=data['email']).first() is not None:
            return {'error': 'Email already exists'}, 409
        else:
            password_hash = flask_bcrypt.generate_password_hash(data['password']).decode('utf-8')
            user = User(email=data['email'], password=password_hash)
            result = user.add_user() 
            if result[1] == 201:
                print("send email logic here")
            return result

class Login(Resource):
    def post(self):
        request_data = dict(dev="dev")
        return jsonify(request_data)


class Logout(Resource):
     
     def post(self):
          print("logged out")

api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')