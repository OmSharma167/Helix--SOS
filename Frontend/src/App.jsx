import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DoctorFormPage from "./pages/DoctorFormPage";
import DoctorListPage from "./pages/DoctorListPage";
import BookDoctorPage from "./pages/BookDoctorPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import DoctorBookingsPage from "./pages/DoctorBookingsPage";
import HospitalRegistrationForm from "./pages/HospitalRegistrationForm";
import PoliceStationRegistrationForm from "./pages/PoliceStationRegistrationForm";
import RegisterAmbulance from "./pages/AmbulanceForm";

// Components
import ImageUpload from "./Component/ImageUpload";
import HelixSOSApp from "./Component/LandingPage/HelixSOSApp";

function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<HelixSOSApp />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Doctor */}
      <Route path="/doctor/register" element={<DoctorFormPage />} />
      <Route path="/doctors" element={<DoctorListPage />} />
      <Route path="/book-doctor/:id" element={<BookDoctorPage />} />
      <Route path="/my-bookings" element={<MyBookingsPage />} />
      <Route path="/doctor/bookings" element={<DoctorBookingsPage />} />

      {/* Hospital / Police / Ambulance */}
      <Route
        path="/hospital-registration"
        element={<HospitalRegistrationForm />}
      />
      <Route
        path="/police-registration"
        element={<PoliceStationRegistrationForm />}
      />
      <Route path="/ambulance/form" element={<RegisterAmbulance />} />

      {/* Other */}
      <Route path="/upload" element={<ImageUpload />} />
    </Routes>
  );
}

export default App;
