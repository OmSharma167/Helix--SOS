

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";


export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  });
};

export const registerHospital = async (hospitalData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    console.log("Sending hospital data:", hospitalData); // Debug log
    const response = await fetch(`${API_BASE_URL}/hospitals/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(hospitalData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to register hospital");
    }
    return data;
  } catch (error) {
    console.error("Error in registerHospital:", error);
    throw error;
  }
};

export const getAllHospitals = async (params = {}) => {
  const token = localStorage.getItem("token");
  const queryParams = new URLSearchParams(params);
  try {
    const response = await fetch(`${API_BASE_URL}/hospitals?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch hospitals");
    }
    return data;
  } catch (error) {
    console.error("Error in getAllHospitals:", error);
    throw error;
  }
};

export const getNearestHospitals = async (
  latitude,
  longitude,
  maxDistance = 10000
) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `${API_BASE_URL}/hospitals/nearest?latitude=${latitude}&longitude=${longitude}&maxDistance=${maxDistance}&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch nearest hospitals");
    }
    return data;
  } catch (error) {
    console.error("Error in getNearestHospitals:", error);
    throw error;
  }
};

export const getHospitalById = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_BASE_URL}/hospitals/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch hospital");
    }
    return data;
  } catch (error) {
    console.error("Error in getHospitalById:", error);
    throw error;
  }
};

export const updateHospital = async (id, hospitalData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/hospitals/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(hospitalData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update hospital");
    }
    return data;
  } catch (error) {
    console.error("Error in updateHospital:", error);
    throw error;
  }
};

export const deleteHospital = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/hospitals/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to delete hospital");
    }
    return data;
  } catch (error) {
    console.error("Error in deleteHospital:", error);
    throw error;
  }
};


// ✅ Create Hospital Booking
export const createHospitalBooking = async (bookingData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/hospital-bookings/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create hospital booking");
    }
    return data;
  } catch (error) {
    console.error("Error in createHospitalBooking:", error);
    throw error;
  }
};



// User: get own bookings
export const getMyHospitalBookings = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  const res = await fetch(`${API_BASE_URL}/hospital-bookings/my-bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error("Server returned invalid JSON"); }
  if (!res.ok) throw new Error(data.message || "Failed to fetch my bookings");
  return data; // { success, data: [ ... ] }
};

// Hospital: get bookings for a hospital
export const getHospitalBookings = async (hospitalId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  const res = await fetch(`${API_BASE_URL}/hospital-bookings/hospital/${hospitalId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error("Server returned invalid JSON"); }
  if (!res.ok) throw new Error(data.message || "Failed to fetch hospital bookings");
  return data;
};

// Hospital: update booking status (Pending | Confirmed | Cancelled | Completed)
export const updateHospitalBookingStatus = async (bookingId, status) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  const res = await fetch(`${API_BASE_URL}/hospital-bookings/status/${bookingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ status }),
  });

  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error("Server returned invalid JSON"); }
  if (!res.ok) throw new Error(data.message || "Failed to update booking status");
  return data;
};

// User: cancel booking (delete)
export const cancelHospitalBooking = async (bookingId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  const res = await fetch(`${API_BASE_URL}/hospital-bookings/cancel/${bookingId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error("Server returned invalid JSON"); }
  if (!res.ok) throw new Error(data.message || "Failed to cancel booking");
  return data;
};