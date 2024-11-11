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



