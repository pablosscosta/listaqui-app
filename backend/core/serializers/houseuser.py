from rest_framework import serializers
from ..models import HouseUser

class HouseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = HouseUser
        fields = ['user', 'house', 'is_admin']