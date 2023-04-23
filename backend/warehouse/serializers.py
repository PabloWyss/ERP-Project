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

    class Meta:
        model = Warehouse
        fields = '__all__'


"""
    stock_level_total_current = serializers.SerializerMethodField()
    stock_level_total_purchase_value_current = serializers.SerializerMethodField()
    stock_level_total_sale_value_current = serializers.SerializerMethodField()
    error_item_not_assigned_item_specifications = serializers.SerializerMethodField()
    error_item_not_assigned_purchase_price_net_eur = serializers.SerializerMethodField()
    error_item_not_assigned_sale_price_net_eur = serializers.SerializerMethodField()

    def get_stock_level_total_current(self, obj):
        try:
            inventories = obj.warehouseiteminventory_set.filter(warehouse=obj)
            stock_level_total_current = 0
            for inventory in inventories:
                stock_level_total_current += inventory.stock_level_current
            return stock_level_total_current
        except WarehouseItemInventory.DoesNotExist:
            pass

    def get_stock_level_total_purchase_value_current(self, obj):
        try:
            inventories = obj.warehouseiteminventory_set.filter(warehouse=obj)
            stock_level_total_purchase_value_current = 0
            for inventory in inventories:
                stock_level_current = inventory.stock_level_current
                try:
                    purchase_price_net_eur = inventory.item.item_specifications.latest('valid_from')\
                        .purchase_price_net_eur
                    if purchase_price_net_eur is None:
                        purchase_price_net_eur = 0
                    stock_level_purchase_value_current = round(stock_level_current * purchase_price_net_eur, 2)
                except ItemSpecification.DoesNotExist:
                    stock_level_purchase_value_current = 0
                stock_level_total_purchase_value_current += stock_level_purchase_value_current
            return stock_level_total_purchase_value_current
        except WarehouseItemInventory.DoesNotExist:
            pass

    def get_stock_level_total_sale_value_current(self, obj):
        try:
            inventories = obj.warehouseiteminventory_set.filter(warehouse=obj)
            stock_level_total_sale_value_current = 0
            for inventory in inventories:
                stock_level_current = inventory.stock_level_current
                try:
                    sale_price_net_eur = inventory.item.item_specifications.latest('valid_from')\
                        .sale_price_net_eur
                    if sale_price_net_eur is None:
                        sale_price_net_eur = 0
                    stock_level_sale_value_current = round(stock_level_current * sale_price_net_eur, 2)
                except ItemSpecification.DoesNotExist:
                    stock_level_sale_value_current = 0
                stock_level_total_sale_value_current += stock_level_sale_value_current
            return stock_level_total_sale_value_current
        except WarehouseItemInventory.DoesNotExist:
            pass

    def get_error_item_not_assigned_item_specifications(self, obj):
        try:
            inventories = obj.warehouseiteminventory_set.filter(warehouse=obj)
            for inventory in inventories:
                try:
                    item_specifications = inventory.item.item_specifications.latest('valid_from')
                    print(item_specifications)
                    error_item_not_assigned_item_specifications = False
                except ItemSpecification.DoesNotExist:
                    error_item_not_assigned_item_specifications = True
            return error_item_not_assigned_item_specifications
        except WarehouseItemInventory.DoesNotExist:
            pass

    def get_error_item_not_assigned_purchase_price_net_eur(self, obj):
        try:
            inventories = obj.warehouseiteminventory_set.filter(warehouse=obj)
            for inventory in inventories:
                try:
                    purchase_price_net_eur = inventory.item.item_specifications.latest('valid_from')\
                        .purchase_price_net_eur
                    if purchase_price_net_eur is None:
                        error_assignment_purchase_price_net_eur = True
                    else:
                        error_assignment_purchase_price_net_eur = False
                except ItemSpecification.DoesNotExist:
                    pass
            return error_assignment_purchase_price_net_eur
        except WarehouseItemInventory.DoesNotExist:
            pass

    def get_error_item_not_assigned_sale_price_net_eur(self, obj):
        try:
            inventories = obj.warehouseiteminventory_set.filter(warehouse=obj)
            for inventory in inventories:
                try:
                    sale_price_net_eur = inventory.item.item_specifications.latest('valid_from')\
                        .sale_price_net_eur
                    if sale_price_net_eur is None:
                        error_assignment_sale_price_net = True
                    else:
                        error_assignment_sale_price_net = False
                except ItemSpecification.DoesNotExist:
                    pass
            return error_assignment_sale_price_net
        except WarehouseItemInventory.DoesNotExist:
            pass
"""
