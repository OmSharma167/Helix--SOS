import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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

  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-slate-900 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto">
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
              to="/doctors"
              className="text-white/80 font-bold hover:text-white"
            >
              Telemedicine
            </Link>
            <a href="#" className="hover:text-white font-bold">
              Pharmacy
            </a>
            <a href="#" className="hover:text-white font-bold">
              Emergency
            </a>
            <div className="ml-4 flex items-center gap-3">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="text-white/80 hover:text-white font-bold"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-full bg-white text-slate-900 font-semibold hover:bg-white/90 transition"
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="px-3 py-1.5 rounded-full bg-white/20 text-white font-medium hover:bg-white/30 transition"
                  >
                    {user.name || "My Profile"}
                  </button>

                  <button
                    onClick={logout}
                    className="px-4 py-2 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition"
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 py-4"
              : "max-h-0 opacity-0 py-0"
          } ${
            isScrolled
              ? "bg-slate-900/95 backdrop-blur-md border border-white/10"
              : "bg-slate-900/80 backdrop-blur-md border border-white/20"
          } rounded-b-xl border-t-0`}
        >
          <div className="px-4 space-y-4">
            {/* Navigation Links */}
            <div className="space-y-3">
              <button
                onClick={() => handleNavigation("/doctors")}
                className="block w-full text-left text-white/80 font-bold hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition"
              >
                Telemedicine
              </button>

              <button className="block w-full text-left text-white/80 font-bold hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition">
                Pharmacy
              </button>

              <button className="block w-full text-left text-white/80 font-bold hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition">
                Emergency
              </button>
            </div>

            {/* Auth Section */}
            <div className="pt-3 border-t border-white/20">
              {!user ? (
                <div className="space-y-3">
                  <button
                    onClick={() => handleNavigation("/login")}
                    className="block w-full text-left text-white/80 font-bold hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => handleNavigation("/signup")}
                    className="w-full px-4 py-3 rounded-full bg-white text-slate-900 font-semibold hover:bg-white/90 transition text-center"
                  >
                    Signup
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="px-3 py-2 text-white/70 text-sm">
                    Welcome, {user.name || "User"}
                  </div>

                  <button
                    onClick={() => handleNavigation("/dashboard")}
                    className="block w-full text-left text-white font-bold py-3 px-4 rounded-lg bg-white/20 hover:bg-white/30 transition"
                  >
                    My Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 transition text-center"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}
