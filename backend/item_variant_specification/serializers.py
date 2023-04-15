from rest_framework import serializers
from item_variant_specification.models import ItemVariantSpecification


class ItemVariantSpecificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = ItemVariantSpecification
        fields = '__all__'
