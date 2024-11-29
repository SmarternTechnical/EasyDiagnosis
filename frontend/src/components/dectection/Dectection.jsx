import React, { useState } from "react";
import Upload from "./components/Upload"; // Import Upload Component
import Record from "./components/Record"; // Import Record Component

function Detection() {
  const [audioUrl, setAudioUrl] = useState(""); // State for uploaded or recorded audio URL
  const [selectedDisease, setSelectedDisease] = useState("Dysarthria"); // State for selected disease

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
    <div className="p-4">
      {/* Dropdown for disease selection */}
      <div className="mb-4">
        <label htmlFor="diseaseDropdown" className="block mb-2 font-semibold">
          Select Disease:
        </label>
        <select
          id="diseaseDropdown"
          value={selectedDisease}
          onChange={(e) => setSelectedDisease(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="dysarthria">Dysarthria</option>
          <option value="dementia">Dementia</option>
          <option value="parkinson">Parkinson</option>
        </select>
      </div>

      {/* Upload Component */}
      <Upload
        handleFileChange={handleFileChange}
        audioUrl={audioUrl}
        disease={selectedDisease} // Pass disease as a prop
      />

      {/* Record Component */}
      <Record
        setAudioUrl={setAudioUrl}
        disease={selectedDisease} // Pass disease as a prop
      />
    </div>
  );
}

export default Detection;
