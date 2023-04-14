from django.db.models import Q
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from warehouse.models import Warehouse
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

class AssignOneItemToWarehouseView(UpdateAPIView):
    serializer_class = WarehouseSerializer
    lookup_url_kwarg = 'warehouse_id'

    def update(self, request, *args, **kwargs):
        warehouse = Warehouse.objects.filter(merchants__id=self.kwargs['warehouse_id']).first()
        exist_item_in_warehouse = warehouse.items.filter(id=self.request.data['item_id']).exists()
        if exist_item_in_warehouse:
            return Response({'status': 'Item already in Warehouse'})
        else:
            warehouse.items.add(self.request.data['item_id'])
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
