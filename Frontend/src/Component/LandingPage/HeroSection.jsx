// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext"; // Import AuthContext

// export default function HeroSection() {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [city, setCity] = useState("");

//   const handleEmergencySOS = () => alert("Emergency SOS triggered");
//   const handleConsultDoctor = () => navigate("/DoctorLandingpage");
//   const handleNearestHospital = () => navigate("/Hospital-App");
//   const handleAIAssistant = () => navigate("/chat-bot");

//   useEffect(() => {
//     const fetchCity = async () => {
//       try {
//         const res = await axios.get("https://get.geojs.io/v1/ip/geo.json");
//         setCity(res.data.city);
//       } catch (error) {
//         console.error("Error fetching city:", error);
//         setCity("Unknown");
//       }
//     };

//     fetchCity();
//   }, []);

//   return (
//     <div className="relative z-10 w-full max-w-7xl px-6 py-24 text-center text-white">
//       <div>
//         <p>Your city: {city || "Loading..."}</p>
//       </div>
//       {user && (
//         <span className="block mb-4 text-lg font-semibold">
//           Welcome, {user.name}!
//         </span>
//       )}
//       <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
//         Get Immediate Medical Attention
//         <br className="hidden md:block" /> Anytime, Anywhere.
//       </h1>
//       <p className="mt-6 text-lg md:text-xl text-white/90 font-light max-w-3xl mx-auto">
//         Centralized, secure, and real-time emergency responses.
//       </p>

//       {/* Buttons */}
//       <div className="mt-12 flex flex-wrap gap-4 justify-center">
//         <button
//           onClick={handleEmergencySOS}
//           className="px-8 py-4 rounded-full bg-red-600 text-white font-bold text-lg shadow-lg hover:scale-105 relative animate-[pulse_1.5s_infinite]"
//         >
//           🚨 Emergency SOS
//         </button>

//         <button
//           onClick={handleConsultDoctor}
//           className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold text-lg hover:bg-white/20"
//         >
//           🩺 Consult Doctor
//         </button>
//         <button
//           onClick={handleNearestHospital}
//           className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold text-lg hover:bg-white/20"
//         >
//           🏥 Nearest Hospital
//         </button>
//         <button
//           onClick={handleAIAssistant}
//           className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold text-lg hover:bg-white/20"
//         >
//           🤖 AI Assistant
//         </button>
//       </div>

//       <div className="mt-8 text-white/70 text-sm">
//         <small>24/7 Unified Responders • End-to-End Encrypted</small>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import AuthContext
import axios from "axios"; // ✅ import axios

export default function HeroSection() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [city, setCity] = useState("");

  const handleEmergencySOS = () => navigate("/EmergencySOS");
  const handleConsultDoctor = () => navigate("/DoctorLandingpage");
  const handleNearestHospital = () => navigate("/Hospital-App");
  const handleAIAssistant = () => navigate("/chat-bot");

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const res = await axios.get("https://get.geojs.io/v1/ip/geo.json");
        setCity(res.data.city || "Unknown");
      } catch (error) {
        console.error("Error fetching city:", error);
        setCity("Unknown");
      }
    };

    fetchCity();
  }, []);

  return (
    <div className="relative z-10 w-full max-w-7xl px-6 py-24 pt-12 text-center text-white">
      {/* City Display */}
      <div className="flex gap-20 justify-center">
        <div className="mb-4 text-lg font-medium">
          {city ? `Your city: ${city}` : "Loading city..."}
        </div>

        {/* User Welcome */}
        {user && (
          <span className="block mb-4 text-lg font-semibold">
            Welcome, {user.name}!
          </span>
        )}
      </div>

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
