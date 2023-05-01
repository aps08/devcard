# api endpoint for demo card return 2 cards data
# api endpoint for submitting feedback and contact
# API for email verification
from datetime import datetime

from api.models import EmailVerification, User
from api.schemas import DemoSchema, FeedbackContactSchema
from api.utils import create_verification_link, send_email, validate_json
from flask import Blueprint, request
from flask_restful import Api, Resource

public_resource = Blueprint("public", __name__)
api = Api(public_resource)


class Demo(Resource):
    @validate_json(DemoSchema)
    def post(self, data):
        return f"data demo {data}"


class FeebackContact(Resource):
    @validate_json(FeedbackContactSchema)
    def post(self, data):
        return f"post feebackcontcat {data}"


class VerifyEmail(Resource):
    def get(self):
        token = request.args.get("token")
        if not token:
            return {"error": "Something went wrong."}, 400
        else:
            email_data = EmailVerification.query.filter_by(token=token).first()
            if email_data is not None:
                if email_data.expiry_timestamp >= datetime.utcnow():
                    User.update_verification(email_data.user_id)
                    return {"message": "Your email is verified successfully.Sign In and enjoy our services."}, 200
                else:
                    url = create_verification_link(email_data.user_id)
                    email = User.get_email(email_data.user_id)
                    send_email("Verify Email", [email], "register.html", email=email, url=url)
                    return {"error": "Email verification failed. We have resent an email for verification."}, 400
            else:
                return {"error": "Something went wrong."}, 400


api.add_resource(Demo, "/demo")
api.add_resource(FeebackContact, "/feeback_contact")
api.add_resource(VerifyEmail, "/verify_email")
