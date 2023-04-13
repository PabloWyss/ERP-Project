from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView
from partner.models import Partner
from partner.serializers import PartnerSerializer
from project.global_permissions import IsSameUser, IsSameMerchant


"""
class CreatePartnerView(CreateAPIView):
    queryset = Partner.objects.all()
    permission_classes = [IsSameMerchant]
    serializer_class = PartnerSerializer

    def perform_create(self, serializer):
        serializer.save(user.merchant=self.request.user)
"""