


import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  XCircle,
  Navigation,
} from "lucide-react";

const HospitalDetailsModal = ({ hospital, onClose }) => {
  if (!hospital) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {hospital.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img
                src={
                  hospital.imageUrl ||
                  "https://via.placeholder.com/400x300?text=Hospital"
                }
                alt={hospital.name}
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => {
                  if (
                    e.target.src !==
                    "https://via.placeholder.com/300x200.png?text=Hospital"
                  ) {
                    e.target.src =
                      "https://via.placeholder.com/300x200.png?text=Hospital";
                  }
                }}
              />

              {hospital.gallery && hospital.gallery.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-2">Gallery</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {hospital.gallery.slice(0, 6).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${hospital.name} ${index + 1}`}
                        className="w-full h-20 object-cover rounded"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Contact Information
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{hospital.contactNumber}</span>
                  </div>
                  {hospital.email && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{hospital.email}</span>
                    </div>
                  )}
                  <div className="flex items-start text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                    <span>{hospital.address}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">Availability</h4>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    hospital.availability === "Available"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {hospital.availability === "Available" ? (
                    <CheckCircle className="h-4 w-4 mr-1" />
                  ) : (
                    <XCircle className="h-4 w-4 mr-1" />
                  )}
                  {hospital.availability}
                </span>
              </div>

              {hospital.facilities && hospital.facilities.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Available Facilities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {hospital.facilities.map((facility, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={() => {
                    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      hospital.address
                    )}`;
                    window.open(url, "_blank");
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Navigation className="h-4 w-4" />
                  <span>Get Directions</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetailsModal;