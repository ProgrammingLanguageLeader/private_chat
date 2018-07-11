from django.urls import path, include
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

import api.views as chat_views


urlpatterns = [
    path('', get_schema_view()),
    path(
        'sign_up',
        chat_views.SignUpView.as_view()
    ),
    path(
        'auth/',
        include(
            'rest_framework.urls',
            namespace='rest_framework'
        )
    ),
    path(
        'auth/token/obtain/',
        TokenObtainPairView.as_view()
    ),
    path(
        'auth/token/refresh/',
        TokenRefreshView.as_view()
    ),
    path(
        'teapot/',
        chat_views.TeapotView.as_view()
    ),
    path(
        'get_messages/',
        chat_views.GetMessagesView.as_view()
    ),
    path(
        'send_message/',
        chat_views.SendMessageView.as_view()
    ),
]
