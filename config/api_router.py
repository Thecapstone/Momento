from rest_framework import routers
from memories.views import CapsuleViewSet
from django.urls import path



router = routers.SimpleRouter()
router.register('memories', CapsuleViewSet)



app_name = "api"
urlpatterns = router.urls


#33ccff
#7abecc
#74cfbf