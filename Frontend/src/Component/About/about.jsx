import React from "react";

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
];

const ownerTypes = [
  {
    role: "Doctor",
    description:
      "Register as a doctor to offer online consultation and emergency care.",
  },
  {
    role: "Ambulance Owner",
    description: "Register your ambulance for quick emergency response.",
  },
  {
    role: "Police",
    description:
      "Register as police to get notified of emergency situations in your area.",
  },
  {
    role: "Fire Brigade",
    description:
      "Register your fire service team to assist in fire emergencies.",
  },
];

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">
        About Helix Emergency Healthcare
      </h1>

      {/* Partners Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Our Partners
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 text-center hover:scale-105 transition-transform"
            >
              <div className="text-6xl mb-4">{partner.icon}</div>
              <h3 className="text-xl font-bold mb-2">{partner.name}</h3>
              <p className="text-gray-600">{partner.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Owner Registration Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Register as an Owner
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ownerTypes.map((owner, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition-shadow"
            >
              <h3 className="text-xl font-bold mb-2">{owner.role}</h3>
              <p className="text-gray-600 mb-4">{owner.description}</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Register
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* About Description */}
      <section className="max-w-3xl mx-auto text-center text-gray-700">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">About Us</h2>
        <p>
          Helix Emergency Healthcare is a comprehensive platform connecting
          patients with emergency services, doctors, hospitals, ambulances,
          police, and fire brigades. Our mission is to provide fast, reliable,
          and coordinated emergency assistance to save lives.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
