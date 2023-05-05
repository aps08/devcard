from api.extensions import mail
from flask import render_template
from flask_mail import Message


def send_email(subject: str, recipient: list, template: str, **kwargs):
    msg = Message(subject=subject, recipients=recipient)
    msg.html = render_template(template, **kwargs)
    mail.send(msg)
