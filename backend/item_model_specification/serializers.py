from rest_framework import serializers
from item.serializers import ItemSerializer
from item_image.serializers import ItemImageSerializer
from item_model_specification.models import ItemModelSpecification


class ItemModelSpecificationSerializer(serializers.ModelSerializer):

    items = ItemSerializer(read_only=True, many=True)
    images = ItemImageSerializer(read_only=True, many=True)

    class Meta:
        model = ItemModelSpecification
        fields = '__all__'
