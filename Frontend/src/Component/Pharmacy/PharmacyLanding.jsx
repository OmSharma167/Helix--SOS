import React, { useState, useEffect } from "react";
import {
  Pill,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  Search,
  Star,
  ChevronRight,
  Phone,
  Mail,
} from "lucide-react";

export default function PharmacyLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [searchFocus, setSearchFocus] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Find Nearby Pharmacies",
      description:
        "Locate verified pharmacies closest to your location instantly",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Quick Delivery",
      description: "Get your medicines delivered in 30-60 minutes",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Verified Medicines",
      description: "100% authentic medicines with proper certification",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Track Your Order",
      description: "Real-time tracking from pharmacy to your doorstep",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Amazing service! Got my medicines delivered in 40 minutes.",
    },
    {
      name: "Mike Chen",
      rating: 5,
      text: "Reliable and fast. The app is super easy to use.",
    },
    {
      name: "Priya Sharma",
      rating: 5,
      text: "Best pharmacy delivery service I've used. Highly recommend!",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                  ⚡ 30-Minute Delivery Available
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Your Health,
                <span className="bg-gradient-to-r"> Delivered Fast</span>
              </h1>
              <p className="text-xl text-gray-600">
                Find verified pharmacies near you and get medicines delivered to
                your doorstep in minutes. Safe, fast, and reliable.
              </p>

              {/* Search Bar */}
              <div
                className={`flex items-center bg-blue-50 rounded-2xl shadow-xl p-2 transition-all duration-300 ${
                  searchFocus ? "ring-4 ring-blue-400" : ""
                }`}
              >
                <Search className="w-6 h-6 text-gray-400 ml-4" />
                <input
                  type="text"
                  placeholder="Search for medicines, health products..."
                  className="flex-1 px-4 py-4 outline-none text-gray-700"
                  onFocus={() => setSearchFocus(true)}
                  onBlur={() => setSearchFocus(false)}
                />
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition">
                  Search
                </button>
              </div>

              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white"
                      ></div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    10,000+ Happy Customers
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">4.9/5</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition duration-500">
                <img
                  src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600&h=600&fit=crop"
                  alt="Pharmacy"
                  className="rounded-2xl w-full h-96 object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-xl">
                  <p className="text-3xl font-bold">30min</p>
                  <p className="text-sm">Fast Delivery</p>
                </div>
              </div>
              <div className="absolute top-10 -left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
              <div className="absolute bottom-10 -right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Medicines */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Medicines
            </h2>
            <p className="text-xl text-gray-600">
              Browse our most ordered medicines and health products
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                name: "Paracetamol 500mg",
                category: "Pain Relief",
                price: "₹45",
                stock: "In Stock",
                discount: "20% OFF",
              },
              {
                name: "Vitamin D3 Tablets",
                category: "Supplements",
                price: "₹299",
                stock: "In Stock",
                discount: "15% OFF",
              },
              {
                name: "Cough Syrup",
                category: "Cold & Flu",
                price: "₹120",
                stock: "In Stock",
                discount: "10% OFF",
              },
              {
                name: "Antiseptic Cream",
                category: "First Aid",
                price: "₹85",
                stock: "In Stock",
                discount: "",
              },
              {
                name: "Multivitamin Capsules",
                category: "Supplements",
                price: "₹450",
                stock: "In Stock",
                discount: "25% OFF",
              },
              {
                name: "Hand Sanitizer 500ml",
                category: "Hygiene",
                price: "₹150",
                stock: "In Stock",
                discount: "",
              },
              {
                name: "Digital Thermometer",
                category: "Medical Devices",
                price: "₹250",
                stock: "In Stock",
                discount: "30% OFF",
              },
              {
                name: "Blood Pressure Monitor",
                category: "Medical Devices",
                price: "₹1,299",
                stock: "In Stock",
                discount: "20% OFF",
              },
            ].map((medicine, index) => (
              <div
                key={index}
                className="bg-cyan-50 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 overflow-hidden group"
              >
                {medicine.discount && (
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 text-sm font-bold inline-block">
                    {medicine.discount}
                  </div>
                )}
                <div className="p-6">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl h-20 mb-4 flex items-center justify-center group-hover:scale-105 transition duration-300">
                    <Pill className="w-10 h-10 text-blue-600" />
                  </div>
                  <span className="text-xs text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-full">
                    {medicine.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">
                    {medicine.name}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      {medicine.price}
                    </span>
                    <span className="text-sm text-green-600 font-semibold">
                      {medicine.stock}
                    </span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition">
              View All Medicines →
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for a seamless medicine delivery experience
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl hover:shadow-xl transform hover:-translate-y-2 transition duration-300 cursor-pointer"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get your medicines in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Search & Select",
                desc: "Find medicines from nearby verified pharmacies",
              },
              {
                step: "2",
                title: "Place Order",
                desc: "Add to cart and proceed with secure payment",
              },
              {
                step: "3",
                title: "Get Delivered",
                desc: "Receive your order at your doorstep quickly",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-center">{item.desc}</p>
                </div>
                {index < 2 && (
                  <ChevronRight className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-blue-600 w-8 h-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
