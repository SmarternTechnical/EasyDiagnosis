from speech2txt import listen_and_transcribe
from greeting import is_greeting, respond_to_greeting
from booking import *
from medicine import *
from doctors import *
from chat_module import bot_res
from text2speech import text_to_speech
#from audio_play import play_mp3

name = "Harshvardhan"
text = f"Hi {name}, I am Dr. Veda How are you?"
print(text)
text_to_speech(text)

while True:
    text = listen_and_transcribe()
    if text == "Sorry, I could not understand the audio.":
        print("Pass")
        continue
    print(text)
    if is_greeting(text):
        text_to_speech(respond_to_greeting())
    elif is_med_pres(text):
        medicines, description, precautions, language, disease = respond_to_med(text)
        say = f"As you are suffering from {disease} so i prescribed you with {medicines} and i suggest you to take precautions like {precautions}. Is there's anything else i can do for you?"
        text_to_speech(say)
    elif is_booking(text):
        text_to_speech(respond_to_booking())
        data = load_data("doctors_records.json")
        department = department_sel(text)
        print(department)
        doc_len = fetch_by_department(data, department)
        dept, doc_name, fee, distance, review = fetch_min_distance(data, department)

        say = f"According to my records There are {doc_len} {department} doctors out of which {doc_name} is very near to you with the distance of {distance} and price is {fee}. So, Can I book an appointment?"
        text_to_speech(say)
        text = listen_and_transcribe()
        if text == "yes":
            say = "ok Harshvardhan! Your Booking request has been Sent!. is there's anything else i can do for you?"
            text_to_speech(say)
        else:
            say = "Ok Harshvardhan! Is there's anything else i can do for you?"
            text_to_speech(say)
    
   

    else:
        if "bye" in text:
            response = f"ok! bye {name}"
            audio_file = text_to_speech(response)
            break
        # response = med_doc(text)
        #lang = 'hi'
        text_to_speech(bot_res(text))

print("Exit!!")
    
    
    



