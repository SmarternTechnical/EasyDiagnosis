// PopupForm.js

import React from 'react';

const PopupForm = ({ formData, handleInputChange, handleSubmit, handlePopupClose }) => {
  return (
    <div className="popup-overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="popup-content bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full overflow-y-auto max-h-screen">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add User Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <label className="flex flex-col text-sm font-medium text-gray-700">
              First Name:
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className="input-field p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </label>

            <label className="flex flex-col text-sm font-medium text-gray-700">
              Last Name:
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className="input-field p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </label>

            <label className="flex flex-col text-sm font-medium text-gray-700">
              Father's Name:
              <input
                type="text"
                name="fathers_name"
                value={formData.fathers_name}
                onChange={handleInputChange}
                className="input-field p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="flex flex-col text-sm font-medium text-gray-700">
              Aadhar Number:
              <input
                type="text"
                name="aadhar_number"
                value={formData.aadhar_number}
                onChange={handleInputChange}
                className="input-field p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="flex flex-col text-sm font-medium text-gray-700">
              Date of Birth:
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="input-field p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="flex flex-col text-sm font-medium text-gray-700">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </label>

            <label className="flex flex-col text-sm font-medium text-gray-700">
              Phone Number:
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="input-field p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="flex flex-col text-sm font-medium text-gray-700">
              Street:
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                className="input-field p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="flex flex-col text-sm font-medium text-gray-700">
              City:
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="input-field p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="flex flex-col text-sm font-medium text-gray-700">
              State:
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="input-field p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="flex flex-col text-sm font-medium text-gray-700">
              Country:
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="input-field p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="flex flex-col text-sm font-medium text-gray-700">
              Pincode:
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="input-field p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="flex flex-col text-sm font-medium text-gray-700">
              Medical History PDF:
              <input
                type="file"
                name="medical_history_pdf"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    medical_history_pdf: e.target.files[0],
                  });
                }}
                className="input-field p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handlePopupClose}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 focus:ring-4 focus:ring-gray-300"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
