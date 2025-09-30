import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import Header from "./Component/LandingPage/Header.jsx";
import Footer from "./Component/LandingPage/Footer.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Header />
          <App />
        <Footer />
      </BrowserRouter>
    </AuthProvider>
   </StrictMode>
);
