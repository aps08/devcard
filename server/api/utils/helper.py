from functools import wraps

from api.extensions import login_manager
from api.models import User
from flask import abort, request
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


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)
