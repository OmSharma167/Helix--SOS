// src/pages/DoctorBookings.jsx
import React, { useEffect, useState } from "react";
import {
  getDoctorBookings,
  updateBookingStatus,
} from "../services/bookingService";

export default function DoctorBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getDoctorBookings(token);
      setBookings(data);
    } catch (err) {
      console.error("Error fetching doctor bookings", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // const handleStatusChange = async (id, status) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     await updateBookingStatus(id, status, token);
  //     fetchBookings();
  //   } catch (err) {
  //     console.error("Error updating booking", err);
  //   }
  // };
  const handleStatusChange = async (id, status) => {
    try {
      await updateBookingStatus(id, status, user.token);
      // ✅ Refetch fresh bookings after update
      await fetchBookings();
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">
        My Patient Bookings
      </h2>
      <div className="space-y-4">
        {bookings.map((b) => (
          <div key={b._id} className="p-4 bg-white shadow rounded-lg">
            <h3 className="font-semibold">{b.userId?.name}</h3>
            <p>Email: {b.userId?.email}</p>
            <p>Date: {new Date(b.appointmentDate).toLocaleString()}</p>
            <p>Reason: {b.reason}</p>
            <p>
              Status: <span className="font-bold">{b.status}</span>
            </p>

            {b.status === "Pending" && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleStatusChange(b._id, "Confirmed")}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleStatusChange(b._id, "Cancelled")}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
