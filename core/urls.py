from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import HouseViewSet, ItemViewSet
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from users.views import LoginView

router = DefaultRouter()
router.register(r'houses', HouseViewSet)

urlpatterns = [
    # Rotas de Autenticação JWT
    path('token/', LoginView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Rotas de Registro (V2)
    path('auth/', include('users.urls')), 
    
    # Rotas da V1 (Houses e Itens)
    path('', include(router.urls)),

    path('lists/<int:list_pk>/items/', ItemViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('lists/<int:list_pk>/items/<int:pk>/', ItemViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
]