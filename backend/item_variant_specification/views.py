from django.db.models import Q
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from item.models import Item
from item.serializers import ItemSerializer
from item_variant_specification.models import ItemVariantSpecification
from item_variant_specification.serializers import ItemVariantSpecificationSerializer


class ListItemVariantView(ListAPIView):
    """
    get:
    List all items

    # subtitle
    Lists all the items of the merchant in alphabetical order of SKU number
    """
    queryset = ItemVariantSpecification.objects.all()
    serializer_class = ItemVariantSpecificationSerializer
    lookup_url_kwarg = 'item_id'


class CreateItemVariantView(CreateAPIView):
    """
    post:
    Create a new item

    # subtitle
    Create a new item
    """
    queryset = ItemVariantSpecification.objects.all()
    serializer_class = ItemVariantSpecificationSerializer

    def perform_create(self, serializer):
        serializer.save(item=self.request)


class SearchItemVariantView(ListAPIView):
    """
    get:
    Search for a specific item

    # subtitle
    Search for a specific item
    """
    serializer_class = ItemSerializer

    def get_queryset(self):
        # This view returns an item based on the url query param
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


class RetrieveUpdateDestroyItemVariantView(RetrieveUpdateDestroyAPIView):
    """
    t.b.d.
    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    lookup_url_kwarg = 'item_id'

