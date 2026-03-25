from rest_framework import routers
from memories.views import CapsuleViewSet
from capsulers.views import UserViewSet
from django.urls import path



router = routers.SimpleRouter()
router.register('memories', CapsuleViewSet)
router.register('users', UserViewSet)



app_name = "api"
urlpatterns = router.urls


#33ccff
#7abecc
#74cfbf