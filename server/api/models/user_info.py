from datetime import datetime
from typing import Tuple
from uuid import uuid4

from flask_login import UserMixin

from api.extensions import db, ma


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
    image = db.Column(db.String(255))
    created_timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    updated_timestamp = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    professional = db.relationship(
        "ProfessionalInfo",
        backref="users",
        uselist=False,
        primaryjoin="User.professional_id == ProfessionalInfo.professional_id",
    )
    personal = db.relationship(
        "PersonalInfo", backref="users", uselist=False, primaryjoin="User.personal_id == PersonalInfo.personal_id"
    )
    role = db.relationship("Role", backref="users")

    def __init__(self, email: str, password: str):
        self.user_id = uuid4().hex
        self.personal_id = uuid4().hex
        self.professional_id = uuid4().hex
        self.email = email
        self.password = password
        self.image = None

    def get_id(self) -> str:
        return self.user_id


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        exclude = ("user_id", "role_id", "personal_id", "professional_id", "created_timestamp", "updated_timestamp")
