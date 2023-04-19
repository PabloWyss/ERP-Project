import datetime
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView
from item_variant_specification.models import ItemVariantSpecification
from item_variant_specification.serializers import ItemVariantSpecificationSerializer, \
    UpdateItemVariantSpecificationSerializer
from item.models import Item


class ListItemVariantView(ListAPIView):
    """
    get:
    List all item variant specifications

    # subtitle
    List all item variant specifications of an item in chronological order of valid from
    """

    queryset = ItemVariantSpecification.objects.all().order_by('-valid_from')
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

    def get_date_time_current(self):
        date_time_current = datetime.datetime.now()
        return date_time_current

    def update_has_variants(self):
        item = Item.objects.get(pk=self.kwargs.get('item_id'))
        item.has_variants = True
        item.save()

    def update_variant_current(self, date_time_current):
        item = Item.objects.get(pk=self.kwargs.get('item_id'))
        try:
            item_variant_latest = item.item_variant_specifications.latest('valid_from')
            item_variant_latest.valid_to = date_time_current
            item_variant_latest.save()
        except ItemVariantSpecification.DoesNotExist:
            pass

    def perform_create(self, serializer):
        date_time_current = self.get_date_time_current()
        self.update_variant_current(date_time_current)
        item = Item.objects.get(pk=self.kwargs.get('item_id'))
        serializer.save(item=item, valid_from=date_time_current, valid_to=None)
        self.update_has_variants()


class SearchItemVariantView(ListAPIView):
    """
    get:
    Search for specific item variant specifications

    # subtitle
    Search for specific item variant specifications related to the items of the merchant
    """

    serializer_class = ItemVariantSpecificationSerializer

    def get_queryset(self):
        item = Item.objects.get(pk=self.kwargs.get('item_id'))
        queryset = ItemVariantSpecification.objects.filter(item__id=item.id)
        search_value = self.request.query_params.get('search_string')
        if search_value is not None:
            queryset_filtered = queryset.filter(
                Q(size__icontains=search_value) |
                Q(item_changes__icontains=search_value)
            )
        return queryset_filtered


class UpdateItemVariantView(UpdateAPIView):
    """
    patch:
    Update specific item variant specifications

    # subtitle
    Update specific item variant specifications of an item
    """

    serializer_class = UpdateItemVariantSpecificationSerializer
    lookup_url_kwarg = 'item_variant_id'

    def get_queryset(self):
        item_variant_id = self.kwargs.get('item_variant_id')
        merchant = self.request.user.merchant
        items = Item.objects.filter(merchant_id=merchant.id)
        item_target = items.filter(item_variant_specifications__id=item_variant_id).first()
        return item_target.item_variant_specifications.all()


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
        try:
            item_variant_id = item.item_variant_specifications.latest('valid_from').id
            item_variant_queryset = ItemVariantSpecification.objects.filter(id=item_variant_id)
            return item_variant_queryset
        except ItemVariantSpecification.DoesNotExist:
            pass


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
