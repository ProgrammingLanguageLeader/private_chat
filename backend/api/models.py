from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    public_email = models.BooleanField(default=False)
    public_first_name = models.BooleanField(default=True)
    public_last_name = models.BooleanField(default=False)


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
    sending_time = models.DateTimeField(auto_now_add=True, blank=True)
    text = models.TextField(max_length=4096)
