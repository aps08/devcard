from datetime import datetime
from typing import Tuple
from uuid import uuid4

from api.extensions import db, ma
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = "user_info"

    user_id = db.Column(db.String(50), primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey("role.role_id"), default=2)
    personal_id = db.Column(db.String(50), nullable=False)
    professional_id = db.Column(db.String(50), nullable=False)
    credits = db.Column(db.Integer, default=0)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    verified = db.Column(db.Boolean, default=False)
    created_timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    updated_timestamp = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    professional = db.relationship("ProfessionalInfo", backref="users")
    personal = db.relationship("PersonalInfo", backref="users")
    role = db.relationship("Role", backref="users")

    def __init__(self, email, password):
        self.user_id = str(uuid4())
        self.personal_id = str(uuid4())
        self.professional_id = str(uuid4())
        self.email = email
        self.password = password

    def check_email_exists(self) -> bool:
        return User.query.filter_by(email=self.email).first() is not None

    def add_user(self) -> Tuple[str, str, str]:
        db.session.add(self)
        db.session.commit()
        return self.user_id, self.professional_id, self.personal_id

    def get_id(self) -> str:
        return self.user_id


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
