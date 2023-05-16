from datetime import datetime, timedelta
from uuid import uuid4

from api.extensions import db, ma


class FeedbackContact(db.Model):
    feedbackcontact_id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    created_timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, email: str, name: str, message: str):
        self.feedbackcontact_id = str(uuid4())
        self.name = name
        self.email = email
        self.message = message

    def check_duplicate(self) -> bool:
        return not (
            FeedbackContact.query.filter_by(email=self.email)
            .filter_by(name=self.name)
            .filter_by(message=self.message)
            .first()
            is not None
        )

    def add_feedbackcontact(self) -> None:
        db.session.add(self)
        db.session.commit()


class FeedbackContactSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = FeedbackContact
