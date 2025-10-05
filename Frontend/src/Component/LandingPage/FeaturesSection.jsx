import React from "react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Ambulance Booking",
    desc: "Book an ambulance instantly with live tracking and the fastest route to hospitals.",
    color: "bg-rose-500/20 text-rose-300",
    icon: "🚑",
    link: "/ambulances",
  },
  {
    title: "Nearest Pharmacy",
    desc: "Find and order medicines from the closest pharmacy, delivered to your doorstep.",
    color: "bg-emerald-500/20 text-emerald-300",
    icon: "💊",
    link: "/pharmacy",
  },
  {
    title: "Pathology Tests",
    desc: "Book blood tests and diagnostic services with home sample collection.",
    color: "bg-sky-500/20 text-sky-300",
    icon: "🧪",
    link: "/pathology",
  },
  {
    title: "Doctor Consultation",
    desc: "Connect with certified doctors for online or offline consultations anytime.",
    color: "bg-indigo-500/20 text-indigo-300",
    icon: "👨‍⚕️",
    link: "/doctors",
  },
  {
    title: "Fire Brigade",
    desc: "Request emergency fire brigade support instantly with real-time tracking.",
    color: "bg-orange-500/20 text-orange-300",
    icon: "🚒",
    link: "/firebrigade-list",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 overflow-hidden">
      {/* Background blur and glow layers */}
      <div className="absolute inset-0 backdrop-blur-3xl bg-slate-900/50"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 via-transparent to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white drop-shadow-lg">
          Our Healthcare & Emergency Services
        </h2>
        <p className="mt-4 text-lg text-slate-300 text-center max-w-2xl mx-auto">
          HelixSOS brings emergency and healthcare services at your fingertips —{" "}
          <span className="text-indigo-400 font-semibold">
            fast, reliable, and secure.
          </span>
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((s, i) => (
            <article
              key={i}
              className="p-6 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)] transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${s.color} mb-4 shadow-inner`}
              >
                <span className="text-3xl">{s.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-white">{s.title}</h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                {s.desc}
              </p>

              <div className="mt-5">
                <Link
                  to={s.link}
                  className="inline-block px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 hover:shadow-lg transition-all duration-300"
                >
                  Explore
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
