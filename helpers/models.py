from django.db import models
import uuid

class UniqueUserId(models.Model):
    id=models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        help_text='unique id generator for anonymous usernames',
        editable=False,
        serialize=False,
        unique=True
    )
    created_at=models.DateTimeField(auto_now_add=True)
    visible=models.BooleanField(default=True)

    class Meta:
        abstract=True
    