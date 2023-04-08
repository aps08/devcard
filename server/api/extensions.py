"""
All packages object created here
"""
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_login import LoginManager
from flask_mail import Mail
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

jwt = JWTManager()
mail = Mail()
login_manager = LoginManager()
flask_bcrypt = Bcrypt()
db = SQLAlchemy()
ma = Marshmallow()
