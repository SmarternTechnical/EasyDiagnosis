import React, { useState, useEffect } from "react";
import QuestionPopup from "./QuestionPopup.jsx";
import { useAudioRecorder } from "../../hooks/useAudioRecorder.js";

function AutismTest() {
  const questions = [
    { id: 1, en: "Do you have difficulty making eye contact?", hi: "क्या आपको आँखों से संपर्क बनाने में कठिनाई होती है?" },
    { id: 2, en: "Do you find it hard to understand social cues?", hi: "क्या आपको सामाजिक संकेत समझने में कठिनाई होती है?" },
    { id: 3, en: "Do you repeat words or phrases often?", hi: "क्या आप शब्दों या वाक्यांशों को बार-बार दोहराते हैं?" },
    { id: 4, en: "Do you prefer routines and dislike changes?", hi: "क्या आप दिनचर्या पसंद करते हैं और बदलाव नापसंद करते हैं?" },
    { id: 5, en: "Do you avoid physical contact?", hi: "क्या आप शारीरिक संपर्क से बचते हैं?" },
  ];

  const [isTestStarted, setIsTestStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecordingDownloaded, setIsRecordingDownloaded] = useState(false); // To show feedback to the user
  const { startRecording, stopRecording, recordedAudioUrl } = useAudioRecorder();

  const handleStart = async () => {
    setIsTestStarted(true);
    setCurrentQuestionIndex(0);
    setIsRecordingDownloaded(false); // Reset download state for a new test
    await startRecording(); // Start recording
  };

  const handleFinish = () => {
    stopRecording(); // Stop recording
    setIsTestStarted(false);
    setCurrentQuestionIndex(0);
  };

  // Trigger download when recordedAudioUrl is updated
  useEffect(() => {
    if (recordedAudioUrl) {
      const anchor = document.createElement("a");
      anchor.href = recordedAudioUrl;
      anchor.download = `test-recording-${new Date().toISOString().replace(/[:.]/g, "-")}.wav`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      setIsRecordingDownloaded(true); // Mark as downloaded
    }
  }, [recordedAudioUrl]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!isTestStarted && (
        <>
          <button
            onClick={handleStart}
            className="px-6 py-3 bg-[#1fab89] text-white rounded-lg shadow-lg hover:bg-[#159770]"
          >
            Start Test
          </button>
          {isRecordingDownloaded && (
            <p className="mt-4 text-green-600 font-semibold">
              Your test recording has been downloaded successfully!
            </p>
          )}
        </>
      )}

      {isTestStarted && (
        <QuestionPopup
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          handleFinish={handleFinish}
        />
      )}
    </div>
  );
}

export default AutismTest;
