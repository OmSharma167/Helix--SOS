


// import React, { useEffect, useState } from "react";
// import { getDoctors } from "../services/doctorService";
// import { useNavigate } from "react-router-dom";

// export default function DoctorListPage() {
//     const navigate = useNavigate();
//   const [doctors, setDoctors] = useState([]);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const data = await getDoctors();
//         setDoctors(data);
//       } catch (err) {
//         console.error("Error fetching doctors:", err);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h2 className="text-2xl font-bold text-indigo-600 mb-6">Doctors</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {doctors.map((doc) => (
//           <div
//             key={doc._id}
//             className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
//           >
//             {/* Doctor Image */}
//             {doc.imageUrl && (
//               <img
//                 src={doc.imageUrl}
//                 alt={doc.userId?.name}
//                 className="w-24 h-24 rounded-full object-cover mb-4 mx-auto"
//               />
//             )}

//             {/* Basic Info */}
//             <h3 className="text-xl font-semibold text-gray-800 text-center">
//               {doc.userId?.name}
//             </h3>
//             <p className="text-sm text-gray-500 text-center mb-3">
//               {doc.userId?.email}
//             </p>

//             {/* Details */}
//             <div className="space-y-2 text-sm text-gray-700">
//               <p>
//                 <span className="font-medium">Specialization:</span>{" "}
//                 {doc.specialization}
//               </p>
//               <p>
//                 <span className="font-medium">Qualifications:</span>{" "}
//                 {doc.qualifications?.join(", ")}
//               </p>
//               <p>
//                 <span className="font-medium">Experience:</span>{" "}
//                 {doc.experience} years
//               </p>
//               <p>
//                 <span className="font-medium">Location:</span> {doc.location}
//               </p>
//               <p>
//                 <span className="font-medium">Fee:</span> ₹{doc.price}
//               </p>
//               <p>
//                 <span className="font-medium">Timing:</span> {doc.timing}
//               </p>
//               <p>
//                 <span className="font-medium">Languages:</span> {doc.language}
//               </p>
//               <p>
//                 <span className="font-medium">Certification:</span>{" "}
//                 {doc.certification}
//               </p>
//               <p>
//                 <span className="font-medium">Availability:</span>{" "}
//                 <span
//                   className={
//                     doc.availability === "Available" ||
//                     doc.availability === true
//                       ? "text-green-600 font-semibold"
//                       : "text-red-600 font-semibold"
//                   }
//                 >
//                   {doc.availability === true ? "Available" : doc.availability}
//                 </span>
//               </p>
//             </div>

//             {/* Bio */}
//             {doc.bio && (
//               <p className="mt-4 text-gray-600 text-sm border-t pt-3">
//                 {doc.bio}
//               </p>
//             )}

//             <button
//               onClick={() => navigate(`/book-doctor/${doc._id}`)}
//               className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
//             >
//               Book Appointment
//             </button>

//             {/* Social Media */}
//             {doc.socialMedia && (
//               <a
//                 href={doc.socialMedia}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-3 inline-block text-indigo-600 text-sm font-medium hover:underline"
//               >
//                 Connect on Social Media
//               </a>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { getDoctors } from "../services/doctorService";
// import { createBooking } from "../services/bookingService";
// import { useAuth } from "../context/AuthContext";
// import {
//   Star,
//   MapPin,
//   Clock,
//   DollarSign,
//   Calendar,
//   X,
//   User,
//   Award,
//   Languages,
//   Phone,
// } from "lucide-react";

// export default function DoctorListPage() {
//   const { token } = useAuth();
//   const [doctors, setDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [appointmentDate, setAppointmentDate] = useState("");
//   const [reason, setReason] = useState("");
//   const [loading, setLoading] = useState(false);

 
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await getDoctors(); // ✅ call API
//         setDoctors(res);
//       } catch (err) {
//         console.error("Error fetching doctors:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   if (loading) return <p>Loading doctors...</p>;

//   const handleDoctorClick = (doctor) => {
//     setSelectedDoctor(doctor);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedDoctor(null);
//     setAppointmentDate("");
//     setReason("");
//   };

//   // const handleBooking = (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);

//   //   // Simulate booking API call
//   //   setTimeout(() => {
//   //     alert("Appointment booked successfully!");
//   //     handleCloseModal();
//   //     setLoading(false);
//   //   }, 1500);
//   // };

//   const handleBooking = async (e) => {
//     e.preventDefault();
//     if (!token) return alert("You must be logged in to book an appointment.");

//     setLoading(true);

//     try {
//       const bookingData = {
//         doctorId: selectedDoctor._id,
//         date: appointmentDate,
//         reason,
//       };

//       const res = await createBooking(bookingData, token);
//       alert("Appointment booked successfully!");
//       console.log("Booking response:", res);
//       handleCloseModal();
//     } catch (err) {
//       console.error("Booking error:", err);
//       alert("Failed to book appointment. Try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusColor = (availability) => {
//     if (availability === "Available" || availability === true) {
//       return "bg-green-100 text-green-800 border-green-200";
//     }
//     return "bg-red-100 text-red-800 border-red-200";
//   };

//   const getStatusText = (availability) => {
//     if (availability === true) return "Available";
//     return availability || "Not Available";
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-12">
//             <h1 className="text-4xl font-bold text-gray-800 mb-4">
//               Find Your Perfect Doctor
//             </h1>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Choose from our network of qualified healthcare professionals
//             </p>
//           </div>

//           {/* Doctor Cards Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {doctors.map((doc) => (
//               <div
//                 key={doc._id}
//                 onClick={() => handleDoctorClick(doc)}
//                 className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden"
//               >
//                 {/* Doctor Image */}
//                 <div className="relative">
//                   {doc.imageUrl ? (
//                     <img
//                       src={doc.imageUrl}
//                       alt={doc.userId?.name}
//                       className="w-full h-48 object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-48 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
//                       <User size={64} className="text-white" />
//                     </div>
//                   )}

//                   {/* Status Badge */}
//                   <div
//                     className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
//                       doc.availability
//                     )}`}
//                   >
//                     {getStatusText(doc.availability)}
//                   </div>
//                 </div>

//                 {/* Card Content */}
//                 <div className="p-6">
//                   {/* Doctor Name & Specialty */}
//                   <h3 className="text-xl font-bold text-gray-800 mb-1 truncate">
//                     {doc.userId?.name || "Dr. Unknown"}
//                   </h3>
//                   <p className="text-indigo-600 font-medium text-sm mb-3 truncate">
//                     {doc.specialization}
//                   </p>

//                   {/* Key Info */}
//                   <div className="space-y-3">
//                     {/* Experience & Rating */}
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center text-gray-600">
//                         <Clock size={16} className="mr-2" />
//                         <span className="text-sm">{doc.experience} years</span>
//                       </div>
//                       <div className="flex items-center">
//                         <Star
//                           size={16}
//                           className="text-yellow-400 fill-current mr-1"
//                         />
//                         <span className="text-sm font-semibold text-gray-700">
//                           {doc.rating}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Location */}
//                     <div className="flex items-center text-gray-600">
//                       <MapPin size={16} className="mr-2" />
//                       <span className="text-sm truncate">{doc.location}</span>
//                     </div>

//                     {/* Price */}
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center text-gray-600">
//                         <DollarSign size={16} className="mr-2" />
//                         <span className="text-sm">₹{doc.price}</span>
//                       </div>
//                       <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && selectedDoctor && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             {/* Modal Header */}
//             <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-2xl">
//               <h2 className="text-2xl font-bold text-gray-800">
//                 Doctor Details
//               </h2>
//               <button
//                 onClick={handleCloseModal}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <X size={24} className="text-gray-500" />
//               </button>
//             </div>

//             <div className="p-6">
//               <div className="grid md:grid-cols-2 gap-8">
//                 {/* Left Column - Doctor Info */}
//                 <div>
//                   {/* Doctor Profile */}
//                   <div className="text-center mb-6">
//                     {selectedDoctor.imageUrl ? (
//                       <img
//                         src={selectedDoctor.imageUrl}
//                         alt={selectedDoctor.userId?.name}
//                         className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-indigo-100"
//                       />
//                     ) : (
//                       <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center mx-auto mb-4">
//                         <User size={64} className="text-white" />
//                       </div>
//                     )}
//                     <h3 className="text-2xl font-bold text-gray-800">
//                       {selectedDoctor.userId?.name}
//                     </h3>
//                     <p className="text-indigo-600 font-medium">
//                       {selectedDoctor.specialization}
//                     </p>
//                     <div className="flex items-center justify-center mt-2">
//                       <Star
//                         size={20}
//                         className="text-yellow-400 fill-current mr-1"
//                       />
//                       <span className="text-lg font-semibold text-gray-700">
//                         {selectedDoctor.rating}
//                       </span>
//                       <span className="text-gray-500 ml-1">(127 reviews)</span>
//                     </div>
//                   </div>

//                   {/* Detailed Info */}
//                   <div className="space-y-4">
//                     <div className="flex items-start">
//                       <Award className="text-indigo-600 mt-1 mr-3" size={20} />
//                       <div>
//                         <p className="font-semibold text-gray-800">
//                           Qualifications
//                         </p>
//                         <p className="text-gray-600 text-sm">
//                           {selectedDoctor.qualifications?.join(", ") ||
//                             "Not specified"}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-start">
//                       <Clock className="text-indigo-600 mt-1 mr-3" size={20} />
//                       <div>
//                         <p className="font-semibold text-gray-800">
//                           Experience
//                         </p>
//                         <p className="text-gray-600 text-sm">
//                           {selectedDoctor.experience} years
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-start">
//                       <MapPin className="text-indigo-600 mt-1 mr-3" size={20} />
//                       <div>
//                         <p className="font-semibold text-gray-800">Location</p>
//                         <p className="text-gray-600 text-sm">
//                           {selectedDoctor.location}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-start">
//                       <Languages
//                         className="text-indigo-600 mt-1 mr-3"
//                         size={20}
//                       />
//                       <div>
//                         <p className="font-semibold text-gray-800">Languages</p>
//                         <p className="text-gray-600 text-sm">
//                           {selectedDoctor.language}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-start">
//                       <DollarSign
//                         className="text-indigo-600 mt-1 mr-3"
//                         size={20}
//                       />
//                       <div>
//                         <p className="font-semibold text-gray-800">
//                           Consultation Fee
//                         </p>
//                         <p className="text-gray-600 text-sm">
//                           ₹{selectedDoctor.price}
//                         </p>
//                       </div>
//                     </div>

//                     {selectedDoctor.timing && (
//                       <div className="flex items-start">
//                         <Clock
//                           className="text-indigo-600 mt-1 mr-3"
//                           size={20}
//                         />
//                         <div>
//                           <p className="font-semibold text-gray-800">Timing</p>
//                           <p className="text-gray-600 text-sm">
//                             {selectedDoctor.timing}
//                           </p>
//                         </div>
//                       </div>
//                     )}

//                     {selectedDoctor.bio && (
//                       <div className="mt-6">
//                         <p className="font-semibold text-gray-800 mb-2">
//                           About
//                         </p>
//                         <p className="text-gray-600 text-sm leading-relaxed">
//                           {selectedDoctor.bio}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Right Column - Booking Form */}
//                 <div className="bg-gray-50 p-6 rounded-xl">
//                   <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//                     <Calendar className="mr-2 text-indigo-600" size={24} />
//                     Book Appointment
//                   </h4>

//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         Appointment Date
//                       </label>
//                       <input
//                         type="date"
//                         value={appointmentDate}
//                         onChange={(e) => setAppointmentDate(e.target.value)}
//                         min={new Date().toISOString().split("T")[0]}
//                         className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         Reason for Appointment
//                       </label>
//                       <textarea
//                         placeholder="Describe your symptoms or reason for consultation..."
//                         value={reason}
//                         onChange={(e) => setReason(e.target.value)}
//                         rows={4}
//                         className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                         required
//                       />
//                     </div>

//                     <div className="bg-white p-4 rounded-lg border">
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-gray-700">Consultation Fee:</span>
//                         <span className="font-bold text-lg text-gray-800">
//                           ₹{selectedDoctor.price}
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-700">Platform Fee:</span>
//                         <span className="font-bold text-lg text-gray-800">
//                           ₹50
//                         </span>
//                       </div>
//                       <hr className="my-2" />
//                       <div className="flex justify-between items-center">
//                         <span className="text-lg font-semibold text-gray-800">
//                           Total:
//                         </span>
//                         <span className="font-bold text-xl text-indigo-600">
//                           ₹{parseInt(selectedDoctor.price) + 50}
//                         </span>
//                       </div>
//                     </div>

//                     <button
//                       onClick={handleBooking}
//                       disabled={loading || !appointmentDate || !reason}
//                       className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {loading ? "Booking..." : "Book Appointment"}
//                     </button>
//                   </div>

//                   {selectedDoctor.socialMedia && (
//                     <div className="mt-6 pt-6 border-t">
//                       <a
//                         href={selectedDoctor.socialMedia}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center justify-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
//                       >
//                         <Phone size={20} className="mr-2" />
//                         Connect on Social Media
//                       </a>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



import React, { useEffect, useState } from "react";
import { getDoctors } from "../services/doctorService";
import { useNavigate } from "react-router-dom";
import { Star, MapPin, Clock, DollarSign, User } from "lucide-react";

export default function DoctorListPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getDoctors();
        setDoctors(res);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const getStatusColor = (availability) => {
    if (availability === "Available" || availability === true) {
      return "bg-green-100 text-green-800 border-green-200";
    }
    return "bg-red-100 text-red-800 border-red-200";
  };

  const getStatusText = (availability) => {
    if (availability === true) return "Available";
    return availability || "Not Available";
  };

  if (loading) return <p className="text-center mt-20">Loading doctors...</p>;

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Find Your Perfect Doctor
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our network of qualified healthcare professionals
          </p>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden"
            >
              {/* Doctor Image */}
              <div className="relative">
                {doc.imageUrl ? (
                  <img
                    src={doc.imageUrl}
                    alt={doc.userId?.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                    <User size={64} className="text-white" />
                  </div>
                )}

                {/* Status Badge */}
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                    doc.availability
                  )}`}
                >
                  {getStatusText(doc.availability)}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1 truncate">
                  {doc.userId?.name || "Dr. Unknown"}
                </h3>
                <p className="text-indigo-600 font-medium text-sm mb-3 truncate">
                  {doc.specialization}
                </p>

                {/* Key Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Clock size={16} className="mr-2" />
                      <span className="text-sm">{doc.experience} years</span>
                    </div>
                    <div className="flex items-center">
                      <Star
                        size={16}
                        className="text-yellow-400 fill-current mr-1"
                      />
                      <span className="text-sm font-semibold text-gray-700">
                        {doc.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm truncate">{doc.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <DollarSign size={16} className="mr-2" />
                      <span className="text-sm">₹{doc.price}</span>
                    </div>
                    <button
                      onClick={() => navigate(`/book-doctor/${doc._id}`)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
