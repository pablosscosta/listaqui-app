from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, views
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import UserRegistrationSerializer
from datetime import datetime, timedelta
from django.conf import settings
from rest_framework import status

REFRESH_TOKEN_LIFETIME_SECONDS = int(settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds())

class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny] 

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            refresh_token = response.data["refresh"]
            expires = datetime.now() + timedelta(seconds=REFRESH_TOKEN_LIFETIME_SECONDS)
            
            response.set_cookie(
                key='refresh_token', 
                value=refresh_token, 
                expires=expires,
                httponly=True, 
                samesite='Lax'
            )
            
            del response.data['refresh']

        return response

class LogoutView(views.APIView):
    permission_classes = [AllowAny] 
    
    def post(self, request):
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie('refresh_token')
        return response

class RegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserRegistrationSerializer