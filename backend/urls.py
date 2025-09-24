from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Inclui todas as rotas definidas em core/urls.py sob o prefixo /api/
    path('api/', include('core.urls')), 
]