from rest_framework import viewsets, views, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils import timezone
from .models import ParkingSlot, Booking, Contact
from django.contrib.auth import get_user_model
from .serializers import ParkingSlotSerializer, BookingSerializer, UserRegisterSerializer, UserLoginSerializer, ContactSerializer
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token


User = get_user_model()

class RegisterView(views.APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"message": "User registered successfully", "token": token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(views.APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(username=email, password=password)

            if user:
                token, _ = Token.objects.get_or_create(user=user)
                return Response({"message": "Login successful", "token": token.key}, status=status.HTTP_200_OK)

            return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ParkingSlotViewSet(viewsets.ModelViewSet):
    queryset = ParkingSlot.objects.all()
    serializer_class = ParkingSlotSerializer

    @action(detail=False, methods=['get'])
    def available_slots(self, request):
        """Retrieve only available parking slots."""
        available_slots = ParkingSlot.objects.filter(is_available=True)
        serializer = self.get_serializer(available_slots, many=True)
        return Response(serializer.data)
    

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def create(self, request, *args, **kwargs):
        """Custom booking logic - prevent double booking."""
        slot_id = request.data.get('parking_slot')

        # Validate if slot_id exists
        if not slot_id:
            return Response({"error": "parking_slot is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch slot with error handling
        slot = get_object_or_404(ParkingSlot, id=slot_id)

        # Check if slot is available
        if not slot.is_available:
            return Response({"error": "Slot is already booked"}, status=status.HTTP_400_BAD_REQUEST)

        response = super().create(request, *args, **kwargs)

        # Mark the slot as unavailable after successful booking
        slot.is_available = False
        slot.save()

        return response

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
