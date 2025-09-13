// src/services/bookingService.js
import axios from "axios";

// const API_URL = "http://localhost:5000/api/bookings";

const API_URL = `${import.meta.env.VITE_API_URL}/bookings`;

export const createBooking = async (bookingData, token) => {
  const res = await axios.post(API_URL, bookingData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getMyBookings = async (token) => {
  const res = await axios.get(`${API_URL}/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getDoctorBookings = async (token) => {
  const res = await axios.get(`${API_URL}/doctor`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateBookingStatus = async (id, status, token) => {
  const res = await axios.put(
    `${API_URL}/${id}/status`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
