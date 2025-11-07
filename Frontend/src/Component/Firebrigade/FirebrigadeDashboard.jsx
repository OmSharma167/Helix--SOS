

// // ProviderDashboard.js - Fixed location handling
// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { useAuth } from "../../context/AuthContext";
// import { getSOSForProvider, getFirebrigadeByUserId, updateFirebrigadeLocation } from "../../services/firebrigadeService";
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import 'leaflet-routing-machine';

// const socket = io(import.meta.env.VITE_API_URL, {
//   transports: ["websocket"],
// });

// // Marker imports
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// const MapModal = ({ providerLocation, sosLocation, onClose, sosId, providerId }) => {
//   const [map, setMap] = useState(null);
//   const [routingControl, setRoutingControl] = useState(null);
//   const [currentPosition, setCurrentPosition] = useState(providerLocation);
//   const [mapError, setMapError] = useState(null);

//   useEffect(() => {
//     if (!sosLocation || !providerLocation) {
//       setMapError("Location data missing");
//       return;
//     }

//     try {
//       const initMap = L.map('map-modal').setView([providerLocation[1], providerLocation[0]], 13);

//       L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       }).addTo(initMap);

//       // Add markers
//       L.marker([providerLocation[1], providerLocation[0]])
//         .addTo(initMap)
//         .bindPopup('Your Location')
//         .openPopup();

//       L.marker([sosLocation[1], sosLocation[0]])
//         .addTo(initMap)
//         .bindPopup('SOS Location')
//         .openPopup();

//       // Add routing control
//       const control = L.Routing.control({
//         waypoints: [
//           L.latLng(providerLocation[1], providerLocation[0]),
//           L.latLng(sosLocation[1], sosLocation[0])
//         ],
//         routeWhileDragging: true,
//         show: true,
//         addWaypoints: false,
//         createMarker: () => null
//       }).addTo(initMap);

//       setRoutingControl(control);
//       setMap(initMap);
//       setMapError(null);

//       // Start real-time GPS tracking
//       const watchId = navigator.geolocation.watchPosition(
//         (position) => {
//           const newLat = position.coords.latitude;
//           const newLng = position.coords.longitude;
//           setCurrentPosition([newLng, newLat]);

//           socket.emit('updateLocation', {
//             sosId,
//             providerId,
//             location: { type: 'Point', coordinates: [newLng, newLat] }
//           });

//           initMap.setView([newLat, newLng], 13);
//         },
//         (error) => {
//           console.error("Geolocation error:", error);
//           setMapError("Failed to get your current location");
//         },
//         { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
//       );

//       return () => {
//         navigator.geolocation.clearWatch(watchId);
//         if (initMap) initMap.remove();
//       };
//     } catch (error) {
//       console.error("Map initialization error:", error);
//       setMapError("Failed to load map");
//     }
//   }, [sosLocation, providerLocation, sosId, providerId]);

//   useEffect(() => {
//     if (routingControl && currentPosition) {
//       routingControl.setWaypoints([
//         L.latLng(currentPosition[1], currentPosition[0]),
//         L.latLng(sosLocation[1], sosLocation[0])
//       ]);
//     }
//   }, [currentPosition, routingControl, sosLocation]);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-4 rounded-lg w-3/4 h-3/4">
//         <button 
//           className="mb-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
//           onClick={onClose}
//         >
//           Close Map
//         </button>
        
//         {mapError ? (
//           <div className="flex items-center justify-center h-full text-red-500">
//             <p>{mapError}</p>
//           </div>
//         ) : (
//           <div id="map-modal" className="w-full h-full"></div>
//         )}
//       </div>
//     </div>
//   );
// };

// const SetLocationModal = ({ onClose, onSetLocation }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const getCurrentLocation = () => {
//     setLoading(true);
//     setError(null);

//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser");
//       setLoading(false);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         try {
//           const lat = position.coords.latitude;
//           const lng = position.coords.longitude;
          
//           // Call the callback to set location
//           await onSetLocation([lng, lat]);
//           onClose();
//         } catch (err) {
//           setError("Failed to save location: " + err.message);
//         } finally {
//           setLoading(false);
//         }
//       },
//       (error) => {
//         let errorMessage = "Failed to get your location: ";
//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             errorMessage += "Please allow location access";
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMessage += "Location information unavailable";
//             break;
//           case error.TIMEOUT:
//             errorMessage += "Location request timed out";
//             break;
//           default:
//             errorMessage += "Unknown error";
//         }
//         setError(errorMessage);
//         setLoading(false);
//       },
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//     );
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg w-96">
//         <h3 className="text-lg font-semibold mb-4">Set Your Location</h3>
//         <p className="text-gray-600 mb-4">
//           Your location is required to view SOS requests on the map and provide assistance.
//         </p>
        
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <div className="flex space-x-3">
//           <button
//             onClick={getCurrentLocation}
//             disabled={loading}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex-1 disabled:opacity-50"
//           >
//             {loading ? "Getting Location..." : "Use Current Location"}
//           </button>
//           <button
//             onClick={onClose}
//             className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProviderDashboard = () => {
//   const { user } = useAuth();
//   const [sosRequests, setSosRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [providerLocation, setProviderLocation] = useState(null);
//   const [addresses, setAddresses] = useState({});
//   const [selectedSos, setSelectedSos] = useState(null);
//   const [showSetLocationModal, setShowSetLocationModal] = useState(false);
//   const [locationError, setLocationError] = useState(null);

//   useEffect(() => {
//     if (!user) {
//       setLoading(false);
//       return;
//     }

//     const fetchProviderLocation = async () => {
//       try {
//         const res = await getFirebrigadeByUserId(user._id);
//         console.log("Firebrigade API response:", res); // Debug log
        
//         const firebrigade = res.data.firebrigade;
//         if (
//           firebrigade &&
//           firebrigade.location &&
//           firebrigade.location.coordinates &&
//           firebrigade.location.coordinates.length === 2
//         ) {
//           setProviderLocation(firebrigade.location.coordinates);
//           setLocationError(null);
//         } else {
//           setLocationError("Your location is not set in the system.");
//           // Show set location modal if no location found
//           setShowSetLocationModal(true);
//         }
//       } catch (error) {
//         console.error("Error fetching provider location:", error);
//         setLocationError("Failed to load your location. Please try again.");
//         // Try to get browser location as fallback
//         getBrowserLocation();
//       }
//     };

//     const getBrowserLocation = () => {
//       if (!navigator.geolocation) {
//         setLocationError("Geolocation is not supported by your browser");
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const lat = position.coords.latitude;
//           const lng = position.coords.longitude;
//           setProviderLocation([lng, lat]);
//           setLocationError(null);
//         },
//         (error) => {
//           console.error("Browser geolocation error:", error);
//           setLocationError("Please enable location access or set your location manually");
//           setShowSetLocationModal(true);
//         }
//       );
//     };

//     const fetchSOS = async () => {
//       try {
//         const res = await getSOSForProvider(user._id);
//         setSosRequests(res.data.data || []);
//       } catch (error) {
//         console.error("Error fetching SOS requests:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProviderLocation();
//     fetchSOS();

//     // Socket setup
//     socket.emit("joinProviderRoom", user._id);

//     socket.on("newSOS", (sos) => {
//       console.log("New SOS received:", sos);
//       setSosRequests((prev) => {
//         if (prev.find((req) => req._id === sos._id)) return prev;
//         return [...prev, sos];
//       });
//     });

//     socket.on("connect_error", (error) => {
//       console.error("Socket connection error:", error);
//     });

//     return () => {
//       socket.off("newSOS");
//       socket.emit("leaveProviderRoom", user._id);
//     };
//   }, [user]);

//   const handleSetLocation = async (coordinates) => {
//     try {
//       // Update location in database
//       await updateFirebrigadeLocation(user._id, {
//         type: "Point",
//         coordinates: coordinates
//       });
      
//       setProviderLocation(coordinates);
//       setLocationError(null);
//       setShowSetLocationModal(false);
      
//       console.log("Location updated successfully:", coordinates);
//     } catch (error) {
//       console.error("Error updating location:", error);
//       // Even if DB update fails, use the local location for map functionality
//       setProviderLocation(coordinates);
//       setLocationError("Location set locally but failed to save to database");
//       setShowSetLocationModal(false);
//     }
//   };

//   useEffect(() => {
//     const fetchAddresses = async () => {
//       const newAddresses = {};
//       for (const sos of sosRequests) {
//         if (!addresses[sos._id]) {
//           try {
//             const [lng, lat] = sos.location.coordinates;
//             const response = await fetch(
//               `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
//             );
//             const data = await response.json();
//             newAddresses[sos._id] = data.display_name || "Unknown address";
//           } catch (error) {
//             console.error("Error fetching address for SOS:", sos._id, error);
//             newAddresses[sos._id] = "Address not available";
//           }
//         }
//       }
//       if (Object.keys(newAddresses).length > 0) {
//         setAddresses((prev) => ({ ...prev, ...newAddresses }));
//       }
//     };

//     if (sosRequests.length > 0) {
//       fetchAddresses();
//     }
//   }, [sosRequests, addresses]);

//   const handleResponse = async (sosId, status) => {
//     try {
//       socket.emit("respondSOS", {
//         sosId,
//         providerId: user._id,
//         status,
//       });
      
//       setSosRequests((prev) =>
//         prev.map((sos) =>
//           sos._id === sosId
//             ? {
//                 ...sos,
//                 nearestProviders: sos.nearestProviders.map((p) =>
//                   p.providerId._id === user._id ? { ...p, status } : p
//                 ),
//               }
//             : sos
//         )
//       );
//       console.log(`SOS ${sosId} ${status} by provider ${user._id}`);
//     } catch (error) {
//       console.error("Error responding to SOS:", error);
//       alert("Failed to respond to SOS request");
//     }
//   };

//   const handleViewMap = (sos) => {
//     if (!providerLocation) {
//       setShowSetLocationModal(true);
//       return;
//     }
//     if (!sos.location?.coordinates) {
//       alert("SOS location is not available.");
//       return;
//     }
//     setSelectedSos(sos);
//   };

//   const formatCoordinates = (coordinates) => {
//     if (!coordinates || !coordinates.length) return "Unknown location";
//     return `${coordinates[1]?.toFixed(6)}, ${coordinates[0]?.toFixed(6)}`;
//   };

//   const getRequestStatus = (sos, providerId) => {
//     const provider = sos.nearestProviders.find(
//       (p) => p.providerId._id === providerId
//     );
//     return provider ? provider.status : "Pending";
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-lg">Loading dashboard...</p>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-lg">Please log in to view the dashboard</p>
//       </div>
//     );
//   }

//   // Compute counts
//   const pendingCount = sosRequests.filter(
//     (sos) => getRequestStatus(sos, user._id) === "Pending"
//   ).length;
//   const acceptedCount = sosRequests.filter(
//     (sos) => getRequestStatus(sos, user._id) === "Accepted"
//   ).length;
//   const rejectedCount = sosRequests.filter(
//     (sos) => getRequestStatus(sos, user._id) === "Rejected"
//   ).length;

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6">
//         Fire Brigade Dashboard - Welcome, {user.name}
//       </h2>

//       {locationError && (
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
//           <div className="flex justify-between items-center">
//             <span>{locationError}</span>
//             <button
//               onClick={() => setShowSetLocationModal(true)}
//               className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
//             >
//               Set Location
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h3 className="text-xl font-semibold mb-4">Request Status Overview</h3>
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <div className="bg-yellow-100 p-4 rounded text-center">
//             <h4 className="font-semibold">Pending</h4>
//             <p className="text-2xl font-bold">{pendingCount}</p>
//           </div>
//           <div className="bg-green-100 p-4 rounded text-center">
//             <h4 className="font-semibold">Accepted</h4>
//             <p className="text-2xl font-bold">{acceptedCount}</p>
//           </div>
//           <div className="bg-red-100 p-4 rounded text-center">
//             <h4 className="font-semibold">Rejected</h4>
//             <p className="text-2xl font-bold">{rejectedCount}</p>
//           </div>
//         </div>

//         <h3 className="text-xl font-semibold mb-4">All SOS Requests</h3>

//         {sosRequests.length === 0 ? (
//           <div className="text-center py-8">
//             <p className="text-gray-500">No SOS requests</p>
//             <p className="text-sm text-gray-400 mt-2">
//               SOS requests from nearby users will appear here automatically
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {sosRequests.map((sos) => {
//               const currentStatus = getRequestStatus(sos, user._id);
//               const isPending = currentStatus === "Pending";
//               const address = addresses[sos._id] || "Fetching address...";

//               return (
//                 <div
//                   key={sos._id}
//                   className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
//                 >
//                   <div className="flex justify-between items-start mb-3">
//                     <div>
//                       <h4 className="font-semibold text-lg">
//                         Emergency Request
//                       </h4>
//                       <p className="text-sm text-gray-600">
//                         User: {sos.userId?.name || "Anonymous"}
//                       </p>
//                     </div>
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-medium ${
//                         currentStatus === "Accepted"
//                           ? "bg-green-100 text-green-800"
//                           : currentStatus === "Rejected"
//                           ? "bg-red-100 text-red-800"
//                           : "bg-yellow-100 text-yellow-800"
//                       }`}
//                     >
//                       {currentStatus}
//                     </span>
//                   </div>

//                   <div className="mb-4">
//                     <p className="text-sm">
//                       <strong>Address:</strong> {address}
//                     </p>
//                     <p className="text-sm">
//                       <strong>Coordinates:</strong>{" "}
//                       {formatCoordinates(sos.location?.coordinates)}
//                     </p>
//                     <p className="text-sm text-gray-600 mt-1">
//                       Received: {new Date(sos.createdAt).toLocaleString()}
//                     </p>
//                   </div>
//                   {isPending && (
//                     <div className="flex space-x-3">
//                       <button
//                         className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex-1"
//                         onClick={() => handleResponse(sos._id, "Accepted")}
//                       >
//                         Accept Request
//                       </button>
//                       <button
//                         className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex-1"
//                         onClick={() => handleResponse(sos._id, "Rejected")}
//                       >
//                         Reject Request
//                       </button>
//                     </div>
//                   )}

//                   {!isPending && (
//                     <p className="text-center text-gray-500 italic">
//                       You have already {currentStatus.toLowerCase()} this
//                       request
//                     </p>
//                   )}

//                   <div className="mt-2 text-center">
//                     <button
//                       className={`text-blue-600 hover:text-blue-800 transition-colors ${
//                         !providerLocation ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
//                       }`}
//                       onClick={() => handleViewMap(sos)}
//                       title={!providerLocation ? "Your location is not available" : "View on map"}
//                     >
//                       📍 View on Map
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {selectedSos && providerLocation && (
//         <MapModal
//           providerLocation={providerLocation}
//           sosLocation={selectedSos.location.coordinates}
//           sosId={selectedSos._id}
//           providerId={user._id}
//           onClose={() => setSelectedSos(null)}
//         />
//       )}

//       {showSetLocationModal && (
//         <SetLocationModal
//           onClose={() => setShowSetLocationModal(false)}
//           onSetLocation={handleSetLocation}
//         />
//       )}
//     </div>
//   );
// };

// export default ProviderDashboard;


// src/pages/ProviderDashboard.js - Fixed: Removed unused socket.emit('updateLocation'), improved error handling, ensured location format consistency
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../../context/AuthContext";
import { getSOSForProvider, getFirebrigadeByUserId, updateFirebrigadeLocation } from "../../services/firebrigadeService";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

const socket = io(import.meta.env.VITE_API_URL, {
  transports: ["websocket"],
});

// Marker imports
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapModal = ({ providerLocation, sosLocation, onClose, sosId, providerId }) => {
  const [map, setMap] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(providerLocation);
  const [mapError, setMapError] = useState(null);

  useEffect(() => {
    if (!sosLocation || !providerLocation) {
      setMapError("Location data missing");
      return;
    }
    try {
      const initMap = L.map('map-modal').setView([providerLocation[1], providerLocation[0]], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(initMap);

      // Add markers
      L.marker([providerLocation[1], providerLocation[0]])
        .addTo(initMap)
        .bindPopup('Your Location')
        .openPopup();
      L.marker([sosLocation[1], sosLocation[0]])
        .addTo(initMap)
        .bindPopup('SOS Location')
        .openPopup();

      // Add routing control
      const control = L.Routing.control({
        waypoints: [
          L.latLng(providerLocation[1], providerLocation[0]),
          L.latLng(sosLocation[1], sosLocation[0])
        ],
        routeWhileDragging: true,
        show: true,
        addWaypoints: false,
        createMarker: () => null
      }).addTo(initMap);

      setRoutingControl(control);
      setMap(initMap);
      setMapError(null);

      // Start real-time GPS tracking (removed unused socket.emit)
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLat = position.coords.latitude;
          const newLng = position.coords.longitude;
          setCurrentPosition([newLng, newLat]);
          initMap.setView([newLat, newLng], 13);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setMapError("Failed to get your current location");
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
        if (initMap) initMap.remove();
      };
    } catch (error) {
      console.error("Map initialization error:", error);
      setMapError("Failed to load map");
    }
  }, [sosLocation, providerLocation, sosId, providerId]);

  useEffect(() => {
    if (routingControl && currentPosition) {
      routingControl.setWaypoints([
        L.latLng(currentPosition[1], currentPosition[0]),
        L.latLng(sosLocation[1], sosLocation[0])
      ]);
    }
  }, [currentPosition, routingControl, sosLocation]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-3/4 h-3/4">
        <button
          className="mb-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          onClick={onClose}
        >
          Close Map
        </button>
       
        {mapError ? (
          <div className="flex items-center justify-center h-full text-red-500">
            <p>{mapError}</p>
          </div>
        ) : (
          <div id="map-modal" className="w-full h-full"></div>
        )}
      </div>
    </div>
  );
};

const SetLocationModal = ({ onClose, onSetLocation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
         
          // Call the callback to set location
          await onSetLocation([lng, lat]);
          onClose();
        } catch (err) {
          setError("Failed to save location: " + err.message);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        let errorMessage = "Failed to get your location: ";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "Please allow location access";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage += "Location request timed out";
            break;
          default:
            errorMessage += "Unknown error";
        }
        setError(errorMessage);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Set Your Location</h3>
        <p className="text-gray-600 mb-4">
          Your location is required to view SOS requests on the map and provide assistance.
        </p>
       
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <div className="flex space-x-3">
          <button
            onClick={getCurrentLocation}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex-1 disabled:opacity-50"
          >
            {loading ? "Getting Location..." : "Use Current Location"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [sosRequests, setSosRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [providerLocation, setProviderLocation] = useState(null);
  const [addresses, setAddresses] = useState({});
  const [selectedSos, setSelectedSos] = useState(null);
  const [showSetLocationModal, setShowSetLocationModal] = useState(false);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const fetchProviderLocation = async () => {
      try {
        const res = await getFirebrigadeByUserId(user._id);
        console.log("Firebrigade API response:", res); // Debug log
       
        const firebrigade = res.data.firebrigade;
        if (
          firebrigade &&
          firebrigade.location &&
          firebrigade.location.coordinates &&
          firebrigade.location.coordinates.length === 2
        ) {
          setProviderLocation(firebrigade.location.coordinates);
          setLocationError(null);
        } else {
          setLocationError("Your location is not set in the system.");
          // Show set location modal if no location found
          setShowSetLocationModal(true);
        }
      } catch (error) {
        console.error("Error fetching provider location:", error);
        setLocationError("Failed to load your location. Please try again.");
        // Try to get browser location as fallback
        getBrowserLocation();
      }
    };

    const getBrowserLocation = () => {
      if (!navigator.geolocation) {
        setLocationError("Geolocation is not supported by your browser");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setProviderLocation([lng, lat]);
          setLocationError(null);
        },
        (error) => {
          console.error("Browser geolocation error:", error);
          setLocationError("Please enable location access or set your location manually");
          setShowSetLocationModal(true);
        }
      );
    };

    const fetchSOS = async () => {
      try {
        const res = await getSOSForProvider(user._id);
        setSosRequests(res.data.data || []);
      } catch (error) {
        console.error("Error fetching SOS requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviderLocation();
    fetchSOS();

    // Socket setup
    socket.emit("joinProviderRoom", user._id);
    socket.on("newSOS", (sos) => {
      console.log("New SOS received:", sos);
      setSosRequests((prev) => {
        if (prev.find((req) => req._id === sos._id)) return prev;
        return [...prev, sos];
      });
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      socket.off("newSOS");
      socket.emit("leaveProviderRoom", user._id);
    };
  }, [user]);

  const handleSetLocation = async (coordinates) => {
    try {
      // Update location in database
      await updateFirebrigadeLocation(user._id, {
        type: "Point",
        coordinates: coordinates
      });
     
      setProviderLocation(coordinates);
      setLocationError(null);
      setShowSetLocationModal(false);
     
      console.log("Location updated successfully:", coordinates);
    } catch (error) {
      console.error("Error updating location:", error);
      // Even if DB update fails, use the local location for map functionality
      setProviderLocation(coordinates);
      setLocationError("Location set locally but failed to save to database");
      setShowSetLocationModal(false);
    }
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      const newAddresses = {};
      for (const sos of sosRequests) {
        if (!addresses[sos._id]) {
          try {
            const [lng, lat] = sos.location.coordinates;
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            newAddresses[sos._id] = data.display_name || "Unknown address";
          } catch (error) {
            console.error("Error fetching address for SOS:", sos._id, error);
            newAddresses[sos._id] = "Address not available";
          }
        }
      }
      if (Object.keys(newAddresses).length > 0) {
        setAddresses((prev) => ({ ...prev, ...newAddresses }));
      }
    };
    if (sosRequests.length > 0) {
      fetchAddresses();
    }
  }, [sosRequests, addresses]);

  const handleResponse = async (sosId, status) => {
    try {
      socket.emit("respondSOS", {
        sosId,
        providerId: user._id,
        status,
      });
     
      setSosRequests((prev) =>
        prev.map((sos) =>
          sos._id === sosId
            ? {
                ...sos,
                nearestProviders: sos.nearestProviders.map((p) =>
                  p.providerId._id === user._id ? { ...p, status } : p
                ),
              }
            : sos
        )
      );
      console.log(`SOS ${sosId} ${status} by provider ${user._id}`);
    } catch (error) {
      console.error("Error responding to SOS:", error);
      alert("Failed to respond to SOS request");
    }
  };

  const handleViewMap = (sos) => {
    if (!providerLocation) {
      setShowSetLocationModal(true);
      return;
    }
    if (!sos.location?.coordinates) {
      alert("SOS location is not available.");
      return;
    }
    setSelectedSos(sos);
  };

  const formatCoordinates = (coordinates) => {
    if (!coordinates || !coordinates.length) return "Unknown location";
    return `${coordinates[1]?.toFixed(6)}, ${coordinates[0]?.toFixed(6)}`;
  };

  const getRequestStatus = (sos, providerId) => {
    const provider = sos.nearestProviders.find(
      (p) => p.providerId._id === providerId
    );
    return provider ? provider.status : "Pending";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg">Please log in to view the dashboard</p>
      </div>
    );
  }

  // Compute counts
  const pendingCount = sosRequests.filter(
    (sos) => getRequestStatus(sos, user._id) === "Pending"
  ).length;
  const acceptedCount = sosRequests.filter(
    (sos) => getRequestStatus(sos, user._id) === "Accepted"
  ).length;
  const rejectedCount = sosRequests.filter(
    (sos) => getRequestStatus(sos, user._id) === "Rejected"
  ).length;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">
        Fire Brigade Dashboard - Welcome, {user.name}
      </h2>
      {locationError && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <div className="flex justify-between items-center">
            <span>{locationError}</span>
            <button
              onClick={() => setShowSetLocationModal(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
            >
              Set Location
            </button>
          </div>
        </div>
      )}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Request Status Overview</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-yellow-100 p-4 rounded text-center">
            <h4 className="font-semibold">Pending</h4>
            <p className="text-2xl font-bold">{pendingCount}</p>
          </div>
          <div className="bg-green-100 p-4 rounded text-center">
            <h4 className="font-semibold">Accepted</h4>
            <p className="text-2xl font-bold">{acceptedCount}</p>
          </div>
          <div className="bg-red-100 p-4 rounded text-center">
            <h4 className="font-semibold">Rejected</h4>
            <p className="text-2xl font-bold">{rejectedCount}</p>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-4">All SOS Requests</h3>
        {sosRequests.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No SOS requests</p>
            <p className="text-sm text-gray-400 mt-2">
              SOS requests from nearby users will appear here automatically
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sosRequests.map((sos) => {
              const currentStatus = getRequestStatus(sos, user._id);
              const isPending = currentStatus === "Pending";
              const address = addresses[sos._id] || "Fetching address...";
              return (
                <div
                  key={sos._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">
                        Emergency Request
                      </h4>
                      <p className="text-sm text-gray-600">
                        User: {sos.userId?.name || "Anonymous"}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        currentStatus === "Accepted"
                          ? "bg-green-100 text-green-800"
                          : currentStatus === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {currentStatus}
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm">
                      <strong>Address:</strong> {address}
                    </p>
                    <p className="text-sm">
                      <strong>Coordinates:</strong>{" "}
                      {formatCoordinates(sos.location?.coordinates)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Received: {new Date(sos.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {isPending && (
                    <div className="flex space-x-3">
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex-1"
                        onClick={() => handleResponse(sos._id, "Accepted")}
                      >
                        Accept Request
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex-1"
                        onClick={() => handleResponse(sos._id, "Rejected")}
                      >
                        Reject Request
                      </button>
                    </div>
                  )}
                  {!isPending && (
                    <p className="text-center text-gray-500 italic">
                      You have already {currentStatus.toLowerCase()} this
                      request
                    </p>
                  )}
                  <div className="mt-2 text-center">
                    <button
                      className={`text-blue-600 hover:text-blue-800 transition-colors ${
                        !providerLocation ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                      onClick={() => handleViewMap(sos)}
                      title={!providerLocation ? "Your location is not available" : "View on map"}
                    >
                      📍 View on Map
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {selectedSos && providerLocation && (
        <MapModal
          providerLocation={providerLocation}
          sosLocation={selectedSos.location.coordinates}
          sosId={selectedSos._id}
          providerId={user._id}
          onClose={() => setSelectedSos(null)}
        />
      )}
      {showSetLocationModal && (
        <SetLocationModal
          onClose={() => setShowSetLocationModal(false)}
          onSetLocation={handleSetLocation}
        />
      )}
    </div>
  );
};

export default ProviderDashboard;