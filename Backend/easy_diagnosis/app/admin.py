from django.contrib import admin
from .models import (
    MedicalServiceCategory,
    PharmaSupport,
    UserAccount,
    Doctors,
    Hospital,
    Lab,
    Cart,
    Review,
    Customer,
    Order,
    Bill,
    Product
)


# Register your models here.
class MedicalServiceCategoryAdmin(admin.ModelAdmin):
    list_display = [field.name for field in MedicalServiceCategory._meta.fields]

class PharmaSupportAdmin(admin.ModelAdmin):
    list_display = [field.name for field in PharmaSupport._meta.fields]

class UserAccountAdmin(admin.ModelAdmin):
    list_display = [field.name for field in UserAccount._meta.fields]

class DoctorsAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Doctors._meta.fields]

class HospitalAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Hospital._meta.fields]

class LabAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Lab._meta.fields]

class CartAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Cart._meta.fields]

class ReviewAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Review._meta.fields]

class CustomerAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Customer._meta.fields]
    search_fields = ['name', 'email'] 


class OrderAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Order._meta.fields]
    list_filter = ['status']  

class BillAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Bill._meta.fields]

class ProductAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'size', 'units', 'item_count', 'mrp')

    search_fields = ['order_info', 'product'] 
admin.site.register(MedicalServiceCategory, MedicalServiceCategoryAdmin)
admin.site.register(PharmaSupport, PharmaSupportAdmin)
admin.site.register(UserAccount, UserAccountAdmin)
admin.site.register(Doctors, DoctorsAdmin)
admin.site.register(Hospital, HospitalAdmin)
admin.site.register(Lab, LabAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Bill, BillAdmin)
admin.site.register(Product, ProductAdmin)