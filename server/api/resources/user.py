from datetime import datetime

from api.models import EmailVerification, FeedbackContact
from api.schemas import DemoSchema, FeedbackContactSchema
from api.utils import (
    create_verification_link,
    get_email,
    send_email,
    update_verification,
    validate_json,
)
from flask import Blueprint, request
from flask_restful import Api, Resource

user_resource = Blueprint("user", __name__)
api = Api(user_resource)


class Account(Resource):
    def get(self):
        pass

    def post(self):
        pass

    def put(self):
        pass

    def delete(self):
        pass


api.add_resource(Account, "/account")
