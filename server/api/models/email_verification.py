from datetime import datetime, timedelta
from uuid import uuid4

from api.extensions import db, ma
from marshmallow import Schema, fields


class EmailVerification(db.Model):
    verification_id = db.Column(db.String(50), primary_key=True)
    user_id = db.Column(db.String(50), nullable=False)
    token = db.Column(db.String(50), nullable=False, unique=True)
    created_timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    expiry_timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow() + timedelta(days=7))

    def __init__(self, user_id):
        self.verification_id = str(uuid4())
        self.user_id = user_id
        self.token = str(uuid4())

    def add_verify(self) -> str:
        db.session.add(self)
        db.session.commit()
        return self.token


class EmailVerificationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = EmailVerification
