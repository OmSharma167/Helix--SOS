// components/SOSModal.jsx
import React, { useState, useEffect } from "react";

const SOSModal = ({ userLocation, locationAddress, onClose, onConfirm }) => {
  const [countdown, setCountdown] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleEmergencyConfirm = async () => {
    setLoading(true);

    const sosData = {
      userLocation: {
        coordinates: [userLocation.longitude, userLocation.latitude],
        address: locationAddress,
      },
      timestamp: new Date().toISOString(),
      emergencyType: "SOS Emergency",
      priority: "HIGH",
    };

    try {
      await onConfirm(sosData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-red-600 bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6 text-center">
          {/* Emergency Icon */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-red-700 mb-2">
            EMERGENCY SOS
          </h2>

          {countdown > 0 ? (
            <>
              <p className="text-gray-700 mb-4">
                Emergency alert will be sent to nearest available ambulances in:
              </p>
              <div className="text-4xl font-bold text-red-600 mb-4">
                {countdown}
              </div>
              <p className="text-sm text-gray-600">
                Your location will be shared with emergency services
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-700 mb-4">
                <strong>Emergency alert ready!</strong> This will notify all
                nearby ambulances about your emergency.
              </p>

              <div className="bg-red-50 p-4 rounded-lg mb-4 text-left">
                <h3 className="font-semibold text-red-800 mb-2">
                  Your Location:
                </h3>
                <p className="text-red-700">{locationAddress}</p>
                <p className="text-red-600 text-sm">
                  Coordinates: {userLocation.latitude.toFixed(4)},{" "}
                  {userLocation.longitude.toFixed(4)}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-400 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEmergencyConfirm}
                  disabled={loading}
                  className="flex-1 bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors font-medium disabled:bg-red-400"
                >
                  {loading ? "Sending SOS..." : "SEND SOS ALERT"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SOSModal;
