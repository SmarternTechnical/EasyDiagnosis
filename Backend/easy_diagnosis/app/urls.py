from django.urls import path
from . import views

urlpatterns = [
    # path('', views.home, name='home'),
    path('update-table/', views.upload_csv_and_replace_table, name='upload_csv_and_replace_table'),
    path('get-category-details/', views.get_category_details, name='get_category_details'),

]

