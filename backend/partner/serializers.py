from rest_framework import serializers
from partner.models import Partner
from merchant.serializers import MerchantSerializer


class PartnerSerializer(serializers.ModelSerializer):

    merchant = MerchantSerializer(read_only=True)

    class Meta:
        model = Partner
        fields = '__all__'
