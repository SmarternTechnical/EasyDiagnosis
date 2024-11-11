import React from "react";
import SearchSection from "../services/online-video-consultation/consult-doctor/SearchSection";
import LabGrid from "./LabGrid";

const Lab = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center">
      <div className="w-3/4 mt-10">
        <SearchSection
          heading="Labs"
          cityOptions={["Delhi", "Mumbai", "Bangalore"]}
        />
      </div>
      <div className="w-3/5 mt-10">
        <LabGrid/>
      </div>
    </div>
  );
};

export default Lab;
