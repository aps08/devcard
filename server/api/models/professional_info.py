from datetime import datetime

from api.extensions import db


class ProfessionalInfo(db.Model):
    __tablename__ = "professional_info"

    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"), primary_key=True)
    professional_role = db.Column(db.String(120), nullable=True)
    company_name = db.Column(db.String(120), nullable=True)
    experience = db.Column(db.Float, nullable=True)
    primary_pl = db.Column(db.String(120), nullable=True)
    secondary_pl = db.Column(db.String(120), nullable=True)
    others = db.Column(db.String(120), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def __init__(self, user_id, **kwargs):
        self.user_id = user_id
        self.professional_role = kwargs.get("professional_role")
        self.company_name = kwargs.get("company_name")
        self.experience = kwargs.get("experience")
        self.primary_pl = kwargs.get("primary_pl")
        self.secondary_pl = kwargs.get("secondary_pl")
        self.others = kwargs.get("others")

    def add_professional_info(self):
        db.session.add(self)
        db.session.commit()
