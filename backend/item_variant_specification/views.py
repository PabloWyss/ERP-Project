from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView
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
    queryset = ItemVariantSpecification.objects.all().order_by('valid_from')
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


class UpdateItemVariantView(UpdateAPIView):

    queryset = ItemVariantSpecification.objects.all()
    serializer_class = ItemVariantSpecificationSerializer
    lookup_url_kwarg = "item_variant_id"


class CurrentItemVariantView(ListAPIView):

    serializer_class = ItemVariantSpecificationSerializer
    lookup_url_kwarg = 'item_id'

    def get_queryset(self):
        item = Item.objects.get(pk=self.kwargs.get('item_id'))
        item_variant = item.item_variant_specifications.latest('valid_to').id
        item_variant_queryset = ItemVariantSpecification.objects.filter(id=item_variant)
        return item_variant_queryset
