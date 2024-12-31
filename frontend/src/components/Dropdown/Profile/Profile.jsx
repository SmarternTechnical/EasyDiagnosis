// Profile.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "./components/utils";
import UserData from "./components/UserData";
import PopupForm from "./components/PopupForm";

function Profile() {
  const [userData, setUserData] = useState(null); // State to hold user data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [formData, setFormData] = useState({
    // State to manage form inputs
    first_name: "",
    last_name: "",
    fathers_name: "",
    aadhar_number: "",
    dob: "",
    email: "",
    phone_number: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    medical_history_pdf: "http://example.com/medical-history.pdf",
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Get the accessToken from cookies
        const token = getCookie("accessToken");

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
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Update specific field on change
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const token = getCookie("accessToken");
      if (!token) {
        setError("No access token found. Please log in.");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/add-user-info/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      alert("User info added successfully.");
      setIsPopupOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false); // Close popup
  };

  return (
    <div className="profile-container p-8">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          >
            Add User Info
          </button>

          <UserData userData={userData} />
        </div>
      )}

      {isPopupOpen && (
        <PopupForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handlePopupClose={handlePopupClose}
        />
      )}
    </div>
  );
}

export default Profile;
