from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models import House
from ..serializers import HouseSerializer

class HouseViewSet(viewsets.ModelViewSet):
    queryset = House.objects.all()
    serializer_class = HouseSerializer
    permission_classes = [IsAuthenticated]