import React, { useState, useEffect } from "react";
import QuestionPopup from "./QuestionPopup.jsx";
import { useAudioRecorder } from "../../hooks/useAudioRecorder.js";
import axios from "axios"; // Import axios

function AlzheimerTest() {
  const [questions, setQuestions] = useState([]); // Initialize questions as an empty array
  const [currentCategory, setCurrentCategory] = useState("Alzheimer_GDS"); // Default category
  const [isTestStarted, setIsTestStarted] = useState(false); // Control if test has started
  const [isRecordingDownloaded, setIsRecordingDownloaded] = useState(false); // For feedback after download
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Control popup visibility
  const { startRecording, stopRecording, recordedAudioUrl } =
    useAudioRecorder();

  useEffect(() => {
    // Fetch questions from API using axios
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/questions/");
        if (Array.isArray(response.data.questions)) {
          setQuestions(response.data.questions); // Set the array of questions directly
          console.log("Fetched questions:", response.data.questions); // Log fetched questions for debugging
        } else {
          console.error("Questions data is not in the expected format");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleStart = async () => {
    setIsTestStarted(true); // Start the test
    setIsRecordingDownloaded(false); // Reset download state for a new test
    await startRecording(); // Start recording
    setIsPopupOpen(true); // Open the popup when the test starts
  };

  const handleFinish = () => {
    stopRecording(); // Stop recording
    setIsPopupOpen(false); // Close the popup when test finishes
  };

  // Trigger download when recordedAudioUrl is updated
  useEffect(() => {
    if (recordedAudioUrl) {
      const anchor = document.createElement("a");
      anchor.href = recordedAudioUrl;
      anchor.download = `test-recording-${new Date()
        .toISOString()
        .replace(/[:.]/g, "-")}.wav`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      setIsRecordingDownloaded(true); // Mark as downloaded
    }
  }, [recordedAudioUrl]);

  // Close the popup (when called from the popup itself)
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    if (isRecordingDownloaded) {
      setIsTestStarted(false); // Reset test state to show start button again
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-gray-100 ${
        isPopupOpen ? "fixed inset-0 overflow-hidden" : ""
      }`}
    >
      {(!isTestStarted || isRecordingDownloaded) && (
        <>
          <button
            onClick={handleStart}
            className="px-6 py-3 bg-[#1fab89] text-white rounded-lg shadow-lg hover:bg-[#159770]"
          >
            {isRecordingDownloaded ? "Start New Test" : "Start Test"}
          </button>
          {isRecordingDownloaded && (
            <p className="mt-4 text-green-600 font-semibold">
              Your test recording has been downloaded successfully!
            </p>
          )}
        </>
      )}
      {isTestStarted && isPopupOpen && (
        <QuestionPopup
          questions={questions}
          setCurrentCategory={setCurrentCategory}
          currentCategory={currentCategory}
          handleFinish={handleFinish}
          handleClose={handleClosePopup}
        />
      )}
    </div>
  );
}

export default AlzheimerTest;
