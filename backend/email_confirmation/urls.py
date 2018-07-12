from django.urls import re_path

from .views import ActivationView


urlpatterns = [
    re_path(
        '(?P<user_id_base_64>[0-9A-Za-z_\-]+)/'
        '(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/',
        ActivationView.as_view(),
        name='activate'
    ),
]
