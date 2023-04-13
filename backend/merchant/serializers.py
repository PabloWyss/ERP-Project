from rest_framework import serializers
from merchant.models import Merchant
from user.serializers import UserSerializer


class MerchantSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = Merchant
        fields = '__all__'
