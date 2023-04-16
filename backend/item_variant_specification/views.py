from rest_framework.generics import ListAPIView, CreateAPIView
from item_variant_specification.models import ItemVariantSpecification
from item_variant_specification.serializers import ItemVariantSpecificationSerializer
from item.models import Item


class ListItemVariantView(ListAPIView):
    """
    get:
    List all item variant specifications for an item

    # subtitle
    List all item variant specifications for an item in date time order of valid_from
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
    queryset = Item.objects.all()
    serializer_class = ItemVariantSpecificationSerializer

    def perform_create(self, serializer):
        item = Item.objects.get(pk=self.kwargs.get('item_id'))
        serializer.save(item=item)
