import React from "react";
import { Shield, Stethoscope, Clock } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Shield className="h-12 w-12 flex-shrink-0" />,
      title: "100% Secure & Private",
      description: "Your health data is encrypted and completely confidential",
    },
    {
      icon: <Stethoscope className="h-12 w-12 flex-shrink-0" />,
      title: "Certified Doctors",
      description:
        "All doctors are verified and licensed healthcare professionals",
    },
    {
      icon: <Clock className="h-12 w-12 flex-shrink-0" />,
      title: "Quick Response",
      description: "Get connected with a doctor within minutes",
    },
  ];

  return (
    <section className="py-20 bg-teal-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 text-white">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-4">
              {feature.icon}
              <div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-teal-50">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
