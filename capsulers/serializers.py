from rest_framework import serializers
from capsulers.models import User

class UserCreateSerializer(serializers.ModelSerializer):
    models = User
    fields = ['email', 'password', 'password(again)']

class UserLoginSerializer(serializers.ModelSerializer):
    models = User
    fields = ['email', 'password']
