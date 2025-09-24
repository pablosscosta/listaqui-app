from rest_framework import serializers
from .models import House, List, Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'name', 'purchased']

class ListSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)

    class Meta:
        model = List
        fields = ['id', 'name', 'items'] 

class HouseSerializer(serializers.ModelSerializer):
    lists = ListSerializer(many=True, read_only=True)

    class Meta:
        model = House
        fields = ['id', 'name', 'lists']