

// import React, { useEffect, useState } from "react";
// import { getDoctors } from "../services/doctorService";
// import { useNavigate } from "react-router-dom";
// import { Star, MapPin, Clock, DollarSign, User } from "lucide-react";

// export default function DoctorListPage() {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await getDoctors();
//         setDoctors(res);
//       } catch (err) {
//         console.error("Error fetching doctors:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDoctors();
//   }, []);

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

//   if (loading) return <p className="text-center mt-20">Loading doctors...</p>;

//   return (
//     <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">
//             Find Your Perfect Doctor
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Choose from our network of qualified healthcare professionals
//           </p>
//         </div>

//         {/* Doctor Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {doctors.map((doc) => (
//             <div
//               key={doc._id}
//               className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden"
//             >
//               {/* Doctor Image */}
//               <div className="relative">
//                 {doc.imageUrl ? (
//                   <img
//                     src={doc.imageUrl}
//                     alt={doc.userId?.name}
//                     className="w-full h-48 object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-48 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
//                     <User size={64} className="text-white" />
//                   </div>
//                 )}

//                 {/* Status Badge */}
//                 <div
//                   className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
//                     doc.availability
//                   )}`}
//                 >
//                   {getStatusText(doc.availability)}
//                 </div>
//               </div>

//               {/* Card Content */}
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-gray-800 mb-1 truncate">
//                   {doc.userId?.name || "Dr. Unknown"}
//                 </h3>
//                 <p className="text-indigo-600 font-medium text-sm mb-3 truncate">
//                   {doc.specialization}
//                 </p>

//                 {/* Key Info */}
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center text-gray-600">
//                       <Clock size={16} className="mr-2" />
//                       <span className="text-sm">{doc.experience} years</span>
//                     </div>
//                     <div className="flex items-center">
//                       <Star
//                         size={16}
//                         className="text-yellow-400 fill-current mr-1"
//                       />
//                       <span className="text-sm font-semibold text-gray-700">
//                         {doc.rating}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="flex items-center text-gray-600">
//                     <MapPin size={16} className="mr-2" />
//                     <span className="text-sm truncate">{doc.location}</span>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center text-gray-600">
//                       <DollarSign size={16} className="mr-2" />
//                       <span className="text-sm">₹{doc.price}</span>
//                     </div>
//                     <button
//                       onClick={() => navigate(`/book-doctor/${doc._id}`)}
//                       className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
