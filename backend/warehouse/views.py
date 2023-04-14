from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import BasePermission
from rest_framework.response import Response

from project.global_permissions import IsSameMerchant
from warehouse.models import Warehouse
from warehouse.serializers import WarehouseSerializer


class ListWarehouseView(ListAPIView):
    """
    get:
    List all warehouses

    # subtitle
    Lists all the warehouses of the Merchant
    """

    class IsSameMerchant(BasePermission):
        def has_object_permission(self, request, view, obj):
            return bool(obj.merchants.includes(request.user.merchant.id))

    serializer_class = WarehouseSerializer
    queryset = Warehouse.objects.all()
    permission_classes = [IsSameMerchant]


class CreateWarehouseView(CreateAPIView):
    """
    post:
    Create a new warehouse

    # subtitle
    Create a new warehouse related to a merchant
    """

    serializer_class = WarehouseSerializer
    queryset = Warehouse.objects.all()
    permission_classes = [IsSameMerchant]

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
            warehouse_id = Warehouse.objects.filter(name=warehouse_name).first().id
            merchant.warehouses.add(warehouse_id)
            return Response({'status': 'Warehouse Created'})


