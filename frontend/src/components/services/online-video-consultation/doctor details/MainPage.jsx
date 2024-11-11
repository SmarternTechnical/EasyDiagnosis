
// import React, { useState } from 'react';
// import { Clock } from 'lucide-react';
// import { toast } from 'react-toastify';
// import DoctorCard from './DoctorProfile';
// import BookingOption from './BookingOptions';
// import ReviewsCarousel from './Reviews';

// // Temporary data for demonstration
// const doctorData = {
//   name: "Dr. Floyd Miles",
//   title: "EXPERT - PSYCHIATRIST",
//   experience: "8+ years of experience",
//   qualifications: "MBBS, MD",
//   languages: "English and Hindi",
//   location: "Holistic Health & Clinic, Delhi",
//   about: "Dr Urmita Chakraborty is considered one of the best psychiatrist in North 24 Parganas and has helped countless patients overcome their mental health issues and find peace of mind. Dr Chakraborty specialises in treating a wide range of psychological conditions, from anxiety disorders and depression to bipolar disorder and personality disorders. She has also...",
//   price: 800,
//   availability: "AVAILABLE",
//   rating: 4.3,
//   patientsCount: "6000+"
// };

// const reviewsData = Array(9).fill({
//   userName: "User Name",
//   rating: 4.3,
//   comment: "Dr Floyd Miles is one of the best psychiatrist I met in my life."
// });

// // RequestStatus Component
// const RequestStatus = ({ onComplete }) => {
//   const [timeLeft, setTimeLeft] = useState(120);
//   const [status, setStatus] = useState("Pending");

//   React.useEffect(() => {
//     if (status !== "Pending") return;

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);

//     const timeout = setTimeout(() => {
//       const isAccepted = Math.random() > 0.5;
//       setStatus(isAccepted ? "Accepted" : "Declined");
//       if (isAccepted) {
//         toast.success("Request accepted! Please proceed to payment.");
//       } else {
//         toast.error("Doctor is not currently accepting video consultations.");
//       }
//       onComplete(isAccepted);
//     }, 5000);

//     return () => {
//       clearInterval(timer);
//       clearTimeout(timeout);
//     };
//   }, [status, onComplete]);

//   React.useEffect(() => {
//     if (timeLeft <= 0) {
//       setStatus("Declined");
//       onComplete(false);
//     }
//   }, [timeLeft, onComplete]);

//   if (status === "Declined") return null;

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md mb-6">
//       <p className="text-lg mb-4">Please wait until your request gets accepted.</p>
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <Clock className="text-emerald-500" />
//           <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
//         </div>
//         <div className="flex items-center gap-2">
//           Status: <span className={status === "Accepted" ? "text-emerald-500" : "text-blue-500"}>{status}</span>
//         </div>
//       </div>
//       {status === "Accepted" && (
//         <button className="mt-4 w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600">
//           Proceed to Pay
//         </button>
//       )}
//     </div>
//   );
// };

// // Main Component
// const MainPage = () => {
//   const [showRequestStatus, setShowRequestStatus] = useState(false);

//   const handleInstantConsult = () => {
//     setShowRequestStatus(true);
//   };

//   const handleRequestComplete = (isAccepted) => {
//     if (!isAccepted) {
//       setTimeout(() => setShowRequestStatus(false), 3000);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4 space-y-6">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-6">
//           <DoctorCard doctor={doctorData} />
          
//           <div className="mt-6">
//             <h2 className="text-blue-900 text-xl font-semibold mb-2">About Doctor</h2>
//             <p className="text-gray-600">{doctorData.about}</p>
//             <button className="text-blue-500 mt-2">Read More</button>
//           </div>

//           {showRequestStatus && (
//             <RequestStatus onComplete={handleRequestComplete} />
//           )}
//         </div>

//         <div className="lg:col-span-1">
//           <BookingOption 
//             price={doctorData.price}
//             availability={doctorData.availability}
//             onInstantConsult={handleInstantConsult}
//           />
//         </div>

//         {/* Ensure ReviewsCarousel spans the full width of lg:col-span-3 */}
//         <div className="lg:col-span-3">
//           <ReviewsCarousel 
//             reviews={reviewsData} 
//             rating={doctorData.rating}
//             patientsCount={doctorData.patientsCount}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainPage;


import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import DoctorCard from './DoctorProfile';
import BookingOption from './BookingOptions';
import ReviewsCarousel from './Reviews';

// Temporary data for demonstration
const doctorData = {
  name: "Dr. Floyd Miles",
  title: "EXPERT - PSYCHIATRIST",
  experience: "8+ years of experience",
  qualifications: "MBBS, MD",
  languages: "English and Hindi",
  location: "Holistic Health & Clinic, Delhi",
  about: "Dr Urmita Chakraborty is considered one of the best psychiatrists in North 24 Parganas and has helped countless patients overcome their mental health issues and find peace of mind. Dr Chakraborty specializes in treating a wide range of psychological conditions, from anxiety disorders and depression to bipolar disorder and personality disorders. She has also...",
  price: 800,
  availability: "AVAILABLE",
  rating: 4.3,
  patientsCount: "6000+",
  image:"https://res.cloudinary.com/dicnuc6ox/image/upload/v1730728493/easy%20diagnose/2c15c8444fb8a121f0990e0f3d324951_ssmxyb.jpg",
};

const reviewsData = Array(6).fill({
  userName: "User Name",
  rating: 4.3,
  comment: "Dr Floyd Miles is one of the best psychiatrists I met in my life."
});

// RequestStatus Component
const RequestStatus = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(120);
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (status !== "Pending") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      const isAccepted = Math.random() > 0.5;
      setStatus(isAccepted ? "Accepted" : "Declined");
      if (isAccepted) {
        toast.success("Request accepted! Please proceed to payment.");
      } else {
        toast.error("Doctor is not currently accepting video consultations.");
      }
      onComplete(isAccepted);
    }, 5000); // Set timeout to simulate acceptance/decline after 5 seconds

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [status, onComplete]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setStatus("Declined");
      onComplete(false); // Decline when time runs out
    }
  }, [timeLeft, onComplete]);

  if (status === "Declined") return null; // If declined, return nothing (hide component)

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <p className="text-lg mb-4">Please wait until your request gets accepted.</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="text-emerald-500" />
          <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
        </div>
        <div className="flex items-center gap-2">
          Status: <span className={status === "Accepted" ? "text-emerald-500" : "text-blue-500"}>{status}</span>
        </div>
      </div>
      {status === "Accepted" && (
        <button className="mt-4 w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600">
          Proceed to Pay
        </button>
      )}
    </div>
  );
};

// Main Component
const MainPage = () => {
  const [showRequestStatus, setShowRequestStatus] = useState(false);

  const handleInstantConsult = () => {
    console.log("Instant Consult button clicked");
    setShowRequestStatus(true); // Show the RequestStatus component
  };

  const handleRequestComplete = (isAccepted) => {
    console.log("Request Completed. Accepted:", isAccepted);
    if (!isAccepted) {
      setShowRequestStatus(false); // Hide RequestStatus if declined
    }
  };

  return (
    
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DoctorCard doctor={doctorData} />
          
          <div className="mt-6">
            <h2 className="text-blue-900 text-xl font-semibold mb-2">About Doctor</h2>
            <p className="text-gray-600">{doctorData.about}</p>
            <button className="text-blue-500 mt-2">Read More</button>
          </div>

          {/* Show RequestStatus component when showRequestStatus is true */}
          {showRequestStatus && (
            <RequestStatus onComplete={handleRequestComplete} />
          )}
        </div>

        <div className="lg:col-span-1">
          <BookingOption 
            price={doctorData.price}
            availability={doctorData.availability}
            onInstantConsult={handleInstantConsult}
          />
        </div>

        {/* Ensure ReviewsCarousel spans the full width of lg:col-span-3 */}
        <div className="lg:col-span-3">
          <ReviewsCarousel 
            reviews={reviewsData} 
            rating={doctorData.rating}
            patientsCount={doctorData.patientsCount}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MainPage;

