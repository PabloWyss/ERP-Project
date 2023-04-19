from rest_framework import serializers
from item.serializers import ItemSerializer
from item_variant_specification.models import ItemVariantSpecification


class ItemVariantSpecificationSerializer(serializers.ModelSerializer):

    item = ItemSerializer(read_only=True)

    class Meta:
        model = ItemVariantSpecification
        fields = '__all__'


class UpdateItemVariantSpecificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = ItemVariantSpecification
        exclude = ('valid_from', 'valid_to')
