from django.db import models
import uuid
from datetime import datetime
from datetime import date  # Add this import at the top




# Create your models here.
class MedicalServiceCategory(models.Model):
    name = models.CharField(max_length=255, default='Default Name')  
    category = models.CharField(max_length=255)  
    image_path = models.CharField(max_length=255)  

    def __str__(self):
        return self.name  

class PharmaSupport(models.Model):
    product_name = models.CharField(max_length=255, default='Default Name')  
    category = models.CharField(max_length=100) 
    product_image = models.CharField(max_length=255)  
    actual_product_price = models.CharField(max_length=255)   
    discounted_price = models.CharField(max_length=255)   
    discount_percentage = models.CharField(max_length=255) 
    product_link = models.CharField(max_length=255)   
    description = models.CharField(max_length=255, default="To Be Updated")  

    def __str__(self):
        return self.product_name



class UserAccount(models.Model):
    user_id = models.UUIDField(default=uuid.uuid4, null=True, editable=False)  # Remove unique=True temporarily
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.email


class Doctors(models.Model):
    d_name = models.CharField(max_length=255, default='Default Name')
    category = models.CharField(max_length=100)
    d_image = models.CharField(max_length=255, default=None)
    expertise = models.CharField(max_length=255, default=None) 
    qualification = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    clinic = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    languages = models.CharField(max_length=255)
    work_experience = models.CharField(max_length=255)
    d_about = models.TextField() 
    rating = models.FloatField(default=0.0) 

    def __str__(self):
        return self.d_name


class Hospital(models.Model):
    h_name = models.CharField(max_length=255, default='Default Name')
    category = models.CharField(max_length=100)
    h_image = models.CharField(max_length=255, default=None)
    specialties = models.CharField(max_length=255, default=None) 
    location = models.CharField(max_length=255)
    h_description = models.TextField() 
    rating = models.FloatField(default=0.0) 

    def __str__(self):
        return self.h_name

class Lab(models.Model):
    l_name = models.CharField(max_length=255, default='Default Name')
    category = models.CharField(max_length=100)
    l_image = models.CharField(max_length=255, default=None)
    specialties = models.CharField(max_length=255, default=None) 
    location = models.CharField(max_length=255)
    l_description = models.TextField() 
    rating = models.FloatField(default=0.0) 

    def __str__(self):
        return self.l_name
    
class Cart(models.Model):
    user_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    p_id = models.CharField(max_length=255, default='0')
    item_count = models.CharField(max_length=255, default= 0)


    def __str__(self):
        return self.user_id

class Consultation(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
        ('scheduled', 'Scheduled'),
    ]

    u_id = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='user_consultations')
    d_id = models.ForeignKey(Doctors, on_delete=models.CASCADE, related_name='doctor_consultations')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    date = models.DateField(null=True, blank=True)
    time = models.TimeField(null=True, blank=True)

    def __str__(self):
        return f'Consultation {self.id} - {self.status}'



class UserInfo(models.Model):
    user_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    fathers_name = models.CharField(max_length=100)
    aadhar_number = models.CharField(max_length=12, unique=True)
    dob = models.DateField()
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    pincode = models.CharField(max_length=6)
    medical_history_pdf = models.URLField(max_length=255)

    
    @property
    def age(self):
        today = date.today()
        birth_date = self.dob  # Assuming 'dob' is a DateField in your model
        age = today.year - birth_date.year
        if today.month < birth_date.month or (today.month == birth_date.month and today.day < birth_date.day):
            age -= 1
        return age

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
class HospitalBooking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]

    u_id = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='user_hospital_bookings')  # Renamed from user to u_id
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='hospital_bookings')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    appointment_date = models.DateField(null=True, blank=True)
    appointment_time = models.TimeField(null=True, blank=True)

    def __str__(self):
        return f'Booking {self.id} - {self.status} for {self.hospital.h_name}'
