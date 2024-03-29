from datetime import datetime

from api.extensions import db, ma


class ProfessionalInfo(db.Model):
    __tablename__ = "professional_info"

    professional_id = db.Column(
        db.String(50),
        db.ForeignKey("user_info.professional_id"),
        primary_key=True,
    )
    user_id = db.Column(db.String(50), db.ForeignKey("user_info.user_id"))
    professional_role = db.Column(db.String(50))
    company_name = db.Column(db.String(50))
    experience = db.Column(db.Integer)
    primary_pl = db.Column(db.String(50))
    created_timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, professional_id: str, user_id: str, **kwargs):
        self.professional_id = professional_id
        self.user_id = user_id
        self.professional_role = kwargs.get("professional_role", None)
        self.company_name = kwargs.get("company_name", None)
        self.experience = kwargs.get("experience", None)
        self.primary_pl = kwargs.get("primary_pl", None)


class ProfessionalInfoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ProfessionalInfo
        exclude = ("created_timestamp", "user_id", "professional_id")
