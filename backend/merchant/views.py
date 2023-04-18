from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView
from merchant.models import Merchant
from merchant.serializers import MerchantSerializer
from project.global_permissions import IsSameUser


class CreateMerchantView(CreateAPIView):
    """
    post:
    Create a new merchant

    # subtitle
    Create a new merchant
    """

    queryset = Merchant.objects.all()
    serializer_class = MerchantSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MyMerchantRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):

    permission_classes = [IsSameUser]
    serializer_class = MerchantSerializer

    def get_object(self):
        try:
            return self.request.user.merchant
        except Merchant.DoesNotExist:
            pass
