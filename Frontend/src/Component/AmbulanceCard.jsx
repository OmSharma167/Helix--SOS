import React from "react";
import { Link } from "react-router-dom";

export default function AmbulanceCard({ ambulance }) {
  return (
    <div className="bg-white p-4 rounded shadow-sm flex gap-4 items-center">
      <img
        src={ambulance.imageUrl || "/placeholder-vehicle.png"}
        alt="vehicle"
        className="w-28 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{ambulance.driverName}</h3>
        <p className="text-sm">Vehicle: {ambulance.vehicleNumber}</p>
        <p className="text-sm">Phone: {ambulance.phoneNumber}</p>
        <p className="text-sm">Availability: {ambulance.availability}</p>
      </div>
      <div>
        <Link
          to={`/ambulances/${ambulance._id}`}
          className="text-sm px-3 py-1 border rounded"
        >
          View
        </Link>
      </div>
    </div>
  );
}
