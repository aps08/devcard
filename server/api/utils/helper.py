from functools import wraps

from api.extensions import login_manager
from api.models import User
from flask import abort, request
from flask_login import current_user
from marshmallow import ValidationError


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


def role_required(role_name):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if not current_user.is_authenticated:
                abort(401)  # Unauthorized access
            if current_user.role.name != role_name:
                abort(403)  # Forbidden access
            return func(*args, **kwargs)

        return wrapper

    return decorator


@login_manager.user_loader
def load_user(user_email):
    user = User.query.filter_by(email=user_email).first()
    if user:
        return user
    return None
