from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import AllowAny
from item.models import Item
from item.serializers import ItemSerializer


class ListItemView(ListAPIView):
    """
    get:
    List all items

    # subtitle
    Lists all the items of all users in chronological order
    """
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
    permission_classes = [AllowAny]


class CreateItemView(CreateAPIView):
    """
    post:
    Create a new Item

    # subtitle
    Create a new Item
    """
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
    permission_classes = [AllowAny]
