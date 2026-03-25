from rest_framework import serializers
from memories.models import Capsule
from capsulers.models import User

class CapsuleCreationSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = Capsule
        fields = ['title','description', 'teasers', 'image', 'image_alt_text','video', 'video_alt_text', 'audio', 'audio_alt_text', 'private']


class CapsuleViewSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(source='get_url')
    members = serializers.SerializerMethodField()

    def get_url(self, capsule) -> str:
        return capsule.image.url
    
    def get_members(self, obj) -> str:
        return obj.members.count()
    class Meta:
        model = Capsule
        fields = ['title', 'id', 'members','description', 'teasers','url', 'created_at']
