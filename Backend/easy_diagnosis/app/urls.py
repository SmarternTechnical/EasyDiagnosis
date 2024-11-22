from django.urls import path
from . import views
from .views import SignUpView, LoginView, LogoutView
from .views import RequestConsultationView
from .views import AddUserInfoView
from .views import BookHospitalAppointmentView
from .views import BookLabTestAppointmentView



urlpatterns = [
    # path('', views.home, name='home'),
    path('update-table/', views.upload_csv_and_replace_table, name='upload_csv_and_replace_table'),
    path('get-category-details/', views.get_category_details, name='get_category_details'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('add-user-info/', AddUserInfoView.as_view(), name='add-user-info'),
    path('request-consultation/', RequestConsultationView.as_view(), name='request-consultation'),
    path('book-hospital-appointment/', BookHospitalAppointmentView.as_view(), name='book_hospital_appointment'),
    path('book-labtest/', BookLabTestAppointmentView.as_view(), name='book-labtest'),
     path('add-to-cart/', views.add_to_cart, name='add_to_cart'),
]

