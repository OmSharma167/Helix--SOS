

import React, { createContext, useContext, useState, useEffect } from "react";

import { loginUser, signupUser,me } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await me();
          // setUser(res);
          setUser({ ...res, token });
        } catch (err) {
          console.error("Auto-login failed:", err);
          localStorage.removeItem("token");
        }
      }
    };
    fetchUser();
  }, []);

  const login = async (credentials) => {
    try {
      const res = await loginUser(credentials);
      setUser(res); // ✅ store entire user object
      localStorage.setItem("token", res.token);
      window.location.href = "/";
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const signup = async (userData) => {
    try {
      const res = await signupUser(userData);
      setUser(res); // ✅ store entire user object
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
