from django.db.models import Q
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

from inventory_ledger.models import InventoryLedger
from item.models import Item
from warehouse.models import Warehouse, WarehouseItemInventory
from warehouse.serializers import WarehouseSerializer


class ListWarehouseView(ListAPIView):
    """
    get:
    List all warehouses

    # subtitle
    Lists all the warehouses of the Merchant
    """

    serializer_class = WarehouseSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        partners = Warehouse.objects.filter(merchants__id=merchant.id)
        return partners


class CreateWarehouseView(CreateAPIView):
    """
    post:
    Create a new warehouse

    # subtitle
    Create a new warehouse related to a merchant
    """

    serializer_class = WarehouseSerializer
    queryset = Warehouse.objects.all()

    def post(self, request):
        merchant = request.user.merchant
        warehouse_name = request.data['name']
        warehouse_exists = merchant.warehouses.filter(name=warehouse_name).exists()
        if warehouse_exists:
            return Response({'status': 'Warehouse Already Existed'})
        else:
            serializer = self.get_serializer(data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            merchant.warehouses.add(serializer.data['id'])
            return Response({'status': 'Warehouse Created'})


class InboundItemToWarehouseView(UpdateAPIView):
    serializer_class = WarehouseSerializer
    lookup_url_kwarg = 'warehouse_id'

    def update(self, request, *args, **kwargs):
        warehouse = Warehouse.objects.filter(
            Q(merchants__id=request.user.merchant.id) & Q(id=self.kwargs['warehouse_id'])).first()
        exist_item_in_warehouse = warehouse.items.filter(id=self.request.data['item_id']).exists()
        item = Item.objects.filter(id=self.request.data['item_id']).first()
        if exist_item_in_warehouse:
            quantity_altered = self.request.data['quantity']
            if quantity_altered > 0:
                action = 'Inbound'
            else:
                action = 'Outbound'
            current_stock_level = WarehouseItemInventory.objects.filter(
                item_id=self.request.data['item_id'],
                warehouse_id=self.kwargs['warehouse_id']).get().stock_level_current
            if current_stock_level + quantity_altered < 0:
                return Response({'status': 'Not enough stock in warehouse'})
            else:
                InventoryLedger.objects.create(warehouse=warehouse, event_type=action,
                                               stock_level_initial=current_stock_level,
                                               quantity_altered=self.request.data['quantity'],
                                               stock_level_final=current_stock_level + self.request.data['quantity'],
                                               item=item)

                warehouse_inventory_instance = WarehouseItemInventory.objects.filter(warehouse=warehouse,
                                                                                     item=item).get()
                if current_stock_level + quantity_altered == 0:
                    warehouse_inventory_instance.delete()
                    return Response({'status': 'Item removed from warehouse'})
                else:
                    warehouse_inventory_instance.stock_level_current = current_stock_level + self.request.data[
                        'quantity']
                    warehouse_inventory_instance.save()
                    return Response({'status': 'Stock level updated'})
        else:
            WarehouseItemInventory.objects.create(warehouse=warehouse, item=item,
                                                  stock_level_current=self.request.data['quantity'])
            InventoryLedger.objects.create(warehouse=warehouse, event_type='Inbound', stock_level_initial=0,
                                           quantity_altered=self.request.data['quantity'],
                                           stock_level_final=self.request.data['quantity'], item=item)
            return Response({'status': 'Item added to Warehouse'})


class AssignManyItemToWarehouseView(UpdateAPIView):
    serializer_class = WarehouseSerializer
    lookup_url_kwarg = 'warehouse_id'

    def update(self, request, *args, **kwargs):
        warehouse = Warehouse.objects.filter(merchants__id=self.kwargs['warehouse_id']).first()
        items = self.request.data['item_ids']
        for item in items:
            exist_item_in_warehouse = warehouse.items.filter(id=item).exists()
            if not exist_item_in_warehouse:
                warehouse.items.add(item)
        return Response({'status': 'Items added to Warehouse'})


class SearchWarehouseView(ListAPIView):
    """
    get:
    Search for Warehouse

    # subtitle
    Searches for Warehouses users of Merchant
    """
    serializer_class = WarehouseSerializer

    def get_queryset(self):
        # This view returns an item based on the url query param
        merchant = self.request.user.merchant
        queryset = Warehouse.objects.filter(merchants__id=merchant.id)
        search_value = self.request.query_params.get('search_string')
        if search_value is not None:
            queryset = queryset.filter(
                Q(name__icontains=search_value)
            )
        return queryset


class RetrieveUpdateDestroyWarehouseView(RetrieveUpdateDestroyAPIView):
    serializer_class = WarehouseSerializer
    lookup_url_kwarg = 'warehouse_id'

    def get_queryset(self):
        merchant = self.request.user.merchant
        partners = Warehouse.objects.filter(merchants__id=merchant.id)
        return partners
