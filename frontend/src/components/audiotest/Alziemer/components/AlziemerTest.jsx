import React, { useState, useEffect } from "react";
import QuestionPopup from "./QuestionPopup.jsx";
import { useAudioRecorder } from "../../hooks/useAudioRecorder.js";
import axios from "axios";  // Import axios

function AlzheimerTest() {
  const [questions, setQuestions] = useState([]); // Initialize as an array
  const [currentCategory, setCurrentCategory] = useState("Alzheimer_GDS"); // Default category
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isRecordingDownloaded, setIsRecordingDownloaded] = useState(false); // To show feedback to the user
  const { startRecording, stopRecording, recordedAudioUrl } = useAudioRecorder();

  useEffect(() => {
    // Fetch questions from API using axios
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/questions/");
        // Check if it's an array and set it
        if (Array.isArray(response.data.questions)) {
          setQuestions(response.data.questions); // Set the array of questions directly
        } else {
          console.error("Questions data is not in expected format");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleStart = async () => {
    setIsTestStarted(true);
    setIsRecordingDownloaded(false); // Reset download state for a new test
    await startRecording(); // Start recording
  };

  const handleFinish = () => {
    stopRecording(); // Stop recording
    setIsTestStarted(false);
    setCurrentCategory("Alzheimer_GDS"); // Reset to the first category
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
    <div className="flex flex-col items-center justify-center min-h-screen">
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
          questions={questions}  // Pass filtered questions
          setCurrentCategory={setCurrentCategory}
          currentCategory={currentCategory}
          handleFinish={handleFinish}
        />
      )}
    </div>
  );
}

export default AlzheimerTest;
