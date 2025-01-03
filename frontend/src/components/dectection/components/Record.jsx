import React, { useState } from "react";
import QuestionPopup from "./DetectionQuestions";

const Recorder = ({ disease }) => {
  const questions = [
    {
      id: 1,
      en: "Do you have difficulty making eye contact?",
      hi: "क्या आपको आँखों से संपर्क बनाने में कठिनाई होती है?",
    },
    {
      id: 2,
      en: "Do you find it hard to understand social cues?",
      hi: "क्या आपको सामाजिक संकेत समझने में कठिनाई होती है?",
    },
    {
      id: 3,
      en: "Do you repeat words or phrases often?",
      hi: "क्या आप शब्दों या वाक्यांशों को बार-बार दोहराते हैं?",
    },
    {
      id: 4,
      en: "Do you prefer routines and dislike changes?",
      hi: "क्या आप दिनचर्या पसंद करते हैं और बदलाव नापसंद करते हैं?",
    },
    {
      id: 5,
      en: "Do you avoid physical contact?",
      hi: "क्या आप शारीरिक संपर्क से बचते हैं?",
    },
  ];

  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [recorderNode, setRecorderNode] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [key, setKey] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State for popup visibility

  // Start recording
  const handleStartRecording = async () => {
    try {
      // Initialize Audio Context and Media Stream
      const context = new AudioContext({ sampleRate: 16000 });
      await context.audioWorklet.addModule("/recorder-worklet.js");

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1 },
      });
      const source = context.createMediaStreamSource(stream);

      const recorder = new AudioWorkletNode(context, "recorder-worklet");
      recorder.port.onmessage = (event) => {
        if (event.data) {
          setAudioChunks((prevChunks) => [...prevChunks, ...event.data]);
        }
      };

      source.connect(recorder);

      // Update state with audio resources
      setAudioContext(context);
      setMediaStream(stream);
      setRecorderNode(recorder);

      // Start recording
      recorder.connect(context.destination);
      console.log("Recording started...");
      setIsRecording(true);
      setCurrentQuestionIndex(0);
      setIsPopupVisible(true); // Show the popup when recording starts
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Error accessing microphone. Please check your device settings.");
    }
  };

  // Stop recording
  const handleStopRecording = () => {
    if (audioContext && recorderNode) {
      recorderNode.disconnect();
      console.log("Recording stopped.");

      if (audioChunks.length > 0) {
        const samples = new Int16Array(audioChunks.flat());
        const wavBlob = encodeWAV(samples, 16000);
        const audioUrl = URL.createObjectURL(wavBlob);

        setAudioUrl(audioUrl);
        console.log("Audio data processed and URL generated.");
      } else {
        console.log("No audio data recorded.");
        alert("No audio data recorded.");
      }

      // Cleanup resources
      mediaStream?.getTracks().forEach((track) => track.stop());
      audioContext?.close();

      setAudioContext(null);
      setMediaStream(null);
      setRecorderNode(null);
      setIsRecording(false);
      setCurrentQuestionIndex(0);
    }
  };

  // Encode audio into WAV format
  const encodeWAV = (samples, sampleRate) => {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(view, 8, "WAVE");
    writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, 1, true); // Mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true); // 2 bytes per sample
    view.setUint16(32, 2, true); // 2 bytes per sample
    view.setUint16(34, 16, true); // 16-bit depth
    writeString(view, 36, "data");
    view.setUint32(40, samples.length * 2, true);

    let offset = 44;
    for (let i = 0; i < samples.length; i++, offset += 2) {
      view.setInt16(offset, samples[i], true);
    }

    return new Blob([view], { type: "audio/wav" });
  };

  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  // Submit the audio file
  const handleSubmit = async () => {
    if (audioUrl) {
      try {
        const formData = new FormData();
        const audioBlob = await fetch(audioUrl).then((res) => res.blob());
        formData.append("audio", audioBlob, "audio.wav");

        const response = await fetch(
          `http://127.0.0.1:8000/predict-audio-${disease}/`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        console.log("Prediction response:", data);
        setPredictionResult(data);
      } catch (error) {
        console.error("Error submitting audio:", error);
        alert("Error submitting audio.");
      }
    } else {
      alert("No audio to submit.");
    }
  };

  // Reset the component and prediction result for a new recording
  const handleNewRecording = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to trigger remount
    setAudioChunks([]);
    setAudioUrl(null);
    setPredictionResult(null);
    setIsRecording(false); // Ensure recording is stopped
    setIsPopupVisible(false); // Close the popup when starting new recording
  };

  // Handle popup close action
  const closePopup = () => {
    setIsPopupVisible(false); // Close the popup
  };

  // Handle finishing the quiz
  const handleFinishQuiz = () => {
    setIsPopupVisible(false); // Close popup when finishing the quiz
  };

  return (
    <div key={key}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-semibold text-[#19456B] text-center mb-4">
          Record Audio for {disease}
        </h1>
        <div className="w-full max-w-xs p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Audio Recording
          </h2>

          <button
            onClick={() => {
              if (isRecording) {
                handleStopRecording();
              } else {
                handleStartRecording();
              }
            }}
            className={`px-6 py-3 rounded-lg shadow-lg w-full mb-4 ${
              isRecording ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>

          {isRecording && (
            <p className="text-yellow-600 font-semibold text-center">
              Recording...
            </p>
          )}

          {audioUrl && (
            <div className="mt-4">
              <h4 className="text-md text-[#19456B] mb-2">Recording Preview</h4>
              <audio controls>
                <source src={audioUrl} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>

              <button
                onClick={handleSubmit}
                className="mt-4 px-6 py-3 rounded-lg bg-blue-500 text-white w-full"
              >
                Submit Audio
              </button>
            </div>
          )}

          {predictionResult && (
            <div className="mt-8 p-6 bg-[#F3FCF6] rounded-xl shadow-xl">
              <h3 className="text-xl font-semibold text-[#19456B] mb-4">
                Prediction Result
              </h3>
              <p className="text-md text-[#19456B] mb-2">
                Message: {predictionResult.message}
              </p>
              <p className="text-md text-[#19456B] mb-2">
                Final Class: {predictionResult.final_class}
              </p>
            </div>
          )}

          <button
            onClick={handleNewRecording}
            className="mt-4 px-6 py-3 rounded-lg bg-green-500 w-full"
          >
            Start New Recording
          </button>
        </div>
      </div>

      {isPopupVisible && (
        <QuestionPopup
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          handleFinish={handleFinishQuiz}
          closePopup={closePopup} // Pass closePopup function
        />
      )}
    </div>
  );
};

export default Recorder;
