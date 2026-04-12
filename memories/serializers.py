from rest_framework import serializers
from memories.models import Capsule
from capsulers.models import User

class CapsuleCreationSerializer(serializers.ModelSerializer):
    creator = serializers.SerializerMethodField

    def get_creator(self, obj) -> int:
        return obj.creator.id

    
    class Meta:
        model = Capsule
        fields = ['title', 'creator','description', 'teasers', 'image', 'image_alt_text','video', 'video_alt_text', 'audio', 'audio_alt_text', 'private']


class CapsuleViewSerializer(serializers.ModelSerializer):
    members = serializers.SerializerMethodField()

    
    def get_members(self, obj) -> str:
        return obj.members.count()
    
    class Meta:
        model = Capsule
        fields = ['title', 'id', 'members','description', 'teasers','url', 'created_at']
