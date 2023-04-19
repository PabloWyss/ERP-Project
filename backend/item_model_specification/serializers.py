from rest_framework import serializers
from item_model.serializers import ItemModelSerializer
from item_model_specification.models import ItemModelSpecification


class ItemModelSpecificationSerializer(serializers.ModelSerializer):

    item_model = ItemModelSerializer(read_only=True)

    class Meta:
        model = ItemModelSpecification
        fields = '__all__'


class UpdateItemModelSpecificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = ItemModelSpecification
        exclude = ('valid_from', 'valid_to')
