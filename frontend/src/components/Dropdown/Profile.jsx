import React, { useEffect, useState } from "react";
import axios from "axios";

// Helper function to get a cookie by its name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

function Profile() {
  const [userData, setUserData] = useState(null); // State to hold user data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Get the accessToken from cookies
        const token = getCookie("accessToken");

        // Make sure the token is available
        if (!token) {
          setError("No access token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/user-info/", {
          headers: {
            Authorization: `Bearer ${token}`, // Set token in the Authorization header
          },
          withCredentials: true, // Include cookies in the request
        });

        setUserData(response.data); // Store response data in state
      } catch (err) {
        setError("Failed to fetch user data. Please try again.");
        console.error(err); // Log the error to the console for debugging
      } finally {
        setLoading(false); // Stop loading once API call completes
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching
  }

  if (error) {
    return <div>{error}</div>; // Show error message if API call fails
  }

  return (
    <div className="profile-container p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {userData && (
        <div className="profile-details grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold">User Information</h2>
            <p>
              <strong>User ID:</strong> {userData.user.user_id}
            </p>
            <p>
              <strong>Email:</strong> {userData.user.email}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Personal Information</h2>
            <p>
              <strong>First Name:</strong> {userData.user_info.first_name}
            </p>
            <p>
              <strong>Last Name:</strong> {userData.user_info.last_name}
            </p>
            <p>
              <strong>Father's Name:</strong> {userData.user_info.fathers_name}
            </p>
            <p>
              <strong>Aadhar Number:</strong> {userData.user_info.aadhar_number}
            </p>
            <p>
              <strong>Date of Birth:</strong> {userData.user_info.dob}
            </p>
            <p>
              <strong>Age:</strong> {userData.user_info.age}
            </p>
            <p>
              <strong>Phone Number:</strong> {userData.user_info.phone_number}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Address</h2>
            <p>
              <strong>Street:</strong> {userData.user_info.street}
            </p>
            <p>
              <strong>City:</strong> {userData.user_info.city}
            </p>
            <p>
              <strong>State:</strong> {userData.user_info.state}
            </p>
            <p>
              <strong>Country:</strong> {userData.user_info.country}
            </p>
            <p>
              <strong>Pincode:</strong> {userData.user_info.pincode}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Medical History</h2>
            <p>
              <a
                href={userData.user_info.medical_history_pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Medical History PDF
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
