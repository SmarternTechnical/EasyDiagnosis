import React from 'react';

const UserData = ({ userData }) => {
  if (!userData || !userData.user) {
    return (
      <div className="profile-details bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">User Information</h2>
        <p className="text-lg text-gray-600 mt-2">No user data available</p>
      </div>
    );
  }

  return (
    <div className="profile-details bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Profile data display */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
          <h2 className="text-xl font-semibold text-gray-700">User Information</h2>
          <div className="mt-4">
            <p className="text-gray-600"><strong>User ID:</strong> {userData.user.user_id || "N/A"}</p>
            <p className="text-gray-600"><strong>Email:</strong> {userData.user.email || "N/A"}</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
          <h2 className="text-xl font-semibold text-gray-700">Personal Information</h2>
          <div className="mt-4 space-y-3">
            <p className="text-gray-600"><strong>First Name:</strong> {userData.user_info?.first_name || "N/A"}</p>
            <p className="text-gray-600"><strong>Last Name:</strong> {userData.user_info?.last_name || "N/A"}</p>
            <p className="text-gray-600"><strong>Father's Name:</strong> {userData.user_info?.fathers_name || "N/A"}</p>
            <p className="text-gray-600"><strong>Aadhar Number:</strong> {userData.user_info?.aadhar_number || "N/A"}</p>
            <p className="text-gray-600"><strong>Date of Birth:</strong> {userData.user_info?.dob || "N/A"}</p>
            <p className="text-gray-600"><strong>Age:</strong> {userData.user_info?.age || "N/A"}</p>
            <p className="text-gray-600"><strong>Phone Number:</strong> {userData.user_info?.phone_number || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserData;
