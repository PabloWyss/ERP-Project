from django.db import models
from django.contrib.auth import get_user_model

from item.models import Item
from merchant.models import Merchant
from partner.models import Partner
from warehouse.models import Warehouse

User = get_user_model()


class Order(models.Model):
    # id
    order_date = models.DateTimeField(auto_now_add=True)
    is_refund = models.BooleanField(default=False)
    items = models.ManyToManyField(to=Item, blank=True, related_name="orders")
    quantity = models.IntegerField()
    merchant_is_supplier = models.BooleanField(default=True)
    merchant = models.ForeignKey(to=Merchant, on_delete=models.PROTECT, related_name="orders")
    partner = models.ForeignKey(to=Partner, on_delete=models.PROTECT, related_name="orders")
    warehouse = models.ForeignKey(to=Warehouse, on_delete=models.PROTECT, related_name="orders")

    def __str__(self):
        return f'{self.id} - Date {self.order_date}'
