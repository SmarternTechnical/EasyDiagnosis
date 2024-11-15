import React, { useState, useEffect, useRef } from 'react';
import { Clock, MapPin, Star, ChevronRight, ChevronLeft, X, Calendar, Building2 } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// DateSelector Component
const DateSelector = ({ selectedDate, onDateSelect }) => {
  const [startIndex, setStartIndex] = useState(0); // Starting index of the displayed dates
  const maxVisibleDates = 5; // Number of dates to show at a time

  const getDates = () => {
    const dates = [];
    const currentDate = new Date();
    for (let i = 0; i < 14; i++) { // Generate dates for two weeks
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      dates.push({
        date: date.getDate(),
        month: date.toLocaleString('default', { month: 'short' }),
        day: date.toLocaleString('default', { weekday: 'short' }).toUpperCase(),
        full: date
      });
    }
    return dates;
  };

  const dates = getDates();

  // Control moving the carousel left or right
  const handleNext = () => {
    if (startIndex + maxVisibleDates < dates.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={handlePrev}
        disabled={startIndex === 0} // Disable when at the start
        className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50"
      >
        <ChevronLeft className="w-5 h-5 text-gray-500" />
      </button>
      
      <div className="flex gap-2 overflow-hidden max-w-full">
        <div className="flex gap-2 transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${startIndex * 85}px)` }}>
          {dates.slice(startIndex, startIndex + maxVisibleDates).map((date, index) => (
            <button
              key={index}
              onClick={() => onDateSelect(date.full)}
              className={`flex flex-col items-center p-2 rounded-lg min-w-[80px] ${
                selectedDate?.toDateString() === date.full.toDateString()
                  ? 'border-2 border-emerald-500 text-emerald-500'
                  : 'border border-gray-200'
              }`}
            >
              <span className="text-sm font-medium">{date.day}</span>
              <span className="text-lg font-semibold">{date.date}</span>
              <span className="text-sm">{date.month}</span>
            </button>
          ))}
        </div>
      </div>
      
      <button
        onClick={handleNext}
        disabled={startIndex + maxVisibleDates >= dates.length} // Disable when at the end
        className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50"
      >
        <ChevronRight className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
};

// TimeSlotSelector Component
const TimeSlotSelector = ({ selectedTime, onTimeSelect, availableSlots }) => {
  return (
        <div className="grid grid-cols-5 gap-2">
          {availableSlots.map((slot, index) => (
            <button
              key={index}
              onClick={() => onTimeSelect(slot)}
              className={`py-2 px-4 rounded-full text-sm ${
                selectedTime === slot
                  ? 'bg-emerald-500 text-white'
                  : 'border border-gray-200 hover:border-emerald-500'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      );
};

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-[600px] max-h-[90vh] overflow-y-auto"
      >
        {children}
      </div>
    </div>
  );
};

// InstantConsultationPopup Component
const InstantConsultationPopup = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">Instant Video Consultation</h2>
        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <p className="mb-4">Request a video consult with a doctor instantly!</p>
      <ul className="text-sm text-gray-500 mb-6">
        <li>• Immediate response within 2 minutes.</li>
        <li>• Video consult with the available doctor.</li>
        <li>• Payment required only after request acceptance.</li>
      </ul>
      <button
        onClick={() => {
          toast("Instant consultation requested!");
          onClose();
        }}
        className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg"
      >
        Request Consultation
      </button>
    </div>
  </Modal>
);

// Main Booking Component
const BookingOption = ({ price, availability, doctorId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInstantConsultationOpen, setIsInstantConsultationOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const availableSlots = [
    "9:00 am", "9:30 am", "10:00 am", "10:30 am", "11:00 am",
    "11:30 am", "2:00 pm", "2:30 pm", "3:00 pm", "3:30 pm",
    "4:00 pm", "4:30 pm", "5:00 pm", "5:30 pm", "6:00 pm"
  ];

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      toast.success("Booking successfully completed!");
      console.log('Booking for:', {
        date: selectedDate,
        time: selectedTime,
        doctorId
      });
      setIsModalOpen(false);
    } else {
      toast.error("Please select both a date and a time slot.");
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-blue-900 font-semibold">Book Online Video Consult</h3>
          <span className="text-emerald-500">₹{price}</span>
        </div>
        <p className="text-emerald-500">{availability}</p>
      </div>
      
      <div className="space-y-3">
        <button 
          onClick={() => setIsInstantConsultationOpen(true)}
          className="w-full bg-white p-3 rounded flex items-center justify-between hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <Clock className="text-emerald-500" size={20} />
            <div>
              <p className="text-left font-medium">Instant Video Consultation</p>
              <ul className="text-sm text-gray-500">
                <li>• Video Consult with a Doctor instantly.</li>
                <li>• 2 Minutes Response Time.</li>
                <li>• Payment after the request gets accepted.</li>
              </ul>
            </div>
          </div>
          <ChevronRight />
        </button>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-white p-3 rounded flex items-center justify-between hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <Calendar className="text-emerald-500" size={20} />
            <div>
              <p className="text-left font-medium">Schedule for Later</p>
              <ul className="text-sm text-gray-500">
                <li>• Video Consult with Doctor at specific time.</li>
                <li>• Chat with the Doctor for any issues.</li>
                <li>• Email Reminder before the meeting starts.</li>
              </ul>
            </div>
          </div>
          <ChevronRight />
        </button>

        <button className="w-full bg-white p-3 rounded flex items-center justify-between hover:bg-gray-50">
          <div className="flex items-center gap-2">
            <Building2 className="text-emerald-500" size={20} />
            <div>
              <p className="text-left font-medium">In-Clinic Consult</p>
              <p className="text-sm text-gray-500">
                • Book an offline consultation with a Doctor of your choice.
              </p>
            </div>
          </div>
          <ChevronRight />
        </button>
      </div>

      {/* Schedule for Later Popup */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-900">Select Date</h2>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <DateSelector
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
          
          <div className="mt-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Select Time</h3>
            <TimeSlotSelector
              selectedTime={selectedTime}
              onTimeSelect={setSelectedTime}
              availableSlots={availableSlots}
            />
          </div>

          <button
            onClick={handleBooking}
            className="w-full mt-8 bg-emerald-500 text-white py-2 px-4 rounded-lg"
          >
            Book Appointment
          </button>
        </div>
      </Modal>

      {/* Instant Consultation Popup */}
      <InstantConsultationPopup 
        isOpen={isInstantConsultationOpen} 
        onClose={() => setIsInstantConsultationOpen(false)} 
      />
    </div>
  );
};

export default BookingOption;
