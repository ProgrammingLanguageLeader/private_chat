from django.db import models
from django.conf import settings
from django.contrib.auth.models import (
    UserManager, AbstractBaseUser, PermissionsMixin
)


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(
        unique=True,
        max_length=100
    )
    email = models.EmailField(
        unique=True,
        max_length=254,
    )
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    public_email = models.BooleanField(default=False)
    public_first_name = models.BooleanField(default=True)
    public_last_name = models.BooleanField(default=False)

    objects = UserManager()
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']


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
