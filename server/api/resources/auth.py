from flask import Blueprint, jsonify, request
from flask_login import login_required
from flask_restful import Api, Resource

auth_resource = Blueprint('auth', __name__)
api = Api(auth_resource)

class Register(Resource):
    def post(self):
        return {'message': 'User registered successfully'}
    
class Login(Resource):
    def post(self):
        request_data = {
        'headers': dict(request.headers),
        # 'cookies': dict(request.cookies),
        # 'args': dict(request.args),
        # 'form': dict(request.form),
        # 'data': request.data.decode(),
        # 'user_agent': str(request.user_agent),
        # 'remote_addr': request.remote_addr,
        # 'method': request.method,
        # 'url': request.url
        }
        return jsonify(request_data)


class Logout(Resource):
     
     def post(self):
          print("logged out")

api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')