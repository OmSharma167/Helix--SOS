import React from "react";

const HowItWorksSection = () => {
  const steps = [
    {
      step: 1,
      title: "Choose Your Doctor",
      text: "Browse through our verified doctors and select based on specialty and ratings",
    },
    {
      step: 2,
      title: "Book Appointment",
      text: "Select your preferred time slot for online or offline consultation",
    },
    {
      step: 3,
      title: "Consult & Discuss",
      text: "Have a detailed discussion about your health concerns with the doctor",
    },
    {
      step: 4,
      title: "Get Prescription",
      text: "Receive your digital prescription and follow-up care instructions",
    },
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Simple steps to connect with your doctor
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map(({ step, title, text }) => (
            <div key={step} className="text-center">
              <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                {step}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
