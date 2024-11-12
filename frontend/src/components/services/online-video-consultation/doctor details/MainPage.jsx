



// import React, { useState, useEffect } from 'react';
// import { Clock } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import DoctorCard from './DoctorProfile';
// import BookingOption from './BookingOptions';
// import ReviewsCarousel from './Reviews';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const reviewsData = Array(6).fill({
//   userName: "User Name",
//   rating: 4.3,
//   comment: "Dr Floyd Miles is one of the best psychiatrists I met in my life."
// });

// // RequestStatus Component
// const RequestStatus = ({ onComplete }) => {
//   const [timeLeft, setTimeLeft] = useState(120);
//   const [status, setStatus] = useState("Pending");

//   useEffect(() => {
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
//     }, 5000); // Set timeout to simulate acceptance/decline after 5 seconds

//     return () => {
//       clearInterval(timer);
//       clearTimeout(timeout);
//     };
//   }, [status, onComplete]);

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       setStatus("Declined");
//       onComplete(false); // Decline when time runs out
//     }
//   }, [timeLeft, onComplete]);

//   if (status === "Declined") return null; // If declined, return nothing (hide component)

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
//   const [details,setDetails] = useState({}); 
//   const { id, label } = useParams();
//   const decodedLabel = decodeURIComponent(label); 
//   useEffect(()=>{
//     const handleApi = async()=>{
//       try {
//         console.log(id);
//         console.log(decodedLabel);
//         const {data} = await axios.post(`http://127.0.0.1:8000/get-category-details?pid=${id}`,{
//           service:'doctor',
//           category: decodedLabel
//         })
//         setDetails(data[0]); 
//       } catch (error) {
//         console.log("error while >>>>",error);
//       }
//     };
//     handleApi();
//   },[]);

//   const [showRequestStatus, setShowRequestStatus] = useState(false);

//   const handleInstantConsult = () => {
//     console.log("Instant Consult button clicked");
//     setShowRequestStatus(true); // Show the RequestStatus component
//   };

//   const handleRequestComplete = (isAccepted) => {
//     console.log("Request Completed. Accepted:", isAccepted);
//     if (!isAccepted) {
//       setShowRequestStatus(false); // Hide RequestStatus if declined
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4 space-y-6">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-6">
//           <DoctorCard doctor={details} />
          
//           <div className="mt-6">
//             <h2 className="text-blue-900 text-xl font-semibold mb-2">About Doctor</h2>
//             <p className="text-gray-600">{details.d_about}</p>
//             <button className="text-blue-500 mt-2">Read More</button>
//           </div>

//           {/* Show RequestStatus component when showRequestStatus is true */}
//           {showRequestStatus && (
//             <RequestStatus onComplete={handleRequestComplete} />
//           )}
//         </div>

//         <div className="lg:col-span-1">
//           <BookingOption 
//             price={details.price}
//             availability={'Available'}
//             onInstantConsult={handleInstantConsult}
//           />
//         </div>

//         {/* Ensure ReviewsCarousel spans the full width of lg:col-span-3 */}
//         <div className="lg:col-span-3">
//           <ReviewsCarousel 
//             reviews={reviewsData} 
//             rating={4}
//             patientsCount={20}
//           />
//         </div>
//       </div>
//       <ToastContainer />
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
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

const MainPage = () => {
  const [details, setDetails] = useState({}); 
  const [showFullAbout, setShowFullAbout] = useState(false);
  const { id, label } = useParams();
  const decodedLabel = decodeURIComponent(label); 

  useEffect(() => {
    const handleApi = async () => {
      try {
        const {data} = await axios.post(`http://127.0.0.1:8000/get-category-details?pid=${id}`,{
          service:'doctor',
          category: decodedLabel
        })
        setDetails(data[0]); 
      } catch (error) {
        console.log("error while >>>>", error);
      }
    };
    handleApi();
  }, [id, decodedLabel]);

  // Function to truncate text
  const truncateText = (text, maxLength = 400) => {
    if (!text) return '';
    return text.length > maxLength 
      ? text.substring(0, maxLength) + '...' 
      : text;
  };

  // Toggle full/truncated text
  const handleReadMore = () => {
    setShowFullAbout(!showFullAbout);
  };

  const [showRequestStatus, setShowRequestStatus] = useState(false);

  const handleInstantConsult = () => {
    console.log("Instant Consult button clicked");
    setShowRequestStatus(true);
  };

  const handleRequestComplete = (isAccepted) => {
    console.log("Request Completed. Accepted:", isAccepted);
    if (!isAccepted) {
      setShowRequestStatus(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DoctorCard doctor={details} />
          
          <div className="mt-6">
            <h2 className="text-blue-900 text-xl font-semibold mb-2">About Doctor</h2>
            <p className="text-gray-600">
              {showFullAbout 
                ? details.d_about 
                : truncateText(details.d_about)
              }
            </p>
            {/* Only show Read More/Less if text is longer than truncate length */}
            {details.d_about && details.d_about.length > 200 && (
              <button 
                onClick={handleReadMore} 
                className="text-[#1e3a8a] mt-2 font-semibold hover:underline"
              >
                {showFullAbout ? 'Read Less' : 'Read More'}
              </button>
            )}
          </div>

          {showRequestStatus && (
            <RequestStatus onComplete={handleRequestComplete} />
          )}
        </div>

        <div className="lg:col-span-1">
          <BookingOption 
            price={details.price}
            availability={'Available'}
            onInstantConsult={handleInstantConsult}
          />
        </div>

        <div className="lg:col-span-3">
          <ReviewsCarousel 
            reviews={reviewsData} 
            rating={4}
            patientsCount={20}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MainPage;