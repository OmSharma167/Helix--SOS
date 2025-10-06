// import {
//   Stethoscope,
//   Calendar,
//   Video,
//   Clock,
//   Shield,
//   Star,
//   Menu,
//   X,
// } from "lucide-react";
// import React, { useState } from "react";

// function DoctorLandingpage() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-white">
      
//       <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div className="space-y-6">
//               <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
//                 Connect with Certified Doctors
//                 <span className="text-teal-600"> Anytime, Anywhere</span>
//               </h1>
//               <p className="text-xl text-gray-600 leading-relaxed">
//                 Get expert medical advice through online video consultations or
//                 schedule offline appointments with certified healthcare
//                 professionals.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                 <button className="bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-all hover:shadow-lg">
//                   Book Online Consultation
//                 </button>
//                 <button className="border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-50 transition-colors">
//                   Schedule Offline Visit
//                 </button>
//               </div>
//               <div className="flex items-center gap-8 pt-4">
//                 <div className="flex items-center gap-2">
//                   <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
//                   <span className="font-semibold text-gray-900">4.9/5</span>
//                   <span className="text-gray-600">Rating</span>
//                 </div>
//                 <div className="border-l pl-8 border-gray-300">
//                   <span className="font-semibold text-gray-900">50,000+</span>
//                   <span className="text-gray-600"> Happy Patients</span>
//                 </div>
//               </div>
//             </div>
//             <div className="relative">
//               <img
//                 src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800"
//                 alt="Doctor consultation"
//                 className="rounded-2xl shadow-2xl"
//               />
//               <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl hidden lg:block">
//                 <div className="flex items-center gap-4">
//                   <div className="bg-teal-100 p-3 rounded-lg">
//                     <Video className="h-6 w-6 text-teal-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">
//                       24/7 Available
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Online Consultations
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="services" className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Our Services
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Comprehensive healthcare solutions designed for your convenience
//               and well-being
//             </p>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
//               <div className="bg-teal-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
//                 <Video className="h-7 w-7 text-teal-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                 Online Video Consultation
//               </h3>
//               <p className="text-gray-600 leading-relaxed mb-6">
//                 Connect with experienced doctors through secure video calls from
//                 the comfort of your home.
//               </p>
//               <ul className="space-y-2 text-gray-600">
//                 <li className="flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 bg-teal-600 rounded-full"></span>
//                   Instant consultations available
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 bg-teal-600 rounded-full"></span>
//                   No waiting time
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 bg-teal-600 rounded-full"></span>
//                   Digital prescriptions
//                 </li>
//               </ul>
//             </div>

//             <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
//               <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
//                 <Calendar className="h-7 w-7 text-blue-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                 Schedule Offline Appointments
//               </h3>
//               <p className="text-gray-600 leading-relaxed mb-6">
//                 Book in-person appointments at our partner clinics and hospitals
//                 near you.
//               </p>
//               <ul className="space-y-2 text-gray-600">
//                 <li className="flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
//                   Choose your preferred time
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
//                   Multiple locations available
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
//                   Reminder notifications
//                 </li>
//               </ul>
//             </div>

//             <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
//               <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
//                 <Clock className="h-7 w-7 text-green-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                 24/7 Emergency Support
//               </h3>
//               <p className="text-gray-600 leading-relaxed mb-6">
//                 Round-the-clock access to medical professionals for urgent
//                 health concerns.
//               </p>
//               <ul className="space-y-2 text-gray-600">
//                 <li className="flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
//                   Immediate response time
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
//                   Expert triage support
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
//                   Emergency referrals
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="how-it-works" className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               How It Works
//             </h2>
//             <p className="text-xl text-gray-600">
//               Simple steps to connect with your doctor
//             </p>
//           </div>
//           <div className="grid md:grid-cols-4 gap-8">
//             <div className="text-center">
//               <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
//                 1
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">
//                 Choose Your Doctor
//               </h3>
//               <p className="text-gray-600">
//                 Browse through our verified doctors and select based on
//                 specialty and ratings
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
//                 2
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">
//                 Book Appointment
//               </h3>
//               <p className="text-gray-600">
//                 Select your preferred time slot for online or offline
//                 consultation
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
//                 3
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">
//                 Consult & Discuss
//               </h3>
//               <p className="text-gray-600">
//                 Have a detailed discussion about your health concerns with the
//                 doctor
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
//                 4
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">
//                 Get Prescription
//               </h3>
//               <p className="text-gray-600">
//                 Receive your digital prescription and follow-up care
//                 instructions
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="doctors" className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Meet Our Doctors
//             </h2>
//             <p className="text-xl text-gray-600">
//               Certified healthcare professionals ready to help you
//             </p>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
//               <img
//                 src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600"
//                 alt="Doctor"
//                 className="w-full h-64 object-cover"
//               />
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-1">
//                   Dr. Sarah Johnson
//                 </h3>
//                 <p className="text-teal-600 mb-3">General Physician</p>
//                 <p className="text-gray-600 mb-4">
//                   15 years of experience in family medicine and preventive care
//                 </p>
//                 <div className="flex items-center gap-2 mb-4">
//                   <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
//                   <span className="font-semibold">4.9</span>
//                   <span className="text-gray-600 text-sm">(230 reviews)</span>
//                 </div>
//                 <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">
//                   Book Appointment
//                 </button>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
//               <img
//                 src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=600"
//                 alt="Doctor"
//                 className="w-full h-64 object-cover"
//               />
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-1">
//                   Dr. Michael Chen
//                 </h3>
//                 <p className="text-teal-600 mb-3">Cardiologist</p>
//                 <p className="text-gray-600 mb-4">
//                   Specialized in heart health and cardiovascular diseases
//                 </p>
//                 <div className="flex items-center gap-2 mb-4">
//                   <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
//                   <span className="font-semibold">5.0</span>
//                   <span className="text-gray-600 text-sm">(189 reviews)</span>
//                 </div>
//                 <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">
//                   Book Appointment
//                 </button>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
//               <img
//                 src="https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=600"
//                 alt="Doctor"
//                 className="w-full h-64 object-cover"
//               />
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-1">
//                   Dr. Emily Rodriguez
//                 </h3>
//                 <p className="text-teal-600 mb-3">Pediatrician</p>
//                 <p className="text-gray-600 mb-4">
//                   Expert in child healthcare and developmental medicine
//                 </p>
//                 <div className="flex items-center gap-2 mb-4">
//                   <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
//                   <span className="font-semibold">4.8</span>
//                   <span className="text-gray-600 text-sm">(156 reviews)</span>
//                 </div>
//                 <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">
//                   Book Appointment
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 bg-teal-600">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-3 gap-12 text-white">
//             <div className="flex items-start gap-4">
//               <Shield className="h-12 w-12 flex-shrink-0" />
//               <div>
//                 <h3 className="text-xl font-bold mb-2">
//                   100% Secure & Private
//                 </h3>
//                 <p className="text-teal-50">
//                   Your health data is encrypted and completely confidential
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-start gap-4">
//               <Stethoscope className="h-12 w-12 flex-shrink-0" />
//               <div>
//                 <h3 className="text-xl font-bold mb-2">Certified Doctors</h3>
//                 <p className="text-teal-50">
//                   All doctors are verified and licensed healthcare professionals
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-start gap-4">
//               <Clock className="h-12 w-12 flex-shrink-0" />
//               <div>
//                 <h3 className="text-xl font-bold mb-2">Quick Response</h3>
//                 <p className="text-teal-50">
//                   Get connected with a doctor within minutes
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

      
      
//     </div>
//   );
// }

// export default DoctorLandingpage;


import React, { useState } from "react";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import HowItWorksSection from "./HowItWorksSection";
import DoctorsSection from "./DoctorsSection";
import FeaturesSection from "./FeaturesSection";

function DoctorLandingpage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <DoctorsSection />
      <ServicesSection />
      <HowItWorksSection />

      <FeaturesSection />
    </div>
  );
}

export default DoctorLandingpage;
