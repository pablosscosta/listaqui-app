from rest_framework import serializers
from ..models import House

class HouseSerializer(serializers.ModelSerializer):
    members = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    
    class Meta:
        model = House
        fields = ['id', 'name', 'code', 'members']