from django.contrib.auth import get_user_model

from .models import User


class UsernameOrEmailAuthBackend(object):
    def authenticate(self, username=None, password=None):
        try:
            user = get_user_model().objects.get(username=username)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            try:
                user = get_user_model().objects.get(email=username)
                if user.check_password(password):
                    return user
            except User.DoesNotExist:
                return None

    def get_user(self, user_id):
        try:
            return get_user_model().objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
