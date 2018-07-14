from .models import User, Email


# TODO: write tests for this class
class UsernameOrEmailAuthBackend(object):
    def authenticate(self, username=None, password=None):
        try:
            user = User.objects.get(username=username)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            try:
                email = Email.objects.get(address=username)
                user = email.user
                if user.check_password(password):
                    return user
            except Email.DoesNotExist:
                return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
