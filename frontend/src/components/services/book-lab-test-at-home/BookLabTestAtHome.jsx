import React from "react";
import SearchSelection from "../SearchSelection";
import Banner from "../Banner";
import LabLandingPage from './lab_components/LabLandingPage'
import deliveryImage from "../../../assets/BuyMedBanner.png";

const BookLabTestAtHome = () => {
  return (
    <div className="w-full h-auto flex justify-center">
      <div className="w-full mt-10">
        <SearchSelection
          heading="Book Lab Tests At Home"
          subheading="Search For Medicines & Essentials"
          cityOptions={["Delhi", "Mumbai", "Bangalore"]}
          button1Text="Test via  Doctor's Prescription"
          button2Text="Don't have Doctor's  Prescription"
          features={[
            "100% Genuine Medicines",
            "Trusted Pharmacies",
            "Door To Door Delivery",
          ]}
        />
        <Banner
          heading="FAST & RELIABLE SERVICE"
          subheading="Lab Testing at Your Doorstep"
          description="Skip the hassle of visiting a lab—have your lab tests delivered right to your door.."
          image={deliveryImage}
        />
        <LabLandingPage/>
      </div>
    </div>
  );
};
export default BookLabTestAtHome;
