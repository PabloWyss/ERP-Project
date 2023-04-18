from django.db import models
from merchant.models import Merchant
from partner.models import Partner


class Item(models.Model):

    STATUS_OPTIONS = [
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
    ]

    # id
    merchant = models.ForeignKey(to=Merchant, on_delete=models.PROTECT, related_name="items")
    release_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(choices=STATUS_OPTIONS, default="Active")
    sku = models.CharField(unique=True, max_length=20)
    ean = models.CharField(blank=True, null=True, max_length=20)
    upc = models.CharField(blank=True, null=True, max_length=20)
    series = models.CharField(blank=True, null=True, max_length=20)
    amazon_asin = models.CharField(blank=True, null=True, max_length=20)
    amazon_fnsku = models.CharField(blank=True, null=True, max_length=20)
    name = models.CharField(unique=True, max_length=50)
    has_variants = models.BooleanField(default=False)
    partners = models.ManyToManyField(to=Partner, blank=True, related_name="items")
    # warehouse (linked in warehouse.models.py)
    # item_variant_specifications (linked in item_variant_specification.models.py)
    # item_model_specifications (linked in item_model_specification.models.py)
    # item_tags (linked in item_tag.models.py)

    def __str__(self):
        return f'{self.id} - Item name {self.name}'
