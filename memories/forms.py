from django import forms
from memories.models import Capsule


class CapsuleContentForm(forms.ModelForm):
    class Meta:
        model = Capsule
        fields = ['title','description','teasers', 'image', 'image_alt_text','video', 'video_alt_text', 'audio', 'audio_alt_text', 'private']
