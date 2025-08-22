from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from core.models import House, HouseUser
from core.serializers import HouseUserSerializer

class JoinHouseAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        code = request.data.get('code')
        if not code:
            return Response({'error': 'Código da casa é obrigatório.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            house = House.objects.get(code=code)
        except House.DoesNotExist:
            return Response({'error': 'Casa com este código não encontrada.'}, status=status.HTTP_404_NOT_FOUND)

        if house.members.filter(id=request.user.id).exists():
            return Response({'error': 'Você já é membro desta casa.'}, status=status.HTTP_409_CONFLICT)
        
        house.members.add(request.user)
        house_user_serializer = HouseUserSerializer(HouseUser.objects.get(user=request.user, house=house))
        return Response(house_user_serializer.data, status=status.HTTP_200_OK)