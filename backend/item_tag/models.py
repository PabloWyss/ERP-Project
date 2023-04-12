from django.db import models
from item.models import Item


class ItemTag(models.Model):

    # id
    items = models.ManyToManyField(to=Item, blank=True, related_name="item_tags")
    tag_name = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.id} - Item Tag {self.tag_name}'
