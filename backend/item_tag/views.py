from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from item.models import Item
from item_tag.models import ItemTag
from item_tag.serializers import ItemTagSerializer


class ListItemTagView(ListAPIView):
    """
    get:
    List all items tags

    # subtitle
    Lists all the items tags of the merchant in alphabetical order of name
    """
    serializer_class = ItemTagSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        item_tags_of_merchant = ItemTag.objects.filter(items__merchant=merchant).order_by('tag_name')
        return item_tags_of_merchant


class CreateItemTagView(CreateAPIView):
    """
    post:
    Create a new item model and assigns it to an item

    # subtitle
    Create a new item model and assigns it to an item
    """
    queryset = ItemTag.objects.all()
    serializer_class = ItemTagSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        item = Item.objects.filter(pk=self.kwargs.get('item_id'))
        name_exists = item.filter(item_tags__tag_name=self.request.data['tag_name']).exists()
        if not name_exists:
            serializer.save(items=item)
            return Response(serializer.data)
        else:
            return Response({'status': 'Tag Name already exist'})


class SearchItemTagView(ListAPIView):
    """
    get:
    Search for a specific Item Tag

    # subtitle
    Search for a specific Item Tag of the item
    """
    serializer_class = ItemTagSerializer

    def get_queryset(self):
        item = Item.objects.filter(pk=self.kwargs.get('item_id'))
        item_tags = item.filter(item_tags__tag_name=self.request.data['tag_name']).all()
        search_value = self.request.query_params.get('search_string')
        if search_value is not None:
            queryset = item_tags.filter(item_tags__tag_name=search_value)
        return queryset


class RetrieveUpdateDestroyItemTagView(RetrieveUpdateDestroyAPIView):
    serializer_class = ItemTagSerializer
    lookup_url_kwarg = 'item_serializer_id'
    queryset = ItemTag.objects.all().order_by('tag_name')
