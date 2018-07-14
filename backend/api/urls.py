from django.urls import path, include, re_path
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    SignUpView,
    ActivateUserView,
    TeapotView,
    GetMessagesView,
    SendMessageView,
)


urlpatterns = [
    path('', get_schema_view()),
    path(
        'sign_up',
        SignUpView.as_view(),
        name='sign_up'
    ),
    re_path(
        'activate/(?P<user_id_base_64>[0-9A-Za-z_\-]+)/'
        '(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/',
        ActivateUserView.as_view(),
        name='activate'
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
        TeapotView.as_view()
    ),
    path(
        'get_messages/',
        GetMessagesView.as_view()
    ),
    path(
        'send_message/',
        SendMessageView.as_view()
    ),
]
