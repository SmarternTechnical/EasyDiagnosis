import sounddevice as sd
import scipy.io.wavfile as wav
import speech_recognition as sr
import os
import numpy as np

def listen_and_transcribe(sample_rate=16000, silence_duration=2):
    # Initialize recognizer
    recognizer = sr.Recognizer()

    # Parameters for silence detection
    silence_threshold = 500  # Adjust based on the microphone's noise level
    silence_duration_samples = silence_duration * sample_rate

    print("Recording...")

    # Buffer to store audio samples
    audio_buffer = []
    silent_samples = 0

    def callback(indata, frames, time, status):
        nonlocal silent_samples, audio_buffer

        # Flatten the recorded audio data
        audio_buffer.extend(indata[:, 0])

        # Calculate the volume of the current frame
        volume = np.abs(indata).mean()

        # Check for silence
        if volume < silence_threshold:
            silent_samples += frames
        else:
            silent_samples = 0

        # Stop the stream if silence duration exceeds the threshold
        if silent_samples >= silence_duration_samples:
            raise sd.CallbackStop()

    # Record audio with the callback to stop on silence
    try:
        with sd.InputStream(callback=callback, channels=1, samplerate=sample_rate, dtype='int16') as stream:
            stream.start()
            while stream.active:
                sd.sleep(100)  # Keep the stream active
    except sd.CallbackStop:
        pass

    # Convert audio buffer to a numpy array
    audio_data = np.array(audio_buffer, dtype='int16')

    # Save the audio data as a WAV file
    temp_wav_path = 'temp_audio.wav'
    wav.write(temp_wav_path, sample_rate, audio_data)

    # Load the audio file
    with sr.AudioFile(temp_wav_path) as source:
        # Record the audio data from the file
        audio_data = recognizer.record(source)

        try:
            # Recognize speech using Google Web Speech API
            text = recognizer.recognize_google(audio_data)
        except sr.UnknownValueError:
            # Google Speech Recognition could not understand the audio
            text = "Sorry, I could not understand the audio."
        except sr.RequestError as e:
            # Google Speech Recognition request failed
            text = f"Sorry, there was an error with the request: {e}"

    # Remove the temporary WAV file
    os.remove(temp_wav_path)
    print("Processing")

    return text
