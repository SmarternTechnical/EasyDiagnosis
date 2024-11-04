from django.contrib import admin
from .models import MedicalServiceCategory, PharmaSupport

# Register your models here.
class MedicalServiceCategoryAdmin(admin.ModelAdmin):
    list_display = [field.name for field in MedicalServiceCategory._meta.fields]

class PharmaSupportAdmin(admin.ModelAdmin):
    # Display all fields as columns in the list view
    list_display = [field.name for field in PharmaSupport._meta.fields]

admin.site.register(MedicalServiceCategory, MedicalServiceCategoryAdmin)
admin.site.register(PharmaSupport, PharmaSupportAdmin)