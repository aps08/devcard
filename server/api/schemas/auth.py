from marshmallow import Schema, fields, validate


class LoginSchema(Schema):
    email = fields.Email(required=True, error_messages={"required": "Email is required"})
    password = fields.Str(required=True, error_messages={"required": "Password is required"})


class RegisterSchema(Schema):
    email = fields.Email(required=True, error_messages={"required": "Email is required"})
    password = fields.Str(
        required=True,
        validate=[validate.Length(min=8, error="Password must be at least 8 characters long")],
        error_messages={"required": "Password is required"},
    )
