// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api"; // axios instance
// import { uploadToCloudinary } from "../utils/cloudinary"

// const RegisterAmbulance = () => {
//   const navigate = useNavigate();
//   const [saving, setSaving] = useState(false);
//   const [form, setForm] = useState({
//     driverName: "",
//     phoneNumber: "",
//     vehicleNumber: "",
//     location: { type: "Point", coordinates: [0, 0] },
//     imageUrl: "",
//   });

//   // handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((s) => ({ ...s, [name]: value }));
//   };

//   // handle longitude / latitude
//   const handleCoords = (e) => {
//     const { name, value } = e.target;
//     const coord = parseFloat(value || 0);
//     setForm((s) => {
//       const coords = [...s.location.coordinates];
//       if (name === "lng") coords[0] = coord;
//       if (name === "lat") coords[1] = coord;
//       return { ...s, location: { type: "Point", coordinates: coords } };
//     });
//   };

//   // image upload
//   const handleUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const res = await uploadToCloudinary(file);
//     setForm((s) => ({ ...s, imageUrl: res.secure_url }));
//   };

//   // form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       const payload = { ...form };
//       const { data } = await api.post("/ambulances", payload);
//       navigate("/ambulances"); // redirect after success
//     } catch (err) {
//       console.error(err);
//       alert("Failed to register ambulance");
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto py-8">
//       <h2 className="text-2xl font-semibold mb-4">Register Ambulance</h2>
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded shadow space-y-4"
//       >
//         <div>
//           <label className="block text-sm">Driver name</label>
//           <input
//             name="driverName"
//             value={form.driverName}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm">Phone</label>
//           <input
//             name="phoneNumber"
//             value={form.phoneNumber}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm">Vehicle number</label>
//           <input
//             name="vehicleNumber"
//             value={form.vehicleNumber}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-2">
//           <div>
//             <label className="block text-sm">Longitude</label>
//             <input
//               name="lng"
//               type="number"
//               step="0.000001"
//               onChange={handleCoords}
//               className="w-full border px-3 py-2 rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm">Latitude</label>
//             <input
//               name="lat"
//               type="number"
//               step="0.000001"
//               onChange={handleCoords}
//               className="w-full border px-3 py-2 rounded"
//               required
//             />
//           </div>
//         </div>
//         <div>
//           <label className="block text-sm">Upload Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleUpload}
//             className="w-full"
//           />
//           {form.imageUrl && (
//             <img
//               src={form.imageUrl}
//               alt="ambulance"
//               className="mt-2 h-32 rounded object-cover"
//             />
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={saving}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//         >
//           {saving ? "Saving..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterAmbulance;




// import React, { useState, useEffect } from "react";
// import {
//   MapPin,
//   Ambulance,
//   Phone,
//   User,
//   Clock,
//   Navigation,
//   Plus,
//   Search,
//   CheckCircle,
//   AlertCircle,
// } from "lucide-react";

// import { useAuth } from "../context/AuthContext";

// const AmbulanceSystem = () => {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState("find");
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestAmbulances, setNearestAmbulances] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [registrationData, setRegistrationData] = useState({
//     driverName: "",
//     phoneNumber: "",
//     vehicleNumber: "",
//     coordinates: [0, 0],
//     imageUrl: "",
//   });
//   const [registrationStatus, setRegistrationStatus] = useState(null);

//   // Mock API base URL - replace with your actual API
//   const API_BASE = "http://localhost:5000/api";

//   useEffect(() => {
//     getCurrentLocation();
//   }, []);

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation({ latitude, longitude });
//           setRegistrationData((prev) => ({
//             ...prev,
//             coordinates: [longitude, latitude],
//           }));
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           alert("Please enable location services to use this feature");
//         }
//       );
//     }
//   };

//   const findNearestAmbulances = async () => {
//     if (!userLocation) {
//       alert("Location not available. Please enable location services.");
//       return;
//     }

//     setLoading(true);
    
//     try {
//       const response = await fetch(
//         `${API_BASE}/ambulances/nearest?longitude=${userLocation.longitude}&latitude=${userLocation.latitude}&maxDistance=10000`
//       );
//       if (!response.ok) throw new Error("Failed to fetch ambulances");
//       const data = await response.json();
//       setNearestAmbulances(data.ambulances || []);
//     } catch (error) {
//       console.error("Error finding ambulances:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

  
//   const registerAmbulance = async () => {
//     if (
//       !registrationData.driverName ||
//       !registrationData.phoneNumber ||
//       !registrationData.vehicleNumber
//     ) {
//       alert("Please fill in all required fields");
//       return;
//     }
//     if (!user?.token) {
//       alert("You must be logged in to register an ambulance");
//       return;
//     }

//     setLoading(true);

    
//       try {
//       const res = await fetch(`${API_BASE}/ambulances/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.token}`, // ✅ use context token
//         },
//         body: JSON.stringify(registrationData),
//       });

//       if (res.ok) {
//         setRegistrationStatus("success");
//         // Reset form
//         setRegistrationData({
//           driverName: "",
//           phoneNumber: "",
//           vehicleNumber: "",
//           coordinates: userLocation
//             ? [userLocation.longitude, userLocation.latitude]
//             : [0, 0],
//           imageUrl: "",
//         });
//       } else {
//         const errorData = await res.json();
//         console.error("Backend error:", errorData);
//         setRegistrationStatus("error");
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       setRegistrationStatus("error");
//     } finally {
//       setLoading(false);
//     }
//   };


//   const handleInputChange = (field, value) => {
//     setRegistrationData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const callAmbulance = (phoneNumber) => {
//     window.open(`tel:${phoneNumber}`);
//   };

//   return (
//     <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Header */}
//       <header className="bg-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-6">
//             <div className="flex items-center space-x-3">
//               <div className="bg-red-500 p-3 rounded-full">
//                 <Ambulance className="h-6 w-6 text-white" />
//               </div>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 Emergency Ambulance System
//               </h1>
//             </div>
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => setActiveTab("find")}
//                 className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
//                   activeTab === "find"
//                     ? "bg-blue-600 text-white shadow-lg"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 <Search className="h-4 w-4 inline mr-2" />
//                 Find Ambulance
//               </button>
//               <button
//                 onClick={() => setActiveTab("register")}
//                 className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
//                   activeTab === "register"
//                     ? "bg-blue-600 text-white shadow-lg"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 <Plus className="h-4 w-4 inline mr-2" />
//                 Register Ambulance
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Find Ambulance Tab */}
//         {activeTab === "find" && (
//           <div className="space-y-8">
//             {/* Emergency Banner */}
//             <div className="bg-red-500 text-white p-6 rounded-xl shadow-lg">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h2 className="text-2xl font-bold mb-2">
//                     Emergency? Find Help Now!
//                   </h2>
//                   <p className="text-red-100">
//                     Locate the nearest available ambulances in your area
//                   </p>
//                 </div>
//                 <div className="text-6xl opacity-20">🚨</div>
//               </div>
//             </div>

//             {/* Location & Search */}
//             <div className="bg-white p-8 rounded-xl shadow-lg">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center space-x-3">
//                   <MapPin className="h-6 w-6 text-blue-600" />
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900">
//                       Your Location
//                     </h3>
//                     <p className="text-gray-600">
//                       {userLocation
//                         ? `${userLocation.latitude.toFixed(
//                             4
//                           )}, ${userLocation.longitude.toFixed(4)}`
//                         : "Getting location..."}
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={findNearestAmbulances}
//                   disabled={loading || !userLocation}
//                   className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl"
//                 >
//                   {loading ? (
//                     <div className="flex items-center space-x-2">
//                       <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
//                       <span>Searching...</span>
//                     </div>
//                   ) : (
//                     <div className="flex items-center space-x-2">
//                       <Navigation className="h-4 w-4" />
//                       <span>Find Ambulances</span>
//                     </div>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Ambulance Results */}
//             {nearestAmbulances.length > 0 && (
//               <div className="space-y-6">
//                 <h3 className="text-2xl font-bold text-gray-900">
//                   Available Ambulances ({nearestAmbulances.length} found)
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {nearestAmbulances.map((ambulance) => (
//                     <div
//                       key={ambulance._id}
//                       className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
//                     >
//                       <div className="flex items-start justify-between mb-4">
//                         <div className="flex items-center space-x-3">
//                           <div className="bg-green-100 p-2 rounded-full">
//                             <Ambulance className="h-5 w-5 text-green-600" />
//                           </div>
//                           <div>
//                             <h4 className="font-semibold text-gray-900">
//                               {ambulance.vehicleNumber}
//                             </h4>
//                             <p className="text-sm text-gray-600">
//                               {ambulance.user.name}
//                             </p>
//                           </div>
//                         </div>
//                         <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
//                           {ambulance.availability}
//                         </span>
//                       </div>

//                       <div className="space-y-3">
//                         <div className="flex items-center space-x-2">
//                           <User className="h-4 w-4 text-gray-500" />
//                           <span className="text-sm text-gray-700">
//                             {ambulance.driverName}
//                           </span>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <MapPin className="h-4 w-4 text-gray-500" />
//                           <span className="text-sm text-gray-700">
//                             {ambulance.distance}m away
//                           </span>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <Clock className="h-4 w-4 text-gray-500" />
//                           <span className="text-sm text-gray-700">
//                             ETA: {Math.ceil(ambulance.distance / 500)} min
//                           </span>
//                         </div>
//                       </div>

//                       <button
//                         onClick={() => callAmbulance(ambulance.phoneNumber)}
//                         className="w-full mt-4 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300 flex items-center justify-center space-x-2"
//                       >
//                         <Phone className="h-4 w-4" />
//                         <span>Call Now</span>
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Register Ambulance Tab */}
//         {activeTab === "register" && (
//           <div className="max-w-2xl mx-auto">
//             <div className="bg-white p-8 rounded-xl shadow-lg">
//               <div className="text-center mb-8">
//                 <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-4">
//                   <Plus className="h-12 w-12 text-blue-600" />
//                 </div>
//                 <h2 className="text-3xl font-bold text-gray-900 mb-2">
//                   Register Your Ambulance
//                 </h2>
//                 <p className="text-gray-600">
//                   Join our network and help save lives in your community
//                 </p>
//               </div>

//               {registrationStatus && (
//                 <div
//                   className={`p-4 rounded-lg mb-6 ${
//                     registrationStatus === "success"
//                       ? "bg-green-50 border border-green-200"
//                       : "bg-red-50 border border-red-200"
//                   }`}
//                 >
//                   <div className="flex items-center space-x-2">
//                     {registrationStatus === "success" ? (
//                       <CheckCircle className="h-5 w-5 text-green-600" />
//                     ) : (
//                       <AlertCircle className="h-5 w-5 text-red-600" />
//                     )}
//                     <span
//                       className={`font-medium ${
//                         registrationStatus === "success"
//                           ? "text-green-800"
//                           : "text-red-800"
//                       }`}
//                     >
//                       {registrationStatus === "success"
//                         ? "Ambulance registered successfully!"
//                         : "Registration failed. Please try again."}
//                     </span>
//                   </div>
//                 </div>
//               )}

//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Driver Name *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={registrationData.driverName}
//                       onChange={(e) =>
//                         handleInputChange("driverName", e.target.value)
//                       }
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
//                       placeholder="Enter driver's full name"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone Number *
//                     </label>
//                     <input
//                       type="tel"
//                       required
//                       value={registrationData.phoneNumber}
//                       onChange={(e) =>
//                         handleInputChange("phoneNumber", e.target.value)
//                       }
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
//                       placeholder="+1-234-567-8900"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Vehicle Number *
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={registrationData.vehicleNumber}
//                     onChange={(e) =>
//                       handleInputChange("vehicleNumber", e.target.value)
//                     }
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
//                     placeholder="AMB-001"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Current Location
//                   </label>
//                   <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
//                     <MapPin className="h-5 w-5 text-gray-500" />
//                     <span className="text-gray-700">
//                       {userLocation
//                         ? `${userLocation.latitude.toFixed(
//                             4
//                           )}, ${userLocation.longitude.toFixed(4)}`
//                         : "Getting location..."}
//                     </span>
//                     <button
//                       type="button"
//                       onClick={getCurrentLocation}
//                       className="ml-auto text-blue-600 hover:text-blue-700 font-medium text-sm"
//                     >
//                       Update
//                     </button>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Image URL (Optional)
//                   </label>
//                   <input
//                     type="url"
//                     value={registrationData.imageUrl}
//                     onChange={(e) =>
//                       handleInputChange("imageUrl", e.target.value)
//                     }
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
//                     placeholder="https://example.com/ambulance-image.jpg"
//                   />
//                 </div>

//                 <button
//                   type="button"
//                   onClick={registerAmbulance}
//                   disabled={loading}
//                   className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl"
//                 >
//                   {loading ? (
//                     <div className="flex items-center justify-center space-x-2">
//                       <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
//                       <span>Registering...</span>
//                     </div>
//                   ) : (
//                     "Register Ambulance"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AmbulanceSystem;




import React, { useState, useEffect } from "react";
import {
  MapPin,
  Ambulance,
  Phone,
  User,
  Clock,
  Navigation,
  Plus,
  Search,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const AmbulanceSystem = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("find");
  const [userLocation, setUserLocation] = useState(null);
  const [nearestAmbulances, setNearestAmbulances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    driverName: "",
    phoneNumber: "",
    vehicleNumber: "",
    coordinates: [0, 0],
    imageUrl: "",
  });
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const API_BASE = "http://localhost:5000/api";

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setRegistrationData((prev) => ({
            ...prev,
            coordinates: [longitude, latitude],
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Please enable location services to use this feature");
        }
      );
    }
  };

  const findNearestAmbulances = async () => {
    if (!userLocation) {
      alert("Location not available. Please enable location services.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/ambulances/nearest?longitude=${userLocation.longitude}&latitude=${userLocation.latitude}&maxDistance=100000`
      );
      if (!response.ok) throw new Error("Failed to fetch ambulances");
      const data = await response.json();
      setNearestAmbulances(data.ambulances || []);
    } catch (error) {
      console.error("Error finding ambulances:", error);
      // Fallback to mock data if API fails
      const mockAmbulances = [
        {
          _id: "1",
          driverName: "John Smith",
          phoneNumber: "+1-234-567-8901",
          vehicleNumber: "AMB-001",
          distance: 850,
          availability: "Available",
          imageUrl: "https://via.placeholder.com/100",
          user: { name: "City Hospital", phone: "+1-234-567-8900" },
        },
      ];
      setNearestAmbulances(mockAmbulances);
    } finally {
      setLoading(false);
    }
  };

  const registerAmbulance = async () => {
    if (!user?.token) {
      alert("You must be logged in to register an ambulance");
      return;
    }

    if (
      !registrationData.driverName ||
      !registrationData.phoneNumber ||
      !registrationData.vehicleNumber
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const requestBody = {
        ...registrationData,
        userId: user._id, // Add userId from auth context
      };

      const res = await fetch(`${API_BASE}/ambulances/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (res.ok) {
        setRegistrationStatus("success");
        // Reset form
        setRegistrationData({
          driverName: "",
          phoneNumber: "",
          vehicleNumber: "",
          coordinates: userLocation
            ? [userLocation.longitude, userLocation.latitude]
            : [0, 0],
          imageUrl: "",
        });
      } else {
        const errorData = await res.json();
        console.error("Backend error:", errorData);
        setRegistrationStatus("error");
        alert(errorData.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setRegistrationStatus("error");
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setRegistrationData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const callAmbulance = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`);
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="bg-red-500 p-3 rounded-full">
                <Ambulance className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Emergency Ambulance System
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <div className="text-sm text-gray-600">
                  Welcome, {user.name || user.email}
                </div>
              )}
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab("find")}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === "find"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Search className="h-4 w-4 inline mr-2" />
                  Find Ambulance
                </button>
                <button
                  onClick={() => setActiveTab("register")}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === "register"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Plus className="h-4 w-4 inline mr-2" />
                  Register Ambulance
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Find Ambulance Tab */}
        {activeTab === "find" && (
          <div className="space-y-8">
            {/* Emergency Banner */}
            <div className="bg-red-500 text-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Emergency? Find Help Now!
                  </h2>
                  <p className="text-red-100">
                    Locate the nearest available ambulances in your area
                  </p>
                </div>
                <div className="text-6xl opacity-20">🚨</div>
              </div>
            </div>

            {/* Location & Search */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Your Location
                    </h3>
                    <p className="text-gray-600">
                      {userLocation
                        ? `${userLocation.latitude.toFixed(
                            4
                          )}, ${userLocation.longitude.toFixed(4)}`
                        : "Getting location..."}
                    </p>
                  </div>
                </div>
                <button
                  onClick={findNearestAmbulances}
                  disabled={loading || !userLocation}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Searching...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Navigation className="h-4 w-4" />
                      <span>Find Ambulances</span>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Ambulance Results */}
            {nearestAmbulances.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Available Ambulances ({nearestAmbulances.length} found)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nearestAmbulances.map((ambulance) => (
                    <div
                      key={ambulance._id}
                      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-green-100 p-2 rounded-full">
                            <Ambulance className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {ambulance.vehicleNumber}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {ambulance.user?.name || "Emergency Service"}
                            </p>
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                          {ambulance.availability}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">
                            {ambulance.driverName}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">
                            {ambulance.distance}m away
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">
                            ETA: {Math.ceil(ambulance.distance / 500)} min
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => callAmbulance(ambulance.phoneNumber)}
                        className="w-full mt-4 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300 flex items-center justify-center space-x-2"
                      >
                        <Phone className="h-4 w-4" />
                        <span>Call Now</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Register Ambulance Tab */}
        {activeTab === "register" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-center mb-8">
                <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-4">
                  <Plus className="h-12 w-12 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Register Your Ambulance
                </h2>
                <p className="text-gray-600">
                  Join our network and help save lives in your community
                </p>
              </div>

              {!user ? (
                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-6">
                  <div className="flex items-center space-x-2 text-yellow-800">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">Authentication Required</span>
                  </div>
                  <p className="text-yellow-700 mt-2">
                    Please log in to register an ambulance.
                  </p>
                </div>
              ) : (
                <>
                  {registrationStatus && (
                    <div
                      className={`p-4 rounded-lg mb-6 ${
                        registrationStatus === "success"
                          ? "bg-green-50 border border-green-200"
                          : "bg-red-50 border border-red-200"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {registrationStatus === "success" ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        )}
                        <span
                          className={`font-medium ${
                            registrationStatus === "success"
                              ? "text-green-800"
                              : "text-red-800"
                          }`}
                        >
                          {registrationStatus === "success"
                            ? "Ambulance registered successfully!"
                            : "Registration failed. Please try again."}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Driver Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={registrationData.driverName}
                          onChange={(e) =>
                            handleInputChange("driverName", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                          placeholder="Enter driver's full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={registrationData.phoneNumber}
                          onChange={(e) =>
                            handleInputChange("phoneNumber", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                          placeholder="+1-234-567-8900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vehicle Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={registrationData.vehicleNumber}
                        onChange={(e) =>
                          handleInputChange("vehicleNumber", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                        placeholder="AMB-001"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Location
                      </label>
                      <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <MapPin className="h-5 w-5 text-gray-500" />
                        <span className="text-gray-700">
                          {userLocation
                            ? `${userLocation.latitude.toFixed(
                                4
                              )}, ${userLocation.longitude.toFixed(4)}`
                            : "Getting location..."}
                        </span>
                        <button
                          type="button"
                          onClick={getCurrentLocation}
                          className="ml-auto text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          Update
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={registrationData.imageUrl}
                        onChange={(e) =>
                          handleInputChange("imageUrl", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                        placeholder="https://example.com/ambulance-image.jpg"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={registerAmbulance}
                      disabled={loading}
                      className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          <span>Registering...</span>
                        </div>
                      ) : (
                        "Register Ambulance"
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AmbulanceSystem;