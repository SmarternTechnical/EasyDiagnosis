from django.urls import path
from . import views
from .views import SignUpView, LoginView, LogoutView,RequestConsultationView,AddUserInfoView,BookHospitalAppointmentView,BookLabTestAppointmentView, ReviewAPI
from .views import (
    OrderListView, OrderDetailView,UploadCSVView,AddProductView,upload_csv,add_product_to_bill,save_bill,get_all_bills,GetUserInfoView
    ,questions_api,get_user_cart,AudioPredictionDysarthriaView,AudioPredictionDementiaView,AudioPredictionParkinsonView,ImagePredictionTumor,ImagePredictionTb
)

urlpatterns = [
    # path('', views.home, name='home'),
    path('update-table/', views.upload_csv_and_replace_table, name='upload_csv_and_replace_table'),
    path('get-category-details', views.get_category_details, name='get_category_details'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('add-user-info/', AddUserInfoView.as_view(), name='add-user-info'),
    path('request-consultation/', RequestConsultationView.as_view(), name='request-consultation'),
    path('book-hospital-appointment/', BookHospitalAppointmentView.as_view(), name='book_hospital_appointment'),
    path('book-labtest/', BookLabTestAppointmentView.as_view(), name='book-labtest'),
    path('add-to-cart/', views.add_to_cart, name='add_to_cart'),
     path('reviews/', ReviewAPI.as_view(), name='reviews'),
    path('orders/private/', OrderListView.as_view(), name='private-orders'),
    path('orders/private/<int:pk>/', OrderDetailView.as_view(), name='private-order-detail'),

     path('upload-csv/', upload_csv, name='upload_csv'),
     path('add-product-to-bill/', add_product_to_bill, name='add_product_to_bill'),
    path('save-bill/', save_bill, name='save_bill'),
    path('get-all-bills/', get_all_bills, name='get_all_bills'),
    path('user-info/', GetUserInfoView.as_view(), name='get_user_info'),
    path('questions/', questions_api, name='questions_api'),
    path('get-cart/', get_user_cart, name='get_user_cart'),
    path('predict-audio-dysarthria/', AudioPredictionDysarthriaView.as_view(), name='predict-audio'),
    path('predict-audio-dementia/', AudioPredictionDementiaView.as_view(), name='predict-audio'),
    path('predict-audio-parkinson/', AudioPredictionParkinsonView.as_view(), name='predict-audio'),
    path('predict-image-tumor/', ImagePredictionTumor.as_view(), name='predict-image'),
    path('predict-image-tb/', ImagePredictionTb.as_view(), name='predict-image'),
]


