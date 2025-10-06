import React from "react";
import { Video, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className=" pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Connect with Certified Doctors
              <span className="text-teal-600"> Anytime, Anywhere</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Get expert medical advice through online video consultations or
              schedule offline appointments with certified healthcare
              professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate("/DoctorsSection")}
                className="bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-all hover:shadow-lg"
              >
                Book Online Consultation
              </button>
              <button className="border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-50 transition-colors">
                Schedule Offline Visit
              </button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold text-gray-900">4.9/5</span>
                <span className="text-gray-600">Rating</span>
              </div>
              <div className="border-l pl-8 border-gray-300">
                <span className="font-semibold text-gray-900">50,000+</span>
                <span className="text-gray-600"> Happy Patients</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Doctor consultation"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl hidden lg:block">
              <div className="flex items-center gap-4">
                <div className="bg-teal-100 p-3 rounded-lg">
                  <Video className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">24/7 Available</p>
                  <p className="text-sm text-gray-600">Online Consultations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
