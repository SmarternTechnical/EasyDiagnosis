import React from "react";
import SearchSelection from "../SearchSelection";
import deliveryImage from "../../../assets/BuyMedBanner.png";
import Banner from "../Banner";
import BuyMedLanding from "./buy-med-components/BuyMedLanding";

const BuyMedicine = () => {
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
        <Banner
          heading="FAST & RELIABLE DELIVERY"
          subheading="Medicines Delivery at Your Doorstep"
          description="Skip the hassle of visiting a pharmacy and have your medications, or any other health care device delivered right to your door."
          image={deliveryImage}
        />
        <BuyMedLanding />
      </div>
    </div>
  );
};

export default BuyMedicine;
