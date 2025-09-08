import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/users", // your backend URL
});
//"/api/users
// Signup
export const signupUser = async (userData) => {
  const { data } = await API.post("/register", userData);
  return data;
};

// Login
export const loginUser = async (userData) => {
  const { data } = await API.post("/login", userData);
  return data;
};

// export const me = async (userData)=>{
//     const {data} = await API.get("/me",userData);
//     return data;
// }

export const me = async () => {
  const token = localStorage.getItem("token");
  const { data } = await API.get("/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

