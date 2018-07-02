from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.http import Http404
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import user_passes_test

from .models import Message, User
from .serializers import UserSerializer, MessageSerializer


class MessagesListView(APIView):
    # authentication_classes = (authentication.TokenAuthentication, )
    permission_classes = (permissions.IsAdminUser, )

    def get(self, request, format=None):
        # import pdb; pdb.set_trace()
        messages = Message.objects.all()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)


def login(request):
    pass


def logout(request):
    pass


def send_message(request):
    pass


def get_messages(request):
    pass
