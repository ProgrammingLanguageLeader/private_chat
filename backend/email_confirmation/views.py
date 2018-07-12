from rest_framework.views import APIView, Response
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth import get_user_model

from .tokens import account_activation_token


class ActivationView(APIView):
    def get(self, request, user_id_base_64, token):
        User = get_user_model()
        try:
            uid = force_text(urlsafe_base64_decode(user_id_base_64))
            user = User.objects.get(pk=uid)
        except (ValueError, User.DoesNotExist):
            user = None
        if user and account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            return Response(
                data='Thank you for your email confirmation. '
                'Now you can login your account.'
            )
        else:
            return Response(data='Activation link is invalid!')
