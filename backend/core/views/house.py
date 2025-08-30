from rest_framework import viewsets
from ..models import House, List, ListType
from ..serializers import HouseSerializer
from rest_framework.permissions import IsAuthenticated

class HouseViewSet(viewsets.ModelViewSet):
    queryset = House.objects.all()
    serializer_class = HouseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return House.objects.filter(members=self.request.user)

    def perform_create(self, serializer):
        house = serializer.save()
        house.members.add(self.request.user)
        
        # Criação das listas padrão
        List.objects.create(
            house=house,
            title='Lista Mensal',
            list_type=ListType.MONTHLY
        )
        
        List.objects.create(
            house=house,
            title='Lista Emergencial',
            list_type=ListType.EMERGENCY
        )