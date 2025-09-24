from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import House, List, Item
from .serializers import HouseSerializer, ItemSerializer

class HouseViewSet(viewsets.ModelViewSet):
    queryset = House.objects.all()
    serializer_class = HouseSerializer

class ItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer

    def get_queryset(self):
        list_pk = self.kwargs.get('list_pk') 
        return Item.objects.filter(list_id=list_pk)

    def perform_create(self, serializer):
        list_pk = self.kwargs.get('list_pk')
        list_instance = get_object_or_404(List, pk=list_pk)
        serializer.save(list=list_instance)