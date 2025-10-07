import React, { useState } from "react";
import { Heart, Zap, Users, Shield, Phone, Clock } from "lucide-react";

const partners = [
  {
    name: "Hospitals",
    icon: "🏥",
    description: "We collaborate with top hospitals for emergency care.",
  },
  {
    name: "Ambulances",
    icon: "🚑",
    description: "Our ambulance partners ensure quick emergency response.",
  },
  {
    name: "Fire Brigade",
    icon: "🔥",
    description: "Fire brigade partners help in fire and rescue emergencies.",
  },
  {
    name: "Police",
    icon: "👮‍♂️",
    description:
      "Police support ensures safety and quick action during crises.",
  },
  {
    name: "Nearest Pharmacy",
    icon: "💊",
    description:
      "Find and order medicines from the closest pharmacy, delivered to your doorstep.",
  },
  {
    name: "Pathology Tests",
    icon: "🧪",
    description:
      "Book blood tests and diagnostic services with home sample collection.",
  },
  {
    name: "Doctor",
    icon:"",
    description:
      "a doctor to offer online consultation and emergency care.",
   
  },
];

const ownerTypes = [
  {
    role: "Doctor",
    description:
      "Register as a doctor to offer online consultation and emergency care.",
    bgColor: "bg-blue-600",
    hoverBg: "hover:bg-blue-700",
  },
  {
    role: "Ambulance Owner",
    description: "Register your ambulance for quick emergency response.",
    bgColor: "bg-red-600",
    hoverBg: "hover:bg-red-700",
  },
  {
    role: "Police",
    description:
      "Register as police to get notified of emergency situations in your area.",
    bgColor: "bg-indigo-600",
    hoverBg: "hover:bg-indigo-700",
  },
  {
    role: "Fire Brigade",
    description:
      "Register your fire service team to assist in fire emergencies.",
    bgColor: "bg-orange-600",
    hoverBg: "hover:bg-orange-700",
  },
  {
    role: "Pharmacy Owner",
    description:
      "Register your pharmacy to supply medicines directly to patients in emergencies.",
    bgColor: "bg-green-600",
    hoverBg: "hover:bg-green-700",
  },
  {
    role: "Pathology Lab Owner",
    description:
      "Register your lab to offer diagnostic and pathology testing services.",
    bgColor: "bg-purple-600",
    hoverBg: "hover:bg-purple-700",
  },
  {
    role: "Hospitals",
    description: "We collaborate with top hospitals for emergency care.",
    bgColor: "bg-purple-600",
    hoverBg: "hover:bg-purple-700",
  },
];

const AboutPage = () => {
  const [hoveredPartner, setHoveredPartner] = useState(null);

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)",
      }}
      className="min-h-screen"
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full opacity-20"
          style={{
            top: "5rem",
            left: "2.5rem",
            width: "18rem",
            height: "18rem",
            background: "#3b82f6",
            filter: "blur(60px)",
            animation: "pulse 3s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full opacity-20"
          style={{
            top: "10rem",
            right: "2.5rem",
            width: "24rem",
            height: "24rem",
            background: "#a855f7",
            filter: "blur(60px)",
            animation: "pulse 3s ease-in-out infinite",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute rounded-full opacity-20"
          style={{
            bottom: "5rem",
            left: "33%",
            width: "20rem",
            height: "20rem",
            background: "#ec4899",
            filter: "blur(60px)",
            animation: "pulse 3s ease-in-out infinite",
            animationDelay: "4s",
          }}
        />
      </div>

      <div className="relative z-10 p-8 pb-20 pt-20">
        {/* Hero Header */}
        <div className="max-w-7xl mx-auto mb-20 text-center">
          <div className="inline-block mb-6">
            <div
              className="p-1 rounded-full"
              style={{
                background: "linear-gradient(90deg, #3b82f6 0%, #a855f7 100%)",
              }}
            >
              <div className="bg-slate-900 px-6 py-2 rounded-full">
                <span
                  className="font-semibold"
                  style={{
                    background:
                      "linear-gradient(90deg, #60a5fa 0%, #c084fc 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Emergency Healthcare Platform
                </span>
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
            About{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, #60a5fa 0%, #c084fc 50%, #f9a8d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              HelixSOS
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Revolutionizing emergency response with technology that saves lives
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            {[
              {
                icon: <Clock className="w-8 h-8" />,
                label: "Response Time",
                value: "<5 min",
              },
              {
                icon: <Users className="w-8 h-8" />,
                label: "Partners",
                value: "1000+",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                label: "Lives Saved",
                value: "50K+",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 border border-white border-opacity-10 transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="text-blue-400 mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Section */}
        <section className="max-w-6xl mx-auto mb-24">
          <div
            className="rounded-3xl p-12 border border-white border-opacity-10 shadow-2xl"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex items-center justify-center mb-8">
              <Zap className="w-10 h-10 text-yellow-400 mr-4" />
              <h2 className="text-4xl font-bold text-white">
                Why Choose Helix?
              </h2>
            </div>

            <div className="space-y-6 text-gray-300 text-lg">
              <p>
                In emergencies, every second matters — yet millions of people
                lose precious time trying to reach the right help.{" "}
                <span className="text-blue-400 font-semibold">
                  Helix Emergency Healthcare
                </span>{" "}
                was built to bridge that critical gap. We bring together
                doctors, hospitals, ambulances, police, fire brigades, and
                pharmacies on one connected platform — ensuring that help is
                just a tap away, anytime, anywhere.
              </p>

              <p>
                Our mission is to create a world where technology saves lives
                faster than ever before. Whether it's a road accident, a health
                emergency, a fire, or a medical need at home — Helix ensures a
                quick, coordinated, and reliable response. It's more than just
                an app; it's a{" "}
                <span className="text-purple-400 font-semibold">
                  life-support ecosystem
                </span>{" "}
                designed for the modern world.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div
                  className="rounded-2xl p-6 border border-blue-400 border-opacity-20"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)",
                  }}
                >
                  <div className="flex items-center mb-3">
                    <Heart className="w-6 h-6 text-blue-400 mr-3" />
                    <h3 className="text-xl font-bold text-white">
                      For The World
                    </h3>
                  </div>
                  <p className="text-gray-300">
                    Reduces emergency response time, connects healthcare and
                    safety networks, and promotes smarter, tech-driven cities.
                  </p>
                </div>

                <div
                  className="rounded-2xl p-6 border border-pink-400 border-opacity-20"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(251, 146, 60, 0.1) 100%)",
                  }}
                >
                  <div className="flex items-center mb-3">
                    <Phone className="w-6 h-6 text-pink-400 mr-3" />
                    <h3 className="text-xl font-bold text-white">For Users</h3>
                  </div>
                  <p className="text-gray-300">
                    One app for all — instant SOS, online consultation, nearby
                    help, and complete medical support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="max-w-7xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Partners
            </h2>
            <p className="text-gray-400 text-lg">
              Connected network of emergency and healthcare services
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredPartner(index)}
                onMouseLeave={() => setHoveredPartner(null)}
                className="group rounded-2xl p-8 border border-white border-opacity-10 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="text-7xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                  {partner.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white transition-all duration-300">
                  {partner.name}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Owner Registration Section */}
        <section className="max-w-7xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Join Our Network
            </h2>
            <p className="text-gray-400 text-lg">
              Register and become part of the life-saving ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ownerTypes.map((owner, index) => (
              <div
                key={index}
                className="rounded-2xl p-8 border border-white border-opacity-10 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-full ${owner.bgColor} mb-4`}
                >
                  <h3 className="text-xl font-bold text-white">{owner.role}</h3>
                </div>

                <p className="text-gray-400 mb-6">{owner.description}</p>

                <button
                  className={`w-full ${owner.bgColor} ${owner.hoverBg} text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}
                >
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* About Description */}
        <section className="max-w-4xl mx-auto">
          <div
            className="rounded-3xl p-12 border border-white border-opacity-10 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)",
              backdropFilter: "blur(20px)",
            }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">About Us</h2>
            <p className="text-gray-300 text-lg">
              Helix Emergency Healthcare is a comprehensive platform connecting
              patients with emergency services, doctors, hospitals, ambulances,
              police, and fire brigades. Our mission is to provide fast,
              reliable, and coordinated emergency assistance to save lives. With
              new partnerships in pharmacy and pathology, we ensure complete
              medical support — from emergency response to doorstep healthcare.
            </p>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
