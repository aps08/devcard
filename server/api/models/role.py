from api.extensions import db


class Role(db.Model):
    __tablename__ = "role"

    role_id = db.Column(db.Integer, db.ForeignKey("user_info.role_id"), primary_key=True)
    name = db.Column(db.String(10), unique=True, nullable=False)

    def __init__(self, role_id, name):
        self.role_id = role_id
        self.name = name
