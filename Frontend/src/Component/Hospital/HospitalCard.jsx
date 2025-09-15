

import React, { useState } from "react";
import { MapPin, Phone, Mail, CheckCircle, XCircle, Eye, Edit, Trash2 } from "lucide-react";
// import { deleteHospital } from "../utils/hospitalAPI";
import { deleteHospital } from "./HospitalAPI.js";

const HospitalCard = ({
  hospital,
  onEdit,
  onDelete,
  showActions = false,
  onViewDetails,
  onBook,
}) => {
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false); // Track image load errors

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this hospital?")) {
      setLoading(true);
      try {
        const result = await deleteHospital(hospital._id);
        if (result.success) {
          onDelete(hospital._id);
        }
      } catch (error) {
        console.error("Failed to delete hospital:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={
            imageError
              ? "https://placehold.co/300x200?text=Hospital"
              : hospital.imageUrl
          }
          alt={hospital.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            if (!imageError) {
              setImageError(true);
              e.target.src = "https://placehold.co/300x200?text=Hospital";
            }
          }}
        />
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              hospital.availability === "Available"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {hospital.availability === "Available" ? (
              <CheckCircle className="h-3 w-3 inline mr-1" />
            ) : (
              <XCircle className="h-3 w-3 inline mr-1" />
            )}
            {hospital.availability}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {hospital.name}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="truncate">{hospital.address}</span>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <Phone className="h-4 w-4 mr-2" />
            <span>{hospital.contactNumber}</span>
          </div>

          {hospital.email && (
            <div className="flex items-center text-gray-600 text-sm">
              <Mail className="h-4 w-4 mr-2" />
              <span className="truncate">{hospital.email}</span>
            </div>
          )}
        </div>

        {hospital.facilities && hospital.facilities.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Facilities:
            </p>
            <div className="flex flex-wrap gap-1">
              {hospital.facilities.slice(0, 3).map((facility, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {facility}
                </span>
              ))}
              {hospital.facilities.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{hospital.facilities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-3 border-t">
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => onBook(hospital)}
            >
              Book Appointment
            </button>

            <button
              onClick={() => onViewDetails(hospital)}
              className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 text-sm"
            >
              <Eye className="h-4 w-4" />
              <span>Details</span>
            </button>
          </div>

          {/* {showActions && (
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(hospital)}
                className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200 text-sm"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200 text-sm disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin h-4 w-4 border-2 border-red-800 border-t-transparent rounded-full" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                <span>Delete</span>
              </button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;