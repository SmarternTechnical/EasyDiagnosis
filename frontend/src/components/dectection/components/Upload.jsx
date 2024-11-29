import React, { useState, useRef, useEffect } from "react";
import icon from "/Icon.svg"; // Your upload icon

function Upload() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [audioUrl, setAudioUrl] = useState(""); // State for audio URL
  const [prediction, setPrediction] = useState(null); // State to store the prediction result
  const audioRef = useRef(null); // Reference to the audio element

  // Function to handle file change and set audio file
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];

    // If there's a previous file, stop the audio playback
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio to the start
    }

    // Reset previous file and audio data
    setFile(null);
    setFileName("");
    setAudioUrl("");

    if (uploadedFile && uploadedFile.type.startsWith("audio/wav")) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
      const fileUrl = URL.createObjectURL(uploadedFile); // Create a URL for the new audio file
      setAudioUrl(fileUrl); // Store URL for audio player
    } else {
      alert("Please upload a valid .wav audio file.");
    }
  };

  // Ensure that the audio element is reset whenever a new file is uploaded
  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.load(); // Reload the audio element with the new source
    }
  }, [audioUrl]);

  // Function to submit the audio file to the server
  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", file);

    try {
      // Send the POST request to the server
      const response = await fetch("http://127.0.0.1:8000/predict-audio-dysarthria/", {
        method: "POST",
        body: formData,
      });

      // Check if the response is okay (status code 200)
      if (response.ok) {
        const data = await response.json();
        setPrediction(data); // Set the prediction data received from the server
      } else {
        console.error("Error submitting audio:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting audio:", error);
    }
  };

  return (
    <>
      {/* Line above the section */}
      <div className="w-full h-[2px] bg-[#E0C9C9] my-2 mt-16"></div>

      <div className="flex gap-8 items-start justify-around py-12 px-4 flex-wrap">
        {/* Container for Audio Upload Section */}
        <div className="flex w-full gap-8">
          {/* Audio Upload Section */}
          <div
            className="w-full sm:w-1/2 max-w-lg h-80 flex items-center justify-center border-2 border-[#E0C9C9] border-dashed bg-[#F3FCF6] text-[#19456B] cursor-pointer rounded-xl shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl"
            onClick={() => document.getElementById("audioInput").click()} // Simulate file input click
          >
            <input
              type="file"
              id="audioInput"
              accept=".wav"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center text-center p-6 bg-transparent">
              {/* Display SVG Icon */}
              <img src={icon} alt="Upload Icon" className="mb-4" />
              <span className="my-4 text-xl font-semibold">
                Drag or Choose .WAV files to upload
              </span>
              <button className="mt-4 p-3 px-4 bg-[#99D8AE] rounded-lg text-[#19456B] font-semibold hover:bg-[#7FB88B] transition duration-200">
                Choose a File
              </button>
            </div>
          </div>

          {/* Divider Line */}
          <div className="hidden sm:block w-px bg-[#E0C9C9] mx-4"></div>

          {/* File View Section */}
          <div className="w-full sm:w-1/2 flex flex-col items-center p-6 bg-[#F3FCF6] rounded-xl shadow-xl mt-8 sm:mt-0">
            <h3 className="text-lg font-semibold text-[#19456B] mb-3">File Preview</h3>
            {file ? (
              <div className="w-full text-center">
                <h4 className="text-md text-[#19456B] mb-2">
                  File Name: {fileName}
                </h4>
                <audio ref={audioRef} controls>
                  <source src={audioUrl} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ) : (
              <div className="text-md text-[#19456B]">No file selected</div>
            )}
            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="mt-4 p-3 px-4 bg-[#99D8AE] rounded-lg text-[#19456B] font-semibold hover:bg-[#7FB88B] transition duration-200"
            >
              Submit for Prediction
            </button>
          </div>
        </div>
      </div>

      {/* Prediction Result Section */}
      {prediction && (
        <div className="mt-8 p-6 bg-[#F3FCF6] rounded-xl shadow-xl">
          <h3 className="text-xl font-semibold text-[#19456B] mb-4">Prediction Result</h3>
          <p className="text-md text-[#19456B] mb-2">Message: {prediction.message}</p>
          <p className="text-md text-[#19456B] mb-2">Final Class: {prediction.final_class}</p>
        </div>
      )}
    </>
  );
}

export default Upload;
