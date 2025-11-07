


// src/services/hospitalService.js
import axios from "axios";

// Use environment variable for base URL
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/hospitals`,
});

// Add token automatically to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Register Hospital
export const registerHospital = async (hospitalData) => {
  const { data } = await API.post("/register", hospitalData);
  return data;
};

// Update Hospital
export const updateHospital = async (id, updates) => {
  const { data } = await API.put(`/${id}`, updates);
  return data;
};

// Delete Hospital
export const deleteHospital = async (id) => {
  const { data } = await API.delete(`/${id}`);
  return data;
};

// Get Hospital by ID
export const getHospitalById = async (id) => {
  const { data } = await API.get(`/${id}`);
  return data;
};

// Get All Hospitals with filters
export const getAllHospitals = async (params = {}) => {
  const { data } = await API.get("/", { params });
  return data;
};

// Get Nearest Hospitals
export const getNearestHospitals = async (
  latitude,
  longitude,
  options = {}
) => {
  const { maxDistance = 10000, limit = 10 } = options;
  const { data } = await API.get("/nearest", {
    params: { latitude, longitude, maxDistance, limit },
  });
  return data;
};
