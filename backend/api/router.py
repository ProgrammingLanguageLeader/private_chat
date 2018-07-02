from rest_framework import routers

from .views import MessagesListView

api_router = routers.DefaultRouter()
api_router.register(r'get_messages', MessagesListView)
