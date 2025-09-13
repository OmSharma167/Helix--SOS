



import React, { useEffect, useState } from "react";
 import axios from "axios";
import { useParams } from "react-router-dom";
import { getDoctors } from "../services/doctorService";
import { createBooking } from "../services/bookingService";
import { useAuth } from "../context/AuthContext";
import {
  Star,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  User,
  Award,
  Languages,
  Phone,
} from "lucide-react";

export default function BookDoctorPage() {
  const { id } = useParams();
  // const { token } = useAuth();

  const [doctor, setDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const doctors = await getDoctors();
        const selected = doctors.find((d) => d._id === id);
        setDoctor(selected);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
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

  if (loading) return <p className="text-center mt-20">Loading doctor...</p>;
  if (!doctor) return <p className="text-center mt-20">Doctor not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br mt-10 from-blue-50 to-indigo-100 p-6">
      <div className=" mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Doctor Info */}
          <div>
            <div className="text-center mb-6">
              {doctor.imageUrl ? (
                <img
                  src={doctor.imageUrl}
                  alt={doctor.userId?.name}
                  className="w-100 h-70 rounded-full object-cover mx-auto mb-4 border-4 border-indigo-100"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center mx-auto mb-4">
                  <User size={64} className="text-white" />
                </div>
              )}

              

              <h3 className="text-2xl font-bold text-gray-800">
                {doctor.userId?.name}
              </h3>
              <p className="text-indigo-600 font-medium">
                {doctor.specialization}
              </p>
              <div className="flex items-center justify-center mt-2">
                <Star size={20} className="text-yellow-400 fill-current mr-1" />
                <span className="text-lg font-semibold text-gray-700">
                  {doctor.rating}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <Award className="text-indigo-600 mt-1 mr-3" size={20} />
                <div>
                  <p className="font-semibold text-gray-800">Qualifications</p>
                  <p className="text-gray-600 text-sm">
                    {doctor.qualifications?.join(", ") || "Not specified"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="text-indigo-600 mt-1 mr-3" size={20} />
                <div>
                  <p className="font-semibold text-gray-800">Experience</p>
                  <p className="text-gray-600 text-sm">
                    {doctor.experience} years
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="text-indigo-600 mt-1 mr-3" size={20} />
                <div>
                  <p className="font-semibold text-gray-800">Location</p>
                  <p className="text-gray-600 text-sm">{doctor.location}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Languages className="text-indigo-600 mt-1 mr-3" size={20} />
                <div>
                  <p className="font-semibold text-gray-800">Languages</p>
                  <p className="text-gray-600 text-sm">{doctor.language}</p>
                </div>
              </div>

              <div className="flex items-start">
                <DollarSign className="text-indigo-600 mt-1 mr-3" size={20} />
                <div>
                  <p className="font-semibold text-gray-800">
                    Consultation Fee
                  </p>
                  <p className="text-gray-600 text-sm">₹{doctor.price}</p>
                </div>
              </div>

              {doctor.timing && (
                <div className="flex items-start">
                  <Clock className="text-indigo-600 mt-1 mr-3" size={20} />
                  <div>
                    <p className="font-semibold text-gray-800">Timing</p>
                    <p className="text-gray-600 text-sm">{doctor.timing}</p>
                  </div>
                </div>
              )}

              {doctor.bio && (
                <div className="mt-6">
                  <p className="font-semibold text-gray-800 mb-2">About</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {doctor.bio}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Calendar className="mr-2 text-indigo-600" size={24} />
              Book Appointment
            </h4>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Appointment Date
                </label>
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reason for Appointment
                </label>
                <textarea
                  placeholder="Describe your symptoms or reason for consultation..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Consultation Fee:</span>
                  <span className="font-bold text-lg text-gray-800">
                    ₹{doctor.price}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Platform Fee:</span>
                  <span className="font-bold text-lg text-gray-800">₹50</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">
                    Total:
                  </span>
                  <span className="font-bold text-xl text-indigo-600">
                    ₹{parseInt(doctor.price) + 50}
                  </span>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={bookingLoading || !appointmentDate || !reason}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {bookingLoading ? "Booking..." : "Book Appointment"}
              </button>
            </div>

            {doctor.socialMedia && (
              <div className="mt-6 pt-6 border-t">
                <a
                  href={doctor.socialMedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                >
                  <Phone size={20} className="mr-2" />
                  Connect on Social Media
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


