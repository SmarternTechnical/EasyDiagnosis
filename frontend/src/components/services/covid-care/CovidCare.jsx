import React from "react";
import SearchSelection from "../SearchSelection";

const CovidCare = () => {
  return (
    <div className="w-full h-auto flex justify-center">
      <div className="w-full mt-10">
        <SearchSelection
          heading="Buy Medicines & Essentials"
          subheading="Search For Medicines & Essentials"
          cityOptions={["Delhi", "Mumbai", "Bangalore"]}
          button1Text="Order via Prescription"
          button2Text="Don't have a Prescription"
          features={[
            "100% Genuine Medicines",
            "Trusted Pharmacies",
            "Door To Door Delivery",
          ]}
        />
      </div>
    </div>
  );
};

export default CovidCare;
