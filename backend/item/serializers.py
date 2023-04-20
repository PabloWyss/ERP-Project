from rest_framework import serializers
from item.models import Item
from merchant.serializers import MerchantSerializer
from warehouse.models import WarehouseItemInventory


class ItemWarehouseInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = WarehouseItemInventory
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):

    merchant = MerchantSerializer(read_only=True)
    item_warehouse_inventory = ItemWarehouseInventorySerializer(source='warehouseiteminventory_set', many=True)

    class Meta:
        model = Item
        fields = '__all__'


class UpdateItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        exclude = ('release_date', 'is_archived', 'archiving_date')
