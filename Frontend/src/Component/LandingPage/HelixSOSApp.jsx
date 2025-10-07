import React from "react";
// import Header from "./Header";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer"


export default function HelixSOSApp() {
  return (
    <>
      <main className="relative  min-h-screen flex items-center justify-center pt-8 md:pt-20  bg-gradient-to-br bg-[#2a7eaf] from-indigo-900  via-purple-900 ">
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>
        <HeroSection />
      </main>
      <FeaturesSection />
      <Footer />
    </>
  );
}
