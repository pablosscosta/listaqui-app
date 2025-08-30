from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from core.models import List, House
from core.serializers import ListSerializer

class ListViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ListSerializer

    def get_queryset(self):
        house_pk = self.kwargs.get('house_pk')
        if house_pk:
            return List.objects.filter(house__pk=house_pk, house__members=self.request.user)
        return List.objects.none()

    def perform_create(self, serializer):
        house_pk = self.kwargs.get('house_pk')
        try:
            house = House.objects.get(pk=house_pk)
        except House.DoesNotExist:
            return Response({'error': 'Casa não encontrada.'}, status=status.HTTP_404_NOT_FOUND)
        serializer.save(house=house)