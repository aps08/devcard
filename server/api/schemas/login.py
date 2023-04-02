from marshmallow import Schema, fields


class LoginSchema(Schema):
    email = fields.Email(required=True,error_messages={'invalid': 'Invalid email or password'})
    password = fields.Str(required=True,validate=lambda p: 8 <= len(p) <= 20, error_messages={'validator_failed': 'Invalid email or password'})