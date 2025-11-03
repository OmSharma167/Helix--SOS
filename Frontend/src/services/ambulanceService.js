

// // src/services/ambulanceService.js
// import axios from "axios";

// // Use environment variable for backend URL
// const API = axios.create({
//   baseURL: `${import.meta.env.VITE_API_URL}`,
// });

// // Add token to all requests
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export const ambulanceService = {
//   // Get nearest ambulances
//   getNearestAmbulances: async (longitude, latitude, maxDistance = 20000) => {
//     const { data } = await API.get("/ambulances/nearest", {
//       params: { longitude, latitude, maxDistance },
//     });
//     return data;
//   },

//   // Get all ambulances
//   getAllAmbulances: async () => {
//     const { data } = await API.get("/ambulances/all");
//     return data;
//   },

//   // Get ambulance by ID
//   getAmbulanceById: async (id) => {
//     const { data } = await API.get(`/ambulances/${id}`);
//     return data;
//   },

//   // Book ambulance
//   bookAmbulance: async (bookingData) => {
//     const { data } = await API.post("/bookings", bookingData);
//     return data;
//   },

//   // Send SOS emergency request
//   sendSOS: async (sosData) => {
//     const { data } = await API.post("/emergency/sos", sosData);
//     return data;
//   },

//   // Update ambulance availability
//   updateAmbulanceAvailability: async (ambulanceId, availability) => {
//     const { data } = await API.put(`/ambulances/${ambulanceId}/availability`, {
//       availability,
//     });
//     return data;
//   },
// };


// src/services/ambulanceService.js
import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

// Add token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const ambulanceService = {
  // Get nearest ambulances
  getNearestAmbulances: async (longitude, latitude, maxDistance = 20000) => {
    const { data } = await API.get("/ambulances/nearest", {
      params: { longitude, latitude, maxDistance },
    });
    return data;
  },

  // Get all ambulances
  getAllAmbulances: async () => {
    const { data } = await API.get("/ambulances/all");
    return data;
  },

  // Get ambulance by ID
  getAmbulanceById: async (id) => {
    const { data } = await API.get(`/ambulances/${id}`);
    return data;
  },

  // Book ambulance
  bookAmbulance: async (bookingData) => {
    const { data } = await API.post("/bookings", bookingData);
    return data;
  },

  // Send SOS emergency request
  sendSOS: async (sosData) => {
    const { data } = await API.post("/emergency/sos", sosData);
    return data;
  },

  // Update ambulance availability
  updateAmbulanceAvailability: async (ambulanceId, availability) => {
    const { data } = await API.put(`/ambulances/${ambulanceId}/availability`, {
      availability,
    });
    return data;
  },

  // ✅ Register new ambulance
  registerAmbulance: async (ambulanceData) => {
    const { data } = await API.post("/ambulances/register", ambulanceData);
    return data;
  },
};
