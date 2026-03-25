from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from capsulers.models import User

class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ['email', 'password']
