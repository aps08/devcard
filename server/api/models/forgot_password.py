import secrets
from datetime import datetime, timedelta
from uuid import uuid4


from api.extensions import db, ma


class ResetToken(db.Model):
    __tablename__ = "forgot_password"

    token_id = db.Column(db.String(50), primary_key=True)
    user_id = db.Column(db.String(50), db.ForeignKey("user_info.user_id"), nullable=False)
    token = db.Column(db.String(200), unique=True, nullable=False)
    valid = db.Column(db.Boolean, default=False)
    expiry_timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow() + timedelta(hours=2))
    created_timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", backref="reset_tokens")

    def __init__(self, user_id: str):
        self.token_id = uuid4().hex
        self.token = secrets.token_urlsafe(16)
        self.user_id = user_id


class ResetTokenSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ResetToken
        exclude = ("user_id", "expiry_timestamp")
