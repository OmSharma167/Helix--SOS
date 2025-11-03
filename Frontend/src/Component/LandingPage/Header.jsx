// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// import { Link, useNavigate } from "react-router-dom";
// import {
//   Stethoscope,
//   Pill,
//   AlertCircle,
//   User,
//   LogOut,
//   Menu,
//   X,
//   Info,
// } from "lucide-react";

// export default function Header() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     setIsMobileMenuOpen(false);
//     navigate("/");
//   };

//   const handleNavigation = (path) => {
//     navigate(path);
//     setIsMobileMenuOpen(false);
//   };

//   const handleDashboardRedirect = () => {
//     // navigate('/admin/dashboard/:doctorId');

//     if (user.role === 1) {
//       // If the user is an admin
//       navigate(`/admin/dashboard/:doctorId`);
//     } else if (user.role === 2) {
//       navigate(`Ambulance`);
//     } else if (user.role === 3) {
//       navigate(`PoliceChaukRegistration`);
//     } else {
//       // If the user is a regular user
//       navigate(`/user/dashboard`);
//     }
//   };


//   return (
//     <header
//       className={`fixed w-full top-0 left-0 z-50 transition-colors duration-300 ${
//         isScrolled ? "bg-slate-800 shadow-md" : "bg-transparent"
//       }`}
//     >
//       <div className="mx-auto relative z-50">
//         <div
//           className={`rounded-b-xl flex items-center justify-between py-3 px-4 md:px-6 transition-all duration-300 ${
//             isScrolled
//               ? "bg-slate-900/95 backdrop-blur-md border border-white/10 shadow-2xl"
//               : "bg-slate-900/80 backdrop-blur-md border border-white/20"
//           }`}
//         >
//           {/* Logo */}
//           <Link
//             to="/"
//             className="flex items-center gap-3"
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             <div className="inline-flex items-center gap-3">
//               <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
//                 <svg
//                   width="20"
//                   height="20"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M12.3 20s-6.6-4.2-8-5.9C2.9 12.2 4 9 7 8c1.3-.4 2.8.05 3.5 1 .7-.95 2.2-1.45 3.5-1 3 1 4.1 4.2 1.7 6.05-1.4 1.05-8.4 5.85-8.4 5.85z"
//                     stroke="#fff"
//                     strokeWidth="1.5"
//                     fill="rgba(255,255,255,0.1)"
//                   />
//                   <path
//                     d="M12 8v4M10 10h4"
//                     stroke="#fff"
//                     strokeWidth="1.5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </div>
//               <div>
//                 <div className="text-lg md:text-2xl font-extrabold text-white">
//                   Helix<span className="text-rose-400">SOS</span>
//                 </div>
//                 <div className="text-xs text-white/70">24/7 Emergency</div>
//               </div>
//             </div>
//           </Link>

//           {/* Desktop Nav */}
//           <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
//             <Link
//               to="/DoctorLandingpage"
//               className="flex items-center gap-2 text-white/80 font-bold hover:text-white transition-colors group"
//             >
//               <Stethoscope className="w-4 h-4 group-hover:scale-110 transition-transform" />
//               <span>Telemedicine</span>
//             </Link>

//             <Link
//               to="/PharmacyLanding"
//               className="flex items-center gap-2 text-white/80 font-bold hover:text-white transition-colors group"
//             >
//               <Pill className="w-4 h-4 group-hover:scale-110 transition-transform" />
//               <span>Pharmacy</span>
//             </Link>

//             <Link
//               to="/AboutPage"
//               className="flex items-center gap-2 text-white/80 font-bold hover:text-white transition-colors group"
//             >
//               <Info className="w-4 h-4 group-hover:scale-110 transition-transform" />
//               <span>About</span>
//             </Link>

//             <div className="ml-4 flex items-center gap-3">
//               {!user ? (
//                 <>
//                   <Link
//                     to="/login"
//                     className="flex items-center gap-2 text-white/80 hover:text-white font-bold transition-colors"
//                   >
//                     <User className="w-4 h-4" />
//                     <span>Login</span>
//                   </Link>
//                   <Link
//                     to="/signup"
//                     className="px-4 py-2 rounded-full bg-white text-slate-900 font-semibold hover:bg-white/90 transition flex items-center gap-2"
//                   >
//                     <User className="w-4 h-4" />
//                     <span>Signup</span>
//                   </Link>

//                   <button
//                     onClick={handleDashboardRedirect}
//                     className={`flex items-center space-x-1 text-gray-700 hover:text-blue-500 transition-colors ${
//                       scrolled ? "text-gray-700" : "text-black"
//                     } text-sm xl:text-base cursor-pointer`}
//                   >
//                     <span>{auth.user.name}</span>
//                     <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
//                       {user.role === 0
//                         ? "User"
//                         : user.role === 1
//                         ? "Doctor"
//                         : user.role === 2
//                         ? "Ambulance"
//                         : user.role === 3
//                         ? "Police"
//                         : "Unknown Role"}
//                     </span>
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     onClick={() => navigate("/dashboard")}
//                     className="px-3 py-1.5 rounded-full bg-white/20 text-white font-medium hover:bg-white/30 transition flex items-center gap-2"
//                   >
//                     <User className="w-4 h-4" />
//                     <span>{user.name || "My Profile"}</span>
//                   </button>

//                   <button
//                     onClick={handleLogout}
//                     className="px-4 py-2 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 transition flex items-center gap-2"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     <span>Logout</span>
//                   </button>
//                 </>
//               )}
//             </div>
//           </nav>

//           {/* Mobile Menu Toggle */}
//           <div className="md:hidden z-50 relative">
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="p-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition"
//             >
//               {isMobileMenuOpen ? (
//                 <X className="w-5 h-5" />
//               ) : (
//                 <Menu className="w-5 h-5" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div
//           className={`md:hidden fixed top-[70px] left-0 w-full transition-all duration-300 ease-in-out overflow-hidden z-50 ${
//             isMobileMenuOpen
//               ? "max-h-screen opacity-100 py-4"
//               : "max-h-0 opacity-0 py-0"
//           } ${
//             isScrolled
//               ? "bg-slate-900/95 backdrop-blur-md border border-white/10"
//               : "bg-slate-900/80 backdrop-blur-md border border-white/20"
//           }`}
//         >
//           <div className="px-4 space-y-4">
//             {/* Navigation Links */}
//             <button
//               onClick={() => handleNavigation("/DoctorLandingpage")}
//               className="flex items-center gap-3 w-full text-left text-white/80 font-bold hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition"
//             >
//               <Stethoscope className="w-5 h-5" />
//               <span>Telemedicine</span>
//             </button>

//             <button
//               onClick={() => handleNavigation("/PharmacyLanding")}
//               className="flex items-center gap-3 w-full text-left text-white/80 font-bold hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition"
//             >
//               <Pill className="w-5 h-5" />
//               <span>Pharmacy</span>
//             </button>

//             <button
//               onClick={() => handleNavigation("/AboutPage")}
//               className="flex items-center gap-3 w-full text-left text-white/80 font-bold hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition"
//             >
//               <Info className="w-5 h-5" />
//               <span>About</span>
//             </button>

//             <button
//               onClick={() => alert("Emergency clicked!")}
//               className="flex items-center gap-3 w-full text-left text-white/80 font-bold hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition"
//             >
//               <AlertCircle className="w-5 h-5" />
//               <span>Emergency</span>
//             </button>

//             {/* Auth Section */}
//             <div className="pt-3 border-t border-white/20">
//               {!user ? (
//                 <>
//                   <button
//                     onClick={() => handleNavigation("/login")}
//                     className="flex items-center gap-3 w-full text-left text-white/80 font-bold hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition"
//                   >
//                     <User className="w-5 h-5" />
//                     <span>Login</span>
//                   </button>

//                   <button
//                     onClick={() => handleNavigation("/signup")}
//                     className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full bg-white text-slate-900 font-semibold hover:bg-white/90 transition"
//                   >
//                     <User className="w-5 h-5" />
//                     <span>Signup</span>
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <div className="flex items-center gap-2 px-3 py-2 text-white/70 text-sm">
//                     <User className="w-4 h-4" />
//                     <span>Welcome, {user.name || "User"}</span>
//                   </div>

//                   <button
//                     onClick={() => handleNavigation("/dashboard")}
//                     className="flex items-center gap-3 w-full text-left text-white font-bold py-3 px-4 rounded-lg bg-white/20 hover:bg-white/30 transition"
//                   >
//                     <User className="w-5 h-5" />
//                     <span>My Profile</span>
//                   </button>

//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 transition"
//                   >
//                     <LogOut className="w-5 h-5" />
//                     <span>Logout</span>
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Overlay for mobile menu */}
//         {isMobileMenuOpen && (
//           <div
//             className="fixed inset-0 bg-black/20 z-40 md:hidden"
//             onClick={() => setIsMobileMenuOpen(false)}
//           />
//         )}
//       </div>
//     </header>
//   );
// }


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Stethoscope,
  Pill,
  AlertCircle,
  User,
  LogOut,
  Menu,
  X,
  Info,
} from "lucide-react";
import Roles from "./Roles.jsx";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleDashboardRedirect = () => {
    if (!user) return navigate("/login");

    switch (user.role) {
      case Roles.DOCTOR:
        navigate(`/my-bookings/${user._id}`);
        break;
      case Roles.AMBULANCE:
        navigate(`/Ambulance`);
        break;
      case Roles.POLICE:
        navigate(`/PoliceChaukRegistration`);
        break;
      case Roles.HOSPITAL:
        navigate(`/HospitalDashboard`);
        break;
      case Roles.FIRE:
        navigate(`/ProviderDashboard`);
        break;
      default:
        navigate(`/doctor/bookings`);
        break;
    }
  };

  // ✅ Get profession prefix based on role
  const getProfessionPrefix = (role) => {
    switch (role) {
      case Roles.DOCTOR:
        return "Dr.";
      case Roles.AMBULANCE:
        return "Ambulance -";
      case Roles.POLICE:
        return "Police -";
      case Roles.HOSPITAL:
        return "Hospital -";
      case Roles.FIRE:
        return "Fire -";
      default:
        return "User -";
    }
  };

  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-slate-800 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto relative z-50">
        <div
          className={`rounded-b-xl flex items-center justify-between py-3 px-4 md:px-6 transition-all duration-300 ${
            isScrolled
              ? "bg-slate-900/95 backdrop-blur-md border border-white/10 shadow-2xl"
              : "bg-slate-900/80 backdrop-blur-md border border-white/20"
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.3 20s-6.6-4.2-8-5.9C2.9 12.2 4 9 7 8c1.3-.4 2.8.05 3.5 1 .7-.95 2.2-1.45 3.5-1 3 1 4.1 4.2 1.7 6.05-1.4 1.05-8.4 5.85-8.4 5.85z"
                    stroke="#fff"
                    strokeWidth="1.5"
                    fill="rgba(255,255,255,0.1)"
                  />
                  <path
                    d="M12 8v4M10 10h4"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <div className="text-lg md:text-2xl font-extrabold text-white">
                  Helix<span className="text-rose-400">SOS</span>
                </div>
                <div className="text-xs text-white/70">24/7 Emergency</div>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <Link
              to="/DoctorLandingpage"
              className="flex items-center gap-2 text-white/80 font-bold hover:text-white transition-colors group"
            >
              <Stethoscope className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Telemedicine</span>
            </Link>

            <Link
              to="/PharmacyLanding"
              className="flex items-center gap-2 text-white/80 font-bold hover:text-white transition-colors group"
            >
              <Pill className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Pharmacy</span>
            </Link>

            <Link
              to="/AboutPage"
              className="flex items-center gap-2 text-white/80 font-bold hover:text-white transition-colors group"
            >
              <Info className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>About</span>
            </Link>

            <div className="ml-4 flex items-center gap-3">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 text-white/80 hover:text-white font-bold transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-full bg-white text-slate-900 font-semibold hover:bg-white/90 transition flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Signup</span>
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={handleDashboardRedirect}
                    className="px-3 py-1.5 rounded-full bg-white/20 text-white font-medium hover:bg-white/30 transition flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>
                      {getProfessionPrefix(user.role)} {user.name}
                    </span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 transition flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden z-50 relative">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden fixed top-[70px] left-0 w-full transition-all duration-300 ease-in-out overflow-hidden z-50 ${
              isScrolled
                ? "bg-slate-900/95 backdrop-blur-md border border-white/10"
                : "bg-slate-900/80 backdrop-blur-md border border-white/20"
            } py-4`}
          >
            <div className="px-4 space-y-4">
              <button
                onClick={() => handleNavigation("/DoctorLandingpage")}
                className="flex items-center gap-3 w-full text-left text-white/80 font-bold hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition"
              >
                <Stethoscope className="w-5 h-5" />
                <span>Telemedicine</span>
              </button>

              <button
                onClick={() => handleNavigation("/PharmacyLanding")}
                className="flex items-center gap-3 w-full text-left text-white/80 font-bold hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition"
              >
                <Pill className="w-5 h-5" />
                <span>Pharmacy</span>
              </button>

              <button
                onClick={() => handleNavigation("/AboutPage")}
                className="flex items-center gap-3 w-full text-left text-white/80 font-bold hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition"
              >
                <Info className="w-5 h-5" />
                <span>About</span>
              </button>

              {!user ? (
                <>
                  <button
                    onClick={() => handleNavigation("/login")}
                    className="flex items-center gap-3 w-full text-left text-white/80 font-bold hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition"
                  >
                    <User className="w-5 h-5" />
                    <span>Login</span>
                  </button>

                  <button
                    onClick={() => handleNavigation("/signup")}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full bg-white text-slate-900 font-semibold hover:bg-white/90 transition"
                  >
                    <User className="w-5 h-5" />
                    <span>Signup</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 text-white/70 text-sm">
                    <User className="w-4 h-4" />
                    <span>
                      {getProfessionPrefix(user.role)} {user.name}
                    </span>
                  </div>

                  <button
                    onClick={handleDashboardRedirect}
                    className="flex items-center gap-3 w-full text-left text-white font-bold py-3 px-4 rounded-lg bg-white/20 hover:bg-white/30 transition"
                  >
                    <User className="w-5 h-5" />
                    <span>Dashboard</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 transition"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
