import React from "react";

export function Features() {
  const items = [
    {
      title: "Nearest Dispatch",
      desc: "We route your request to the closest available ambulance and EMT team.",
    },
    {
      title: "Location Aware",
      desc: "Share your live location to improve response accuracy and speed.",
    },
    {
      title: "24/7 Availability",
      desc: "Round-the-clock operations, holidays included.",
    },
    {
      title: "Secure & Private",
      desc: "Your emergency data is protected and shared only with responders.",
    },
  ];

  return (
    <section
      aria-label="Key features"
      className="relative py-16 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"
    >
      {/* soft blur background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white drop-shadow-lg">
          Why Choose <span className="text-indigo-400">HelixSOS?</span>
        </h2>
        <p className="mt-3 text-slate-300 text-center text-lg max-w-2xl mx-auto">
          Experience next-generation emergency response powered by real-time
          location and technology.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg 
                         shadow-lg hover:shadow-[0_0_25px_-5px_rgba(99,102,241,0.4)] 
                         hover:scale-105 transition-transform duration-300"
            >
              <h3 className="font-semibold text-lg text-white">{it.title}</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                {it.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
