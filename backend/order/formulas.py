from rest_framework.response import Response
from item.models import Item
from inventory_ledger.models import InventoryLedger
from warehouse.models import Warehouse, WarehouseItemInventory


def get_warehouse_inventory(item, warehouse):
    try:
        warehouse_inventory = WarehouseItemInventory.objects.filter(item=item, warehouse=warehouse).get()
        return warehouse_inventory
    except WarehouseItemInventory.DoesNotExist:
        pass


def get_stock_level_current(warehouse_inventory):
    if warehouse_inventory:
        stock_level_current = warehouse_inventory.stock_level_current
    else:
        stock_level_current = 0
    return stock_level_current


def assign_item_to_warehouse(item, warehouse, quantity):
    WarehouseItemInventory.objects.create(item=item, warehouse=warehouse, stock_level_current=quantity)


def update_stock_level(item, warehouse, quantity):
    warehouse_inventory = get_warehouse_inventory(item, warehouse)
    stock_level_current = get_stock_level_current(warehouse_inventory)
    if warehouse_inventory:
        if stock_level_current + quantity == 0:
            warehouse_inventory.delete()
        else:
            warehouse_inventory.stock_level_current = stock_level_current + quantity
            warehouse_inventory.save()
    else:
        assign_item_to_warehouse(item, warehouse, quantity)


def post_inventory_ledger(item, warehouse, action, quantity):
    current_stock_level = get_stock_level_current(get_warehouse_inventory(item, warehouse))
    InventoryLedger.objects.create(item=item,
                                   warehouse=warehouse,
                                   event_type=action,
                                   stock_level_initial=current_stock_level,
                                   quantity_altered=quantity,
                                   stock_level_final=current_stock_level + quantity)


def post_order(self, request, merchant, value_total):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(merchant=merchant, value_total=value_total)


def process_order_inbound(self, request, merchant, item, warehouse, quantity):
    action = 'Inbound'
    post_order(self, request, merchant)
    post_inventory_ledger(item, warehouse, action, quantity)
    update_stock_level(item, warehouse, quantity)
    return {'status': 'Order created and stock level in warehouse updated successfully'}


def process_order_outbound(self, request, merchant, item, warehouse, quantity):
    quantity = quantity * -1
    warehouse_inventory = get_warehouse_inventory(item, warehouse)
    current_stock_level = get_stock_level_current(warehouse_inventory)
    if current_stock_level + quantity < 0:
        return {'status': 'Not enough stock in warehouse'}
    else:
        action = 'Outbound'
        post_order(self, request, merchant)
        post_inventory_ledger(item, warehouse, action, quantity)
        update_stock_level(item, warehouse, quantity)
        return {'status': 'Order created and stock level in warehouse updated successfully'}


def create_order(self, request):

    merchant = request.user.merchant
    item = Item.objects.filter(id=request.data['items'][0]).first()
    warehouse = Warehouse.objects.filter(id=request.data['warehouse']).first()
    quantity = request.data['quantity']
    is_merchant_supplier = request.data['is_merchant_supplier']
    is_refund = request.data['is_refund']

    if is_merchant_supplier:
        if is_refund:
            response = process_order_inbound(self, request, merchant, item, warehouse, quantity)
            return Response(response)
        else:
            response = process_order_outbound(self, request, merchant, item, warehouse, quantity)
            return Response(response)
    else:
        if is_refund:
            response = process_order_outbound(self, request, merchant, item, warehouse, quantity)
            return Response(response)
        else:
            response = process_order_inbound(self, request, merchant, item, warehouse, quantity)
            return Response(response)
