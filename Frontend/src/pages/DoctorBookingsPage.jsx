import React, { useEffect, useState } from "react";
import {
  getDoctorBookings,
  updateBookingStatus,
} from "../services/bookingService";
import { useAuth } from "../context/AuthContext";

export default function DoctorBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const data = await getDoctorBookings(user.token);
      setBookings(data);
    } catch (err) {
      console.error("Error fetching doctor bookings:", err);
    }
  };

  // const handleStatusChange = async (id, status) => {
  //   try {
  //     await updateBookingStatus(id, status, user.token);
  //     fetchBookings(); // refresh after update
  //   } catch (err) {
  //     console.error("Error updating booking:", err);
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


  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Patient Appointments</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((b) => (
            <div key={b._id} className="border rounded-lg p-4 shadow bg-white">
              <p>
                <strong>Patient:</strong> {b.userId?.name} ({b.userId?.email},{" "}
                {b.userId?.phone})
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(b.appointmentDate).toLocaleString()}
              </p>
              <p>
                <strong>Reason:</strong> {b.reason}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded text-white ${
                    b.status === "Confirmed"
                      ? "bg-green-500"
                      : b.status === "Cancelled"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {b.status}
                </span>
              </p>
              {b.status === "Pending" && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleStatusChange(b._id, "Confirmed")}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(b._id, "Cancelled")}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
