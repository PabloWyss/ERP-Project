from django.contrib.auth.models import AbstractUser
from django.db import models

from merchant.models import Merchant


def user_directory_path(instance, filename):
    return f"users/{instance.id}/{filename}"


class User(AbstractUser):

    # Field used for authentication
    USERNAME_FIELD = 'email'

    # Additional fields required when using createsuperuser (USERNAME_FIELD and passwords are always required)
    REQUIRED_FIELDS = ['username']

    # id
    # username
    # registration (linked in registration.models.py)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(unique=True)
    profile_picture = models.ImageField(upload_to=user_directory_path, null=True, blank=True)
    merchant = models.OneToOneField(to=Merchant, on_delete=models.PROTECT, related_name='user')

    def __str__(self):
        return self.usename
