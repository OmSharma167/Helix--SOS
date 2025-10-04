import React from "react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Ambulance Booking",
    desc: "Book an ambulance instantly with live tracking and the fastest route to hospitals.",
    color: "bg-rose-500/20 text-rose-300",
    icon: "🚑",
    link: "/ambulance",
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
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-100">
          Our Healthcare & Emergency Services
        </h2>
        <p className="mt-4 text-lg text-slate-400 text-center max-w-2xl mx-auto">
          HelixSOS brings emergency and healthcare services at your fingertips —
          fast, reliable, and secure.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((s, i) => (
            <article
              key={i}
              className="p-6 bg-slate-800/60 border border-slate-700 rounded-2xl hover:scale-105 transition"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color} mb-4`}
              >
                <span className="text-2xl">{s.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-100">
                {s.title}
              </h3>
              <p className="text-sm text-slate-400 mt-2">{s.desc}</p>

              {/* Redirect button */}
              <div className="mt-4">
                <Link
                  to={s.link}
                  className="inline-block px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                >
                  Click
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
