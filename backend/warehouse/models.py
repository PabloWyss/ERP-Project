from django.db import models

from item.models import Item
from merchant.models import Merchant


class Warehouse(models.Model):
    STATUS_OPTIONS = [
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
    ]

    # id
    merchants = models.ManyToManyField(to=Merchant, related_name="warehouses")
    items = models.ManyToManyField(to=Item, blank=True, related_name="warehouses")
    name = models.CharField(max_length=50)
    contact = models.CharField(max_length=50, null=True, blank=True)
    address = models.CharField(max_length=50, null=True, blank=True)
    country_code = models.CharField(max_length=2, null=True, blank=True)
    phone = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(unique=True)
    status = models.CharField(choices=STATUS_OPTIONS, default="Active")
    is_standard = models.BooleanField(default=True)
    # inventory_ledgers (linked in inventory_ledger.models.py)

    def __str__(self):
        return f'{self.id} - Warehouse {self.name}'
