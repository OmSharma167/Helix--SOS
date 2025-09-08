
// import React from "react";
// import { useState } from 'react'
// import './App.css'
// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
//       <h1 className="text-4xl font-bold">React + Tailwind Setup Done!</h1>
//     </div>
//   );
// }
// export default App

import React from "react";

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HospitalRegistrationForm from "./pages/HospitalRegistrationForm";
import PoliceStationRegistrationForm from "./pages/PoliceStationRegistrationForm";

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/hospital-registration" element={<HospitalRegistrationForm />} />
        <Route path="/police-registration" element={<PoliceStationRegistrationForm />} />

      </Routes>
  );
}

export default App;
