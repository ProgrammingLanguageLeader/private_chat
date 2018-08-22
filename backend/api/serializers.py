from rest_framework import serializers

from .models import User, Message, Email


class SignUpSerializer(serializers.Serializer):
    email = serializers.EmailField(
        required=True,
        max_length=254
    )
    username = serializers.CharField(
        required=True,
        max_length=100
    )
    password = serializers.CharField(
        required=True,
        max_length=256
    )
    password_confirmation = serializers.CharField(
        required=True,
        max_length=256
    )
    first_name = serializers.CharField(
        required=True,
        max_length=100
    )
    last_name = serializers.CharField(
        required=True,
        max_length=100
    )

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirmation']:
            raise serializers.ValidationError({
                'password': [
                    'Passwords do not match'
                ]
            })
        email_serializer = EmailSerializer(data={
            'address': attrs['email']
        })
        if not email_serializer.is_valid():
            return serializers.ValidationError({
                'email': [
                    'Account with this email already exist'
                ]
            })
        user_serializer = UserSerializer(data=attrs)
        if not user_serializer.is_valid():
            return serializers.ValidationError({
                'username': [
                    'Account with this username already exist'
                ]
            })
        return attrs


class GetMessagesSerializer(serializers.Serializer):
    recipient_user_id = serializers.IntegerField(
        default=None,
        allow_null=True
    )
    offset = serializers.IntegerField(default=0)
    limit = serializers.IntegerField(
        default=100,
        min_value=100,
        max_value=1000
    )

    def validate(self, attrs):
        try:
            if attrs['recipient_user_id']:
                User.objects.get(pk=attrs['recipient_user_id'])
        except User.DoesNotExist:
            raise serializers.ValidationError({
                'recipient_user_id': [
                    'user does not exist'
                ]
            })
        return attrs


class SendMessageSerializer(serializers.Serializer):
    recipient_user_id = serializers.IntegerField(required=True)
    text = serializers.CharField(
        required=True,
        max_length=4096
    )

    def validate(self, attrs):
        try:
            User.objects.get(pk=attrs['recipient_user_id'])
        except User.DoesNotExist:
            raise serializers.ValidationError({
                'recipient_user_id': [
                    'user does not exist'
                ]
            })
        return attrs


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', )


class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = ('address', )


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
