from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView
from item.models import Item
from item_model_specification.models import ItemModelSpecification
from item_model_specification.serializers import ItemModelSpecificationSerializer


class ListItemModelView(ListAPIView):
    """
    get:
    List all item model specifications

    # subtitle
    List all item model specifications of the merchant in chronological order of valid from
    """

    queryset = ItemModelSpecification.objects.all().order_by('valid_from')
    serializer_class = ItemModelSpecificationSerializer


class CreateItemModelView(CreateAPIView):
    """
    post:
    Create new item model specifications

    # subtitle
    Create new item model specifications related to the merchant
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
    Update specific item model specifications of the merchant
    """

    queryset = ItemModelSpecification.objects.all()
    serializer_class = ItemModelSpecificationSerializer
    lookup_url_kwarg = "item_model_id"


class CurrentItemModelView(ListAPIView):
    """
    get:
    Retrieve the current (valid) item model specifications

    # subtitle
    Retrieve the current (valid) item model specifications related to an item of the merchant
    """

    serializer_class = ItemModelSpecificationSerializer
    lookup_url_kwarg = 'item_id'

    def get_queryset(self):
        item = Item.objects.get(pk=self.kwargs.get('item_id'))
        item_model_id = item.item_model_specifications.latest('valid_to').id
        item_model_queryset = ItemModelSpecification.objects.filter(id=item_model_id)
        return item_model_queryset


class AssignItemToItemModelView(UpdateAPIView):
    """
    patch:
    Assign one or many items to the item model specifications

    # subtitle
    Assign one or many items to the item model specifications of the merchant
    """

    serializer_class = ItemModelSpecificationSerializer
    lookup_url_kwarg = 'item_model_id'

    def update(self, request, *args, **kwargs):
        item_model_specifications = ItemModelSpecification.objects.get(pk=self.kwargs.get('item_model_id'))
        item_ids = self.request.data['item_ids']
        for item_id in item_ids:
            is_item_id_assigned = item_model_specifications.items.filter(id=item_id).exists()
            if not is_item_id_assigned:
                item_model_specifications.items.add(item_id)
        return Response({'status': 'Item assigned to item model'})


class ListItemModelColorChoiceView(APIView):
    """
    get:
    List all available item model colors

    # subtitle
    List all available item model colors related to the item model specifications of the merchant
    """

    def get(self, request, *args, **kwargs):
        colors = list(ItemModelSpecification.color.field.choices)
        choices = []
        for color in colors:
            choices.append(color[1])
        return Response({"colors": choices})


class ListItemModelCategoryChoiceView(APIView):
    """
    get:
    List all available item model categories

    # subtitle
    List all available item model categories related to the item model specifications of the merchant
    """

    def get(self, request, *args, **kwargs):
        categories = list(ItemModelSpecification.category.field.choices)
        choices = []
        for category in categories:
            choices.append(category[1])
        return Response({"categories": choices})
