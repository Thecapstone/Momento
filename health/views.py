from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.decorators import permission_classes
from rest_framework import status
from rest_framework.viewsets import ModelViewSet

class HealthCheckView(ModelViewSet):

    def health_check(self, request):
        self.permission_classes = [permissions.AllowAny]
        try:
            request.status
        except Exception as e:
            return Response({'message': 'Your page is not ready'})
        return Response({'message': 'Your page is ready'}, status=status.HTTP_200_OK)