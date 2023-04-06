from datetime import datetime

from api.extensions import db


class Order(db.Model):
    __tablename__ = "order"

    order_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"), nullable=False)
    order_credits = db.Column(db.Integer, nullable=False, default=0)
    completed = db.Column(db.Boolean, default=False)
    ordered_on = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def __init__(self, order_id, user_id, **kwargs):
        self.order_id = order_id
        self.user_id = user_id
        self.order_credits = kwargs.get("order_credits", self.order_credits)
        self.completed = kwargs.get("completed", self.completed)
        self.ordered_on = kwargs.get("ordered_on", self.ordered_on)
