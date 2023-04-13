from django.db import models
from partner.models import Partner


def merchant_directory_path(instance, filename):
    return f"merchants/{instance.id}/{filename}"


class Merchant(models.Model):

    name = models.CharField(max_length=50)
    address = models.CharField(max_length=50, null=True, blank=True)
    country_code = models.CharField(max_length=2, null=True, blank=True)
    phone = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(unique=True)
    profile_picture = models.ImageField(upload_to=merchant_directory_path, null=True, blank=True)
    # items (linked in item.models.py)
    partners = models.ManyToManyField(to=Partner, blank=True, related_name="merchants")
    # orders (linked in order.models.py)

    def __str__(self):
        return self.name
