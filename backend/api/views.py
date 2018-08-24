from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_400_BAD_REQUEST
from django.db.models import Q
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode

from .models import Message, User, Email
from .serializers import (
    MessageSerializer, SignUpSerializer,
    ObtainMessagesSerializer, SendMessageSerializer,
    ObtainUserInfoSerializer, UserSerializer
)
from .confirmation_letter import send_confirmation_letter
from .tokens import account_activation_token


class TeapotView(APIView):
    def get(self, request, *args, **kwargs):
        http_418_i_am_a_teapot = 418
        return Response(
            data='Teapot can\'t talk with you. He is busy now.',
            status=http_418_i_am_a_teapot
        )


class SignUpView(GenericAPIView):
    serializer_class = SignUpSerializer

    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return Response(data='You must log out to perform this action')
        view_serializer = SignUpSerializer(data=request.data)
        if not view_serializer.is_valid():
            return Response(
                data=view_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        validated_data = view_serializer.validated_data
        user = User(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        email_address = validated_data['email']
        email_object = Email(
            address=email_address,
            user=user,
            is_main=True
        )
        email_object.save()
        current_site = get_current_site(request)
        send_confirmation_letter(current_site, user, email_address)
        return Response(
            data='Please confirm your email address '
                 'to complete the registration'
        )


class ActivateUserView(APIView):
    def get(self, request, user_id_base_64, token):
        try:
            uid = force_text(urlsafe_base64_decode(user_id_base_64))
            user = User.objects.get(pk=uid)
        except (ValueError, User.DoesNotExist):
            user = None
        if user and account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            email = Email.objects.get(user=user, is_main=True)
            email.verified = True
            email.save()
            return Response(
                data='Thank you for your email confirmation. '
                'Now you can login your account.'
            )
        return Response(data='Activation link is invalid!')


class ObtainMessagesView(APIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = ObtainMessagesSerializer

    def post(self, request, *args, **kwargs):
        serializer = ObtainMessagesSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                data=serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        validated_data = serializer.validated_data
        current_user = request.user
        recipient_user = current_user
        if validated_data['recipient_user_id']:
            recipient_user = User.objects.get(
                pk=validated_data['recipient_user_id']
            )
        offset = validated_data['offset']
        limit = validated_data['limit']
        messages = Message.objects.filter(
            Q(sender__exact=current_user) |
            Q(recipient__exact=recipient_user)
        ).order_by(
            '-sending_time'
        )[offset:limit]
        message_serializer = MessageSerializer(messages, many=True)
        return Response(message_serializer.data)


class SendMessageView(GenericAPIView):
    serializer_class = SendMessageSerializer
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        serializer = SendMessageSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                data=serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        validated_data = serializer.validated_data
        current_user_id = request.user.id
        message = Message(
            sender_id=current_user_id,
            recipient_id=validated_data['recipient_user_id'],
            text=validated_data['text']
        )
        message.save()
        return Response(data='OK')


class ObtainUserInfoView(GenericAPIView):
    serializer_class = ObtainUserInfoSerializer

    def post(self, request, *args, **kwargs):
        serializer = ObtainUserInfoSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                data=serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        user_id = serializer.validated_data['user_id']
        user = User.objects.get(pk=user_id)
        user_serializer = UserSerializer(user)
        return Response(
            data=user_serializer.data
        )

