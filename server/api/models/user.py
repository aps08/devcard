from datetime import datetime

from api.extensions import db


class User(db.Model):
    __tablename__ = "user"

    user_id = db.Column(db.Integer, primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey("role.role_id"), nullable=False, default=2)
    credits = db.Column(db.Integer, default=0, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def __init__(self, email, password, **kwargs):
        self.email = email
        self.password = password
        self.role_id = kwargs.get("role_id", self.role_id)
        self.credits = kwargs.get("credits", self.credits)

    def check_email_exists(self):
        return User.query.filter_by(email=self.email).first() is not None

    def add_user(self):
        if self.check_email_exists():
            return {"message": "Email already exists"}, 400

        db.session.add(self)
        db.session.commit()
        return {"message": "A verification email has been sent to your email " + self.email}, 200
