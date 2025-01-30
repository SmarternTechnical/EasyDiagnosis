import random

def is_greeting(text):
    # Define a list of greetings in English and Hindi
    greetings = [
        "hi", "hello", "hey", "how are you"
    ]

    # Normalize text to lowercase for comparison
    normalized_text = text.lower()

    # Check if the text matches any greeting
    for greeting in greetings:
        if greeting in normalized_text:
            return True
    return False

def respond_to_greeting():
    # List of possible responses
    responses = [
        "i am good, thanks for asking, How can I assist you today?"
        # "Hi there! Hope you're doing well!",
        # "Namaste! Aap kaise hain?",
        # "Hey! What's going on?",
        # "Good to see you! How can I help?",
        # "Pranam! Main madad ke liye yahan hoon!"
    ]

    # Return a random response
    return random.choice(responses)

def check_and_respond(text):
    if is_greeting(text):
        return respond_to_greeting()
    else:
        return "This doesn't seem like a greeting. Can I help you with something else?"

# Example Usage
if __name__ == "__main__":
    user_input = "hay doctor vedar thanks for asking what about you"
    response = check_and_respond(user_input)
    print(response)
