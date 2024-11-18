from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import MedicalServiceCategory, PharmaSupport, UserAccount, Doctors, Hospital, Lab, Cart
import csv
from io import TextIOWrapper
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserAccountSerializer
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
import uuid
from .models import Consultation
from .serializers import ConsultationSerializer
from .models import UserInfo
from .serializers import  UserInfoSerializer
from django.utils import timezone


class SignUpView(APIView):
    def post(self, request):
        serializer = UserAccountSerializer(data=request.data)
        if serializer.is_valid():
            user_account = serializer.save()
            return Response({
                "message": "Account has been created",
                "user_id": str(user_account.user_id)
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user_account = UserAccount.objects.get(email=email)
        except UserAccount.DoesNotExist:
            return Response({"message": "Invalid email or password"}, status=status.HTTP_404_NOT_FOUND)

        if check_password(password, user_account.password):
            refresh = RefreshToken.for_user(user_account)
            return Response({
                "message": "Login successful",
                "user_id": str(user_account.user_id),
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh)
            }, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Blacklist the token to prevent further use
            refresh_token = request.data.get("refresh_token")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Invalid token or logout failed"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def upload_csv_and_replace_table(request):
    # Ensure a file is provided in the request
    if 'file' not in request.FILES:
        return JsonResponse({"error": "No file provided"}, status=400)

    # Check for table_code parameter
    table_code = request.data.get('table_code')
    if not table_code:
        return JsonResponse({"error": "No table_code provided"}, status=400)
    
    # Normalize the table_code to lowercase for comparison
    try:
        table_code = str(table_code).lower()  
    except ValueError:
        return JsonResponse({"error": "Invalid table_code provided"}, status=400)

    # Validate file type
    csv_file = request.FILES['file']
    if not csv_file.name.endswith('.csv'):
        return JsonResponse({"error": "File is not a CSV"}, status=400)

    # Read the CSV file
    data_set = TextIOWrapper(csv_file.file, encoding='utf-8')
    reader = csv.DictReader(data_set)

    # Determine the model based on the table_code
    if table_code == 'categories':
        model = MedicalServiceCategory
    elif table_code == 'medicines':
        model = PharmaSupport
    elif table_code == 'doctor':
        model = Doctors
    elif table_code == 'hospital':
        model = Hospital
    elif table_code == 'lab':
        model = Lab
    else:
        return JsonResponse({"error": "Invalid table_code."}, status=400)

    # Get the model's field names to filter for matching columns in the CSV
    model_fields = [f.name for f in model._meta.fields]
    csv_headers = reader.fieldnames
    matching_columns = [header for header in csv_headers if header in model_fields]

    if not matching_columns:
        return JsonResponse({"error": "No matching columns found in the CSV"}, status=400)

    # Delete existing records in the table
    model.objects.all().delete()

    # Insert new records from the CSV
    rows_added = 0
    for row in reader:
        try:
            data_to_insert = {column: row[column] for column in matching_columns if row[column]}
            model.objects.create(**data_to_insert)
            rows_added += 1
        except Exception as e:
            return JsonResponse({"error": f"Error inserting row: {str(e)}"}, status=400)

    return JsonResponse({"success": f"Data successfully replaced in {model.__name__} table with {rows_added} new records"}, status=200)


@api_view(['POST'])
def get_category_details(request):
    service = request.data.get('service')
    category = request.data.get('category')
    pid = request.query_params.get('pid')
    
    if not service:
        return JsonResponse({"error": "Service parameter is required."}, status=400)
    if not category:
        return JsonResponse({"error": "Category parameter is required."}, status=400)

    # Map service to the correct model
    model = None
    if service == 'medical_services':
        model = MedicalServiceCategory
    elif service == 'medicines':
        model = PharmaSupport
    elif service == 'doctor':
        model = Doctors
    elif service == 'hospital':
        model = Hospital
    elif service == 'lab':
        model = Lab
    else:
        return JsonResponse({"error": "Invalid service parameter."}, status=400)

    # Query based on category and pid
    if pid:
        matched_entries = model.objects.filter(category=category, id=pid).values()
        if not matched_entries:
            return JsonResponse({"error": "No matching entry found for the provided category and pid."}, status=404)
    else:
        matched_entries = model.objects.filter(category=category).values()
        if not matched_entries:
            return JsonResponse({"error": "No matching entries found for the provided category."}, status=404)

    return JsonResponse(list(matched_entries), safe=False, status=200)




# @api_view(['POST'])
# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
# def add_to_cart(request):
#     user = request.data.get('user_id')
#     product_id = request.data.get('product_id')
#     print("USER: ",user)

#     # Check if the user already has this product in the cart
#     cart_item, created = Cart.objects.get_or_create(user=user, p_id=product_id)

#     # Increment the item count by 1
#     cart_item.item_count += 1
#     cart_item.save()

#     # Prepare product details to return in the response
#     product_details = {
#         "user_id": cart_item.user.user_id,  # Return user_id instead of username
#         "p_id": cart_item.p_id,
#         "item_count": cart_item.item_count
#     }

#     return Response({
#         "message": "Product added to cart",
#         "item_count": cart_item.item_count,
#         "product_details": product_details
#     }, status=status.HTTP_201_CREATED)


from .models import UserInfo
from .serializers import UserInfoSerializer

class AddUserInfoView(APIView):

    def post(self, request):
        # Automatically associate the logged-in user's ID with the user info
        data = request.data.copy()
        data['user_id'] = request.user.id

        serializer = UserInfoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User information added successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RequestConsultationView(APIView):
    def post(self, request):
        user_id = request.user.id
        doctor_id = request.data.get('d_id')
        scheduled_date = request.data.get('scheduled_date')  # Get scheduled date from request
        scheduled_time = request.data.get('scheduled_time')  # Get scheduled time from request

        if not doctor_id:
            return Response({"error": "Doctor ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = UserAccount.objects.get(id=user_id)
        except UserAccount.DoesNotExist:
            return Response({"error": "Invalid user ID."}, status=status.HTTP_404_NOT_FOUND)

        try:
            doctor = Doctors.objects.get(id=doctor_id)
        except Doctors.DoesNotExist:
            return Response({"error": "Invalid doctor ID."}, status=status.HTTP_404_NOT_FOUND)

        # Assuming there's a UserInfo object related to the UserAccount object
        try:
            user_info = UserInfo.objects.get(user_id=user.id)
        except UserInfo.DoesNotExist:
            return Response({"error": "User info not found."}, status=status.HTTP_404_NOT_FOUND)

        # Create the consultation
        consultation = Consultation.objects.create(
            u_id=user,
            d_id=doctor,
            status="pending",
            date=scheduled_date if scheduled_date else None,  # Assign the scheduled date if provided
            time=scheduled_time if scheduled_time else None   # Assign the scheduled time if provided
        )
        
        # Serialize the consultation and user info data
        consultation_serializer = ConsultationSerializer(consultation)
        user_info_serializer = UserInfoSerializer(user_info)  # Serialize user info
        
        # Combine both the consultation and user info in the response
        return Response({
            "message": "Consultation request sent.",
            "consultation": consultation_serializer.data,
            "user_info": user_info_serializer.data  # Include user info in the response
        }, status=status.HTTP_201_CREATED)

from .models import  HospitalBooking
from .serializers import HospitalBookingSerializer

class BookHospitalAppointmentView(APIView):
    def post(self, request):
        # Get data from the request
        user_id = request.user.id
        hospital_id = request.data.get('h_id')
        appointment_date = request.data.get('appointment_date')  # Appointment date
        appointment_time = request.data.get('appointment_time')  # Appointment time

        # Validate that user_id and hospital_id are provided
        if not user_id or not hospital_id:
            return Response({"error": "User ID and Hospital ID are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Try to get the User and Hospital from the database
        try:
            user = UserAccount.objects.get(id=user_id)
        except UserAccount.DoesNotExist:
            return Response({"error": "Invalid user ID."}, status=status.HTTP_404_NOT_FOUND)

        try:
            hospital = Hospital.objects.get(id=hospital_id)
        except Hospital.DoesNotExist:
            return Response({"error": "Invalid hospital ID."}, status=status.HTTP_404_NOT_FOUND)

        # Try to get the corresponding UserInfo instance
        try:
            user_info = UserInfo.objects.get(user_id=user_id)
        except UserInfo.DoesNotExist:
            return Response({"error": "User Info not found."}, status=status.HTTP_404_NOT_FOUND)

        # Create the hospital booking instance
        # Pass the ForeignKey IDs directly for user and hospital
        hospital_booking = HospitalBooking.objects.create(
            u_id=user,  # Pass the user instance, not just the ID
            hospital=hospital,  # Pass the hospital instance, not just the ID
            status="pending",  # Default status is "pending"
            appointment_date=appointment_date if appointment_date else None,  # Assign the appointment date
            appointment_time=appointment_time if appointment_time else None  # Assign the appointment time
        )

        # Serialize the hospital booking data
        hospital_booking_serializer = HospitalBookingSerializer(hospital_booking)

        # Serialize the user info data using the UserInfoSerializer
        user_info_serializer = UserInfoSerializer(user_info)

        # Return response with booking details and user info
        return Response({
            "message": "Hospital appointment booking request sent.",
            "booking": hospital_booking_serializer.data,
            "user_info": user_info_serializer.data  # Include user info in the response
        }, status=status.HTTP_201_CREATED)
from .models import LabTestBooking, UserAccount, Lab
from .serializers import LabTestBookingSerializer
class BookLabTestAppointmentView(APIView):
    def post(self, request):
        # Get data from the request
        user_id = request.user.id
        lab_id = request.data.get('lab_id')  # Lab ID
        appointment_date = request.data.get('appointment_date')  # Appointment date
        appointment_time = request.data.get('appointment_time')  # Appointment time

        # Validate that user_id and lab_id are provided
        if not user_id or not lab_id:
            return Response({"error": "User ID and Lab ID are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Try to get the User and Lab from the database
        try:
            user = UserAccount.objects.get(id=user_id)
        except UserAccount.DoesNotExist:
            return Response({"error": "Invalid user ID."}, status=status.HTTP_404_NOT_FOUND)

        try:
            lab = Lab.objects.get(id=lab_id)
        except Lab.DoesNotExist:
            return Response({"error": "Invalid lab ID."}, status=status.HTTP_404_NOT_FOUND)

        # Try to get the corresponding UserInfo instance
        try:
            user_info = UserInfo.objects.get(user_id=user_id)
        except UserInfo.DoesNotExist:
            return Response({"error": "User Info not found."}, status=status.HTTP_404_NOT_FOUND)

        # Create the lab test booking instance
        lab_booking = LabTestBooking.objects.create(
            u_id=user,  # Pass the user instance
            lab=lab,  # Pass the lab instance
            status="pending",  # Default status is "pending"
            appointment_date=appointment_date if appointment_date else None,  # Assign the appointment date
            appointment_time=appointment_time if appointment_time else None  # Assign the appointment time
        )

        # Serialize the lab booking data
        lab_booking_serializer = LabTestBookingSerializer(lab_booking)

        # Serialize the user info data
        user_info_serializer = UserInfoSerializer(user_info)

        # Return response with booking details and user info
        return Response({
            "message": "Lab test appointment booking request sent.",
            "booking": lab_booking_serializer.data,
            "user_info": user_info_serializer.data
        }, status=status.HTTP_201_CREATED)