

import React, { useState } from "react";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import HowItWorksSection from "./HowItWorksSection";
import DoctorsSection from "./DoctorsSection";
import FeaturesSection from "./FeaturesSection";

function DoctorLandingpage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <DoctorsSection />
      <ServicesSection />
      <HowItWorksSection />

      <FeaturesSection />
    </div>
  );
}

export default DoctorLandingpage;
