from django.urls import path
from . import views
from .views import SignUpView, LoginView, LogoutView

urlpatterns = [
    # path('', views.home, name='home'),
    path('update-table/', views.upload_csv_and_replace_table, name='upload_csv_and_replace_table'),
    path('get-category-details', views.get_category_details, name='get_category_details'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('add-to-cart/', views.add_to_cart, name='add_to_cart'),

]

