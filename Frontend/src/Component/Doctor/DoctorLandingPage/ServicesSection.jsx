import React from "react";
import { Video, Calendar, Clock } from "lucide-react";

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive healthcare solutions designed for your convenience and
            well-being
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="bg-teal-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Video className="h-7 w-7 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Online Video Consultation
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Connect with experienced doctors through secure video calls from
              the comfort of your home.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-teal-600 rounded-full"></span>
                Instant consultations available
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-teal-600 rounded-full"></span>
                No waiting time
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-teal-600 rounded-full"></span>
                Digital prescriptions
              </li>
            </ul>
          </div>

          {/* Service 2 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Calendar className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Schedule Offline Appointments
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Book in-person appointments at our partner clinics and hospitals
              near you.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                Choose your preferred time
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                Multiple locations available
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                Reminder notifications
              </li>
            </ul>
          </div>

          {/* Service 3 */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Clock className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              24/7 Emergency Support
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Round-the-clock access to medical professionals for urgent health
              concerns.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                Immediate response time
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                Expert triage support
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                Emergency referrals
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
