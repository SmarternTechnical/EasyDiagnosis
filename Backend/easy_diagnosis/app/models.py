from django.db import models
import uuid


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

    user_id = models.UUIDField(default=uuid.uuid4, editable=False)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    subcategory_id = models.IntegerField()  
    review_comment = models.TextField()
    review_stars = models.IntegerField()  
    
    def __str__(self):
        return f"{self.category} Review by {self.user.username}"