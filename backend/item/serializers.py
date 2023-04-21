from rest_framework import serializers
from item.models import Item
from merchant.serializers import MerchantSerializer
from warehouse.models import WarehouseItemInventory
from item_specification.models import ItemSpecification


class CreateItemSerializer(serializers.ModelSerializer):

    merchant = MerchantSerializer(read_only=True)

    class Meta:
        model = Item
        fields = '__all__'


class ItemWarehouseInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = WarehouseItemInventory
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):

    merchant = MerchantSerializer(read_only=True)
    item_warehouse_inventory = ItemWarehouseInventorySerializer(source='warehouseiteminventory_set', many=True)
    stock_level_total_current = serializers.SerializerMethodField()
    stock_level_total_value_current = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = '__all__'

    def get_stock_level_total_current(self, obj):
        try:
            inventories = obj.warehouseiteminventory_set.filter(item=obj)
            stock_level_total_current = 0
            for inventory in inventories:
                stock_level_total_current += inventory.stock_level_current
            return stock_level_total_current
        except WarehouseItemInventory.DoesNotExist:
            pass

    def get_stock_level_total_value_current(self, obj):
        try:
            stock_level_total_current = self.get_stock_level_total_current(obj)
            purchase_price_net_eur = obj.item_specifications.latest('valid_from').purchase_price_net_eur
            if purchase_price_net_eur:
                stock_level_total_value_current = round(stock_level_total_current * purchase_price_net_eur, 2)
                return stock_level_total_value_current
            else:
                pass
        except ItemSpecification.DoesNotExist:
            pass


class UpdateItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        exclude = ('release_date', 'is_archived', 'archiving_date')
