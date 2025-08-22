from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, HouseViewSet, RegisterView, MyTokenObtainPairView, ListViewSet, ItemViewSet, JoinHouseAPIView

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'houses', HouseViewSet, basename='house')
router.register(r'lists', ListViewSet, basename='list')
router.register(r'items', ItemViewSet, basename='item')

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('houses/join/', JoinHouseAPIView.as_view(), name='house-join'),
    path('', include(router.urls)),
]