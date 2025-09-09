// src/pages/MyBookings.jsx
import React, { useEffect, useState } from "react";
import { getMyBookings } from "../services/bookingService";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!token) return;
        const data = await getMyBookings(token);
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, [token]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">My Bookings</h2>
      <div className="space-y-4">
        {bookings.map((b) => (
          <div key={b._id} className="p-4 bg-white shadow rounded-lg">
            <h3 className="font-semibold">{b.doctorId?.specialization}</h3>
            <p>Date: {new Date(b.appointmentDate).toLocaleString()}</p>
            <p>Reason: {b.reason}</p>
            <p>
              Status: <span className="font-bold">{b.status}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
