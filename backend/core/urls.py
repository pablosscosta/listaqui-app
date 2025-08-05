from rest_framework.routers import DefaultRouter
from .views import UserViewSet, HouseViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'houses', HouseViewSet)

urlpatterns = router.urls