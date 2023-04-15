from rest_framework.response import Response
from rest_framework.generics import ListAPIView, CreateAPIView

from inventory_ledger.models import InventoryLedger
from item.models import Item
from order.models import Order
from order.serializers import OrderSerializer, OrderCreateSerializer
from warehouse.models import WarehouseItemInventory, Warehouse
from warehouse.serializers import WarehouseSerializer


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
        merchant_is_supplier = request.data['merchant_is_supplier']
        is_refund = request.data['is_refund']
        quantity_altered = request.data['quantity']
        warehouse_instance = Warehouse.objects.filter(id=request.data['warehouse']).first()
        item_instance = Item.objects.filter(id=request.data['items'][0]).first()
        try:
            warehouse_inventory_instance = WarehouseItemInventory.objects.filter(warehouse=warehouse_instance,
                                                                                 item=item_instance).get()
            current_stock_level = WarehouseItemInventory.objects.filter(
                item_id=request.data['items'][0],
                warehouse_id=request.data['warehouse']).get().stock_level_current
        except:
            if is_refund and merchant_is_supplier:
                WarehouseItemInventory.objects.create(warehouse=warehouse_instance, item=item_instance,
                                                      stock_level_current=0)
                warehouse_inventory_instance = WarehouseItemInventory.objects.filter(warehouse=warehouse_instance,
                                                                                     item=item_instance).get()
                current_stock_level = 0
            else:
                return Response({'status': 'The warehouse does not have this item'})

        def generate_order():
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(merchant=merchant)

        def generate_inventory_ledger(action, quantity):
            InventoryLedger.objects.create(warehouse=warehouse_instance, event_type=action,
                                           stock_level_initial=current_stock_level,
                                           quantity_altered=quantity,
                                           stock_level_final=current_stock_level + quantity,
                                           item=item_instance)

        def update_stock_levels(quantity):
            warehouse_inventory_instance.stock_level_current = current_stock_level + quantity
            warehouse_inventory_instance.save()
            return Response({'status': 'Stock level updated'})

        if merchant_is_supplier:
            if is_refund:
                action = 'Inbound'
                generate_order()
                generate_inventory_ledger(action, quantity_altered)
                update_stock_levels(quantity_altered)
            else:
                quantity_altered = quantity_altered * -1
                if current_stock_level + quantity_altered < 0:
                    return Response({'status': 'Not enough stock in warehouse'})
                else:
                    action = 'Outbound'
                    generate_order()
                    generate_inventory_ledger(action, quantity_altered)
                    if current_stock_level + quantity_altered == 0:
                        warehouse_inventory_instance.delete()
                        return Response({'status': 'Item removed from warehouse'})
                    else:
                        update_stock_levels(quantity_altered)
        else:
            if is_refund:
                quantity_altered = quantity_altered * -1
                if current_stock_level + quantity_altered < 0:
                    return Response({'status': 'Not enough stock in warehouse'})
                else:
                    action = 'Outbound'
                    generate_order()
                    generate_inventory_ledger(action, quantity_altered)
                    if current_stock_level + quantity_altered == 0:
                        warehouse_inventory_instance.delete()
                        return Response({'status': 'Item removed from warehouse'})
                    else:
                        update_stock_levels(quantity_altered)
            else:
                action = 'Inbound'
                generate_order()
                generate_inventory_ledger(action, quantity_altered)
                update_stock_levels(quantity_altered)
        return Response({'status': 'Order successfully created'})
