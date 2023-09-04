from marshmallow import Schema, fields, validate, validates_schema

URL_REGEX_PATTERN_GITHUB = r"^((https?://)?(www\.)?{}\.com/)([\w-]+)$"
URL_REGEX_PATTERN_LINKEDIN = r"^(https?://)?(www\.)?linkedin\.com/in/([\w-]+)$"


class EmailSchema(Schema):
    email = fields.Email(
        required=True,
        validate=[validate.Length(max=30, error="Email should not exceed 30 characters")],
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
    first_name = fields.Str(
        allow_none=True,
        validate=[
            validate.Length(max=12, error="First name can't exceed 12 characters"),
            validate.Regexp(r"^[a-zA-Z]*$", error="First name can only contain alphabets"),
        ],
    )
    middle_name = fields.Str(
        allow_none=True,
        validate=[
            validate.Length(max=12, error="Middle name can't exceed 12 characters"),
            validate.Regexp(r"^[a-zA-Z]*$", error="Middle name can only contain alphabets"),
        ],
    )
    last_name = fields.Str(
        allow_none=True,
        validate=[
            validate.Length(max=12, error="Last name can't exceed 12 characters"),
            validate.Regexp(r"^[a-zA-Z]*$", error="Last name can only contain alphabets"),
        ],
    )
    gender = fields.Str(
        allow_none=True,
        validate=validate.OneOf(["male", "female", None], error="Must select gender value from the drop down menu"),
    )
    city = fields.Str(
        allow_none=True,
        validate=validate.OneOf(
            [
                "Bangalore, Karnataka",
                "Hyderabad, Telangana",
                "Chennai, Tamil Nadu",
                "Pune, Maharashtra",
                "Mumbai, Maharashtra",
                "Noida, Uttar Pradesh",
                "Gurgaon, Haryana",
                "New Delhi",
                "Kolkata, West Bengal",
                "Ahmedabad, Gujarat",
                None,
            ],
            error="Must select city value from the drop down menu",
        ),
    )
    linkedin = fields.Str(
        allow_none=True,
        validate=[
            validate.Length(max=50, error="URL cannot exceed 50 characters"),
            validate.Regexp(r"^(https?://)?(www\.)?linkedin\.com/in/([\w-]+)$", error="Invalid LinkedIn URL."),
        ],
    )
    github = fields.Str(
        allow_none=True,
        validate=[
            validate.Length(max=50, error="URL cannot exceed 50 characters"),
            validate.Regexp(r"^((https?://)?(www\.)?{}\.com/)([\w-]+)$", error="Invalid GitHub URL."),
        ],
    )


class ProfessionalInfoChangeSchema(Schema):
    company_name = fields.Str(
        allow_none=True,
        validate=[
            validate.Regexp("^[a-zA-Z0-9]*$", error="Only alphabets and numbers are allowed in company"),
            validate.Length(max=20, error="Company name cannot exceed 20 characters"),
        ],
    )
    professional_role = fields.Str(
        allow_none=True,
        validate=[
            validate.Regexp("^[a-zA-Z- ]*$", error="Only alphabets and Hypen(-) are allowed"),
            validate.Length(max=20, error="Role cannot exceed 20 characters"),
        ],
    )
    experience = fields.Int(
        allow_none=True, validate=validate.Range(min=0, max=40, error="Experience should be a number between 0 and 40")
    )
    primary_pl = fields.Str(
        allow_none=True,
        validate=validate.OneOf(
            ["Python", "Java", "JavaScript", "C#", "C++", "Ruby", "Swift", "Go", "PHP", "TypeScript", "Kotlin", "Rust"],
            error="Primary Language given is not valid",
        ),
    )
    stacks = fields.Str(
        allow_none=True,
        validate=[
            validate.Regexp("^[a-zA-Z, ]*$", error="Only alphaebts and comma are allowed"),
            validate.Length(max=100, error="Other stacks cannot exceed 100 characters"),
        ],
    )
