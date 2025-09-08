import { useAuth } from "../context/AuthContext";
import React from "react";

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <h1 className="text-3xl font-bold text-indigo-800 mb-4">HelixSOS</h1>
      <p className="text-lg text-gray-700 mb-6">
        {user
          ? `Welcome, ${user.name}!`
          : "Your trusted emergency healthcare partner."}
      </p>

      {user ? (
        <button
          onClick={logout}
          className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
        >
          Logout
        </button>
      ) : (
        <a
          href="/login"
          className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
        >
          Get Started
        </a>
      )}
    </div>
  );
}
