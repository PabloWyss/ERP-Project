from rest_framework import serializers

from item.serializers import ItemSerializer
from merchant.serializers import MerchantSerializer
from warehouse.models import Warehouse


class WarehouseSerializer(serializers.ModelSerializer):
    merchants = MerchantSerializer(read_only=True, many=True)
    items = ItemSerializer(read_only=True, many=True)
    class Meta:
        model = Warehouse
        fields = '__all__'