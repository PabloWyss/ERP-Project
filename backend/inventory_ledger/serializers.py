from rest_framework import serializers
from inventory_ledger.models import InventoryLedger
from item.serializers import ItemSerializer
from warehouse.serializers import WarehouseSerializer


class InventoryLedgerSerializer(serializers.ModelSerializer):
    warehouse = WarehouseSerializer(read_only=True)
    items = ItemSerializer(read_only=True)

    class Meta:
        model = InventoryLedger
        fields = '__all__'
