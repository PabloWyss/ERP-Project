from rest_framework import serializers
from item.serializers import ItemSerializer
from item_tag.models import ItemTag


class ItemTagSerializer(serializers.ModelSerializer):

    items = ItemSerializer(read_only=True, many=True)

    class Meta:
        model = ItemTag
        fields = '__all__'
