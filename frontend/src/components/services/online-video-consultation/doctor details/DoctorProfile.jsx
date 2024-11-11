import React, { useState } from 'react';
import { Clock, MapPin, Star, ChevronRight, Calendar, Building2 } from 'lucide-react';
import { toast } from 'react-toastify';

// DoctorCard Component
const DoctorCard = ({ doctor }) => (
  <div className="bg-white rounded-lg p-4 shadow-md flex gap-4 max-w-md">
    <div className="w-24 h-24 bg-teal-100 rounded-lg">
      <img src={doctor.image} alt="doctor" className="rounded-lg h-full" />
    </div>
    <div className="flex-1">
      <h2 className="text-blue-900 font-semibold text-lg">{doctor.name}</h2>
      <p className="text-emerald-500 text-sm">{doctor.title}</p>
      <p className="text-gray-600 text-sm mt-1">{doctor.experience}</p>
      <div className="text-gray-600 text-sm mt-1">
        <p className="flex items-center gap-1">
          <span>•</span> {doctor.qualifications}
        </p>
        <p className="flex items-center gap-1">
          <span>•</span> {doctor.languages}
        </p>
        <p className="flex items-center gap-1">
          <MapPin size={12} /> {doctor.location}
        </p>
      </div>
    </div>
  </div>
);

export default DoctorCard