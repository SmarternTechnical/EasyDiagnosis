from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import MedicalServiceCategory, PharmaSupport, UserAccount
import csv
from io import TextIOWrapper
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserAccountSerializer
from django.contrib.auth.hashers import make_password, check_password


class SignUpView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if UserAccount.objects.filter(email=email).exists():
            return Response({"message": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user_account = UserAccount(email=email, password=make_password(password))
        user_account.save()

        return Response({"message": "Account has been created"}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user_account = UserAccount.objects.get(email=email)
        except UserAccount.DoesNotExist:
            return Response({"message": "Invalid email or password"}, status=status.HTTP_404_NOT_FOUND)

        if check_password(password, user_account.password):
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def upload_csv_and_replace_table(request):
    # Ensure the request contains a file
    if 'file' not in request.FILES:
        return JsonResponse({"error": "No file provided"}, status=400)

    # Ensure the request contains a table_code parameter
    table_code = request.data.get('table_code')
    if not table_code:
        return JsonResponse({"error": "No table_code provided"}, status=400)
    
    try:
        table_code = int(table_code)
    except ValueError:
        return JsonResponse({"error": "table_code must be an integer"}, status=400)

    # Parse the file
    csv_file = request.FILES['file']
    
    # Ensure it's a CSV file
    if not csv_file.name.endswith('.csv'):
        return JsonResponse({"error": "File is not a CSV"}, status=400)

    # Read the CSV file and parse it
    data_set = TextIOWrapper(csv_file.file, encoding='utf-8')
    reader = csv.DictReader(data_set)  # Use DictReader to get rows as dictionaries

    # Determine the target model based on table_code
    if table_code == 1:
        model = MedicalServiceCategory
    elif table_code == 2:
        model = PharmaSupport
    else:
        return JsonResponse({"error": "Invalid table_code. Use 1 for MedServiceCategory, 2 for PharmaSupport"}, status=400)

    # Get the model's field names to compare with CSV headers
    model_fields = [f.name for f in model._meta.fields]

    # Check if the CSV has any matching column names
    csv_headers = reader.fieldnames
    matching_columns = [header for header in csv_headers if header in model_fields]

    if not matching_columns:
        return JsonResponse({"error": "No matching columns found in the CSV"}, status=400)

    # Clear existing data in the selected table
    model.objects.all().delete()

    # Insert new data from CSV, only for the matching columns
    for row in reader:
        # Create a dictionary for only the matching columns
        data_to_insert = {column: row[column] for column in matching_columns}
        model.objects.create(**data_to_insert)

    return JsonResponse({"success": f"Data successfully replaced in {model.__name__} table"}, status=200)


@api_view(['GET'])
def get_category_details(request):
    # Get the category from the request query parameters
    category = request.query_params.get('category')
    
    # Check if the category parameter was provided
    if not category:
        return JsonResponse({"error": "Category parameter is required."}, status=400)

    # Filter the MedServiceCategory objects based on the category
    matched_entries = MedicalServiceCategory.objects.filter(category=category).values('name', 'image_path', 'category')

    # Check if any entries were found
    if not matched_entries:
        return JsonResponse({"error": "No matching entries found for the provided category."}, status=404)

    # Return the matched entries as a JSON response
    return JsonResponse(list(matched_entries), safe=False, status=200)
