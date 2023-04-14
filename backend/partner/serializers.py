from rest_framework import serializers
from partner.models import Partner
from merchant.serializers import MerchantSerializer


class PartnerSerializer(serializers.ModelSerializer):

    merchants = MerchantSerializer(read_only=True, many=True)

    class Meta:
        model = Partner
        fields = '__all__'
        extra_fields = {
            'merchants': {'read_only': True}
        }