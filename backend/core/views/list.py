from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models import List
from ..serializers import ListSerializer

class ListViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ListSerializer

    def get_queryset(self):
        # Apenas retorna listas de casas que o usuário pertence
        user_houses = self.request.user.house_set.all()
        return List.objects.filter(house__in=user_houses)