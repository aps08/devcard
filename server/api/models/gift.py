from datetime import datetime

from api.extensions import db


class Gift(db.Model):
    __tablename__ = "gifts"

    gift_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"), nullable=False)
    user_email = db.Column(db.String, nullable=False)
    link_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    accepted = db.Column(db.DateTime, nullable=False, default=False)
    order_id = db.Column(db.Integer, nullable=False)

    def __init__(self, gift_id, user_id, user_email, accepted, order_id):
        self.gift_id = gift_id
        self.user_id = user_id
        self.user_email = user_email
        self.order_id = order_id
