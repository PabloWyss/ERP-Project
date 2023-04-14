from rest_framework.response import Response
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from partner.models import Partner
from partner.serializers import PartnerSerializer


class ListPartnerView(ListAPIView):
    """
    get:
    List all partners

    # subtitle
    Lists all the partners of the merchant in alphabetical order of SKU number
    """
    queryset = Partner.objects.all().order_by('name')
    serializer_class = PartnerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        merchant = self.request.user.merchant
        return Partner.objects.filter(merchants__id=merchant.id)


class CreatePartnerView(CreateAPIView):
    """
    post:
    Create a new partner

    # subtitle
    Create a new partner related to a merchant
    """
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        merchant = request.user.merchant
        partner_name = request.data['name']
        partner_exists = merchant.partners.filter(name=partner_name).exists()
        if partner_exists:
            return Response({'status': 'Partner already exists'})
        else:
            serialized_data = self.get_serializer(data=request.data, partial=True)
            serialized_data.is_valid(raise_exception=True)
            serialized_data.save()
            merchant.partners.add(serialized_data.id)
            return Response({'status': 'Partner successfully created'})
