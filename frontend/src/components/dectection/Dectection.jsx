import React, { useState } from "react";
import Upload from "./components/Upload"; // Import Upload Component
import Record from ".//components/Record"; // Import Record Component

function Dectection() {
  const [audioUrl, setAudioUrl] = useState(""); // State for uploaded or recorded audio URL

  // Handle file change (uploaded audio)
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type.startsWith("audio/wav")) {
      const fileUrl = URL.createObjectURL(uploadedFile); // Create a URL for the audio file
      setAudioUrl(fileUrl); // Store URL for audio player
    } else {
      alert("Please upload a valid .wav audio file.");
      setAudioUrl(""); // Reset audio URL
    }
  };

  return (
    <div >
      <Upload handleFileChange={handleFileChange} audioUrl={audioUrl} />

      <Record setAudioUrl={setAudioUrl} />
    </div>
  );
}

export default Dectection;
