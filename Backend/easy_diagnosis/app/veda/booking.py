import random

def is_booking(text):
    # Define a list of greetings in English and Hindi
    greetings = [
        "book", "appointment", "book an appointment"
    ]

    # Normalize text to lowercase for comparison
    normalized_text = text.lower()

    # Check if the text matches any greeting
    for greeting in greetings:
        if greeting in normalized_text:
            return True
    return False



def respond_to_booking():
    # List of possible responses
    responses = [
        "ok! Let me check my records!"
        # "Hi there! Hope you're doing well!",
        # "Namaste! Aap kaise hain?",
        # "Hey! What's going on?",
        # "Good to see you! How can I help?",
        # "Pranam! Main madad ke liye yahan hoon!"
    ]

    # Return a random response
    return random.choice(responses)



# # Example Usage
# if __name__ == "__main__":
#     user_input = "hay doctor vedar thanks for asking what about you"
#     response = check_and_respond(user_input)
#     print(response)
