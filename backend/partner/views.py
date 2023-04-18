from django.db.models import Q
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from merchant.models import MerchantPartnerRelationship
from partner.models import Partner
from partner.serializers import PartnerSerializer


def search_by_search_string(self, queryset):
    search_value = self.request.query_params.get('search_string')
    if search_value is not None:
        queryset_filtered = queryset.filter(
            Q(name__icontains=search_value) |
            Q(contact__icontains=search_value) |
            Q(address__icontains=search_value) |
            Q(email__icontains=search_value)
        )
    return queryset_filtered


class ListPartnerView(ListAPIView):
    """
    get:
    List all partners

    # subtitle
    List all partners of the merchant in alphabetical order of name
    """

    serializer_class = PartnerSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Partner.objects.filter(merchants__id=merchant.id).order_by('name')


class CreatePartnerView(CreateAPIView):
    """
    post:
    Create a new partner

    # subtitle
    Create a new partner related to the merchant
    """

    serializer_class = PartnerSerializer

    def post(self, request, *args, **kwargs):
        merchant = request.user.merchant
        partner_name = request.data['name']
        is_supplier = request.data['is_supplier']
        is_customer = request.data['is_customer']
        is_partner = merchant.partners.filter(name=partner_name).exists()
        if is_partner:
            return Response({'status': 'Partner already exists'})
        else:
            serializer = self.get_serializer(data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            partner = Partner.objects.filter(name=partner_name).get()
            MerchantPartnerRelationship.objects.create(merchant=merchant, partner=partner, is_supplier=is_supplier,
                                                       is_customer=is_customer)
            return Response({'status': 'Partner successfully created'})


class SearchPartnerView(ListAPIView):
    """
    get:
    Search for a specific partner

    # subtitle
    Search for a specific partner of the merchant
    """

    serializer_class = PartnerSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Partner.objects.filter(merchants__id=merchant.id)
        queryset_filtered = search_by_search_string(self, queryset)
        return queryset_filtered


class RetrieveUpdateDestroyPartnerView(RetrieveUpdateDestroyAPIView):
    """
    get:
    Retrieve a specific partner

    patch:
    Update a specific partner

    # subtitle
    Retrieve and update a specific partner of the merchant
    """

    serializer_class = PartnerSerializer
    lookup_url_kwarg = 'partner_id'

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Partner.objects.filter(merchants__id=merchant.id)


class ListSupplierView(ListAPIView):
    """
    get:
    List all suppliers

    # subtitle
    List all suppliers of the merchant in alphabetical order of name
    """

    serializer_class = PartnerSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Partner.objects.filter(merchants__id=merchant.id).filter(is_supplier=True).order_by('name')


class SearchSupplierView(ListAPIView):
    """
    get:
    Search for a specific supplier

    # subtitle
    Search for a specific supplier of the merchant
    """

    serializer_class = PartnerSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Partner.objects.filter(merchants__id=merchant.id).filter(is_supplier=True)
        queryset_filtered = search_by_search_string(self, queryset)
        return queryset_filtered


class ListCustomerView(ListAPIView):
    """
    get:
    List all customers

    # subtitle
    List all customers of the merchant in alphabetical order of name
    """

    serializer_class = PartnerSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Partner.objects.filter(merchants__id=merchant.id).filter(is_customer=True).order_by('name')


class SearchCustomerView(ListAPIView):
    """
    get:
    Search for a specific customer

    # subtitle
    Search for a specific customer of the merchant
    """

    serializer_class = PartnerSerializer

    def get_queryset(self):
        merchant = self.request.user.merchant
        queryset = Partner.objects.filter(merchants__id=merchant.id).filter(is_customer=True)
        queryset_filtered = search_by_search_string(self, queryset)
        return queryset_filtered
