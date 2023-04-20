from rest_framework import serializers
from merchant.models import MerchantPartnerRelationship
from partner.models import Partner
from merchant.serializers import MerchantSerializer


class MerchantPartnerRelationshipSerializer(serializers.ModelSerializer):

    class Meta:
        model = MerchantPartnerRelationship
        fields = '__all__'


class PartnerSerializer(serializers.ModelSerializer):

    merchants = MerchantSerializer(read_only=True, many=True)
    merchant_partner_relationship = MerchantPartnerRelationshipSerializer(source='merchantpartnerrelationship_set',
                                                                          many=True)

    class Meta:
        model = Partner
        fields = '__all__'
        extra_fields = {
            'merchants': {'read_only': True}
        }
