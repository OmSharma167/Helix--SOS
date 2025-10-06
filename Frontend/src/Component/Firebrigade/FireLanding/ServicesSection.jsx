import React from "react";
import { Flame, MapPin, Shield, CheckCircle } from "lucide-react";

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Comprehensive Fire Services
          </h2>
          <p className="text-xl text-gray-600">
            Professional emergency response with state-of-the-art equipment and
            highly trained personnel
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="group bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="bg-red-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Flame className="w-7 h-7 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Fire Suppression
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Rapid response to all types of fires including residential,
              commercial, and industrial emergencies.
            </p>
            <ul className="space-y-3">
              {[
                "Structural firefighting",
                "Wildfire control",
                "Vehicle fires",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center space-x-2 text-gray-700"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Service 2 */}
          <div className="group bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MapPin className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Real-Time Tracking
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Track emergency vehicles in real-time from dispatch to arrival.
            </p>
            <ul className="space-y-3">
              {["GPS live tracking", "ETA notifications", "Status updates"].map(
                (item) => (
                  <li
                    key={item}
                    className="flex items-center space-x-2 text-gray-700"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Service 3 */}
          <div className="group bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Rescue Operations
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Specialized rescue services for trapped individuals, hazardous
              material incidents, and medical emergencies.
            </p>
            <ul className="space-y-3">
              {["Technical rescue", "Hazmat response", "Medical support"].map(
                (item) => (
                  <li
                    key={item}
                    className="flex items-center space-x-2 text-gray-700"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
