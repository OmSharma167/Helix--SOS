// pages/AmbulancesPage.jsx
import React from "react";
import AmbulanceList from "../Component/Ambulance/AmbulanceList";
import { useAuth } from "../context/AuthContext";

const AmbulancesPage = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
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
              <span className="font-semibold">Emergency Contact: 108</span>
            </div>
            <div className="text-sm">
              For immediate medical emergency, call national helpline
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <AmbulanceList />

      {/* Emergency Footer */}
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Emergency Contacts</h3>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div>
              <p className="font-medium">National Emergency</p>
              <p className="text-blue-300">112</p>
            </div>
            <div>
              <p className="font-medium">Ambulance</p>
              <p className="text-blue-300">108</p>
            </div>
            <div>
              <p className="font-medium">Police</p>
              <p className="text-blue-300">100</p>
            </div>
            <div>
              <p className="font-medium">Fire</p>
              <p className="text-blue-300">101</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulancesPage;
