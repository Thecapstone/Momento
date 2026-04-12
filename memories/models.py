from django import forms
from django.db import models
from typing import TYPE_CHECKING

class Capsule(models.Model):
    title = models.CharField(max_length=224)
    creator = models.ForeignKey('capsulers.User', on_delete=models.CASCADE, related_name='created_capsules')
    teasers = models.FileField(upload_to='teasers/', null=True, blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    image_alt_text = models.CharField(max_length=220, null=True, blank=True)
    video = models.FileField(upload_to='videos/', null=True, blank=True)
    video_alt_text = models.CharField(max_length=220, null=True, blank=True)
    audio = models.FileField(upload_to='audio/', null=True, blank=True)
    audio_alt_text = models.CharField(max_length=220, null=True, blank=True)
    description = models.CharField(null=True, blank=True)
    members = models.ManyToManyField('capsulers.User', related_name='joined_capsules', blank=True)
    private = models.BooleanField(default=True)
   

    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def is_private(self):
        if self.private:
            return True
        return False

    def __repr__(self):
        return f"{self.title} is a private: {self.is_private}, capsule"  



class WaitList(models.Model):
    inviter = models.ForeignKey('memories.Capsule', on_delete=models.CASCADE, related_name='invites')
    recipient = models.ForeignKey('capsulers.User', on_delete=models.CASCADE, related_name='on_waitlist')