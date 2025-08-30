from rest_framework import serializers
from ..models.list import List
from ..models.house import House
from ..serializers.house import HouseSerializer

class ListSerializer(serializers.ModelSerializer):
    house = HouseSerializer(read_only=True)
    list_type = serializers.CharField(source='get_list_type_display')

    class Meta:
        model = List
        fields = ['id', 'title', 'list_type', 'house']
        read_only_fields = ['house']