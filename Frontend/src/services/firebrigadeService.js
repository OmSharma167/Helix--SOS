import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const firebrigadeService = {
  // Register new firebrigade
  registerFirebrigade: (data) => api.post("/fire-brigades/register", data),

  // Get firebrigade by user ID
  getFirebrigadeByUserId: (userId) => api.get(`/fire-brigades/user/${userId}`),

  // Send SOS request
  sendSOS: (data) => api.post("/fire-brigades/sos", data),

  // Get firebrigade by ID
  getFirebrigadeById: (id) => api.get(`/fire-brigades/${id}`),

  // Update firebrigade
  updateFirebrigade: (id, data) => api.put(`/fire-brigades/${id}`, data),

  // Get all firebrigades
  getAllFirebrigades: (params = {}) => api.get("/fire-brigades", { params }),

  // Get nearest firebrigades
  getNearestFirebrigades: (params) =>
    api.get("/fire-brigades/nearest", { params }),

  // Delete firebrigade
  deleteFirebrigade: (id) => api.delete(`/fire-brigades/${id}`),
};

// Named exports for flexibility
export const {
  registerFirebrigade,
  getFirebrigadeByUserId,
  sendSOS,
  getFirebrigadeById,
  updateFirebrigade,
  getAllFirebrigades,
  getNearestFirebrigades,
  deleteFirebrigade,
} = firebrigadeService;
