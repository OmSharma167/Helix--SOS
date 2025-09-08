

import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DoctorFormPage from "./pages/DoctorFormPage";
import DoctorListPage from "./pages/DoctorListPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/doctor/register" element={<DoctorFormPage />} />
        <Route path="/doctors" element={<DoctorListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
