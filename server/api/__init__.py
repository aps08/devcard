from flask import Flask
from flask_cors import CORS

from .config import config_by_name
from .extensions import db, flask_bcrypt, jwt, login_manager, ma
from .models import Contributor, Role, User
from .resources import auth_resource


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    # Initilization
    db.init_app(app)
    ma.init_app(app)
    flask_bcrypt.init_app(app)
    jwt.init_app(app)
    login_manager.init_app(app)

    # Registering resources
    app.register_blueprint(auth_resource,url_prefix='/auth')

    # creating database
    with app.app_context():
        db.create_all()
    cors = CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})
    return app