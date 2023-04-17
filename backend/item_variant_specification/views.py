from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView
from item_variant_specification.models import ItemVariantSpecification
from item_variant_specification.serializers import ItemVariantSpecificationSerializer
from item.models import Item


class ListItemVariantView(ListAPIView):
    """
    get:
    List all item variant specifications

    # subtitle
    List all item variant specifications of an item in chronological order of valid from
    """
    queryset = ItemVariantSpecification.objects.all().order_by('valid_from')
    serializer_class = ItemVariantSpecificationSerializer
    lookup_url_kwarg = 'item_id'


class CreateItemVariantView(CreateAPIView):
    """
    post:
    Create new item variant specifications

    # subtitle
    Create new item variant specifications of an item
    """
    queryset = Item.objects.all()
    serializer_class = ItemVariantSpecificationSerializer

    def perform_create(self, serializer):
        item = Item.objects.get(pk=self.kwargs.get('item_id'))
        serializer.save(item=item)


class UpdateItemVariantView(UpdateAPIView):
    """
    patch:
    Update specific item variant specifications

    # subtitle
    Update specific item variant specifications of an item
    """
    queryset = ItemVariantSpecification.objects.all()
    serializer_class = ItemVariantSpecificationSerializer
    lookup_url_kwarg = "item_variant_id"


class CurrentItemVariantView(ListAPIView):
    """
    get:
    Retrieve the current (valid) item variant specifications

    # subtitle
    Retrieve the current (valid) item variant specifications of an item
    """
    serializer_class = ItemVariantSpecificationSerializer
    lookup_url_kwarg = 'item_id'

    def get_queryset(self):
        item = Item.objects.get(pk=self.kwargs.get('item_id'))
        item_variant_id = item.item_variant_specifications.latest('valid_to').id
        item_variant_queryset = ItemVariantSpecification.objects.filter(id=item_variant_id)
        return item_variant_queryset


class ListItemVariantSizeChoiceView(APIView):
    """
    get:
    List the available item variant sizes

    # subtitle
    List the available item variant sizes within the item variant specifications
    """
    def get(self, request, *args, **kwargs):
        sizes = list(ItemVariantSpecification.size.field.choices)
        choices = []
        for size in sizes:
            choices.append(size[1])
        return Response({"sizes": choices})
