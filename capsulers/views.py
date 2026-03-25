from django.template import loader
from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth import authenticate
from django.contrib.auth import login

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status

from capsulers.forms.signup_forms import CreateUserForm
from capsulers.models import User
from capsulers.serializers import UserCreateSerializer

from drf_spectacular.utils import extend_schema


def registerPage(request):
    form = CreateUserForm()

    if request.method == 'POST':
        form = CreateUserForm(request.POST)
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

def index(request, user):
    template = loader.get_template('index.html')
    return HttpResponse(template.render())

# Create your views here.
