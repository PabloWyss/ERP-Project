from rest_framework.response import Response
from rest_framework.generics import ListAPIView, CreateAPIView

from inventory_ledger.models import InventoryLedger
from item.models import Item
from order.models import Order
from order.serializers import OrderSerializer, OrderCreateSerializer
from warehouse.models import WarehouseItemInventory, Warehouse


class ListOrderView(ListAPIView):
    """
    get:
    List all order of Merchant

    # subtitle
    Lists all the order of the Merchant
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Order.objects.filter(merchant_id=merchant.id)
        return queryset


class CreateOrderView(CreateAPIView):
    """
    post:
    Create a new warehouse

    # subtitle
    Create a new warehouse related to a merchant
    """

    serializer_class = OrderCreateSerializer
    queryset = Order.objects.all()

    def create(self, request, *args, **kwargs):
        merchant = request.user.merchant
        is_merchant_supplier = request.data['is_merchant_supplier']
        is_refund = request.data['is_refund']
        quantity_altered = request.data['quantity']
        warehouse = Warehouse.objects.filter(id=request.data['warehouse']).first()
        item = Item.objects.filter(id=request.data['items'][0]).first()
        response = {}

        try:
            warehouse_inventory = WarehouseItemInventory.objects.filter(warehouse=warehouse, item=item).get()
            current_stock_level = WarehouseItemInventory.objects.filter(
                item_id=request.data['items'][0],
                warehouse_id=request.data['warehouse']).get().stock_level_current
        except WarehouseItemInventory.DoesNotExist:
            WarehouseItemInventory.objects.create(warehouse=warehouse, item=item, stock_level_current=0)
            warehouse_inventory = WarehouseItemInventory.objects.filter(warehouse=warehouse, item=item).get()
            current_stock_level = 0

        def generate_order():
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(merchant=merchant)

        def generate_inventory_ledger(action, quantity):
            InventoryLedger.objects.create(warehouse=warehouse, event_type=action,
                                           stock_level_initial=current_stock_level,
                                           quantity_altered=quantity,
                                           stock_level_final=current_stock_level + quantity,
                                           item=item)

        def update_stock_levels(quantity):
            warehouse_inventory.stock_level_current = current_stock_level + quantity
            warehouse_inventory.save()

        def process_inbound_order(quantity):
            action = 'Inbound'
            generate_order()
            generate_inventory_ledger(action, quantity)
            update_stock_levels(quantity)
            response = {'status': 'Order successfully created and stock level in warehouse updated'}
            return response

        def process_outbound_order(quantity):
            quantity = quantity * -1
            if current_stock_level + quantity < 0:
                response = {'status': 'Not enough stock in warehouse'}
                return response
            else:
                action = 'Outbound'
                generate_order()
                generate_inventory_ledger(action, quantity)
                if current_stock_level + quantity == 0:
                    warehouse_inventory.delete()
                    response = {'status': 'Order successfully created and item removed from warehouse'}
                    return response
                else:
                    update_stock_levels(quantity)
                    response = {'status': 'Order successfully created and stock level in warehouse updated'}
                    return response

        if is_merchant_supplier:
            if is_refund:
                response = process_inbound_order(quantity_altered)
                return Response(response)
            else:
                response = process_outbound_order(quantity_altered)
                return Response(response)
        else:
            if is_refund:
                response = process_outbound_order(quantity_altered)
                return Response(response)
            else:
                response = process_inbound_order(quantity_altered)
                return Response(response)
