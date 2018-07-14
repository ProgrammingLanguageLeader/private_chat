from django.contrib import admin

from .models import User, Message, Email


admin.site.register(User)
admin.site.register(Message)
admin.site.register(Email)
