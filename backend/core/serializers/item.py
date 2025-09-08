from rest_framework import serializers
from ..models import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'description', 'amount', 'unit_of_measure', 'is_completed', 'list', 'created_at', 'updated_at']