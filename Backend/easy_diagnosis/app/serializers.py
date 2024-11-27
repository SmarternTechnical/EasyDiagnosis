from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Bill,UserAccount,UserInfo, Consultation, Review,Customer,Order, Product

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


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)

class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = ['u_id', 'd_id', 'status', 'date', 'time']

class UserInfoSerializer(serializers.ModelSerializer):
    age = serializers.ReadOnlyField()

    class Meta:
        model = UserInfo
        fields = [
            'user_account', 'first_name', 'last_name', 'fathers_name', 'aadhar_number',
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


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = '__all__'
from .models import Notification,HospitalNotification,LabTestNotification

class NotificationSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='doctor.d_name', read_only=True)  # Include doctor's name
    user_name = serializers.CharField(source='user.username', read_only=True)  # Include user's name or username

    class Meta:
        model = Notification
        fields = [
            'id',
            'doctor_name',
            'user_name',
            'consultation_type',
            'message',
            'created_at',
            'is_read'
        ]
        read_only_fields = ['id', 'created_at', 'doctor_name', 'user_name']
class HospitalNotificationSerializer(serializers.ModelSerializer):
    hospital_name = serializers.CharField(source='hospital.name', read_only=True)
    user_name = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = HospitalNotification
        fields = [
            'id',
            'hospital_name',
            'user_name',
            'consultation_type',
            'message',
            'created_at',
            'is_read'
        ]
        read_only_fields = ['id', 'created_at', 'hospital_name', 'user_name']
class LabTestNotificationSerializer(serializers.ModelSerializer):
    lab_name = serializers.CharField(source='lab.name', read_only=True)
    user_name = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = LabTestNotification
        fields = [
            'id',
            'lab_name',
            'user_name',
            'notification_type',
            'message',
            'created_at',
            'is_read'
        ]
        read_only_fields = ['id', 'created_at', 'lab_name', 'user_name']