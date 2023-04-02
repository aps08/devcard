from datetime import datetime

from api.extensions import db
from sqlalchemy.exc import IntegrityError


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), nullable=False)

    def __init__(self, email, password):
        self.email = email
        self.password = password
        self.role_id = 2
        
    def add_user(self):
        try:
            db.session.add(self)
            db.session.commit()
            return {'message': 'User created successfully'},201
        except Exception as err:
            print(err)
            return {'error': 'Something went wrong'}, 500