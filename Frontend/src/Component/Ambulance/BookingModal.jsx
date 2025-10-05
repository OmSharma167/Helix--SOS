// components/BookingModal.jsx
import React, { useState } from "react";

const BookingModal = ({ ambulance, userLocation, onClose, onConfirm }) => {
  const [emergencyType, setEmergencyType] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const emergencyTypes = [
    "Accident",
    "Heart Attack",
    "Stroke",
    "Respiratory Issue",
    "Fever",
    "Injury",
    "Other Medical Emergency",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bookingData = {
      ambulanceId: ambulance._id,
      driverName: ambulance.driverName,
      phoneNumber: ambulance.phoneNumber,
      vehicleNumber: ambulance.vehicleNumber,
      emergencyType,
      additionalNotes,
      userLocation: {
        coordinates: [userLocation.longitude, userLocation.latitude],
        address: "Current user location", // can add reverse geocoding later
      },
      timestamp: new Date().toISOString(),
    };

    try {
      await onConfirm(bookingData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Book Ambulance</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Ambulance Info */}
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-blue-900">
              {ambulance.driverName}
            </h3>
            <p className="text-blue-700 text-sm">{ambulance.vehicleNumber}</p>
            <p className="text-blue-600 text-sm">{ambulance.phoneNumber}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Emergency Type *
              </label>
              <select
                required
                value={emergencyType}
                onChange={(e) => setEmergencyType(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select emergency type</option>
                {emergencyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                rows="3"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the emergency situation, symptoms, or special instructions..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:bg-green-400"
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
