from datetime import datetime
from functools import wraps

from api.extensions import db, jwt, login_manager
from api.models import EmailVerification, TokenBlocklist, User
from flask import abort, request
from flask_login import current_user
from marshmallow import ValidationError


def create_verification_link(user_id: str) -> str:
    email_verify = (
        EmailVerification.query.filter(EmailVerification.user_id == user_id)
        .order_by(EmailVerification.expiry_timestamp.desc())
        .first()
    )
    if email_verify is None or email_verify.expiry_timestamp > datetime.utcnow():
        new_verify = EmailVerification(user_id)
        token = new_verify.add_verify()
        url = "http://localhost:3000/verify/" + token
    else:
        url = "http://localhost:3000/verify/" + email_verify.token
    return url


def validate_json(schema):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            try:
                data = schema().load(request.json)
            except ValidationError as err:
                abort(400, err.messages)
            kwargs["data"] = data
            return f(*args, **kwargs)

        return wrapper

    return decorator


# def role_required(role_name):
#     def decorator(func):
#         @wraps(func)
#         def wrapper(*args, **kwargs):
#             if not current_user.is_authenticated:
#                 abort(401)
#             if current_user.role.name != role_name:
#                 abort(403)
#             return func(*args, **kwargs)

#         return wrapper

#     return decorator


@login_manager.user_loader
def load_user(user_email):
    user = User.query.filter_by(email=user_email).first()
    if user:
        return user
    return None


@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header: str, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.block_id).filter_by(jti=jti).scalar()
    return token is not None


def update_verification(user_id: str) -> None:
    if not User.query.with_entities(User.verified).first()[0]:
        num_updated = User.query.filter(User.user_id == user_id).update({User.verified: True})
        db.session.commit()


def get_email(user_id: str) -> str:
    user = User.query.filter(user_id=user_id).first()
    return user.email
