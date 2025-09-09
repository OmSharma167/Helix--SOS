

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDoctorPage = () => {
  const { id } = useParams(); // get doctor id from URL
  const [doctor, setDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`/api/doctors/${id}`);
        setDoctor(res.data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };
    fetchDoctor();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // token saved on login
      await axios.post(
        "http://localhost:5000/api/bookings",
        {
          doctorId: id,
          appointmentDate,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error.message);
      alert("Failed to book appointment");
    }
  };


  if (!doctor) return <p>Loading doctor details...</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-xl font-bold mb-4">
        Book Appointment with {doctor.name}
      </h2>
      <form onSubmit={handleBooking} className="space-y-4">
        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Reason for appointment"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookDoctorPage;
