from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import Serializer
from capsulers.models import User
from django.contrib.auth import authenticate

class UserCreateSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserLoginSerializer(Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid credentials")


class SuccessSerializer(serializers.Serializer):
    status = serializers.CharField()
    message = serializers.CharField()