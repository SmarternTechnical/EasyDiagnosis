import random
from chat_module import med_doc

def is_med_pres(text):
    # Define a list of greetings in English and Hindi
    greetings = [
        "prescribe", "prescription", "medicines", "medicine"
    ]

    # Normalize text to lowercase for comparison
    normalized_text = text.lower()

    # Check if the text matches any greeting
    for greeting in greetings:
        if greeting in normalized_text:
            return True
    return False



def respond_to_med(text):
    # List of possible responses
    response = med_doc(text)
    medicines = response.get("medicines","")
    description = response.get("description","")
    precautions = response.get("precautions","")
    language = response.get("language","")
    disease = response.get("disease","")
    return medicines, description, precautions, language,disease
    

    # Return a random response
    



# # Example Usage
# if __name__ == "__main__":
#     user_input = "hay doctor vedar thanks for asking what about you"
#     response = check_and_respond(user_input)
#     print(response)
