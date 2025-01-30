import json

# Load the JSON data from file
def load_data(file_path):
    with open(file_path, "r") as f:
        return json.load(f)

def department_sel(text):
    if "surgeon" in text.lower():
        return "surgeon"
    elif "dentist" in text.lower():
        return "dentist"
    elif "physiotherapist" in text.lower():
        return "physiotherapist"
    else:
        return "general"

# Fetch all details of a specific department
def fetch_by_department(data, department):
    department = department.lower()
    matching_records = [record for record in data if record["department"].lower() == department]
    print(f"Number of items found: {len(matching_records)}")
    return len(matching_records)

# Fetch the record with the minimum distance for a specific department
def fetch_min_distance(data, department):
    department = department.lower()
    filtered_records = [record for record in data if record["department"].lower() == department]
    if not filtered_records:
        print("No records found for the given department.")
        return None
    
    min_distance_record = min(filtered_records, key=lambda x: float(x["distance_from_you"].replace(" km", "")))
    dept, doc_name, fee, distance, review = extract_values(min_distance_record)
    return dept, doc_name, fee, distance, review

# Extract values from a record into variables
def extract_values(record):
    department = record.get("department", "")
    doctor_name = record.get("doctor_name", "")
    fees = record.get("fees", "")
    distance_from_you = record.get("distance_from_you", "")
    reviews = record.get("reviews", 0)
    return department, doctor_name, fees, distance_from_you, reviews

# # Example usage
# if __name__ == "__main__":
#     file_path = "doctors_records.json"  # Replace with the correct file path
#     data = load_data(file_path)

#     # Fetch all records for a department
#     department_to_search = "ent"
#     records = fetch_by_department(data, department_to_search)
#     print("Records:", records)

#     # Fetch the record with the minimum distance
#     min_distance_record = fetch_min_distance(data, department_to_search)
#     print("Record with minimum distance:", min_distance_record)
