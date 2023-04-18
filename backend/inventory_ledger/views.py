from django.db.models import Q
from rest_framework.generics import ListAPIView
from inventory_ledger.models import InventoryLedger
from inventory_ledger.serializers import InventoryLedgerSerializer


class ListInventoryLedgerPositionView(ListAPIView):
    """
    get:
    List all inventory ledger positions

    # subtitle
    List all inventory ledger positions in chronological order of event date
    """

    serializer_class = InventoryLedgerSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = InventoryLedger.objects.filter(merchant_id=merchant.id).order_by('event_date')
        return queryset


class SearchInventoryLedgerPositionView(ListAPIView):
    """
    get:
    Search for a specific inventory ledger position

    # subtitle
    Search for a specific inventory ledger position of the merchant
    """

    serializer_class = InventoryLedgerSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = InventoryLedger.objects.filter(item__merchant__id=merchant.id)
        search_value = self.request.query_params.get('search_string')
        if search_value is not None:
            queryset_filtered = queryset.filter(
                Q(item__sku__icontains=search_value) |
                Q(item__ean__icontains=search_value) |
                Q(item__upc__icontains=search_value) |
                Q(item__series__icontains=search_value) |
                Q(item__amazon_asin__icontains=search_value) |
                Q(item__amazon_fnsku__icontains=search_value) |
                Q(item__name__icontains=search_value) |
                Q(item__item_model_specifications__name__icontains=search_value) |
                Q(item__item_model_specifications__color__icontains=search_value) |
                Q(item__item_model_specifications__category__icontains=search_value) |
                Q(item__item_model_specifications__brand_name__icontains=search_value) |
                Q(item__item_model_specifications__brand_collection__icontains=search_value) |
                Q(item__item_model_specifications__name__icontains=search_value) |
                Q(item__merchant__name__icontains=search_value) |
                Q(item__partners__name__icontains=search_value) |
                Q(warehouse__name__icontains=search_value)
            )
        return queryset_filtered


class ListInventoryLedgerFilteredByItemView(ListAPIView):
    """
    get:
    List all inventory ledger positions filtered by the specific item

    # subtitle
    List all inventory ledger positions filtered by the specific item of the merchant in chronological order
    of event date
    """

    serializer_class = InventoryLedgerSerializer

    def get_queryset(self):
        item_id = self.kwargs.get('item_id')
        return InventoryLedger.objects.filter(item__id=item_id).order_by('event_date')


class ListInventoryLedgerFilteredByWarehouseView(ListAPIView):
    """
    get:
    List all inventory ledger positions filtered by the specific warehouse

    # subtitle
    List all inventory ledger positions filtered by the specific warehouse of the merchant in chronological order
    of event date
    """

    serializer_class = InventoryLedgerSerializer

    def get_queryset(self):
        warehouse_id = self.kwargs.get('warehouse_id')
        return InventoryLedger.objects.filter(warehouse__id=warehouse_id).order_by('event_date')
