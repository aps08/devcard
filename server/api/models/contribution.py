from datetime import datetime

from api.extensions import db


class Contribution(db.Model):
    __tablename__ = "contribution"

    contribution_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"), nullable=False)
    type = db.Column(db.String, nullable=False)
    design_image = db.Column(db.String, nullable=True)
    code_link = db.Column(db.String, nullable=True)
    credits_received = db.Column(db.Integer, nullable=False)
    contributed_on = db.Column(db.DateTime, nullable=False)
    activated = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, contribution_id, user_id, **kwargs):
        self.contribution_id = contribution_id
        self.user_id = user_id
        self.type = kwargs.get("type")
        self.design_image = kwargs.get("design_image")
        self.code_link = kwargs.get("code_link")
        self.credits_received = kwargs.get("credits_received")
        self.contributed_on = kwargs.get("contributed_on")
