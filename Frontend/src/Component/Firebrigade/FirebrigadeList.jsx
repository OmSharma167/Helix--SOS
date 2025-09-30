

// import React, { useState, useEffect } from "react";
// import { getAllFirebrigades, sendSOS } from "../../services/firebrigadeService";

// const FirebrigadeList = () => {
//   const [firebrigades, setFirebrigades] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const [sosStatus, setSosStatus] = useState(null); // Pending | Accepted | Rejected

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setUserLocation({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//         fetchFirebrigades(position.coords.latitude, position.coords.longitude);
//       },
//       (err) => {
//         console.error("Geolocation error:", err);
//         fetchFirebrigades(); // fallback without distance
//       }
//     );
//   }, []);

//   const fetchFirebrigades = async (userLat, userLng) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await getAllFirebrigades();
//       let firebrigadesData = [];

//       if (response.data && response.data.data) {
//         firebrigadesData = response.data.data.firebrigades || [];
//       } else if (response.data && response.data.firebrigades) {
//         firebrigadesData = response.data.firebrigades;
//       } else if (Array.isArray(response.data)) {
//         firebrigadesData = response.data;
//       }

//       if (userLat && userLng) {
//         firebrigadesData = firebrigadesData.map((fb) => {
//           if (fb.location?.coordinates) {
//             const [lng, lat] = fb.location.coordinates; // GeoJSON [lng, lat]
//             const distance = haversineDistance(userLat, userLng, lat, lng);
//             return { ...fb, distance };
//           }
//           return fb;
//         });

//         // Sort by nearest first
//         firebrigadesData.sort((a, b) => (a.distance || 0) - (b.distance || 0));
//       }

//       setFirebrigades(firebrigadesData);
//     } catch (err) {
//       console.error("Error fetching firebrigades:", err);
//       setError(
//         err.response?.data?.message ||
//           err.message ||
//           "Failed to load firebrigades"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const haversineDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371;
//     const dLat = ((lat2 - lat1) * Math.PI) / 180;
//     const dLon = ((lon2 - lon1) * Math.PI) / 180;
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos((lat1 * Math.PI) / 180) *
//         Math.cos((lat2 * Math.PI) / 180) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };

//   const handleSOS = async () => {
//     if (firebrigades.length === 0) {
//       alert("No firebrigade services available nearby.");
//       return;
//     }

//     const nearest = firebrigades[0]; // pick nearest
//     setSosStatus("Pending");

//     try {
//       const response = await sendSOS({
//         firebrigadeId: nearest._id,
//         userLocation,
//       });

//       if (response.data.status === "Accepted") {
//         setSosStatus("Accepted");
//       } else if (response.data.status === "Rejected") {
//         setSosStatus("Rejected");
//       } else {
//         setSosStatus("Pending");
//       }
//     } catch (err) {
//       console.error("SOS request failed:", err);
//       setSosStatus("Rejected");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-600 text-xl mb-4">{error}</div>
//           <button
//             onClick={() =>
//               fetchFirebrigades(userLocation?.lat, userLocation?.lng)
//             }
//             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-900">
//             All Fire Brigades
//           </h1>

//           {/* SOS Button */}
//           <button
//             onClick={handleSOS}
//             className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 shadow-lg"
//           >
//             🚨 Send SOS
//           </button>
//         </div>

//         {sosStatus && (
//           <div className="mb-6 text-center">
//             <span
//               className={`px-4 py-2 rounded-full text-white ${
//                 sosStatus === "Pending"
//                   ? "bg-yellow-500"
//                   : sosStatus === "Accepted"
//                   ? "bg-green-600"
//                   : "bg-red-600"
//               }`}
//             >
//               SOS Status: {sosStatus}
//             </span>
//           </div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {firebrigades.map((fb) => (
//             <div
//               key={fb._id}
//               className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
//             >
//               <img
//                 src={fb.imageUrl || "/default-fire-station.jpg"}
//                 alt={fb.name}
//                 className="w-full h-48 object-cover"
//                 onError={(e) => {
//                   e.target.src = "/default-fire-station.jpg";
//                 }}
//               />
//               <div className="p-4">
//                 <h2 className="text-xl font-bold text-gray-900 mb-2">
//                   {fb.name}
//                 </h2>
//                 <div className="space-y-2">
//                   <p className="text-gray-600 flex items-center">
//                     <span className="font-semibold w-20">Contact:</span>
//                     {fb.contactNumber}
//                   </p>
//                   <p className="text-gray-600 flex items-center">
//                     <span className="font-semibold w-20">Email:</span>
//                     {fb.email || "Not provided"}
//                   </p>
//                   <p className="text-gray-600 flex items-start">
//                     <span className="font-semibold w-20">Address:</span>
//                     <span className="flex-1">{fb.address}</span>
//                   </p>
//                 </div>
//                 <div className="mt-4 flex justify-between items-center">
//                   <span
//                     className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
//                       fb.availability === "Available"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {fb.availability}
//                   </span>
//                   {fb.distance && (
//                     <span className="text-sm text-gray-500">
//                       {fb.distance.toFixed(2)} km away
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FirebrigadeList;


import React, { useState, useEffect } from "react";
import { getAllFirebrigades, sendSOS } from "../../services/firebrigadeService";

const FirebrigadeList = () => {
  const [firebrigades, setFirebrigades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFirebrigades();
  }, []);

  const fetchFirebrigades = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllFirebrigades();

      let firebrigadesData = [];

      if (response.data && response.data.data) {
        firebrigadesData = response.data.data.firebrigades || [];
      } else if (response.data && response.data.firebrigades) {
        firebrigadesData = response.data.firebrigades;
      } else if (Array.isArray(response.data)) {
        firebrigadesData = response.data;
      }

      setFirebrigades(firebrigadesData);
    } catch (err) {
      console.error("Error fetching firebrigades:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load firebrigades"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🚨 SOS Handler
  const handleSOS = async () => {
    try {
      const userLocation = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) =>
            resolve({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            }),
          (err) => reject(err)
        );
      });

      await sendSOS(userLocation);
      alert("🚨 SOS sent to nearest fire brigade!");
    } catch (err) {
      console.error("Error sending SOS:", err);
      alert("Failed to send SOS. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 relative">
      {/* Always visible SOS Button */}
      <button
        onClick={handleSOS}
        className="fixed bottom-6 right-6 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition"
      >
        🚨 Send SOS
      </button>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            All Fire Brigades
          </h1>
          <button
            onClick={fetchFirebrigades}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Refresh List
          </button>
        </div>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-20">
            <div className="text-red-600 text-xl mb-4">{error}</div>
            <button
              onClick={fetchFirebrigades}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* No Firebrigades */}
        {!loading && !error && firebrigades.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-600 text-xl mb-4">
              No fire brigades found.
            </div>
            <button
              onClick={fetchFirebrigades}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Refresh
            </button>
          </div>
        )}

        {/* Firebrigades List */}
        {!loading && !error && firebrigades.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {firebrigades.map((fb) => (
              <div
                key={fb._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={fb.imageUrl || "/default-fire-station.jpg"}
                  alt={fb.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "/default-fire-station.jpg";
                  }}
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {fb.name}
                  </h2>
                  <div className="space-y-2">
                    <p className="text-gray-600 flex items-center">
                      <span className="font-semibold w-20">Contact:</span>
                      {fb.contactNumber}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <span className="font-semibold w-20">Email:</span>
                      {fb.email || "Not provided"}
                    </p>
                    <p className="text-gray-600 flex items-start">
                      <span className="font-semibold w-20">Address:</span>
                      <span className="flex-1">{fb.address}</span>
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span
                      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                        fb.availability === "Available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {fb.availability}
                    </span>
                    {fb.distance && (
                      <span className="text-sm text-gray-500">
                        {fb.distance.toFixed(2)} km away
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FirebrigadeList;
