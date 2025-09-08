
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-300 via-blue-200 to-indigo-400 px-4 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {/* Signup Card */}
      <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-2 text-center">
          Welcome to HelixSOS
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Join a community built on{" "}
          <span className="font-semibold">safety</span>,{" "}
          <span className="font-semibold">care</span>, and{" "}
          <span className="font-semibold">wellness</span>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition"
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-semibold p-3 rounded-xl hover:from-indigo-700 hover:to-indigo-900 transition-transform transform hover:scale-[1.02]"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
