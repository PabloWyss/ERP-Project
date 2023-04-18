from django.db import models


class Partner(models.Model):
    # id
    # items (linked in item.models.py)
    name = models.CharField(max_length=50)
    contact = models.CharField(max_length=50, null=True, blank=True)
    address = models.CharField(max_length=50, null=True, blank=True)
    country_code = models.CharField(max_length=2, null=True, blank=True)
    phone = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField()
    # orders (linked in order.models.py)

    def __str__(self):
        return f'{self.id} - Review {self.name}'
