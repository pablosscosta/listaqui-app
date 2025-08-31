from rest_framework import serializers
from ..models import House
from .user import UserSerializer # Importe o UserSerializer

class HouseSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True, read_only=True)
    
    class Meta:
        model = House
        fields = ['id', 'name', 'code', 'members']