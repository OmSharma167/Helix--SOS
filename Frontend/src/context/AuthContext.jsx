import React, { createContext, useContext, useState } from "react";
import { loginUser, signupUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const res = await loginUser(credentials);
      setUser(res.user);
      localStorage.setItem("token", res.token);
      window.location.href = "/";
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const signup = async (userData) => {
    try {
      const res = await signupUser(userData);
      setUser(res.user);
      console.log(res.user)
      localStorage.setItem("token", res.token);
      window.location.href = "/";
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
