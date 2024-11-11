import React from "react";
import SearchSelection from "../SearchSelection";
import deliveryImage from "../../../assets/OnlineVideoConsultation.png";
import Banner from "../Banner";
import DiscountCarousel from "../buy-medicine/buy-med-components/DiscountCarousel";
import SpecialtiesCarousel from "./online-video-consultation-components/SpecialtiesCarousel";

const OnlineVideoConsultation = () => {
  return (
    <div className="w-full h-auto flex justify-center">
      <div className="w-full mt-10">
        <SearchSelection
          heading="Book an Online Video Consultation"
          subheading="Book an Appointment in simple steps"
          cityOptions={["Delhi", "Mumbai", "Bangalore"]}
          button1Text="Instant Video Consultation"
          button2Text="Schedule for Later"
          features={[
            "Verified Doctors",
            "Digital Prescription",
            "2 Minutes Response Time",
          ]}
        />
        <Banner
          heading="Quick video consultation"
          subheading="Book an online video consultation instantly"
          description="Schedule a video consultation with our healthcare professionals
without leaving your house."
          image={deliveryImage}
        />
        <div className="bg-[#F3F3F3] flex flex-col items-center p-12 pl-32 text-center">
          <div className=" font-inter text-[35px] font-bold tracking[-0.03em] text-left text-[#19456B] w-full mb-10">
            All Offers
          </div>
          <DiscountCarousel />
          <SpecialtiesCarousel />
        </div>
      </div>
    </div>
  );
};

export default OnlineVideoConsultation;
