from django.db import models
from django.core.validators import MinValueValidator
from django.utils import timezone
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.http import JsonResponse

# Custom User Manager
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        extra_fields.setdefault("username", email)  # Set username = email
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    username = None  
    email = models.EmailField(unique=True)  
    full_name = models.CharField(max_length=255)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"  
    REQUIRED_FIELDS = ["full_name"] 

    def __str__(self):
        return self.full_name
    
# contact model
class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    message = models.TextField()

    def __str__(self):
        return self.name
    
class ParkingSlot(models.Model):
    SLOT_TYPES = [
        ('standard', 'Standard'),
        ('premium', 'Premium'),
        ('vip', 'VIP'),
    ]

    spot_name = models.CharField(max_length=50, unique=True)
    level = models.CharField(max_length=10)
    slot_type = models.CharField(max_length=10, choices=SLOT_TYPES, default='standard')
    rate_per_hour = models.DecimalField(max_digits=6, decimal_places=2)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.spot_name} (Level {self.level}) - {self.get_slot_type_display()}"

class Booking(models.Model):
    parking_slot = models.ForeignKey(ParkingSlot, on_delete=models.CASCADE, related_name="bookings")
    start_time = models.DateTimeField(default=timezone.now)
    duration = models.PositiveIntegerField(validators=[MinValueValidator(1)])  # Minimum 1 hour
    mobile_number = models.CharField(max_length=15)
    license_plate = models.CharField(max_length=20)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    
    
    def save(self, *args, **kwargs):
        """Automatically calculate total amount & mark slot unavailable."""
        if self.parking_slot and self.duration:
            self.total_amount = self.duration * self.parking_slot.rate_per_hour  # Calculate total cost
        
        super().save(*args, **kwargs)  # Save booking first

        # Mark the slot as unavailable
        self.parking_slot.is_available = False
        self.parking_slot.save()

    def __str__(self):
        return f"Booking for {self.license_plate} at {self.parking_slot.spot_name}"


def get_users_count():
    count=CustomUser.objects.all().count()
    return JsonResponse({'count': count})