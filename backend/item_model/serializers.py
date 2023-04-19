from rest_framework import serializers
from item_model.models import ItemModel
from merchant.serializers import MerchantSerializer


class ItemModelSerializer(serializers.ModelSerializer):

    merchant = MerchantSerializer(read_only=True)

    class Meta:
        model = ItemModel
        fields = '__all__'


class UpdateItemModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = ItemModel
        exclude = ('release_date', 'is_archived', 'archiving_date')
