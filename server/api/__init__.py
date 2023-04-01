from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy

from .config import config_by_name
from .resources import auth_resource

db = SQLAlchemy()
flask_bcrypt = Bcrypt()
login_manager = LoginManager()


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    # Initilization
    db.init_app(app)
    flask_bcrypt.init_app(app)
    jwt = JWTManager(app)
    login_manager.init_app(app)

    # Registering resources
    app.register_blueprint(auth_resource,url_prefix='/auth')

    # creating database
    with app.app_context():
        db.create_all()
    cors = CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})
    return app