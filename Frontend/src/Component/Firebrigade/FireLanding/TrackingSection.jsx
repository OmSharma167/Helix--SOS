import React from "react";
import { MapPin, Clock, Radio } from "lucide-react";

const TrackingSection = () => {
  return (
    <section
      id="tracking"
      className="py-20 px-6 bg-gradient-to-br from-gray-50 to-red-50"
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Track Emergency Vehicles in Real-Time
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our advanced GPS tracking system provides transparency during
              emergencies.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: <MapPin className="w-6 h-6 text-red-600" />,
                  title: "Precise Location Updates",
                  desc: "View exact location of dispatched units with updates every few seconds.",
                  bg: "bg-red-100",
                },
                {
                  icon: <Clock className="w-6 h-6 text-blue-600" />,
                  title: "Dynamic ETA Calculation",
                  desc: "Real-time traffic analysis ensures accurate arrival predictions.",
                  bg: "bg-blue-100",
                },
                {
                  icon: <Radio className="w-6 h-6 text-green-600" />,
                  title: "Instant Status Notifications",
                  desc: "Receive alerts when units are dispatched, en route, and arriving.",
                  bg: "bg-green-100",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start space-x-4">
                  <div className={`${item.bg} p-3 rounded-lg flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
                <MapPin className="w-24 h-24 text-red-600 animate-pulse z-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-red-500/20 rounded-full animate-ping"></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="font-semibold text-gray-900">
                    Current Location
                  </span>
                  <span className="text-sm text-red-600 font-bold">
                    1.2 miles away
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-semibold text-gray-900">
                    Estimated Arrival
                  </span>
                  <span className="text-sm text-blue-600 font-bold">
                    2 min 30 sec
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-semibold text-gray-900">
                    Unit Number
                  </span>
                  <span className="text-sm text-green-600 font-bold">
                    FR-42
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackingSection;
