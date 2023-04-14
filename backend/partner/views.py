from django.db.models import Q
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from partner.models import Partner
from partner.serializers import PartnerSerializer


class ListPartnerView(ListAPIView):
    """
    get:
    List all partners

    # subtitle
    Lists all the partners of the merchant in alphabetical order of name
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
    Create a new partner related to a merchant
    """
    serializer_class = PartnerSerializer

    def post(self, request, *args, **kwargs):
        merchant = request.user.merchant
        partner_name = request.data['name']
        partner_exists = merchant.partners.filter(name=partner_name).exists()
        if partner_exists:
            return Response({'status': 'Partner already exists'})
        else:
            serializer = self.get_serializer(data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            merchant.partners.add(serializer.data['id'])
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
        search_value = self.request.query_params.get('search_string')
        if search_value is not None:
            queryset = queryset.filter(
                Q(name__icontains=search_value) |
                Q(contact__icontains=search_value) |
                Q(address__icontains=search_value) |
                Q(email__icontains=search_value)
            )
        return queryset


class RetrieveUpdateDestroyPartnerView(RetrieveUpdateDestroyAPIView):
    """
    t.b.d.
    """
    def get_queryset(self):
        merchant = self.request.user.merchant
        return Partner.objects.filter(merchants__id=merchant.id)

    serializer_class = PartnerSerializer
    lookup_url_kwarg = 'partner_id'


class ListSupplierView(ListAPIView):
    """
    get:
    List all suppliers

    # subtitle
    Lists all the suppliers of the merchant in alphabetical order of name
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
        search_value = self.request.query_params.get('search_string')
        if search_value is not None:
            queryset = queryset.filter(
                Q(name__icontains=search_value) |
                Q(contact__icontains=search_value) |
                Q(address__icontains=search_value) |
                Q(email__icontains=search_value)
            )
        return queryset


class ListCustomerView(ListAPIView):
    """
    get:
    List all customers

    # subtitle
    Lists all the customers of the merchant in alphabetical order of name
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
        search_value = self.request.query_params.get('search_string')
        if search_value is not None:
            queryset = queryset.filter(
                Q(name__icontains=search_value) |
                Q(contact__icontains=search_value) |
                Q(address__icontains=search_value) |
                Q(email__icontains=search_value)
            )
        return queryset
