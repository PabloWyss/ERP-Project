from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView
from rest_framework.response import Response
from item.models import Item
from item_model_specification.models import ItemModelSpecification
from item_model_specification.serializers import ItemModelSpecificationSerializer


class ListItemModelView(ListAPIView):
    """
    get:
    List all item model specifications for an item

    # subtitle
    List all item model specifications for an item in date time order of valid_from
    """
    queryset = ItemModelSpecification.objects.all().order_by('name')
    serializer_class = ItemModelSpecificationSerializer
    lookup_url_kwarg = 'item_id'


class CreateItemModelView(CreateAPIView):
    """
    post:
    Create a new item model and assigns it to an item

    # subtitle
    Create a new item model and assigns it to an item
    """
    queryset = Item.objects.all()
    serializer_class = ItemModelSpecificationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        item = Item.objects.filter(pk=self.kwargs.get('item_id'))
        name_exists = item.filter(item_model_specifications__name=self.request.data['name']).exists()
        if not name_exists:
            serializer.save(items=item)
            return Response(serializer.data)
        else:
            return Response({'status': 'Model name already exists in item'})

class UpdateItemModelView(UpdateAPIView):

    queryset = ItemModelSpecification.objects.all()
    serializer_class = ItemModelSpecificationSerializer
    lookup_url_kwarg = "item_model_id"