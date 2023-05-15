from datetime import datetime
from uuid import uuid4

from api.extensions import db
from marshmallow import Schema, fields


class TokenBlocklist(db.Model):
    block_id = db.Column(db.String(50), primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    created_timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def __init__(self, jti) -> None:
        self.block_id = str(uuid4())
        self.jti = jti

    def add_to_blacklist(self):
        db.session.add(self)
        db.session.commit()


# class TokenBlocklistSchema(Schema):
#     block_id = fields.String()
#     jti = fields.String()
#     created_timestamp = fields.DateTime()

#     class Meta:
#         fields = ("block_id", "jti", "created_timestamp")
#         datetimeformat = "%Y-%m-%dT%H:%M:%S.%fZ"
