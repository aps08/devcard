import os
import boto3
import rsa
import json
import random
from uuid import uuid4
from typing import Tuple

from datetime import datetime, timedelta, time
from functools import wraps
from typing import Union

from flask import abort, request
from flask_login import current_user
from marshmallow import ValidationError
from botocore.signers import CloudFrontSigner

from api.extensions import db, jwt, login_manager
from api.models import EmailVerification, TokenBlocklist, User


def cache_invalidation(path: str) -> None:
    """
    Responsible for invalidating the cache before expiry.

    argument:
        path: path of the image
    """
    session = boto3.Session(
        aws_access_key_id=os.environ.get("AWS_KEY"), aws_secret_access_key=os.environ.get("AWS_SECRET")
    )
    cf_client = session.client("cloudfront")
    res = cf_client.create_invalidation(
        DistributionId=os.environ.get("CLOUDFRONT_DISTRIBUTION_ID"),
        InvalidationBatch={
            "Paths": {"Quantity": 1, "Items": [path]},
            "CallerReference": str(time()).replace(".", ""),
        },
    )
    invalidation_id = res["Invalidation"]["Id"]


def select_random_demo_image() -> Union[str, None]:
    """
    Selects and return a random image for demo and returns it.
    return:
        path: signed url of the image
    """
    session = boto3.Session(
        aws_access_key_id=os.environ.get("AWS_KEY"), aws_secret_access_key=os.environ.get("AWS_SECRET")
    )
    s3_client = session.client("s3")
    response = s3_client.list_objects_v2(Bucket=os.environ.get("BUCKET"), Prefix="demo/background/")
    objects = response["Contents"]
    objects = objects[1:]
    random_object = random.choice(objects)
    cloudfront_domain = os.environ.get("CLOUDFRONT_URL")
    if cloudfront_domain:
        path = cloudfront_domain + "/" + random_object["Key"]
        path = get_signed_url(path)
        return path
    return None


def upload_file_s3(file_name: str, path: str) -> None:
    """
    uploads file to s3 location

    argument:
        file_name: name or path of the file.
        path: aws s3 prefix where file need to placed.
    """
    session = boto3.Session(
        aws_access_key_id=os.environ.get("AWS_KEY"), aws_secret_access_key=os.environ.get("AWS_SECRET")
    )
    s3_client = session.client("s3")
    s3_client.upload_file(file_name, os.environ.get("BUCKET"), path + file_name)
    os.remove(file_name)


def upload_image_s3(file_name: str, path: str) -> Union[str, None]:
    """
    uploads image to s3 location

    argument:
        file_name: name or path of the file.
        path: aws s3 prefix where file need to placed.
    return:
        url: cloudfront url with file_name
    """
    session = boto3.Session(
        aws_access_key_id=os.environ.get("AWS_KEY"), aws_secret_access_key=os.environ.get("AWS_SECRET")
    )
    s3_client = session.client("s3")
    s3_client.upload_file(file_name, os.environ.get("BUCKET"), path + file_name)
    os.remove(file_name)
    cloudfront_domain = os.environ.get("CLOUDFRONT_URL")
    if cloudfront_domain:
        url = cloudfront_domain + "/" + path + file_name
        return url
    return None


def rsa_signer(message):
    """
    Signs a cloudfront URL using RSA

    argument:
        message: object to be signed
    """
    private_key = os.environ.get("CLOUDFRONT_RSA_KEY")
    if private_key:
        return rsa.sign(message, rsa.PrivateKey.load_pkcs1(private_key.encode("utf8")), "SHA-1")
    return None


def get_signed_url(cloudfront_url: str) -> Union[str, None]:
    """
    Creates a signed url url for cloudfront url,
    which is valid for 1 day.

    argument:
        cloudfront_url: url which needs the signature
    return:
        signed_url: cloudfront pre-signed url
    """
    key_id = os.environ.get("CLOUDFRONT_KEY_ID")
    if key_id:
        cf_signer = CloudFrontSigner(key_id, rsa_signer)
        current_datetime = datetime.utcnow()
        greater_than = current_datetime - timedelta(minutes=1.0)
        less_then = current_datetime + timedelta(minutes=5.0)
        custom_policy = cf_signer.build_policy(
            cloudfront_url,
            date_less_than=less_then,
            date_greater_than=greater_than,
        )
        signed_url = cf_signer.generate_presigned_url(cloudfront_url, policy=custom_policy)
        return signed_url
    return None


def create_verification_link(user_id: str) -> Tuple[bool, str]:
    HOST = os.environ.get("HOST_URL") + "/verify/"  # type: ignore
    current_date_time = datetime.utcnow()
    email_verify = (
        EmailVerification.query.filter(
            EmailVerification.user_id == user_id,
            EmailVerification.created_timestamp < current_date_time,
            EmailVerification.expiry_timestamp > current_date_time,
        )
        .order_by(EmailVerification.expiry_timestamp.desc())
        .first()
    )
    if email_verify:
        return False, ""
    else:
        new_verify = EmailVerification(user_id)
        db.session.add(new_verify)
        db.session.commit()
        url = HOST + new_verify.token
        return True, url


def validate_json(schema):
    """
    Validates the request json for API endpoint

    argument:
        schema: schema for validation
    """

    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            try:
                data = schema().load(request.json)
            except ValidationError as err:
                error_message = list(err.messages.values())[0][0]  # type: ignore
                abort(400, error_message)
            kwargs["data"] = data
            return f(*args, **kwargs)

        return wrapper

    return decorator


@login_manager.user_loader
def load_user(user_email: str):
    """
    Responsible for loading a user data into the login manager

    argument:
        user_email: email of the user
    """
    try:
        return User.query.filter_by(email=user_email).first()
    except:
        return None


@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header: str, jwt_payload: dict) -> bool:
    """
    Responsible for checking if a token is in blacklist or not

    argument:
        jwt_header: header of jwt
        jwt_header: header contains jwt unique identifier
    return:
        True if token is blacklisted
    """
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.block_id).filter_by(jti=jti).scalar()
    return token is not None
