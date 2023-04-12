from django.db import models
from item.models import Item


class ItemModelSpecification(models.Model):
    COLORS = [
        ('Beige', 'Beige'),
        ('Black', 'Black'),
        ('Blue', 'Blue'),
        ('Brown', 'Brown'),
        ('Green', 'Green'),
        ('Red', 'Red'),
        ('Yellow', 'Yellow'),
        ('White', 'White'),
    ]

    CONDITIONS = [
        ('New', 'New'),
        ('Used', 'Used'),
    ]

    CATEGORIES = [
        ('Shoes', 'Shoes'),
        ('Apparel', 'Apparel'),
    ]

    # id
    items = models.ManyToManyField(to=Item, blank=True, related_name="item_model_specifications")
    name = models.CharField(max_length=50)
    color = models.CharField(choices=COLORS, max_length=50)
    valid_from = models.DateTimeField()
    valid_to = models.DateTimeField()
    condition = models.CharField(choices=CONDITIONS, default="New")
    category = models.CharField(choices=CATEGORIES, default="Shoes")
    brand_name = models.CharField(max_length=50)
    brand_collection = models.CharField(max_length=50)
    description_long = models.CharField(max_length=1000)
    description_short = models.CharField(max_length=150)
    style = models.CharField(max_length=50)
    care_instructions = models.CharField(max_length=150)
    # images (linked in item_image.models.py)

    def __str__(self):
        return f'{self.id} - Item Model Specifications Name {self.name}'
