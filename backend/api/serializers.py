from rest_framework import serializers

from .models import User, Message


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
    first_name = serializers.CharField(
        required=True,
        max_length=100
    )
    last_name = serializers.CharField(
        required=True,
        max_length=100
    )


class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
