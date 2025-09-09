

// import React from "react";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/Home";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import DoctorFormPage from "./pages/DoctorFormPage";
// import DoctorListPage from "./pages/DoctorListPage";
// import BookDoctorPage from "./pages/BookDoctorPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/doctor/register" element={<DoctorFormPage />} />
//         <Route path="/doctors" element={<DoctorListPage />} />
//         <Route
//           path="/book-doctor/:id"
//           element={<BookDoctorPage doctor={selectedDoctor} />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DoctorFormPage from "./pages/DoctorFormPage";
import DoctorListPage from "./pages/DoctorListPage";
import BookDoctorPage from "./pages/BookDoctorPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import DoctorBookingsPage from "./pages/DoctorBookingsPage";

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
      </Routes>
    </Router>
  );
}

export default App;
