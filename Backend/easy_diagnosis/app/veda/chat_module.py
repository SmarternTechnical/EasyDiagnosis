import os
from dotenv import load_dotenv
from groq import Groq
import re
import json

# Load environment variables
load_dotenv()

# Define the function to fetch a response from the Groq API
def get_groq_response(prompt, model="llama-3.3-70b-versatile"):
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    
    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "Behave like a Medical Professional Doctor"},
            {"role": "user", "content": prompt},
        ],
        model=model,
    )
    
    return chat_completion.choices[0].message.content



def parse_and_save_to_json(input_text, output_file="groq_res.json"):

    # Regular expression to extract text starting from { and ending with }
    pattern = r"\{(.*?)\}"  # Captures text between { and }

    # Extract the content
    match = re.search(pattern, input_text, re.DOTALL)
    if match:
        extracted_text = match.group(0)

        # Convert the extracted text into a JSON-like dictionary
        try:
            # Replace : with " : " and add quotes around keys and values
            extracted_text = re.sub(r'(\w+)\s*:', r'"\1":', extracted_text)
            extracted_text = re.sub(r':\s*(\w+)', r': "\1"', extracted_text)

            # Parse the string to a dictionary
            json_data = json.loads(extracted_text)

            # Save the dictionary as a JSON file
            with open(output_file, 'w') as json_file:
                json.dump(json_data, json_file, indent=4, ensure_ascii=False)

            print(f"JSON data successfully saved to {output_file}")
            return json_data
        except json.JSONDecodeError as e:
            return "Error parsing JSON: {e}"
    else:
        return "No valid JSON data found in the input text."

# Example usage
def med_doc(user_prompt):
    
    prompt = f'''
    {user_prompt}
    return in the json format like 
    {{
        disease: disease to patient
        description: message from the doctor
        medicines: presescribed medicines seperated by comma
        Test_suggestions : recommend for tests if required
        precautions: give daily life precautions and suggestions
        language: hindi or english (in which language the user speaks)

    }}
    '''
    response = get_groq_response(prompt)
    json_res = parse_and_save_to_json(response)
    #print(response)
    return json_res
    
def bot_res(user_prompt):
    
   
    response = get_groq_response(user_prompt)
    #print(response)
    return response
    
# res = med_doc("i am having migraine from 2 years")
# print(res) 


