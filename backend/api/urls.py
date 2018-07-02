from django.urls import path

import api.views as chat_views


urlpatterns = [
    path('get_messages/', chat_views.MessagesListView.as_view()),
]
