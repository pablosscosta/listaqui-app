from rest_framework import serializers
from ..models import List
from .item import ItemSerializer

class ListSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = List
        fields = ['id', 'title', 'list_type', 'house', 'items']
        read_only_fields = ['house']