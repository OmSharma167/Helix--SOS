import {
  TestTube2,
  Clock,
  Shield,
  Home,
  ChevronRight,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

 import React from "react"
function PathologyTest() {
  return (
    <div className=" bg-white">
      <section className=" px-6">
        <div className="container mx-auto">
          <div className="grid  md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Healthcare at Your
                <span className="text-blue-600"> Doorstep</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Book blood tests and diagnostic services with certified
                professionals who come to your home. Fast, accurate, and
                convenient.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center group">
                  Book Home Collection
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all">
                  View All Tests
                </button>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">500K+</div>
                  <div className="text-sm text-gray-600 mt-1">Tests Done</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">98%</div>
                  <div className="text-sm text-gray-600 mt-1">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">24hrs</div>
                  <div className="text-sm text-gray-600 mt-1">Results</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Medical professional"
                  className="rounded-2xl shadow-lg w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      NABL Certified
                    </div>
                    <div className="text-sm text-gray-600">Trusted Results</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="tests"
        className="py-20 bg-gradient-to-br from-blue-50 to-white px-6"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Tests
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive diagnostic packages for every need
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Complete Blood Count",
                tests: "28 Tests",
                price: "₹399",
              },
              { name: "Diabetes Profile", tests: "12 Tests", price: "₹599" },
              { name: "Thyroid Function", tests: "8 Tests", price: "₹499" },
              { name: "Lipid Profile", tests: "10 Tests", price: "₹449" },
              { name: "Liver Function", tests: "15 Tests", price: "₹699" },
              { name: "Kidney Function", tests: "12 Tests", price: "₹599" },
              { name: "Vitamin Profile", tests: "18 Tests", price: "₹1299" },
              { name: "Full Body Checkup", tests: "85 Tests", price: "₹1999" },
            ].map((test, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <TestTube2 className="w-10 h-10 text-blue-600" />
                  <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
                    {test.tests}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {test.name}
                </h3>
                <div className="flex items-end justify-between mt-4">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {test.price}
                    </div>
                    <div className="text-sm text-gray-500">onwards</div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                    Book Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-gray-50 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600">
              Experience healthcare that comes to you
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Home className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Home Sample Collection
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Certified phlebotomists visit your home at your convenience. No
                more waiting in queues or traveling to labs.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Fast Results
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get your test reports within 24 hours via email and mobile app.
                Critical reports delivered even faster.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                100% Safe & Secure
              </h3>
              <p className="text-gray-600 leading-relaxed">
                NABL accredited labs, sterile equipment, and complete data
                privacy. Your health and safety is our priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to better health
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Book Your Test
                </h3>
                <p className="text-gray-600">
                  Select your tests from our comprehensive catalog and choose a
                  convenient time slot.
                </p>
              </div>
              <div className="hidden md:block absolute top-8 right-0 transform translate-x-1/2">
                <ChevronRight className="w-6 h-6 text-blue-300" />
              </div>
            </div>
            <div className="relative">
              <div className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Sample Collection
                </h3>
                <p className="text-gray-600">
                  Our certified professional visits your home and collects
                  samples safely and hygienically.
                </p>
              </div>
              <div className="hidden md:block absolute top-8 right-0 transform translate-x-1/2">
                <ChevronRight className="w-6 h-6 text-blue-300" />
              </div>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Get Results
              </h3>
              <p className="text-gray-600">
                Receive accurate reports digitally within 24 hours with doctor
                consultations available.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600 text-white px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Book your test now and get results within 24 hours
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg font-semibold text-lg">
            Schedule Home Collection
          </button>
        </div>
      </section>
    </div>
  );
}

export default PathologyTest;
