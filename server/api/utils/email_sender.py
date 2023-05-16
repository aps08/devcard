from api.extensions import mail
from flask import render_template
from flask_mail import Message


def send_email(subject: str, recipient: list, template: str, attachment_path: str = "", **kwargs):
    msg = Message(subject=subject, recipients=recipient)
    msg.html = render_template(template, **kwargs)

    if attachment_path:
        with open(attachment_path, "rb") as attachment:
            msg.attach(filename="devcard.zip", content_type="application/octet-stream", data=attachment.read())

    mail.send(msg)
