import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image

import os
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# model_path = os.path.join(BASE_DIR, 'app', 'mlmodels',"mlmodelfiles", "tumor_classification_model.h5")
model_path="/home/agrima/Desktop/curr-projects/EasyDiagnosis/Backend/easy_diagnosis/app/mlmodels/mlmodelfiles/tumor_classification_model.h5"
# Load the trained model
model = tf.keras.models.load_model(model_path)

# Function to load and preprocess the image
def preprocess_image(img_path, target_size=(128, 128)):
    img = image.load_img(img_path, target_size=target_size)  # Load image
    img_array = image.img_to_array(img)  # Convert to numpy array
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array = img_array / 255.0  # Normalize image to [0, 1] range
    return img_array

# Function to predict the class of the image
def predict_image_class(img_path):
    # Preprocess the image
    img_array = preprocess_image(img_path)

    # Make a prediction
    prediction = model.predict(img_array)
    # Convert the prediction to a class (Normal: 0, Tuberculosis: 1)
    predicted_class = "Normal" if prediction[0] < 0.5 else "tumor"
    confidence = (1 - prediction[0]) * 100 if prediction[0] < 0.5 else prediction[0] * 100

    return predicted_class, confidence

# Main function to test the model with an input image
if __name__ == "__main__":
    # Provide the path to the input image
    img_path = "/home/dml-harshvardhan/hvs_workspace/diease_detection/Tumor/1no.jpeg"  # Replace with the actual image path

    # Predict the class and confidence
    predicted_class, confidence = predict_image_class(img_path)


    # Print the prediction result
    print(f"Predicted Class: {predicted_class}")
    print(f"Confidence: {confidence}%")

