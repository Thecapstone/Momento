from typing import TYPE_CHECKING
from django.shortcuts import render
from memories.forms import CapsuleContentForm
from memories.serializers import CapsuleCreationSerializer, CapsuleViewSerializer
from memories.models import Capsule as capsule_db

from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.throttling import UserRateThrottle
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
import rest_framework.status as status

from drf_spectacular.utils import extend_schema

class TwicePerDayUserThrottle(UserRateThrottle):
    rate = '2/day'

def CreateCapsule(request):
    context = {'form': CapsuleContentForm()}
    return render(request, 'memories/index.html', context)

class CapsuleViewSet(ModelViewSet):
    queryset = capsule_db.objects.all()
    serializer_class = CapsuleCreationSerializer

    @extend_schema(
            request=CapsuleCreationSerializer,
            responses={201: CapsuleViewSerializer},
    )
    @throttle_classes(TwicePerDayUserThrottle)
    def create(self, request):
        
        serializer = CapsuleCreationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @extend_schema(
            request=CapsuleViewSerializer,
            responses={201: CapsuleViewSerializer})
    def retrieve(self, request, pk):
        try:
            capsule = capsule_db.objects.get(id=pk)
        except capsule_db.DoesNotExist:
            
            return Response({'Capsule': 'Capsule does not exist'}, status=status.HTTP_404_NOT_FOUND)
        serializer = CapsuleViewSerializer(capsule)
        
        if request.user != capsule.creator and capsule.is_private:
            return Response( {'message': "This Capsule is private"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({
            "data": serializer.data,
            "message": "Here's a glimpse of your stored memories."
        }, status=status.HTTP_200_OK)

    
    @extend_schema(
            request=CapsuleViewSerializer,
            responses={201: CapsuleViewSerializer})
    def join(self, request, pk):
        try:
            capsule = capsule_db.objects.get(id=pk)
        except capsule_db.DoesNotExist:
            return Response({'Capsule': 'Capsule does not exist'}, status=status.HTTP_404_NOT_FOUND)
        serializer = CapsuleViewSerializer(capsule)
        if TYPE_CHECKING:
            from capsulers.models import User
            if not User.is_premium and not capsule.invites.count <= 4:
                return Response("Capsule has reached capacity, upgrade to add more users", status=status.HTTP_412_PRECONDITION_FAILED)
            else:
                capsule.members.add(request.user)
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
                
    

