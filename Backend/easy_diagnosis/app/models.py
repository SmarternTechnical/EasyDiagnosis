from django.db import models

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
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.email