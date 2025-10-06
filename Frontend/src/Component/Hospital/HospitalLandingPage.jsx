// src/components/HospitalLandingPage.jsx
import React from "react";
import { CheckCircle, ArrowRight, Activity } from "lucide-react";

const HospitalLandingPage = () => {
  return (
    <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-cyan-100/40 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                Trusted Healthcare Platform
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gray-900">Find & Book</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text ">
                Healthcare Services
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Discover nearby hospitals, check real-time bed availability,
              connect with top doctors, and book appointments instantly. Your
              health, simplified.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-gradient-to-r from-blue-600 to-cyan-600  px-8 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold flex items-center justify-center space-x-2">
                <span>Find Hospitals</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-gray-700 px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold border border-gray-200">
                Emergency Care
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-600 mt-1">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">250+</div>
                <div className="text-sm text-gray-600 mt-1">Hospitals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">5000+</div>
                <div className="text-sm text-gray-600 mt-1">Doctors</div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl blur-3xl opacity-20"></div>
            <img
              src="https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Healthcare Professional"
              className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
            />

            <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Quick Stats</div>
                  <div className="text-2xl font-bold text-gray-900">
                    1M+ Patients
                  </div>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalLandingPage;
