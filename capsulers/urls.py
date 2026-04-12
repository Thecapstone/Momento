from django.urls import path
from capsulers import views
from capsulers.views import UserViewSet

urlpatterns = [
    path('register/', views.registerPage, name='register'),
    path('login/', views.loginPage, name='login'),
]
