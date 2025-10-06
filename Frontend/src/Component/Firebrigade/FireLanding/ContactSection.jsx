import React from "react";
import { Phone, MapPin, Shield, ChevronRight } from "lucide-react";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="py-20 px-6 bg-gradient-to-br from-red-600 to-orange-600"
    >
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Need Emergency Assistance?
          </h2>
          <p className="text-xl text-red-100 leading-relaxed">
            Don't wait in an emergency. Our fire brigade teams are standing by
            24/7.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-white hover:bg-gray-100 text-red-600 px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-3">
              <Phone className="w-6 h-6" />
              <span>Call 911 Now</span>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="bg-red-800 hover:bg-red-900 text-white border-2 border-white/20 px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 shadow-2xl transform hover:-translate-y-1">
              Non-Emergency: (555) 123-4567
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-12">
            <div className="text-center">
              <Phone className="w-8 h-8 text-white mx-auto mb-3" />
              <div className="text-white font-semibold mb-1">24/7 Hotline</div>
              <div className="text-red-100 text-sm">Always Available</div>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 text-white mx-auto mb-3" />
              <div className="text-white font-semibold mb-1">GPS Tracking</div>
              <div className="text-red-100 text-sm">Real-Time Updates</div>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 text-white mx-auto mb-3" />
              <div className="text-white font-semibold mb-1">
                Certified Teams
              </div>
              <div className="text-red-100 text-sm">Highly Trained</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
