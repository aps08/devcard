from datetime import datetime

from api.extensions import db, ma


class PersonalInfo(db.Model):
    __tablename__ = "personal_info"

    personal_id = db.Column(db.String(50), db.ForeignKey("user_info.personal_id"), primary_key=True)
    user_id = db.Column(db.String(50), db.ForeignKey("user_info.user_id"))
    first_name = db.Column(db.String(20), nullable=True)
    middle_name = db.Column(db.String(20), nullable=True)
    last_name = db.Column(db.String(20), nullable=True)
    gender = db.Column(db.String(10), nullable=True)
    city = db.Column(db.String(20), nullable=True)
    quote = db.Column(db.String(255), nullable=True)
    image = db.Column(db.String(255), nullable=True)
    linkedin = db.Column(db.String(50), nullable=True)
    github = db.Column(db.String(50), nullable=True)
    twitter = db.Column(db.String(50), nullable=True)
    created_timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, personal_id: str, user_id: str, **kwargs):
        self.personal_id = personal_id
        self.user_id = user_id
        self.first_name = kwargs.get("first_name", None)
        self.middle_name = kwargs.get("middle_name", None)
        self.last_name = kwargs.get("last_name", None)
        self.gender = kwargs.get("gender", None)
        self.city = kwargs.get("city", None)
        self.quote = kwargs.get("quote", None)
        self.image = kwargs.get("image", None)
        self.linkedin = kwargs.get("linkedin", None)
        self.github = kwargs.get("github", None)
        self.twitter = kwargs.get("twitter", None)

    def add_personal_info(self) -> str:
        db.session.add(self)
        db.session.commit()
        return self.user_id


class PersonalInfoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = PersonalInfo
