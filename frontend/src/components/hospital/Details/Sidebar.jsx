import { useState } from "react";

const Sidebar = ({ onCategorySelect }) => {
  const [activeOption, setActiveOption] = useState("staff"); // Initially, 'staff' section is active
  const [activeSubOption, setActiveSubOption] = useState("doctors"); // Initially, 'doctors' is the active sub-option

  // Handle when a sub-option is clicked (Doctors, Nurse, Workers)
  const handleSubOptionClick = (option) => {
    setActiveSubOption(option); // Set the selected sub-option
    if (option === "doctors") {
      onCategorySelect("doctors"); // Notify the parent to fetch doctors data
    } else {
      onCategorySelect(null); // If another option is selected, pass null to stop fetching
    }
  };

  // Handle when the main option (Staff, Applications, etc.) is clicked
  const handleOptionClick = (option) => {
    setActiveOption(option); // Set the main option as active
    setActiveSubOption(""); // Reset the sub-option (this is optional)
    onCategorySelect(option); // Notify the parent to fetch data for the selected option
  };

  // Render the sub-options (Doctors, Nurse, Workers) under the 'staff' section
  const renderStaffOptions = () => {
    if (activeOption !== "staff") return null; // Only show staff-related options if 'staff' is active

    return (
      <div className="ml-4 mt-2 space-y-2">
        <div
          className={`rounded-lg p-2 cursor-pointer ${
            activeSubOption === "doctors" ? "bg-[#34DAB2] text-black" : "bg-[#B3BDBA]"
          }`}
          onClick={() => handleSubOptionClick("doctors")}
        >
          Doctors
        </div>
        <div
          className={`rounded-lg p-2 cursor-pointer ${
            activeSubOption === "nurse" ? "bg-[#34DAB2] text-black" : "bg-[#B3BDBA]"
          }`}
          onClick={() => handleSubOptionClick("nurse")}
        >
          Nurse
        </div>
        <div
          className={`rounded-lg p-2 cursor-pointer ${
            activeSubOption === "workers" ? "bg-[#34DAB2] text-black" : "bg-[#B3BDBA]"
          }`}
          onClick={() => handleSubOptionClick("workers")}
        >
          Workers
        </div>
      </div>
    );
  };

  return (
    <div className="w-64 h-screen bg-white p-4 cursor-pointer text-center">
      <div className="space-y-3">
        {/* Main option - Staff */}
        <div
          className={`rounded-lg p-3 cursor-pointer ${
            activeOption === "staff" ? "bg-[#1FAB89] text-black" : "bg-[#B3BDBA]"
          }`}
          onClick={() => handleOptionClick("staff")}
        >
          Staff
        </div>
        {renderStaffOptions()} {/* Render staff options only if 'staff' is selected */}

        {/* Other sidebar options */}
        <div
          className={`rounded-lg p-3 cursor-pointer ${
            activeOption === "applications" ? "bg-[#1FAB89] text-black" : "bg-[#B3BDBA]"
          }`}
          onClick={() => handleOptionClick("applications")}
        >
          Applications
        </div>
        <div
          className={`rounded-lg p-3 cursor-pointer ${
            activeOption === "operation" ? "bg-[#1FAB89] text-black" : "bg-[#B3BDBA]"
          }`}
          onClick={() => handleOptionClick("operation")}
        >
          Operation
        </div>
        <div
          className={`rounded-lg p-3 cursor-pointer ${
            activeOption === "tests" ? "bg-[#1FAB89] text-black" : "bg-[#B3BDBA]"
          }`}
          onClick={() => handleOptionClick("tests")}
        >
          Tests
        </div>
        <div
          className={`rounded-lg p-3 cursor-pointer ${
            activeOption === "resources" ? "bg-[#1FAB89] text-black" : "bg-[#B3BDBA]"
          }`}
          onClick={() => handleOptionClick("resources")}
        >
          Resources
        </div>
        <div
          className={`rounded-lg p-3 cursor-pointer ${
            activeOption === "patients" ? "bg-[#1FAB89] text-black" : "bg-[#B3BDBA]"
          }`}
          onClick={() => handleOptionClick("patients")}
        >
          Patients
        </div>
        <div
          className={`rounded-lg p-3 cursor-pointer ${
            activeOption === "stores" ? "bg-[#1FAB89] text-black" : "bg-[#B3BDBA]"
          }`}
          onClick={() => handleOptionClick("stores")}
        >
          Store
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
