from rest_framework import viewsets, permissions
from ..models import Item
from ..serializers.item import ItemSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        list_pk = self.kwargs['list_pk']
        return Item.objects.filter(list__pk=list_pk)