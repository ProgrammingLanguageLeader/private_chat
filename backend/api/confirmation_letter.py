from django.core.mail import EmailMessage
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.template.loader import render_to_string

from .tokens import account_activation_token


def send_confirmation_letter(current_site, user, email_address):
    if not email_address:
        raise ValueError("You must specify an email")
    user_id_base_64 = urlsafe_base64_encode(
        force_bytes(user.pk)
    ).decode()
    token = account_activation_token.make_token(user)
    message = render_to_string('confirmation.html', {
        'user': user,
        'domain': current_site.domain,
        'user_id_base_64': user_id_base_64,
        'token': token,
    })
    mail_subject = 'Activate your account'
    letter = EmailMessage(mail_subject, message, to=[email_address])
    letter.send()
