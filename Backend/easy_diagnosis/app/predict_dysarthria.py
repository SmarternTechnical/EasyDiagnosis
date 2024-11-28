import os
import librosa
import numpy as np
import pickle
from collections import Counter

from django.conf import settings
from pathlib import Path

# Get the absolute path to the 'audio_classification_Dysarthria' directory
models_dir = settings.BASE_DIR / 'app' / 'audio_classification_Dysarthria'

# Load the models
models = {}
for model_file in os.listdir(models_dir):
    if model_file.endswith(".pkl"):
        model_name = model_file.split(".")[0]
        model_path = os.path.join(models_dir, model_file)
        with open(model_path, "rb") as f:
            models[model_name] = pickle.load(f)

# Function to extract MFCC features from a single audio file
def extract_features_from_audio(filepath):
    try:
        y, sr = librosa.load(filepath, sr=None)
        if len(y) == 0:
            print("The audio file is empty.")
            return None
        
        mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
        if mfcc.shape[1] < 9:  # Ensure enough frames for delta computation
            print("The audio file is too short for feature extraction.")
            return None
        
        delta_mfcc = librosa.feature.delta(mfcc)
        delta2_mfcc = librosa.feature.delta(mfcc, order=2)
        
        features = []
        features.extend(np.mean(mfcc, axis=1))
        features.extend(np.mean(delta_mfcc, axis=1))
        features.extend(np.mean(delta2_mfcc, axis=1))
        return np.array(features)
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return None

# Function to predict the class of an audio file
def predict_dysarthria_audio_class(filepath):
    features = extract_features_from_audio(filepath)
    if features is None:
        return
    
    predictions = []
    for model_name, model in models.items():
        prediction = model.predict([features])[0]  # Predict using the model
        predictions.append(prediction)  # Append the prediction (0 or 1)
    
    # Majority Voting
    final_prediction = Counter(predictions).most_common(1)[0][0]
    final_class = "Normal" if final_prediction == 1 else "Dysarthria"
    return final_class, predictions

