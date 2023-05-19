from marshmallow import Schema, fields, validate


class EmailSchema(Schema):
    email = fields.Email(
        required=True,
        validate=[validate.Length(max=50, error="Email should not exceed 30 characters")],
        error_messages={"required": "Email is required"},
    )


class PasswordChangeSchema(Schema):
    old_password = fields.Str(
        required=True,
        validate=[validate.Length(min=8, error="Your old password must be at least 8 characters long")],
        error_messages={"required": "Old password is required"},
    )
    new_password = fields.Str(
        required=True,
        validate=[validate.Length(min=8, error="Password must be at least 8 characters long")],
        error_messages={"required": "Old password is required"},
    )


class PersonalInfoChangeSchema(Schema):
    pass


class ProfessionalInfoChangeSchema(Schema):
    pass
