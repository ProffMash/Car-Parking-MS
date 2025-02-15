from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ParkingSlotViewSet, BookingViewSet, RegisterView, LoginView, ContactViewSet

router = DefaultRouter()
router.register(r'parking-slots', ParkingSlotViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'contacts', ContactViewSet)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('', include(router.urls)),  # Include router URLs

]
