from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView
from item.models import Item
from item_model_specification.models import ItemModelSpecification
from item_model_specification.serializers import ItemModelSpecificationSerializer


class ListItemModelView(ListAPIView):
    """
    get:
    List all item model specifications for an item

    # subtitle
    List all item model specifications of an item in chronological order of valid from
    """
    queryset = ItemModelSpecification.objects.all().order_by('valid_from')
    serializer_class = ItemModelSpecificationSerializer
    lookup_url_kwarg = 'item_id'


class CreateItemModelView(CreateAPIView):
    """
    post:
    Create new item model specifications

    # subtitle
    Create new item model specifications of an item
    """
    queryset = Item.objects.all()
    serializer_class = ItemModelSpecificationSerializer

    def perform_create(self, serializer):
        item = Item.objects.get(pk=self.kwargs.get('item_id'))
        serializer.save(item=item)


class UpdateItemModelView(UpdateAPIView):
    """
    patch:
    Update specific item model specifications

    # subtitle
    Update specific item model specifications of an item
    """
    queryset = ItemModelSpecification.objects.all()
    serializer_class = ItemModelSpecificationSerializer
    lookup_url_kwarg = "item_model_id"


class CurrentItemModelView(ListAPIView):
    """
    get:
    Retrieve the current (valid) item model specifications

    # subtitle
    Retrieve the current (valid) item model specifications of an item
    """
    serializer_class = ItemModelSpecificationSerializer
    lookup_url_kwarg = 'item_id'

    def get_queryset(self):
        item = Item.objects.get(pk=self.kwargs.get('item_id'))
        item_model_id = item.item_model_specifications.latest('valid_to').id
        item_model_queryset = ItemModelSpecification.objects.filter(id=item_model_id)
        return item_model_queryset
