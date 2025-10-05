import React from "react";

export function Hero() {
  return (
    <section className="relative pt-28 bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-red-100 to-orange-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Help Arrives in{" "}
              <span className="relative inline-block">
                <span className="text-red-600">Minutes</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="12"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 10C50 2 150 2 198 10"
                    stroke="#DC2626"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              Not Hours
            </h1>

            <p className="text-xl text-gray-600 max-w-lg">
              Connect with the nearest ambulance instantly. Real-time tracking,
              verified medical staff, and guaranteed swift response.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">2min</div>
                <div className="text-sm text-gray-600">Avg Response</div>
              </div>
              <div className="text-center border-x border-gray-200">
                <div className="text-3xl font-bold text-red-600">500+</div>
                <div className="text-sm text-gray-600">Ambulances</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">24/7</div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-2 justify-center md:justify-start">
              <svg
                className="w-4 h-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              ISO certified ambulances with trained paramedics
            </p>
          </div>

          {/* Right Image Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-orange-200 rounded-3xl transform rotate-3"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=800&h=600&fit=crop"
                alt="Emergency ambulance service"
                className="w-full h-[500px] object-cover"
              />

              {/* Floating Card */}
              <div className="absolute top-8 left-8 bg-white rounded-2xl shadow-xl p-4 max-w-[200px] animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      Ambulance En Route
                    </div>
                    <div className="text-xs text-gray-500">ETA: 3 minutes</div>
                  </div>
                </div>
              </div>

              {/* Bottom Stats Card */}
              <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">98%</div>
                    <div className="text-xs text-gray-600">Success Rate</div>
                  </div>
                  <div className="w-px h-12 bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">15K+</div>
                    <div className="text-xs text-gray-600">Lives Saved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
