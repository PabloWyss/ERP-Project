from django.core.validators import MinValueValidator
from django.db import models
from item.models import Item
from merchant.models import Merchant


class Warehouse(models.Model):

    STATUS_OPTIONS = [
        ('Active', 'Active'),
        ('To shut down', 'To shut down'),
    ]

    # id
    creation_date = models.DateTimeField(auto_now_add=True)
    is_archived = models.BooleanFieldField(default=False)
    archiving_date = models.DateTimeField(blank=True, null=True)
    merchants = models.ManyToManyField(to=Merchant, related_name="warehouses")
    items = models.ManyToManyField(to=Item, through='WarehouseItemInventory', related_name="warehouses")
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


class WarehouseItemInventory(models.Model):

    # id
    warehouse = models.ForeignKey(to=Warehouse, on_delete=models.PROTECT)
    item = models.ForeignKey(to=Item, on_delete=models.PROTECT)
    stock_level_current = models.IntegerField(validators=[MinValueValidator(0)], blank=True, null=True)
