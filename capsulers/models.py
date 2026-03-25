from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import UserManager
from django.utils.translation import gettext_lazy as _

# Create your models here.


class User(AbstractUser):
    username = None
    #username = models.CharField(_("Username"), unique=True)
    first_name = None
    last_name = None
    email = models.EmailField(_("email address"), unique=True)
    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField(_("last login"), blank=True, null=True)
    is_premium = models.BooleanField(default=False)
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    def get_absolute_url(self) -> str:
        """Get URL for user's detail view.

        Returns:
            str: URL for user detail.

        """
        return reverse("users:detail", kwargs={"pk": self.id})
    
   
    objects = UserManager()
    
    





class Profile(models.Model):
    name = models.CharField(max_length=100)
    avatar = models.ImageField()
    email = models.EmailField(unique=True)


class Contributors(models.Model):
    members = models.ForeignKey('capsulers.User', on_delete=models.CASCADE, related_name='contributor')
    capsules = models.ManyToManyField('memories.Capsule', related_name='memories_contributed')
