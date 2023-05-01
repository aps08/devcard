from marshmallow import Schema, fields, validate


class DemoSchema(Schema):
    name = fields.Str(
        required=True,
        validate=[
            validate.Regexp("^[a-zA-Z\s]+$", error="Only alphabets and spaces are allowed"),
            validate.Length(max=30, error="Name should not exceed 30 characters"),
        ],
    )
    company = fields.Str(
        required=True,
        validate=[
            validate.Regexp("^[a-zA-Z\s]+$", error="Only alphabets and spaces are allowed"),
            validate.Length(max=20, error="Company should not exceed 20 characters"),
        ],
    )
    experience = fields.Integer(
        required=True, validate=validate.Range(min=0, max=50, error="Experience cannot be less than 0 or more than 50")
    )
    role = fields.Str(
        required=True,
        validate=[
            validate.Regexp("^[a-zA-Z\s]+$", error="Only alphabets and spaces are allowed"),
            validate.Length(max=20, error="Role should not exceed 20 characters"),
        ],
    )


class FeedbackContactSchema(Schema):
    name = fields.Str(
        required=True,
        validate=[
            validate.Length(max=30, error="Name should not exceed 30 characters"),
            validate.Regexp("^[A-Za-z ]+$", error="Only alphabets and spaces are allowed"),
        ],
        error_messages={"required": "Name is required"},
    )
    email = fields.Email(
        required=True,
        validate=[validate.Length(max=30, error="Email should not exceed 30 characters")],
        error_messages={"required": "Email is required"},
    )
    message = fields.Str(
        required=True,
        validate=[
            validate.Length(max=100, error="Message should not exceed 100 characters"),
            validate.Regexp("^[A-Za-z ]+$", error="Only alphabets and spaces are allowed"),
        ],
        error_messages={"required": "Message is required"},
    )
