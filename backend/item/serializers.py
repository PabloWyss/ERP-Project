from rest_framework import serializers
from item.models import Item
from merchant.serializers import MerchantSerializer


class ItemSerializer(serializers.ModelSerializer):

    merchant = MerchantSerializer(read_only=True)

    class Meta:
        model = Item
        fields = '__all__'
