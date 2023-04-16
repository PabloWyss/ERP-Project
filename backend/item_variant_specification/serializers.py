from rest_framework import serializers
from item.serializers import ItemSerializer
from item_variant_specification.models import ItemVariantSpecification


class ItemVariantSpecificationSerializer(serializers.ModelSerializer):
    item = ItemSerializer(read_only=True)

    class Meta:
        model = ItemVariantSpecification
        fields = '__all__'
