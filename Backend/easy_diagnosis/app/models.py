from django.db import models
import uuid
from datetime import datetime
from datetime import date  
from django.contrib.auth.models import AbstractUser


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
    
class UserAccount(AbstractUser):
    user_id = models.UUIDField(default=uuid.uuid4, null=True, editable=False)
    email = models.EmailField(unique=True, blank=False, null=False)
    username = models.CharField(max_length=150, unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.email
        super().save(*args, **kwargs)

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

class LabTestBooking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]

    u_id = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='user_lab_bookings')  # User making the booking
    lab = models.ForeignKey(Lab, on_delete=models.CASCADE, related_name='lab_bookings')  # The lab for the test
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    appointment_date = models.DateField(null=True, blank=True)  # Appointment date
    appointment_time = models.TimeField(null=True, blank=True)  # Appointment time'


class Cart(models.Model):
    user_id = models.UUIDField(default=uuid.uuid4, editable=False)
    p_id = models.CharField(max_length=255, default='temporary_default') 
    item_count = models.IntegerField(default=0)

    def __str__(self):
        return f"User: {self.user_id}, Product: {self.p_id}"


class Review(models.Model):
    CATEGORY_CHOICES = [
        ('product', 'Product'),
        ('hospital', 'Hospital'),
        ('lab', 'Lab'),
        ('doctor', 'Doctor'),
    ]

    # user_id = models.UUIDField(default=uuid.uuid4, editable=False)
    user_id = models.IntegerField() 
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    subcategory_id = models.IntegerField()  
    review_comment = models.TextField()
    review_stars = models.IntegerField()  
    
    def __str__(self):
        return f"{self.category} Review by {self.user.username}"
    
        return self.user_id




class Customer(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    user_id = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('approved', 'Approved'),
        ('awaiting_shipment', 'Awaiting Shipment'),
        ('shipped', 'Shipped'),
        ('rejected', 'Rejected'),
        ('queried', 'Queried'),
        ('cancelled', 'Cancelled'),
    ]

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order_info = models.CharField(max_length=100)
    product = models.CharField(max_length=255)
    timeline = models.TextField(null=True, blank=True)  # Detailed history or status updates
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='new')

    def __str__(self):
        return f"Order {self.order_info} - {self.status}"
    
class Bill(models.Model):
    orders = models.ManyToManyField(Order)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
