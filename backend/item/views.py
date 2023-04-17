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

    queryset = Item.objects.all().order_by('sku')
    serializer_class = ItemSerializer


class CreateItemView(CreateAPIView):
    """
    post:
    Create a new item

    # subtitle
    Create a new item related to the merchant
    """

    queryset = Item.objects.all()
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
        queryset = Item.objects.all()
        search_value = self.request.query_params.get('search_string')
        if search_value is not None:
            queryset = queryset.filter(
                Q(sku__icontains=search_value) |
                Q(ean__icontains=search_value) |
                Q(upc__icontains=search_value) |
                Q(series__icontains=search_value) |
                Q(amazon_asin__icontains=search_value) |
                Q(amazon_fnsku__icontains=search_value) |
                Q(name__icontains=search_value)
            )
        return queryset


class RetrieveUpdateDestroyItemView(RetrieveUpdateDestroyAPIView):
    """
    patch:
    Retrieve and update a specific item

    # subtitle
    Retrieve and update a specific item of the merchant
    """

    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    lookup_url_kwarg = 'item_id'
