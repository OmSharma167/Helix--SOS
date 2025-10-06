import React from "react";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import TrackingSection from "./TrackingSection";
import ContactSection from "./ContactSection";
import FirebrigadeList from "../FirebrigadeList";

const FireLandingpage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FirebrigadeList />
      <ServicesSection />
      <TrackingSection />
      <ContactSection />
    </div>
  );
};

export default FireLandingpage;
