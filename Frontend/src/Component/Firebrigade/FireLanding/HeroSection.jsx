import React from "react";
import {
  Radio,
  Phone,
  ChevronRight,
  CheckCircle,
  MapPin,
  Clock,
  Flame,
} from "lucide-react";
import SOSButton from "../SOSButton";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-gray-50 via-white to-red-50">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>24/7 Emergency Response Active</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Instant Fire Brigade
              <span className="block text-red-600 mt-2">
                Support & Tracking
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Request emergency fire brigade assistance instantly with real-time
              GPS tracking. Our rapid response teams are ready to protect lives
              and property 24/7.
            </p>

            

            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { title: "<3min", desc: "Avg Response" },
                { title: "24/7", desc: "Availability" },
                { title: "99.8%", desc: "Success Rate" },
              ].map((item, i) => (
                <div className="text-center" key={i}>
                  <div className="text-3xl font-bold text-red-600">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE CARD */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b">
                  <h3 className="font-bold text-gray-900 text-lg">
                    Live Dispatch
                  </h3>
                  <div className="flex items-center space-x-2 text-green-600">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold">Active</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      bg: "bg-green-50 border-green-200",
                      icon: (
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      ),
                      title: "Unit FR-42 Dispatched",
                      eta: "ETA: 2 minutes",
                      station: "Downtown Station",
                    },
                    {
                      bg: "bg-blue-50 border-blue-200",
                      icon: <Radio className="w-5 h-5 text-blue-600 mt-0.5" />,
                      title: "Unit FR-28 En Route",
                      eta: "ETA: 4 minutes",
                      station: "Northside Station",
                    },
                    {
                      bg: "bg-yellow-50 border-yellow-200",
                      icon: (
                        <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                      ),
                      title: "Unit FR-15 On Standby",
                      eta: "Ready for dispatch",
                      station: "Central Station",
                    },
                  ].map((unit, i) => (
                    <div
                      key={i}
                      className={`${unit.bg} border rounded-lg p-4 flex items-start space-x-3`}
                    >
                      {unit.icon}
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          {unit.title}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {unit.eta}
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500 mt-2">
                          <MapPin className="w-3 h-3" />
                          <span>{unit.station}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-xl">
                <Flame className="w-8 h-8 text-red-600 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
