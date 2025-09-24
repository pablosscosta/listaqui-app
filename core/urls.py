from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import HouseViewSet, ItemViewSet

router = DefaultRouter()
router.register(r'houses', HouseViewSet)

urlpatterns = [
    path('', include(router.urls)),

    # Rotas para CRUD de Itens aninhadas em /lists/<ID_DA_LISTA>/items/
    path('lists/<int:list_pk>/items/', ItemViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('lists/<int:list_pk>/items/<int:pk>/', ItemViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
]