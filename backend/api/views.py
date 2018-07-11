from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_400_BAD_REQUEST
from django.db.models import Q

from .models import Message
from .serializers import MessageSerializer, UserSerializer


class TeapotView(APIView):
    def get(self, request, format=None):
        http_418_i_am_a_teapot = 418
        return Response(
            data='Teapot can\'t talk with you. He is busy now.',
            status=http_418_i_am_a_teapot
        )


class SignUpView(APIView):
    def post(self, request, format=None):
        if request.user.is_authenticated:
            return Response(
                data='You must log out to perform this action'
            )
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data='OK')
        return Response(
            data=serializer.errors,
            status=HTTP_400_BAD_REQUEST
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
        recipient = request.data.get('recipient')
        text = request.data.get('text')
        serializer = MessageSerializer(data={
            'sender': sender,
            'recipient': recipient,
            'text': text
        })
        if serializer.is_valid():
            serializer.save()
            return Response(data='OK')
        return Response(
            data=serializer.errors,
            status=HTTP_400_BAD_REQUEST
        )
