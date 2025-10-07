// src/services/doctorService.js
import axios from "axios";

// Use environment variable for base URL
const API = `${import.meta.env.VITE_API_URL}/doctors`;

// ✅ Register doctor
export const registerDoctor = async (doctorData, token) => {
  const res = await axios.post(`${API}/register`, doctorData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// ✅ Get all doctors (public, no login required)
export const getDoctors = async () => {
  const res = await axios.get(API);
  return res.data;
};

// ✅ Get doctor by ID
export const getDoctorById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};
