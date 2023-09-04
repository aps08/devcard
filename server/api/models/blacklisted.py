from datetime import datetime
from uuid import uuid4

from api.extensions import db, ma
from marshmallow import Schema, fields


class TokenBlocklist(db.Model):
    block_id = db.Column(db.String(50), primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    created_timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def __init__(self, jti) -> None:
        self.block_id = uuid4().hex
        self.jti = jti


class TokenBlocklistSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TokenBlocklist
