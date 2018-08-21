from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_400_BAD_REQUEST
from django.db.models import Q
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode

from .models import Message, User, Email
from .serializers import (
    MessageSerializer, UserSerializer, SignUpSerializer, EmailSerializer
)
from .confirmation_letter import send_confirmation_letter
from .tokens import account_activation_token


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
            return Response(data='You must log out to perform this action')

        view_serializer = SignUpSerializer(data=request.data)
        if not view_serializer.is_valid():
            return Response(
                data=view_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )

        # check if the email address is unique
        email_address = view_serializer.validated_data['email']
        email_serializer = EmailSerializer(data={
            'address': email_address
        })
        if not email_serializer.is_valid():
            return Response(
                data=email_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )

        user_serializer = UserSerializer(data=request.data)
        if not user_serializer.is_valid():
            return Response(
                data=user_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )

        user = User(**user_serializer.validated_data)
        user.set_password(request.data['password'])
        user.is_active = False
        user.save()
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
