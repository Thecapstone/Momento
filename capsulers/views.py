from django.template import loader
from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth import authenticate
from django.contrib.auth import login

from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.response import Response
from rest_framework import (
    status,
    permissions
)
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import (
    action
)
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import (
    extend_schema,
)
from django.contrib.auth.forms import UserCreationForm
from capsulers.models import User as user_db
from capsulers.serializers import(
    UserCreateSerializer,
    UserLoginSerializer,
)  


class UserViewSet(ModelViewSet):
    queryset = user_db.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [permissions.AllowAny]
    
    
class AuthViewSet(ViewSet):
    """User authentication endpoint"""
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['post'], url_path='login')
    def user_login(self, request):
        serializer = UserLoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            response = Response({
                'user': UserLoginSerializer(user).data},
                status=status.HTTP_200_OK,
            )
            response.set_cookie(
                key='access_token', 
                value=access_token,
                httponly=True,
                secure=True,
                samesite="Strict"
            )
            response.set_cookie(
                key='refresh_token',
                value=str(refresh),
                httponly=True,
                secure=True,
                samesite="Strict"
            )
            return response
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'], url_path='logout', permission_classes=[IsAuthenticated])
    def user_logout(self, request):

        refresh_token = request.COOKIES.get("refresh_token")
        if not refresh_token:
            return Response({"error": "Refresh token not provided"}, status=status.HTTP_404_NOT_FOUND)
        try:
            refresh = RefreshToken(refresh_token)
            refresh.blacklist()
        except Exception as e:
            return Response({"error": "Unable to validate token"}, str(e), status=status.HTTP_400_BAD_REQUEST)
        
        response = Response({"message": "You have been logged out"}, status=status.HTTP_200_OK)
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response



    



def registerPage(request):
    form = UserCreationForm()

    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save(request)
            user = form.cleaned_data.get('email')
            messages.success(request, 'Account was created for ' + user)
            return redirect('login')

    context = {'form': form}
    return render(request, 'accounts/register.html', context)


def loginPage(request):

    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(request, email=email, password=password)

        if user is not None:
            login(request, user)
            return redirect('memories:capsules')
        
    context = {}
    return render(request, 'accounts/login.html', context)

