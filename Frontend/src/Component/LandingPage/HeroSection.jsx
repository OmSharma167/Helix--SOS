import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  const handleEmergencySOS = () => alert("Emergency SOS triggered");
  const handleConsultDoctor = () => navigate("/DoctorLandingpage");
  const handleNearestHospital = () => navigate("/Hospital-App");
  const handleAIAssistant = () => navigate("/chat-bot");

  return (
    <div className="relative z-10 w-full max-w-7xl px-6 py-24 text-center text-white">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
        Get Immediate Medical Attention
        <br className="hidden md:block" /> Anytime, Anywhere.
      </h1>
      <p className="mt-6 text-lg md:text-xl text-white/90 font-light max-w-3xl mx-auto">
        Centralized, secure, and real-time emergency responses.
      </p>

      {/* Buttons */}
      <div className="mt-12 flex flex-wrap gap-4 justify-center">
        <button
          onClick={handleEmergencySOS}
          className="px-8 py-4 rounded-full bg-red-600 text-white font-bold text-lg shadow-lg hover:scale-105 relative animate-[pulse_1.5s_infinite]"
        >
          🚨 Emergency SOS
        </button>

        <button
          onClick={handleConsultDoctor}
          className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold text-lg hover:bg-white/20"
        >
          🩺 Consult Doctor
        </button>
        <button
          onClick={handleNearestHospital}
          className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold text-lg hover:bg-white/20"
        >
          🏥 Nearest Hospital
        </button>
        <button
          onClick={handleAIAssistant}
          className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold text-lg hover:bg-white/20"
        >
          🤖 AI Assistant
        </button>
      </div>

      <div className="mt-8 text-white/70 text-sm">
        <small>24/7 Unified Responders • End-to-End Encrypted</small>
      </div>
    </div>
  );
}
