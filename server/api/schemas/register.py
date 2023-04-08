from marshmallow import Schema, fields


class RegisterSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=lambda p: 8 <= len(p) <= 20)
