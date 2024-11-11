import React from "react";
import { Routes, Route } from "react-router-dom";
import BuyMedicine from "../components/services/buy-medicine/BuyMedicine";
import OnlineVideoConsultation from "../components/services/online-video-consultation/OnlineVideoConsultation";
import BookLabTestAtHome from "../components/services/book-lab-test-at-home/BookLabTestAtHome";
import CovidCare from "../components/services/covid-care/CovidCare";
import AskOurChatBot from "../components/services/ask-our-chatbot/AskOurChatBot";
import BookAnAmbulance from "../components/services/book-an-ambulance/BookAnAmbulance";
import BookAnInClientConsultancy from "../components/services/book-an-in-client-consultant/BookAnInClientConsultancy";
import YourMedicalHistory from "../components/services/your-medical-history/YourMedicalHistory";

const ServiceRoutes = () => {
  return (
    <Routes>
      <Route index element={<BuyMedicine />} />
      {/* buy medicines */}
      <Route path="/buy-medicines" element={<BuyMedicine />} />
      

      {/* online video consultation */}
      <Route path="/online-video-consultation" element={<OnlineVideoConsultation />} />
      

      {/* book lab test */}
      <Route path="/book-lab-tests" element={<BookLabTestAtHome />} />
      {/* book ambulance */}
      <Route path="/book-ambulance" element={<BookAnAmbulance />} />

      {/* in clinic consultation */}
      <Route path="/in-clinic-consultation" element={<BookAnInClientConsultancy />} />

      {/* chatbot */}
      <Route path="/chatbot" element={<AskOurChatBot />} />
      <Route path="/medical-history" element={<YourMedicalHistory />} />
      <Route path="/covid-care" element={<CovidCare />} />
    </Routes>
  );
};

export default ServiceRoutes;
