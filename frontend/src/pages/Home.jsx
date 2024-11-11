import React from "react";
import Hero from "../components/home/Hero";
import Hero2 from "../components/home/Hero2";
import Services from "../components/home/Services";

const Home = () => {
  return (
    <div className="w-full bg-white overflow-x-hidden">
      
      <Hero />
      <Hero2 />

      {/* Services Section */}
      <div className="services-section">
        <Services
          color={true}
          heading={"Video Consultation"}
          subHeading={
            "Schedule a video consultation with our healthcare professionals without leaving your house."
          }
          service="medical_services"
          category="Video Consultation"
        />
        <Services
          color={true}
          heading={"Search for Hospitals"}
          subHeading={
            "Browse different departments listed below based on your healthcare needs."
          }
          service="medical_services"
          category="Search for Hospitals"
        />
        <Services
          color={false}
          heading={"Pharma Support"}
          subHeading={
            "Skip the hassle of visiting a pharmacy and have your medications, or any other health care device delivered right to your door."
          }
          service="medical_services"
          category="Pharma Support"
        />
        <Services
          color={true}
          heading={"Book Lab Tests"}
          subHeading={
            "Take control of your health by scheduling lab tests with ease, all from the comfort of your home."
          }
          service="medical_services"
          category="Book Lab Tests"
        />
      </div>

    </div>
  );
};

export default Home;
