


// // src/pages/FirebrigadeList.jsx - Fixed: Removed unused distance display (no computation available in API)
// import React, { useState, useEffect } from "react";
// import { getAllFirebrigades } from "../../services/firebrigadeService";
// import SOSButton from "./SOSButton";

// const FirebrigadeList = () => {
//   const [firebrigades, setFirebrigades] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchFirebrigades();
//   }, []);

//   const fetchFirebrigades = async () => {
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

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 relative">
//       {/* Reusable SOS Button */}
//       <SOSButton />
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-900">
//             All Fire Brigades
//           </h1>
//           <button
//             onClick={fetchFirebrigades}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Refresh List
//           </button>
//         </div>
//         {/* Loader */}
//         {loading && (
//           <div className="flex justify-center items-center py-20">
//             <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
//           </div>
//         )}
//         {/* Error */}
//         {error && (
//           <div className="text-center py-20">
//             <div className="text-red-600 text-xl mb-4">{error}</div>
//             <button
//               onClick={fetchFirebrigades}
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//             >
//               Retry
//             </button>
//           </div>
//         )}
//         {/* No Firebrigades */}
//         {!loading && !error && firebrigades.length === 0 && (
//           <div className="text-center py-20">
//             <div className="text-gray-600 text-xl mb-4">
//               No fire brigades found.
//             </div>
//             <button
//               onClick={fetchFirebrigades}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Refresh
//             </button>
//           </div>
//         )}
//         {/* Firebrigades List */}
//         {!loading && !error && firebrigades.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {firebrigades.map((fb) => (
//               <div
//                 key={fb._id}
//                 className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
//               >
//                 <img
//                   src={fb.imageUrl || "/default-fire-station.jpg"}
//                   alt={fb.name}
//                   className="w-full h-48 object-cover"
//                   onError={(e) => {
//                     e.target.src = "/default-fire-station.jpg";
//                   }}
//                 />
//                 <div className="p-4">
//                   <h2 className="text-xl font-bold text-gray-900 mb-2">
//                     {fb.name}
//                   </h2>
//                   <div className="space-y-2">
//                     <p className="text-gray-600 flex items-center">
//                       <span className="font-semibold w-20">Contact:</span>
//                       {fb.contactNumber}
//                     </p>
//                     {/* <p className="text-gray-600 flex items-center">
//                       <span className="font-semibold w-20">Email:</span>
//                       {fb.email || "Not provided"}
//                     </p> */}
//                     <p className="text-gray-600 flex items-start">
//                       <span className="font-semibold w-20">Address:</span>
//                       <span className="flex-1">{fb.address}</span>
//                     </p>
//                   </div>
//                   <div className="mt-4 flex justify-between items-center">
//                     <span
//                       className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
//                         fb.availability === "Available"
//                           ? "bg-green-100 text-green-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {fb.availability}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FirebrigadeList;



// src/pages/FirebrigadeList.jsx
import React, { useState, useEffect } from "react";
import { getAllFirebrigades } from "../../services/firebrigadeService";
import SOSButton from "./SOSButton";

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

  // Fallback image URL - using a placeholder service
  const getFallbackImage = (name) => {
    const encodedName = encodeURIComponent(name || 'Fire Station');
    return `https://via.placeholder.com/400x300/DC2626/FFFFFF?text=${encodedName}`;
  };

  const handleImageError = (e, firebrigade) => {
    console.log(`Image failed to load for ${firebrigade.name}, using fallback`);
    e.target.src = getFallbackImage(firebrigade.name);
    e.target.onerror = null; // Prevent infinite loop
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 relative">
      {/* Reusable SOS Button */}
      <SOSButton />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            All Fire Brigades
          </h1>
          <button
            onClick={fetchFirebrigades}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
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
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
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
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-full h-48 bg-gray-200 relative overflow-hidden">
                  <img
                    src={fb.imageUrl || getFallbackImage(fb.name)}
                    alt={fb.name}
                    className="w-full h-full object-cover"
                    onError={(e) => handleImageError(e, fb)}
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {fb.name}
                  </h2>
                  <div className="space-y-2">
                    <p className="text-gray-600 flex items-center">
                      <span className="font-semibold w-20">Contact:</span>
                      {fb.contactNumber}
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