from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Bill,UserAccount,UserInfo, Consultation, Review,Customer,Order

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['user_id', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)




class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = ['u_id', 'd_id', 'status', 'date', 'time']

class UserInfoSerializer(serializers.ModelSerializer):
    age = serializers.ReadOnlyField()

    class Meta:
        model = UserInfo
        fields = [
            'user_id', 'first_name', 'last_name', 'fathers_name', 'aadhar_number',
            'dob', 'age', 'email', 'phone_number', 'street', 'city', 'state', 
            'country', 'pincode', 'medical_history_pdf'
        ]
from .models import HospitalBooking

class HospitalBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = HospitalBooking
        fields = ['u_id', 'hospital', 'status', 'appointment_date', 'appointment_time']
from .models import LabTestBooking

class LabTestBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabTestBooking
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__' 



class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'email', 'user_id']


class OrderSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer()

    class Meta:
        model = Order
        fields = ['id', 'customer', 'order_info', 'product', 'timeline', 'total_cost', 'status']


class BillSerializer(serializers.ModelSerializer):
    orders = OrderSerializer(many=True)

    class Meta:
        model = Bill
        fields = ['id', 'orders', 'total_cost', 'created_at']
