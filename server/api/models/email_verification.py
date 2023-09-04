import secrets
from datetime import datetime, timedelta
from uuid import uuid4

from api.extensions import db, ma
from marshmallow import Schema, fields


class EmailVerification(db.Model):
    verification_id = db.Column(db.String(50), primary_key=True)
    user_id = db.Column(db.String(50), nullable=False)
    token = db.Column(db.String(50), nullable=False, unique=True)
    created_timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    expiry_timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow() + timedelta(days=1))

    def __init__(self, user_id):
        self.verification_id = uuid4().hex
        self.user_id = user_id
        self.token = secrets.token_urlsafe(16)


class EmailVerificationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = EmailVerification
        exclude = ("created_timestamp", "verification_id", "user_id")
