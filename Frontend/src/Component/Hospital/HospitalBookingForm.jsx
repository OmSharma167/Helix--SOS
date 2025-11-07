// src/components/Hospital/HospitalBookingForm.jsx
import React, { useState } from "react";
import { XCircle, Calendar, Clock, Clipboard } from "lucide-react";
import { createHospitalBooking } from "./HospitalAPI.js";
import LoadingSpinner from "./LoadingSpinner.jsx";

const HospitalBookingForm = ({ hospital, onClose, onSuccess }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const facilitiesOptions = hospital?.facilities?.length
    ? hospital.facilities
    : [
        "Emergency Ward",
        "ICU",
        "Operation Theater",
        "X-Ray",
        "Pharmacy",
        "Blood Bank",
        "Ambulance Service",
      ];

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!appointmentDate || !appointmentTime || selectedServices.length === 0) {
      alert("Please fill all fields and select at least one service.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/hospital-bookings/book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            hospitalId: hospital._id,
            selectedServices,
            appointmentDate,
            appointmentTime,
            reason,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Booking failed");

      alert("Hospital appointment booked successfully!");
      onSuccess(data);
      onClose();
    } catch (error) {
      console.error("Booking failed:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <XCircle className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Book Appointment at {hospital.name}
        </h2>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Services */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Services
              </label>
              <div className="flex flex-wrap gap-2">
                {facilitiesOptions.map((service) => (
                  <button
                    type="button"
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`px-3 py-1 rounded-full border ${
                      selectedServices.includes(service)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-100 text-gray-700 border-gray-300"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="flex items-center text-gray-700 mb-1 font-medium">
                <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                Appointment Date
              </label>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Time */}
            <div>
              <label className="flex items-center text-gray-700 mb-1 font-medium">
                <Clock className="h-4 w-4 mr-2 text-blue-600" />
                Appointment Time
              </label>
              <input
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Reason */}
            <div>
              <label className="flex items-center text-gray-700 mb-1 font-medium">
                <Clipboard className="h-4 w-4 mr-2 text-blue-600" />
                Reason for Visit
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="3"
                placeholder="Describe your health concern..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Confirm Booking
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default HospitalBookingForm;
