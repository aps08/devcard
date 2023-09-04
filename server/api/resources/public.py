import base64
import json
import os
from uuid import uuid4
from datetime import datetime

from flask import Blueprint, request
from flask_restful import Api, Resource

from api.extensions import db, flask_bcrypt
from api.models import EmailVerification, FeedbackContact, ResetToken, User, ResetTokenSchema
from api.schemas import DemoSchema, EmailSchema, FeedbackContactSchema, PasswordSchema, DemoImageSchema
from api.utils import (
    create_verification_link,
    send_email,
    validate_json,
    upload_image_s3,
    get_signed_url,
    upload_file_s3,
    select_random_demo_image,
)

public_resource = Blueprint("public", __name__)
api = Api(public_resource)


class ForgotPassword(Resource):
    @validate_json(EmailSchema)
    def post(self, data):
        """
        Responsible for reseting password in case user
        forgot the password
        argument:
            data: dictionary containing the email of the user
        return:
            message: message for indicating success or failure of the request
        """
        user_info = User.query.filter_by(email=data["email"]).first()
        current_date_time = datetime.utcnow()
        if user_info:
            record = ResetToken.query.filter(
                ResetToken.user_id == user_info.user_id,
                ResetToken.valid == False,
                ResetToken.expiry_timestamp > current_date_time,
                ResetToken.created_timestamp < current_date_time,
            ).first()
            if record:
                return {"message": "We have already sent you email. Please check your inbox."}, 400
            else:
                reset_token = ResetToken(user_info.user_id)
                db.session.add(reset_token)
                db.session.commit()
                link = os.environ.get("HOST_URL") + "/forgotpassword/" + reset_token.token  # type: ignore
                send_email("Forgot passowrd", [data["email"]], "forgotpassword.html", link=link)
                return {
                    "message": "Email sent to registered address for password change. Link expires in 2 hours."
                }, 200
        else:
            return {"message": "Email doesn't exists"}, 400

    @validate_json(PasswordSchema)
    def put(self, data):
        """
        Responisble for validating the correct token
        and verifying the new password given by user.
        argument:
            data: dictionary containing the password and token
        return:
            message: message for indicating success or failure of the request
        """
        resetToken = ResetToken.query.filter_by(token=data["token"]).first()
        if resetToken:
            if resetToken.expiry_timestamp >= datetime.utcnow() and not resetToken.valid:
                password_hash = flask_bcrypt.generate_password_hash(data["password"]).decode("utf-8")
                resetToken.valid = True
                resetToken.user.password = password_hash
                db.session.commit()
                send_email("Password changed", [resetToken.user.email], "changepassword.html")
                return {"message": "Password change successfully."}, 200
            else:
                return {"message": "Token has expired. Request token again."}, 400
        else:
            return {"message": "Email doesn't exists."}, 400


class Demo(Resource):
    @validate_json(DemoSchema)
    def post(self, data):
        """
        Responisble for returning the required resources
        to create a card for a demo.
        argument:
            data: dictinary containing the information for the demo
        return:
            message: dictionary containing the requried resources
        """
        epoch_time = int(datetime.utcnow().timestamp())
        file_name = f"{uuid4().hex}_{epoch_time}.json"
        with open(file_name, "w") as file:
            json.dump(data, file, indent=3)
        upload_file_s3(file_name, "demo/data/")
        background = select_random_demo_image()
        if background:
            data["background"] = background
        return data, 200

    @validate_json(DemoImageSchema)
    def put(self, data):
        """
        Responsible for upload the base64 form of
        image to s3 and create signed url for the same.
        argument:
            data: dictionary containing base64 image string
        """
        base64string = data["image"].split(",")[1]
        image_data = base64.b64decode(base64string)
        file_id = uuid4().hex + ".jpg"
        image_path = file_id
        with open(image_path, "wb") as file:
            file.write(image_data)
        cloudfront_url = upload_image_s3(image_path, "demo/images/")
        if cloudfront_url:
            cloudfront_presigned_url = get_signed_url(cloudfront_url)
            return {"message": cloudfront_presigned_url}


class FeebackContact(Resource):
    @validate_json(FeedbackContactSchema)
    def post(self, data):
        """
        Responsible for saving contact and feedback
        messages.
        argument:
            data: dictionary containing the feedback information
        return:
            message: message for indicating success or failure of the request
        """
        feedbackcontact = FeedbackContact(data["email"], data["name"], data["message"])
        duplicate_check = not (
            FeedbackContact.query.filter_by(email=data["email"])
            .filter_by(name=data["name"])
            .filter_by(message=data["message"])
            .first()
            is not None
        )
        if duplicate_check:
            db.session.add(feedbackcontact)
            db.session.commit()
            send_email("Feeback/Contact Confirmation", [data["email"]], "feedbackcontact.html", **data)
            return {"message": "We will soon respond back on your email."}, 200
        else:
            return {"message": "We already have your request."}, 400


class VerifyEmail(Resource):
    def get(self):
        """
        Responsible for verifying user email
        after sign up.
        return:
            message: message for indicating success or failure of the request
        """
        token = request.args.get("token")
        if not token:
            return {"message": "Something went wrong."}, 400
        else:
            email_data = EmailVerification.query.filter_by(token=token).first()
            if email_data is not None:
                if email_data.expiry_timestamp >= datetime.utcnow():
                    if not User.query.with_entities(User.verified).filter_by(user_id=email_data.user_id).first()[0]:
                        num_updated = User.query.filter(User.user_id == email_data.user_id).update(
                            {User.verified: True}
                        )
                        db.session.commit()
                    return {"message": "Your email is verified successfully. Sign In and enjoy our services."}, 200
                else:
                    url = create_verification_link(email_data.user_id)
                    user = User.query.filter(user_id=email_data.user_id).first()
                    send_email("Verify Email", [user.email], "register.html", email=user.email, url=url)
                    return {"message": "Email verification failed. We have resent an email for verification."}, 400
            else:
                return {"message": "Invalid token."}, 400


api.add_resource(Demo, "/demo")
api.add_resource(FeebackContact, "/feeback_contact")
api.add_resource(VerifyEmail, "/verify_email")
api.add_resource(ForgotPassword, "/forgot_password")
