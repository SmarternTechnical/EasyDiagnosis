import React, { useState } from "react";
import Upload from "./components/Upload"; // Import Upload Component
import Record from "./components/Record"; // Import Record Component
import Carousel from "../Carousel"; // Import your Carousel component

function Detection() {
  const [audioUrl, setAudioUrl] = useState(""); // State for uploaded or recorded audio URL
  const [selectedDisease, setSelectedDisease] = useState("dysarthria"); // State for selected disease

  // Static data for diseases
  const diseases = [
    { name: "dysarthria", image_path: "/images/cancer.png" },
    { name: "dementia", image_path: "/images/Doctor1.png" },
    { name: "parkinson", image_path: "/images/Doctor3.png" },
    { name: "pneumonia", image_path: "/images/Cardiac.png" },
    { name: "asthma", image_path: "/images/Doctor1.png" },
    { name: "bronchitis", image_path: "/images/Doctor2.png" },
  ];

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
    <div className="p-12">
      {/* Carousel for disease selection */}
      <div className="mb-4">
        <Carousel
          categories={diseases}
          CardComponent={({ item }) => {
            const isActive = selectedDisease === item.name;
            const activeStyle = isActive ? "bg-[#1FAB89AD]" : "";

            return (
              <div className="flex justify-center">
                <div
                  className={`rounded-2xl h-auto w-full max-w-xs mt-2 mb-2 overflow-hidden shadow-lg transition-all duration-300 transform cursor-pointer hover:scale-105 ${activeStyle}`}
                  onClick={() => setSelectedDisease(item.name)} // Set selected disease
                >
                  {/* Image Container */}
                  <div className="relative w-full h-40 rounded-t-2xl overflow-hidden">
                    <img
                      src={item.image_path}
                      alt={item.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <h3 className="text-[#19456B] font-inter font-semibold text-left text-lg sm:text-xl truncate">
                      {item.name}
                    </h3>
                  </div>
                </div>
              </div>
            );
          }}
        />
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
