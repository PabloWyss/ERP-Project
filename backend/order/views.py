from django.db.models import Q
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, CreateAPIView
from inventory_ledger.models import InventoryLedger
from item.models import Item
from order.models import Order
from order.serializers import OrderSerializer, OrderCreateSerializer
from warehouse.models import WarehouseItemInventory, Warehouse


def search_by_search_string(self, queryset):
    search_value = self.request.query_params.get('search_string')
    if search_value is not None:
        queryset_filtered = queryset.filter(
            Q(items__sku__icontains=search_value) |
            Q(items__ean__icontains=search_value) |
            Q(items__upc__icontains=search_value) |
            Q(items__series__icontains=search_value) |
            Q(items__amazon_asin__icontains=search_value) |
            Q(items__amazon_fnsku__icontains=search_value) |
            Q(items__name__icontains=search_value) |
            Q(items__item_model_specifications__name__icontains=search_value) |
            Q(items__item_model_specifications__color__icontains=search_value) |
            Q(items__item_model_specifications__category__icontains=search_value) |
            Q(items__item_model_specifications__brand_name__icontains=search_value) |
            Q(items__item_model_specifications__brand_collection__icontains=search_value) |
            Q(items__item_model_specifications__name__icontains=search_value) |
            Q(merchant__name__icontains=search_value) |
            Q(partner__name__icontains=search_value) |
            Q(warehouse__name__icontains=search_value)
        )
    return queryset_filtered


class ListOrderView(ListAPIView):
    """
    get:
    List all orders

    # subtitle
    List all orders of the merchant in chronological order of order date
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Order.objects.filter(merchant_id=merchant.id).order_by('order_date')


class CreateOrderView(CreateAPIView):
    """
    post:
    Create a new order

    # subtitle
    Create a new order related to the merchant and update the other tables (inventory ledger, warehouse etc.)
    """

    serializer_class = OrderCreateSerializer

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


class SearchOrderView(ListAPIView):
    """
    get:
    Search for a specific order

    # subtitle
    Search for a specific order of the merchant
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Order.objects.filter(merchant__id=merchant.id)
        queryset_filtered = search_by_search_string(self, queryset)
        return queryset_filtered


class ListOrderSupplyView(ListAPIView):
    """
    get:
    List all supplies

    # subtitle
    List all supplies of the merchant in chronological order of order date
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Order.objects.filter(merchant__id=merchant.id)\
            .filter(is_merchant_supplier=True).order_by('order_date')


class SearchOrderSupplyView(ListAPIView):
    """
    get:
    Search for a specific supply

    # subtitle
    Search for a specific supply of the merchant
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Order.objects.filter(merchant__id=merchant.id).filter(is_merchant_supplier=True)
        queryset_filtered = search_by_search_string(self, queryset)
        return queryset_filtered


class ListOrderSupplySaleView(ListAPIView):
    """
    get:
    List all supplies (sale)

    # subtitle
    List all supplies (sale) of the merchant in chronological order of order date
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Order.objects.filter(merchant__id=merchant.id)\
            .filter(Q(is_merchant_supplier=True) & Q(is_refund=False)).order_by('order_date')


class SearchOrderSupplySaleView(ListAPIView):
    """
    get:
    Search for a specific supply (sale)

    # subtitle
    Search for a specific supply (sale) of the merchant
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Order.objects.filter(merchant__id=merchant.id)\
            .filter(Q(is_merchant_supplier=True) & Q(is_refund=False))
        queryset_filtered = search_by_search_string(self, queryset)
        return queryset_filtered


class ListOrderSupplyRefundView(ListAPIView):
    """
    get:
    List all supplies (refund)

    # subtitle
    List all supplies (refund) of the merchant in chronological order of order date
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Order.objects.filter(merchant__id=merchant.id)\
            .filter(Q(is_merchant_supplier=True) & Q(is_refund=True)).order_by('order_date')


class SearchOrderSupplyRefundView(ListAPIView):
    """
    get:
    Search for a specific supply (refund)

    # subtitle
    Search for a specific supply (refund) of the merchant
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Order.objects.filter(merchant__id=merchant.id)\
            .filter(Q(is_merchant_supplier=True) & Q(is_refund=True))
        queryset_filtered = search_by_search_string(self, queryset)
        return queryset_filtered


class ListOrderPurchaseView(ListAPIView):
    """
    get:
    List all purchases

    # subtitle
    List all the purchases of the merchant in chronological order of order date
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Order.objects.filter(merchant__id=merchant.id)\
            .filter(is_merchant_supplier=False).order_by('order_date')


class SearchOrderPurchaseView(ListAPIView):
    """
    get:
    Search for a specific purchase

    # subtitle
    Search for a specific purchase of the merchant
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Order.objects.filter(merchant__id=merchant.id).filter(is_merchant_supplier=False)
        queryset_filtered = search_by_search_string(self, queryset)
        return queryset_filtered


class ListOrderPurchaseSaleView(ListAPIView):
    """
    get:
    List all purchases (sale)

    # subtitle
    List all purchases (sale) of the merchant in chronological order of order date
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Order.objects.filter(merchant__id=merchant.id)\
            .filter(Q(is_merchant_supplier=False) & Q(is_refund=False)).order_by('order_date')


class SearchOrderPurchaseSaleView(ListAPIView):
    """
    get:
    Search for a specific purchase (sale)

    # subtitle
    Search for a specific purchase (sale) of the merchant
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Order.objects.filter(merchant__id=merchant.id)\
            .filter(Q(is_merchant_supplier=False) & Q(is_refund=False))
        queryset_filtered = search_by_search_string(self, queryset)
        return queryset_filtered


class ListOrderPurchaseRefundView(ListAPIView):
    """
    get:
    List all purchases (refund)

    # subtitle
    List all purchases (refund) of the merchant in chronological order of order date
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Order.objects.filter(merchant__id=merchant.id)\
            .filter(Q(is_merchant_supplier=False) & Q(is_refund=True)).order_by('order_date')


class SearchOrderPurchaseRefundView(ListAPIView):
    """
    get:
    Search for a specific purchase (refund)

    # subtitle
    Search for a specific purchase (refund) of the merchant
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Order.objects.filter(merchant__id=merchant.id)\
            .filter(Q(is_merchant_supplier=False) & Q(is_refund=True))
        queryset_filtered = search_by_search_string(self, queryset)
        return queryset_filtered
