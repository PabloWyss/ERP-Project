from rest_framework import serializers
from item.serializers import ItemSerializer
from item_specification.models import ItemSpecification


class ItemSpecificationSerializer(serializers.ModelSerializer):

    item = ItemSerializer(read_only=True)

    class Meta:
        model = ItemSpecification
        fields = '__all__'


class UpdateItemSpecificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = ItemSpecification
        exclude = ('valid_from', 'valid_to')
