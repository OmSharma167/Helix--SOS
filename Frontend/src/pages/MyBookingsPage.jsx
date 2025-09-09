import React, { useEffect, useState } from "react";
import { getMyBookings } from "../services/bookingService";
import { useAuth } from "../context/AuthContext";

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings(user.token);
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    if (user) fetchBookings();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Appointments</h1>
      {bookings.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((b) => (
            <div key={b._id} className="border rounded-lg p-4 shadow bg-white">
              <p>
                <strong>Doctor:</strong> {b.doctorId?.name} (
                {b.doctorId?.specialization})
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
