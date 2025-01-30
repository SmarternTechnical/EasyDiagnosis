from gtts import gTTS
import os
from audio_play import play_mp3

def text_to_speech(text, output_file="output.mp3", language="en"):
    try:
        # Create a gTTS object
        print("language: ",language)
        tts = gTTS(text=text, lang=language, slow=False)

        # Save the audio file
        tts.save(output_file)
        print(f"Speech saved to '{output_file}'")

        # Optionally, play the audio file
        os.system(f"start {output_file}" if os.name == "nt" else f"open {output_file}")
        play_mp3(output_file)
        return output_file

    except Exception as e:
        print("An error occurred:", e)

# Example usage
if __name__ == "__main__":
    text = "Hello! This is an example of text-to-speech conversion in Python."
    text_to_speech(text)

