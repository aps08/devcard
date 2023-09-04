"""
doc string
"""

import os
from flask import Flask
from flask_cors import CORS

from .config import config_by_name
from .extensions import db, flask_bcrypt, jwt, login_manager, ma, mail
from .models import *
from .resources import auth_resource, public_resource, user_resource


def create_app(config_name):
    """Create the flask app with all configuration"""
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    db.init_app(app)
    ma.init_app(app)
    mail.init_app(app)
    flask_bcrypt.init_app(app)
    login_manager.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(auth_resource, url_prefix="/auth")
    app.register_blueprint(public_resource, url_prefix="/public")
    app.register_blueprint(user_resource, url_prefix="/user")

    with app.app_context():
        db.create_all()
        roles = Role.query.filter(Role.role_id.in_([1, 2, 3])).all()
        if len(roles) == 3:
            pass
        else:
            role_admin = Role(1, "admin")
            role_user = Role(2, "user")
            role_contributor = Role(3, "contributor")
            db.session.add_all([role_admin, role_user, role_contributor])
            db.session.commit()

    CORS(app, resources="*", origins=os.environ.get("HOST_URL"))
    return app
