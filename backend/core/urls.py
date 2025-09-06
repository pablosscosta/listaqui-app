from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views.user import UserViewSet
from .views.house import HouseViewSet
from .views.list import ListViewSet
from .views.item import ItemViewSet
from .views.auth import RegisterView, MyTokenObtainPairView
from .views.house_join import JoinHouseAPIView

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'houses', HouseViewSet, basename='house')
# Remova a linha 'router.register(r'items', ItemViewSet, basename='item')' se ela existir.

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('houses/join/', JoinHouseAPIView.as_view(), name='house-join'),
    path('houses/<int:house_pk>/lists/', ListViewSet.as_view({'get': 'list', 'post': 'create'}), name='house-list-create'),
    path('houses/<int:house_pk>/lists/<int:pk>/', ListViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='list-detail'),
    path('houses/<int:house_pk>/lists/<int:list_pk>/items/', ItemViewSet.as_view({'get': 'list', 'post': 'create'}), name='list-item-create'),
    path('houses/<int:house_pk>/lists/<int:list_pk>/items/<int:pk>/', ItemViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='item-detail'),
    path('', include(router.urls)),
]