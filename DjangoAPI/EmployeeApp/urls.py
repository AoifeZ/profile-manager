from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('department/', views.departmentApi),
    path('department/<int:pk>/', views.departmentApi),

    path('employee/', views.employeeApi),
    path('employee/<int:pk>/', views.employeeApi),

    path('Employee/SaveFile/', views.SaveFile)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)