from marshmallow import Schema, fields


class RegisterSchema(Schema):
    email = fields.Email(required=True,error_messages={'invalid': 'Invalid email or password'})
    password = fields.Str(required=True,validate=lambda p: 8 <= len(p) <= 20, error_messages={'validator_failed': 'Password must be 8 to 20 characters long'})