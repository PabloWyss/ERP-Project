# from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from partner.models import Partner
from partner.serializers import PartnerSerializer
from project.global_permissions import IsSameMerchant


class ListPartnerView(ListAPIView):
    """
    get:
    List all partners

    # subtitle
    Lists all the partners of the merchant in alphabetical order of SKU number
    """
    queryset = Partner.objects.all().order_by('name')
    serializer_class = PartnerSerializer
    permission_classes = [IsSameMerchant]
