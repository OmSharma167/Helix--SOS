


import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DoctorFormPage from "./pages/DoctorFormPage";
import DoctorListPage from "./pages/DoctorListPage";
import BookDoctorPage from "./pages/BookDoctorPage";
import HospitalRegistrationForm from "./pages/HospitalRegistrationForm";
import PoliceStationRegistrationForm from "./pages/PoliceStationRegistrationForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/doctor/register" element={<DoctorFormPage />} />
        <Route path="/doctors" element={<DoctorListPage />} />
        <Route path="/book-doctor/:id" element={<BookDoctorPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/doctor/bookings" element={<DoctorBookingsPage />} />
        <Route
          path="/hospital-registration"
          element={<HospitalRegistrationForm />}
        />
        <Route
          path="/police-registration"
          element={<PoliceStationRegistrationForm />}
        />
      </Routes>
    </Router>
  );
}

export default App;

