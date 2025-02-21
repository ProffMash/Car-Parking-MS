from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ParkingSlotViewSet, BookingViewSet, RegisterView, LoginView, ContactViewSet, CustomUserViewSet

router = DefaultRouter()
router.register(r'parking-slots', ParkingSlotViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'support', ContactViewSet)
router.register(r'users', CustomUserViewSet)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('', include(router.urls)),  # Include router URLs
]

# count paths
# http://127.0.0.1:8000/api/support/count/,
# http://127.0.0.1:8000/api/users/count/
# http://127.0.0.1:8000/api/parking-slots/count/
# http://127.0.0.1:8000/api/bookings/count/
#http://127.0.0.1:8000/api/bookings/total_amount/
