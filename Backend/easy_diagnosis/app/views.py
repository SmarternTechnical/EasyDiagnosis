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
from .models import UserInfo,HospitalBooking,Customer, Order
from .serializers import  UserInfoSerializer
from django.utils import timezone
from .models import Question,Bill,LabTestBooking, UserAccount, Lab, Review,Order, Product,Notification,HospitalNotification,LabTestNotification
from .serializers import CartSerializer,LoginSerializer,LabTestBookingSerializer, HospitalBookingSerializer, ReviewSerializer,OrderSerializer,BillSerializer,NotificationSerializer
from rest_framework.generics import ListAPIView,RetrieveAPIView
from django.contrib.auth import authenticate
from django.db import transaction
from decimal import Decimal
import json
from django.views.decorators.csrf import csrf_exempt



class SignUpView(APIView):
    def post(self, request):
        serializer = UserAccountSerializer(data=request.data)
        if serializer.is_valid():
            user_account = serializer.save()
            return Response({
                "message": "Account has been created",
                "user_id": user_account.user_id
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({
                "message": "Invalid input",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        user = authenticate(request, email=email, password=password)
        if not user:
            return Response({
                "message": "Invalid credentials"
            }, status=status.HTTP_400_BAD_REQUEST)

        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Login successful",
            "user_id": user.user_id,
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh)
        }, status=status.HTTP_200_OK)

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


class AddUserInfoView(APIView):

    def post(self, request):
        data = request.data.copy()

        # Associate the logged-in user's UserAccount with the UserInfo
        user_account = request.user  # request.user is the UserAccount instance for the logged-in user

        # Add the `user_account` instance to the data
        data['user_account'] = user_account.id

        serializer = UserInfoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User information added successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RequestConsultationView(APIView):
    def post(self, request):
        user_id = request.user.id
        doctor_id = request.data.get('d_id')
        scheduled_date = request.data.get('scheduled_date')
        scheduled_time = request.data.get('scheduled_time')

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

        try:
            user_info = UserInfo.objects.get(user_account=user)
        except UserInfo.DoesNotExist:
            return Response({"error": "User info not found."}, status=status.HTTP_404_NOT_FOUND)

        consultation_type = "scheduled" if scheduled_date and scheduled_time else "instant"

        consultation = Consultation.objects.create(
            u_id=user,
            d_id=doctor,
            status="pending",
            date=scheduled_date if scheduled_date else None,
            time=scheduled_time if scheduled_time else None
        )

        # Save notification to the database
        message = (
            f"You have a new {consultation_type} consultation request from "
            f"{user_info.first_name} {user_info.last_name}."
        )
        Notification.objects.create(
            doctor=doctor,
            user=user,
            consultation_type=consultation_type,
            message=message
        )

        consultation_serializer = ConsultationSerializer(consultation)
        user_info_serializer = UserInfoSerializer(user_info)

        return Response({
            "message": "Consultation request sent. Notification saved.",
            "consultation": consultation_serializer.data,
            "user_info": user_info_serializer.data
        }, status=status.HTTP_201_CREATED)

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
            user_info = UserInfo.objects.get(user_account=user)
        except UserInfo.DoesNotExist:
            return Response({"error": "User Info not found."}, status=status.HTTP_404_NOT_FOUND)

        # Create the hospital booking instance
        hospital_booking = HospitalBooking.objects.create(
            u_id=user,
            hospital=hospital,
            status="pending",
            appointment_date=appointment_date if appointment_date else None,
            appointment_time=appointment_time if appointment_time else None
        )

        # Save notification to the database
        message = (
            f"You have a new hospital appointment booking request from "
            f"{user_info.first_name} {user_info.last_name}."
        )
        HospitalNotification.objects.create(
            hospital=hospital,
            user=user,
            consultation_type="hospital_appointment",
            message=message
        )

        # Serialize the hospital booking and user info data
        hospital_booking_serializer = HospitalBookingSerializer(hospital_booking)
        user_info_serializer = UserInfoSerializer(user_info)

        # Return response with booking details and notification confirmation
        return Response({
            "message": "Hospital appointment booking request sent. Notification saved.",
            "booking": hospital_booking_serializer.data,
            "user_info": user_info_serializer.data
        }, status=status.HTTP_201_CREATED)


class BookLabTestAppointmentView(APIView):
    def post(self, request):
        # Get data from the request
        user_id = request.user.id
        lab_id = request.data.get('lab_id')
        appointment_date = request.data.get('appointment_date')
        appointment_time = request.data.get('appointment_time')

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
            user_info = UserInfo.objects.get(user_account=user)
        except UserInfo.DoesNotExist:
            return Response({"error": "User Info not found."}, status=status.HTTP_404_NOT_FOUND)

        # Create the lab test booking instance
        lab_booking = LabTestBooking.objects.create(
            u_id=user,
            lab=lab,
            status="pending",
            appointment_date=appointment_date if appointment_date else None,
            appointment_time=appointment_time if appointment_time else None
        )

        # Save notification to the database
        message = (
            f"You have a new lab test appointment request from "
            f"{user_info.first_name} {user_info.last_name}."
        )
        LabTestNotification.objects.create(
            lab=lab,
            user=user,
            notification_type="lab_test_appointment",
            message=message
        )

        # Serialize the lab booking and user info data
        lab_booking_serializer = LabTestBookingSerializer(lab_booking)
        user_info_serializer = UserInfoSerializer(user_info)

        # Return response with booking details and notification confirmation
        return Response({
            "message": "Lab test appointment booking request sent. Notification saved.",
            "booking": lab_booking_serializer.data,
            "user_info": user_info_serializer.data
        }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def get_category_details(request):
    if request.content_type == 'application/json':
        service = request.data.get('service')
        category = request.data.get('category')
    elif request.content_type == 'multipart/form-data':
        service = request.POST.get('service')
        category = request.POST.get('category')
    else:
        return JsonResponse({"error": "Unsupported Content-Type"}, status=400)

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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    user_id = request.user.id
    product_id = request.data.get('product_id')
    del_flag=request.data.get('del_one')
    comp_del=request.data.get('del_full')

    if not user_id or not product_id:
        return Response({"error": "user_id and product_id are required."}, status=status.HTTP_400_BAD_REQUEST)
    
    #delete logic
    if del_flag=="1":
        #count>1
        try:
            cart_item=Cart.objects.get(user_id=user_id,p_id=product_id)
            if cart_item.item_count>1:
                cart_item.item_count-=1
                cart_item.save()
                message="Product quantity decreased in cart."
        #coun==1 then delete
            else:
                cart_item.delete()
                message = "Product removed from the cart."
        except Cart.DoesNotExist:  #item not in cart
            return Response({"error": "Product not in cart"}, status=status.HTTP_404_NOT_FOUND)
    elif comp_del=="1":
        try:
            cart_item=Cart.objects.get(user_id=user_id,p_id=product_id)
            cart_item.delete()
            message = "Product removed from the cart."
        except Cart.DoesNotExist: 
            return Response({"error": "Product not in cart"}, status=status.HTTP_404_NOT_FOUND)
            
    else: #hit pharma table
        try:
            product = PharmaSupport.objects.get(id=product_id) 
        except PharmaSupport.DoesNotExist:
            return Response({"error": "Product not found in PharmaSupport"}, status=status.HTTP_404_NOT_FOUND)
    
        #add logic
        # Get or create cart item for the user and product
        cart_item, created = Cart.objects.get_or_create(user_id=user_id, p_id=product_id)

        if not created:
            cart_item.item_count += 1
        else:
            cart_item.item_count = 1

        cart_item.save()
        message="Products added in cart"

    # Retrieve all cart items for the user and prepare product details in a dictionary
    user_cart_items = Cart.objects.filter(user_id=user_id)
    cart_details = []

    for item in user_cart_items:
         product = PharmaSupport.objects.get(id=item.p_id)

         product_details = {
            "id":item.p_id,
            "product_name": product.product_name,
            "item_count": item.item_count,
            "category": product.category,
            "product_image": product.product_image,
            "actual_product_price": product.actual_product_price,
            "discounted_price": product.discounted_price,
            "discount_percentage": product.discount_percentage,
            "product_link": product.product_link,
            "description": product.description,
        }
         cart_details.append(product_details)

        
    return JsonResponse((cart_details), safe=False, status=200)


class ReviewAPI(APIView):
    def get(self, request):

        #Fetch all reviews with optional filters: category and subcategory_id.
        category = request.query_params.get('category')  # e.g., 'product', 'hospital'
        subcategory_id = request.query_params.get('subcategory_id')  # e.g., specific product ID

        reviews = Review.objects.all()
        if category:
            reviews = reviews.filter(category=category)
        if subcategory_id:
            reviews = reviews.filter(subcategory_id=subcategory_id)

        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        
        # Create or update a review. Payload should include:
        # - category, subcategory_id, review_comment, review_stars
        
        if not request.user.is_authenticated:
            return Response({"error": "User must be authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

        # Extract the data from the request
        user_id = request.user.id  # Directly fetch user ID from the authenticated user
        category = request.data.get('category')
        subcategory_id = request.data.get('subcategory_id')
        review_comment = request.data.get('review_comment')
        review_stars = request.data.get('review_stars')

        # Validate required fields
        if not all([user_id, category, subcategory_id, review_comment, review_stars]):
            return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

        # Create or update the review
        review, created = Review.objects.update_or_create(
            user_id=user_id,  # Use user_id directly
            category=category,
            subcategory_id=subcategory_id,
            defaults={
                'review_comment': review_comment,
                'review_stars': review_stars,
            }
        )

        # Serialize the review object to send as the response
        serializer = ReviewSerializer(review)
        status_code = status.HTTP_201_CREATED if created else status.HTTP_200_OK
        return Response(serializer.data, status=status_code)




class OrderListView(ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        status_filter = self.request.query_params.get('status', None)
        if status_filter:
            return Order.objects.filter(status=status_filter)
        return Order.objects.all()

class OrderDetailView(RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class UploadCSVView(APIView):
    def post(self, request, *args, **kwargs):
        csv_file = request.FILES.get('file', None)
        if not csv_file:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not csv_file.name.endswith('.csv'):
            return Response({"error": "File is not in CSV format"}, status=status.HTTP_400_BAD_REQUEST)

        data = csv_file.read().decode('utf-8').splitlines()
        reader = csv.DictReader(data)

        for row in reader:
            customer, created = Customer.objects.get_or_create(
                name=row['customer_name'],
                email=row['customer_email'],
                user_id=row['customer_user_id']
            )
            Order.objects.create(
                customer=customer,
                order_info=row['order_info'],
                product=row['product'],
                timeline=row['timeline'],
                total_cost=row['total_cost'],
                status=row['status']
            )

        return Response({"message": "CSV data uploaded successfully"}, status=status.HTTP_201_CREATED)


class AddProductView(APIView):
    def post(self, request, *args, **kwargs):
        product_name = request.data.get('product')
        try:
            order = Order.objects.get(product=product_name)
            order.item_count -= 1
            order.save()
            return Response({"message": "Product added and inventory updated"}, status=status.HTTP_200_OK)
        except Order.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def upload_csv(request):
    if 'file' not in request.FILES:
        return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

    csv_file = request.FILES['file']
    if not csv_file.name.endswith('.csv'):
        return Response({"error": "File must be a CSV"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        data_set = TextIOWrapper(csv_file.file, encoding='utf-8')
        reader = csv.DictReader(data_set)

        for row in reader:
            required_fields = ['Product Name', 'Size', 'Units', 'Item Count', 'MRP']
            for field in required_fields:
                if not row.get(field):
                    return Response(
                        {"error": f"Missing {field} in row: {row}"}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )

            Product.objects.update_or_create(
                product_name=row['Product Name'],
                size=row['Size'],
                units=row['Units'],
                defaults={
                    'item_count': int(row['Item Count']),
                    'mrp': float(row['MRP']),
                }
            )

        return Response({"message": "Data uploaded successfully"}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Temporary storage for bill before final save
TEMP_BILL = {"products": [], "total_value": 0}

@api_view(['POST'])
def add_product_to_bill(request):
    """
    Add a product to the temporary bill.
    """
    product_id = request.data.get('product_id')
    if not product_id:
        return Response({"error": "Product ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Get product
        product = Product.objects.get(id=product_id)
        if product.item_count < 1:
            return Response({"error": f"Insufficient stock for {product.product_name}"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Decrement product item_count
        product.item_count -= 1
        product.save()

        # Add product to TEMP_BILL
        TEMP_BILL["products"].append({
            "product_name": product.product_name,
            "size": product.size,
            "units": product.units,
            "mrp": product.mrp
        })
        TEMP_BILL["total_value"] += product.mrp

        return Response({"message": "Product added to bill", "bill": TEMP_BILL}, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def save_bill(request):
    global TEMP_BILL
    if not TEMP_BILL["products"]:
        return Response({"error": "No products in the bill to save"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        for product in TEMP_BILL["products"]:
            if isinstance(product['mrp'], Decimal):
                product['mrp'] = float(product['mrp'])

     
        with transaction.atomic():
            bill = Bill.objects.create(
                products=TEMP_BILL["products"],
                total_value=float(TEMP_BILL["total_value"])  
            )
            TEMP_BILL = {"products": [], "total_value": 0.0}

        return Response({"message": "Bill saved successfully", "bill_id": bill.id}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['GET'])
def get_all_bills(request):
    """
    Get all saved bills.
    """
    bills = Bill.objects.all()
    bill_data = [{
        "id": bill.id,
        "products": bill.products,
        "total_value": bill.total_value,
        "created_at": bill.created_at
    } for bill in bills]
    return Response(bill_data, status=status.HTTP_200_OK)
class DoctorNotificationsView(APIView):
    def get(self, request):
        doctor_id = request.user.id  # Assuming the doctor is authenticated and `request.user` is the doctor
        
        try:
            doctor = Doctors.objects.get(id=doctor_id)
        except Doctors.DoesNotExist:
            return Response({"error": "Invalid doctor ID."}, status=status.HTTP_404_NOT_FOUND)

        notifications = Notification.objects.filter(doctor=doctor).order_by('-created_at')
        notifications_data = [
            {
                "id": n.id,
                "message": n.message,
                "consultation_type": n.consultation_type,
                "created_at": n.created_at,
                "is_read": n.is_read
            }
            for n in notifications
        ]

        return Response({"notifications": notifications_data}, status=status.HTTP_200_OK)
    
class GetUserInfoView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is logged in

    def get(self, request):
        try:
            # Get the logged-in user
            user = request.user

            # Retrieve the corresponding UserInfo instance
            user_info = UserInfo.objects.get(user_account=user)

            # Serialize the user and user_info data
            user_serializer = UserAccountSerializer(user)
            user_info_serializer = UserInfoSerializer(user_info)

            # Return the combined response
            return Response({
                "user": user_serializer.data,
                "user_info": user_info_serializer.data
            }, status=status.HTTP_200_OK)
        except UserInfo.DoesNotExist:
            return Response({"error": "User Info not found for the logged-in user."},
                            status=status.HTTP_404_NOT_FOUND)
        
@csrf_exempt
def questions_api(request):
    if request.method == 'GET':
        questions = Question.objects.all().values(
            'sr_no', 'category', 'question_english', 'question_hindi',
        )
        return JsonResponse({"questions": list(questions)}, safe=False)

    elif request.method == 'POST':
        data = json.loads(request.body)  
        try:
            question_id = data.get('question_id')
            answer = data.get('answer')
            
            if not question_id or not answer:
                return JsonResponse({"error": "question_id and answer are required."}, status=400)

            question = Question.objects.filter(id=question_id).first()
            if not question:
                return JsonResponse({"error": "Question not found."}, status=404)

            question.answers = answer
            question.save()

            return JsonResponse({"message": "Answer updated successfully.", "question": {
                "id": question.id,
                "question_english": question.question_english,
                "answer": question.answers
            }}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)

    else:
        return JsonResponse({"error": "Invalid request method. Use GET or POST."}, status=405)
 
import logging

logger = logging.getLogger(__name__)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_cart(request):
    try:
        user_id = request.user.id
        logger.debug(f"Fetching cart for user_id: {user_id}")

        cart_items = Cart.objects.filter(user_id=user_id)
        if not cart_items.exists():
            logger.debug(f"No cart items found for user_id: {user_id}")
            return Response({"cart": []}, status=200)

        cart_data = [
            {
                "id": item.id,
                "user_id": str(item.user_id),
                "p_id": item.p_id,
                "item_count": item.item_count,
            }
            for item in cart_items
        ]
        return Response(cart_data, status=200)

    except Exception as e:
        logger.error(f"Error fetching cart: {e}")
        return Response({"error": str(e)}, status=500)
from .mlmodels.predict_dysarthria import predict_dysarthria_audio_class
import os


class AudioPredictionDysarthriaView(APIView):
    """
    API to analyze an audio file and predict disease classification.
    """

    def post(self, request):
        # Check if an audio file is provided
        audio_file = request.FILES.get('audio')
        if not audio_file:
            return Response(
                {"error": "No audio file provided."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Save the uploaded audio to a temporary location
            temp_file_path = "temp_audio.wav"
            with open(temp_file_path, 'wb') as f:
                for chunk in audio_file.chunks():
                    f.write(chunk)

            # Run the prediction
            final_class, model_predictions = predict_dysarthria_audio_class(temp_file_path)

            # Clean up the temporary file
            os.remove(temp_file_path)

            # Return the result
            return Response({
                "message": "Prediction successful.",
                "final_class": final_class,
                "model_predictions": model_predictions
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
from .mlmodels.predict_dementia import predict_dementia_audio_class
class AudioPredictionDementiaView(APIView):
    """
    API to analyze an audio file and predict disease classification.
    """

    def post(self, request):
        # Check if an audio file is provided
        audio_file = request.FILES.get('audio')
        if not audio_file:
            return Response(
                {"error": "No audio file provided."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Save the uploaded audio to a temporary location
            temp_file_path = "temp_audio.wav"
            with open(temp_file_path, 'wb') as f:
                for chunk in audio_file.chunks():
                    f.write(chunk)

            # Run the prediction
            final_class, model_predictions = predict_dementia_audio_class(temp_file_path)

            # Clean up the temporary file
            os.remove(temp_file_path)

            # Return the result
            return Response({
                "message": "Prediction successful.",
                "final_class": final_class,
                "model_predictions": model_predictions
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
from .mlmodels.predict_parkinson import predict_parkinson_audio_class
class AudioPredictionParkinsonView(APIView):
    """
    API to analyze an audio file and predict disease classification.
    """

    def post(self, request):
        # Check if an audio file is provided
        audio_file = request.FILES.get('audio')
        if not audio_file:
            return Response(
                {"error": "No audio file provided."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Save the uploaded audio to a temporary location
            temp_file_path = "temp_audio.wav"
            with open(temp_file_path, 'wb') as f:
                for chunk in audio_file.chunks():
                    f.write(chunk)

            # Run the prediction
            final_class, model_predictions = predict_parkinson_audio_class(temp_file_path)

            # Clean up the temporary file
            os.remove(temp_file_path)

            # Return the result
            return Response({
                "message": "Prediction successful.",
                "final_class": final_class,
                "model_predictions": model_predictions
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
from .mlmodels.tumor_detection import predict_image_class
class ImagePredictionTumor(APIView):
    """
    API to analyze an image file and predict disease classification.
    """

    def post(self, request):
        # Check if an image file is provided
        image_file = request.FILES.get('image')
        if not image_file:
            return Response(
                {"error": "No image file provided."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Save the uploaded image to a temporary location
            temp_file_path = "temp_image.jpg"
            with open(temp_file_path, 'wb') as f:
                for chunk in image_file.chunks():
                    f.write(chunk)

            # Run the prediction
            final_class, confidence = predict_image_class(temp_file_path)

            # Clean up the temporary file
            os.remove(temp_file_path)

            # Return the result
            return Response({
                "message": "Prediction successful.",
                "final_class": final_class,
                "confidence": confidence
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
from .mlmodels.tb_detection import predict_image_class1
class ImagePredictionTb(APIView):
    """
    API to analyze an image file and predict disease classification.
    """

    def post(self, request):
        # Check if an image file is provided
        image_file = request.FILES.get('image')
        if not image_file:
            return Response(
                {"error": "No image file provided."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Save the uploaded image to a temporary location
            temp_file_path = "temp_image.jpg"
            with open(temp_file_path, 'wb') as f:
                for chunk in image_file.chunks():
                    f.write(chunk)

            # Run the prediction
            final_class, confidence = predict_image_class1(temp_file_path)

            # Clean up the temporary file
            os.remove(temp_file_path)

            # Return the result
            return Response({
                "message": "Prediction successful.",
                "final_class": final_class,
                "confidence": confidence
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
from django.shortcuts import get_object_or_404
class UpdateUserInfoView(APIView):

    def put(self, request):
        # Get the logged-in user's UserAccount instance
        user_account = request.user

        # Retrieve the UserInfo instance for the logged-in user
        user_info = get_object_or_404(UserInfo, user_account=user_account)

        # Update the UserInfo instance with the data provided
        serializer = UserInfoSerializer(user_info, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User information updated successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)