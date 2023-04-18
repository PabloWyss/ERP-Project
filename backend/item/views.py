from django.db.models import Q
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from item.models import Item
from item.serializers import ItemSerializer


class ListItemView(ListAPIView):
    """
    get:
    List all items

    # subtitle
    Lists all items of the merchant in alphabetical order of SKU number
    """

    serializer_class = ItemSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Item.objects.filter(merchant_id=merchant.id).order_by('sku')


class CreateItemView(CreateAPIView):
    """
    post:
    Create a new item

    # subtitle
    Create a new item related to the merchant
    """

    serializer_class = ItemSerializer

    def perform_create(self, serializer):
        serializer.save(merchant=self.request.user.merchant)


class SearchItemView(ListAPIView):
    """
    get:
    Search for a specific item

    # subtitle
    Search for a specific item of the merchant
    """

    serializer_class = ItemSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Item.objects.filter(merchant__id=merchant.id)
        search_value = self.request.query_params.get('search_string')
        if search_value is not None:
            queryset_filtered = queryset.filter(
                Q(sku__icontains=search_value) |
                Q(ean__icontains=search_value) |
                Q(upc__icontains=search_value) |
                Q(series__icontains=search_value) |
                Q(amazon_asin__icontains=search_value) |
                Q(amazon_fnsku__icontains=search_value) |
                Q(name__icontains=search_value)
            )
        return queryset_filtered


class RetrieveUpdateDestroyItemView(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve a specific item

    patch:
    Update a specific item

    # subtitle
    Retrieve and update a specific item of the merchant
    """

    serializer_class = ItemSerializer
    lookup_url_kwarg = 'item_id'

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Item.objects.filter(merchant__id=merchant.id)
