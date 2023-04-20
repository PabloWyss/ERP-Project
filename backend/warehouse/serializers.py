from rest_framework.response import Response
from rest_framework import serializers
from warehouse.models import WarehouseItemInventory
from item.serializers import ItemSerializer
from merchant.serializers import MerchantSerializer
from warehouse.models import Warehouse


class WarehouseItemInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = WarehouseItemInventory
        fields = '__all__'


class WarehouseSerializer(serializers.ModelSerializer):

    merchants = MerchantSerializer(read_only=True, many=True)
    items = ItemSerializer(read_only=True, many=True)
    warehouse_item_inventory = WarehouseItemInventorySerializer(source='warehouseiteminventory_set', many=True)
    stock_level_total_current = serializers.SerializerMethodField()
    stock_level_total_value_current = serializers.SerializerMethodField()

    class Meta:
        model = Warehouse
        fields = '__all__'

    def get_stock_level_total_current(self, obj):
        try:
            inventories = obj.warehouseiteminventory_set.filter(warehouse=obj)
            stock_level_total_current = 0
            for inventory in inventories:
                stock_level_total_current += inventory.stock_level_current
            return stock_level_total_current
        except WarehouseItemInventory.DoesNotExist:
            pass

    def get_stock_level_total_value_current(self, obj):
        try:
            inventories = obj.warehouseiteminventory_set.filter(warehouse=obj)
            stock_level_total_value_current = 0
            for inventory in inventories:
                stock_level_current = inventory.stock_level_current
                purchase_price_net_eur = inventory.item.item_specifications.latest('valid_from').purchase_price_net_eur
                if purchase_price_net_eur:
                    stock_level_value_current = round(stock_level_current * purchase_price_net_eur, 2)
                    stock_level_total_value_current += stock_level_value_current
                    return stock_level_total_value_current
                else:
                    return Response('Information missing')
            else:
                pass
        except WarehouseItemInventory.DoesNotExist:
            pass
