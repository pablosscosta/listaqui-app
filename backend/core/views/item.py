from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models import Item
from ..serializers import ItemSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ItemSerializer