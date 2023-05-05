# api endpoint for demo card return 2 cards data
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

public_resource = Blueprint("public", __name__)
api = Api(public_resource)


class Demo(Resource):
    @validate_json(DemoSchema)
    def post(self, data):
        return f"data demo {data}"


class FeebackContact(Resource):
    @validate_json(FeedbackContactSchema)
    def post(self, data):
        fc = FeedbackContact(data["email"], data["name"], data["message"])
        if fc.check_duplicate():
            fc.add_feedbackcontact()
            send_email("Feeback/Contact Confirmation", [data["email"]], "feedbackcontact.html", **data)
            return {"message": "We have successfully recieved your message, and will respond soon."}, 200
        else:
            return {"error": "Something went wrong"}, 400


class VerifyEmail(Resource):
    def get(self):
        token = request.args.get("token")
        if not token:
            return {"error": "Something went wrong."}, 400
        else:
            email_data = EmailVerification.query.filter_by(token=token).first()
            if email_data is not None:
                if email_data.expiry_timestamp >= datetime.utcnow():
                    update_verification(email_data.user_id)
                    return {"message": "Your email is verified successfully.Sign In and enjoy our services."}, 200
                else:
                    url = create_verification_link(email_data.user_id)
                    email = get_email(email_data.user_id)
                    send_email("Verify Email", [email], "register.html", email=email, url=url)
                    return {"error": "Email verification failed. We have resent an email for verification."}, 400
            else:
                return {"error": "Something went wrong."}, 400


api.add_resource(Demo, "/demo")
api.add_resource(FeebackContact, "/feeback_contact")
api.add_resource(VerifyEmail, "/verify_email")
