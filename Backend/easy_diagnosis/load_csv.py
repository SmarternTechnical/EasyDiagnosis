import csv
from app.models import Question

def load_csv_to_db(file_path):
    with open(file_path, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            try:
                sr_no = int(row['Sr No']) if row['Sr No'].strip() else None
                if sr_no is None:
                    print(f"Skipping row due to missing Sr No: {row}")
                    continue  # Skip rows with invalid `Sr No`
                Question.objects.create(
                    sr_no=sr_no,
                    category=row['Category'],
                    question_english=row['Question in English'],
                    question_hindi=row['Question in Hindi'],
                    # options=row['options'],
                )
            except ValueError as e:
                print(f"Error processing row: {row} - {e}")
    print("Data loaded successfully!")
