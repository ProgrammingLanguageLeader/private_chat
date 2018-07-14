from django.db import models
from django.conf import settings
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)


class Email(models.Model):
    address = models.EmailField(
        unique=True,
        max_length=254
    )
    verified = models.BooleanField(default=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='user'
    )
    is_main = models.BooleanField(default=False)
    public = models.BooleanField(default=False)

    def __str__(self):
        return self.address


class UserManager(BaseUserManager):
    def create_user(self, username, first_name, last_name, password=None,
                    is_admin=False, is_staff=False, is_active=True,
                    **kwargs):
        if not username:
            raise ValueError("User must have an username")
        if not password:
            raise ValueError("User must have a password")
        if not first_name:
            raise ValueError("User must have a first name")
        if not last_name:
            raise ValueError("User must have a last name")

        user = self.model(
            username=username,
            first_name=first_name,
            last_name=last_name,
            is_admin=is_admin,
            is_staff=is_staff,
            is_active=is_active,
            **kwargs
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, first_name, last_name,
                         password=None, **kwargs):
        return self.create_user(
            username,
            first_name,
            last_name,
            password,
            is_admin=True,
            is_staff=True,
            is_active=True,
            is_superuser=True,
            **kwargs
        )


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(
        unique=True,
        max_length=100
    )
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    public_first_name = models.BooleanField(default=True)
    public_last_name = models.BooleanField(default=False)

    objects = UserManager()
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.username


class Message(models.Model):
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='sender'
    )
    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='recipient'
    )
    sending_time = models.DateTimeField(auto_now_add=True)
    text = models.TextField(max_length=4096)
