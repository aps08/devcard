from datetime import datetime

from api.extensions import db


class PersonalInfo(db.Model):
    __tablename__ = "personal_info"

    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"), primary_key=True)
    first_name = db.Column(db.String)
    middle_name = db.Column(db.String, nullable=True)
    last_name = db.Column(db.String, nullable=True)
    gender = db.Column(db.String, nullable=True)
    country = db.Column(db.String, nullable=True)
    city = db.Column(db.String, nullable=True)
    pincode = db.Column(db.Integer, nullable=True)
    quote = db.Column(db.String, nullable=True)
    image = db.Column(db.String, nullable=True)
    linkedin = db.Column(db.String, nullable=True)
    github = db.Column(db.String, nullable=True)
    twitter = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, user_id, **kwargs):
        self.user_id = user_id
        self.first_name = kwargs.get("first_name")
        self.middle_name = kwargs.get("middle_name")
        self.last_name = kwargs.get("last_name")
        self.gender = kwargs.get("gender")
        self.country = kwargs.get("country")
        self.city = kwargs.get("city")
        self.pincode = kwargs.get("pincode")
        self.quote = kwargs.get("quote")
        self.image = kwargs.get("image")
        self.linkedin = kwargs.get("linkedin")
        self.github = kwargs.get("github")
        self.twitter = kwargs.get("twitter")

    def add_personal_info(self):
        db.session.add(self)
        db.session.commit()
