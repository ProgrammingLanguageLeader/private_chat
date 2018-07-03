from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from django.db.models import Q

from .models import Message, User
from .serializers import MessageSerializer


class TeapotView(APIView):
    def get(self, request, format=None):
        http_418_i_am_a_teapot = 418
        return Response(
            data='Teapot can\'t talk with you. He is busy now.',
            status=http_418_i_am_a_teapot
        )


class GetMessagesView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, format=None):
        current_user = request.user
        if current_user.is_superuser:
            messages = Message.objects.all()
        else:
            messages = Message.objects.filter(
                Q(sender__exact=current_user) |
                Q(recipient__exact=current_user)
            )
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)


class SendMessageView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, format=None):
        sender = request.user.pk
        recipient = int(request.data["recipient"])
        text = request.data["text"]
        serializer = MessageSerializer(data={
            "sender": sender,
            "recipient": recipient,
            "text": text
        })
        if serializer.is_valid():
            serializer.save()
            return Response(
                data='OK',
                status=HTTP_200_OK
            )
        return Response(
            data='Check your request data',
            status=HTTP_400_BAD_REQUEST
        )
