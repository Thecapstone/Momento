from django.contrib import admin
from capsulers.models import User

# Register your models here.
@admin.register(User)
class CustomUserAdmin(admin.ModelAdmin):
    pass