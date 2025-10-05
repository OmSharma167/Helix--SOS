



// // components/AmbulanceList.jsx
// import React, { useState, useEffect } from 'react';
// import { ambulanceService } from '../../services/ambulanceService';
// import { useAuth } from '../../context/AuthContext';

// const AmbulanceList = () => {
//   const [ambulances, setAmbulances] = useState([]);
//   const [filteredAmbulances, setFilteredAmbulances] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [userLocation, setUserLocation] = useState(null);
//   const [searchRadius, setSearchRadius] = useState(10); // in km
//   const [sortBy, setSortBy] = useState('distance');
//   const [locationAddress, setLocationAddress] = useState('');
//   const { user } = useAuth();

//   // Get user's current location and address
//   useEffect(() => {
//     const getLocationAndAddress = async () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           async (position) => {
//             const location = {
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude
//             };
//             setUserLocation(location);
            
//             // Get address from coordinates
//             try {
//               const address = await getAddressFromCoords(
//                 location.latitude, 
//                 location.longitude
//               );
//               setLocationAddress(address);
//             } catch (err) {
//               console.error('Error getting address:', err);
//               setLocationAddress('Location detected');
//             }
//           },
//           (error) => {
//             console.error('Error getting location:', error);
//             setError('Unable to get your location. Showing all ambulances.');
//             // Default to a central location
//             setUserLocation({ latitude: 28.6139, longitude: 77.2090 });
//             setLocationAddress('Default location (Delhi)');
//           }
//         );
//       } else {
//         setError('Geolocation is not supported by this browser.');
//       }
//     };

//     getLocationAndAddress();
//   }, []);

//   // Function to get address from coordinates
//   const getAddressFromCoords = async (lat, lng) => {
//     try {
//       const response = await fetch(
//         `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//       );
//       const data = await response.json();
//       return data.locality || data.city || data.principalSubdivision || 'Your location';
//     } catch (error) {
//       return 'Your current location';
//     }
//   };

//   // Fetch ambulances
//   useEffect(() => {
//     const fetchAmbulances = async () => {
//       try {
//         setLoading(true);
//         let data;

//         if (userLocation) {
//           // Fetch nearest ambulances
//           data = await ambulanceService.getNearestAmbulances(
//             userLocation.longitude,
//             userLocation.latitude,
//             searchRadius * 1000 // Convert to meters
//           );
//         } else {
//           // Fetch all ambulances as fallback
//           data = await ambulanceService.getAllAmbulances();
//         }

//         setAmbulances(data.ambulances || data.data || []);
//         setFilteredAmbulances(data.ambulances || data.data || []);
//       } catch (err) {
//         console.error('Error fetching ambulances:', err);
//         setError('Failed to load ambulances. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAmbulances();
//   }, [userLocation, searchRadius]);

//   // Sort ambulances
//   useEffect(() => {
//     if (ambulances.length > 0) {
//       const sorted = [...ambulances].sort((a, b) => {
//         switch (sortBy) {
//           case 'distance':
//             return (a.distance || 0) - (b.distance || 0);
//           case 'availability':
//             return a.availability === 'Available' ? -1 : 1;
//           case 'name':
//             return a.driverName.localeCompare(b.driverName);
//           default:
//             return 0;
//         }
//       });
//       setFilteredAmbulances(sorted);
//     }
//   }, [sortBy, ambulances]);

//   const handleRetryLocation = async () => {
//     setUserLocation(null);
//     setError('');
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const location = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude
//           };
//           setUserLocation(location);
          
//           const address = await getAddressFromCoords(
//             location.latitude, 
//             location.longitude
//           );
//           setLocationAddress(address);
//         },
//         (error) => {
//           setError('Failed to get location. Please enable location services.');
//         }
//       );
//     }
//   };

//   const formatDistance = (meters) => {
//     if (!meters) return 'Calculating...';
//     if (meters < 1000) {
//       return `${Math.round(meters)} meters away`;
//     }
//     return `${(meters / 1000).toFixed(1)} km away`;
//   };

//   const getAvailabilityColor = (status) => {
//     return status === 'Available' 
//       ? 'bg-green-100 text-green-800 border border-green-200' 
//       : 'bg-red-100 text-red-800 border border-red-200';
//   };

//   const getDistanceColor = (meters) => {
//     if (!meters) return 'text-gray-600';
//     if (meters < 2000) return 'text-green-600 font-semibold'; // Very close
//     if (meters < 5000) return 'text-yellow-600 font-semibold'; // Close
//     return 'text-orange-600 font-semibold'; // Far
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Finding nearby ambulances...</p>
//           <p className="text-sm text-gray-500">Detecting your location</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Find Nearby Ambulances
//           </h1>
//           <p className="text-gray-600">
//             Emergency medical services near your location
//           </p>
//         </div>

//         {/* Location & Controls */}
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//           {/* Location Display */}
//           <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <svg
//                   className="w-5 h-5 text-blue-600 mr-2"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                 </svg>
//                 <div>
//                   <p className="text-sm text-blue-800 font-medium">
//                     Your Current Location
//                   </p>
//                   <p className="text-blue-600">
//                     {locationAddress || 'Detecting...'}
//                   </p>
//                   {userLocation && (
//                     <p className="text-xs text-blue-500 mt-1">
//                       Coordinates: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
//                     </p>
//                   )}
//                 </div>
//               </div>
//               <button
//                 onClick={handleRetryLocation}
//                 className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center"
//               >
//                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                 </svg>
//                 Refresh
//               </button>
//             </div>
//           </div>

//           {/* Controls */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
//             <div className="flex items-center gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Search Within
//                 </label>
//                 <select
//                   value={searchRadius}
//                   onChange={(e) => setSearchRadius(Number(e.target.value))}
//                   className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value={5}>5 km radius</option>
//                   <option value={10}>10 km radius</option>
//                   <option value={20}>20 km radius</option>
//                   <option value={50}>50 km radius</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Sort By
//                 </label>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="distance">Nearest First</option>
//                   <option value="availability">Available First</option>
//                   <option value="name">Driver Name</option>
//                 </select>
//               </div>
//             </div>

//             <div className="text-right">
//               <p className="text-sm text-gray-600">
//                 Showing <span className="font-semibold">{filteredAmbulances.length}</span> ambulances
//               </p>
//               <p className="text-xs text-gray-500">
//                 within {searchRadius} km of your location
//               </p>
//             </div>
//           </div>

//           {error && (
//             <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
//               <p className="text-yellow-800">{error}</p>
//             </div>
//           )}
//         </div>

//         {/* Ambulance Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredAmbulances.length > 0 ? (
//             filteredAmbulances.map((ambulance) => (
//               <div
//                 key={ambulance._id}
//                 className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
//               >
//                 {/* Ambulance Image */}
//                 <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden relative">
//                   {ambulance.imageUrl ? (
//                     <img
//                       src={ambulance.imageUrl}
//                       alt={ambulance.vehicleNumber}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
//                       <svg
//                         className="w-16 h-16 text-white"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M19 14l-7 7m0 0l-7-7m7 7V3"
//                         />
//                       </svg>
//                     </div>
//                   )}
                  
//                   {/* Distance Badge */}
//                   {ambulance.distance && (
//                     <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-sm font-medium">
//                       {ambulance.distance < 1000 
//                         ? `${Math.round(ambulance.distance)}m`
//                         : `${(ambulance.distance / 1000).toFixed(1)}km`
//                       }
//                     </div>
//                   )}
//                 </div>

//                 {/* Ambulance Details */}
//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-3">
//                     <div>
//                       <h3 className="text-xl font-semibold text-gray-900">
//                         {ambulance.driverName}
//                       </h3>
//                       <p className="text-gray-500 text-sm">{ambulance.vehicleNumber}</p>
//                     </div>
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(
//                         ambulance.availability
//                       )}`}
//                     >
//                       {ambulance.availability}
//                     </span>
//                   </div>

//                   {/* Distance Information */}
//                   <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <svg
//                           className="w-4 h-4 mr-2 text-blue-600"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                           />
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                           />
//                         </svg>
//                         <span className="text-sm text-gray-600">Distance from you:</span>
//                       </div>
//                       <span className={`text-sm ${getDistanceColor(ambulance.distance)}`}>
//                         {formatDistance(ambulance.distance)}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="space-y-2 text-sm text-gray-600">
//                     <div className="flex items-center">
//                       <svg
//                         className="w-4 h-4 mr-2 text-gray-400"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                         />
//                       </svg>
//                       <a
//                         href={`tel:${ambulance.phoneNumber}`}
//                         className="hover:text-blue-600 transition-colors font-medium"
//                       >
//                         {ambulance.phoneNumber}
//                       </a>
//                     </div>

//                     {ambulance.user && (
//                       <div className="flex items-center">
//                         <svg
//                           className="w-4 h-4 mr-2 text-gray-400"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                           />
//                         </svg>
//                         <span>Service Provider</span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Call Button */}
//                   <div className="mt-4">
//                     <a
//                       href={`tel:${ambulance.phoneNumber}`}
//                       className="w-full bg-green-600 text-white py-3 px-4 rounded-md text-center hover:bg-green-700 transition-colors flex items-center justify-center font-medium"
//                     >
//                       <svg
//                         className="w-5 h-5 mr-2"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                         />
//                       </svg>
//                       Call Ambulance
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center py-12">
//               <svg
//                 className="w-16 h-16 text-gray-400 mx-auto mb-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">
//                 No Ambulances Found
//               </h3>
//               <p className="text-gray-600 mb-4">
//                 No ambulances available within {searchRadius} km of your location.
//               </p>
//               <button
//                 onClick={() => setSearchRadius(50)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
//               >
//                 Search in 50 km radius
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Statistics */}
//         {filteredAmbulances.length > 0 && (
//           <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
//               <div className="p-4 bg-blue-50 rounded-lg">
//                 <p className="text-2xl font-bold text-blue-600">
//                   {filteredAmbulances.length}
//                 </p>
//                 <p className="text-gray-600">Total Found</p>
//               </div>
//               <div className="p-4 bg-green-50 rounded-lg">
//                 <p className="text-2xl font-bold text-green-600">
//                   {filteredAmbulances.filter(a => a.availability === 'Available').length}
//                 </p>
//                 <p className="text-gray-600">Available Now</p>
//               </div>
//               <div className="p-4 bg-purple-50 rounded-lg">
//                 <p className="text-2xl font-bold text-purple-600">
//                   {searchRadius} km
//                 </p>
//                 <p className="text-gray-600">Search Radius</p>
//               </div>
//               <div className="p-4 bg-orange-50 rounded-lg">
//                 <p className="text-2xl font-bold text-orange-600">
//                   {filteredAmbulances.length > 0 
//                     ? formatDistance(Math.min(...filteredAmbulances.map(a => a.distance || Infinity)))
//                     : 'N/A'
//                   }
//                 </p>
//                 <p className="text-gray-600">Nearest Ambulance</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AmbulanceList;



// components/AmbulanceList.jsx
import React, { useState, useEffect } from 'react';
import { ambulanceService } from '../../services/ambulanceService';
import { useAuth } from '../../context/AuthContext';
import BookingModal from './BookingModal';
import SOSModal from './SOSModal';

const AmbulanceList = () => {
  const [ambulances, setAmbulances] = useState([]);
  const [filteredAmbulances, setFilteredAmbulances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [searchRadius, setSearchRadius] = useState(10);
  const [sortBy, setSortBy] = useState('distance');
  const [locationAddress, setLocationAddress] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [sosSuccess, setSosSuccess] = useState(null);
  const { user } = useAuth();

  // Get user's current location and address
  useEffect(() => {
    const getLocationAndAddress = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
            setUserLocation(location);
            
            try {
              const address = await getAddressFromCoords(
                location.latitude, 
                location.longitude
              );
              setLocationAddress(address);
            } catch (err) {
              console.error('Error getting address:', err);
              setLocationAddress('Location detected');
            }
          },
          (error) => {
            console.error('Error getting location:', error);
            setError('Unable to get your location. Showing all ambulances.');
            setUserLocation({ latitude: 28.6139, longitude: 77.2090 });
            setLocationAddress('Default location (Delhi)');
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    getLocationAndAddress();
  }, []);

  // Function to get address from coordinates
  const getAddressFromCoords = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      const data = await response.json();
      return data.locality || data.city || data.principalSubdivision || 'Your location';
    } catch (error) {
      return 'Your current location';
    }
  };

  // Fetch ambulances
  useEffect(() => {
    const fetchAmbulances = async () => {
      try {
        setLoading(true);
        let data;

        if (userLocation) {
          data = await ambulanceService.getNearestAmbulances(
            userLocation.longitude,
            userLocation.latitude,
            searchRadius * 1000
          );
        } else {
          data = await ambulanceService.getAllAmbulances();
        }

        setAmbulances(data.ambulances || data.data || []);
        setFilteredAmbulances(data.ambulances || data.data || []);
      } catch (err) {
        console.error('Error fetching ambulances:', err);
        setError('Failed to load ambulances. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAmbulances();
  }, [userLocation, searchRadius]);

  // Sort ambulances
  useEffect(() => {
    if (ambulances.length > 0) {
      const sorted = [...ambulances].sort((a, b) => {
        switch (sortBy) {
          case 'distance':
            return (a.distance || 0) - (b.distance || 0);
          case 'availability':
            return a.availability === 'Available' ? -1 : 1;
          case 'name':
            return a.driverName.localeCompare(b.driverName);
          default:
            return 0;
        }
      });
      setFilteredAmbulances(sorted);
    }
  }, [sortBy, ambulances]);

  const handleRetryLocation = async () => {
    setUserLocation(null);
    setError('');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setUserLocation(location);
          
          const address = await getAddressFromCoords(
            location.latitude, 
            location.longitude
          );
          setLocationAddress(address);
        },
        (error) => {
          setError('Failed to get location. Please enable location services.');
        }
      );
    }
  };

  const handleBookAmbulance = (ambulance) => {
    setSelectedAmbulance(ambulance);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = async (bookingData) => {
    try {
      const response = await ambulanceService.bookAmbulance(bookingData);
      
      // Update ambulance availability in local state
      setAmbulances(prev => prev.map(amb => 
        amb._id === selectedAmbulance._id 
          ? { ...amb, availability: 'Busy' } 
          : amb
      ));
      
      setFilteredAmbulances(prev => prev.map(amb => 
        amb._id === selectedAmbulance._id 
          ? { ...amb, availability: 'Busy' } 
          : amb
      ));

      setBookingSuccess({
        ambulance: selectedAmbulance.driverName,
        vehicle: selectedAmbulance.vehicleNumber,
        phone: selectedAmbulance.phoneNumber
      });
      
      setShowBookingModal(false);
      setSelectedAmbulance(null);

      // Auto-hide success message after 5 seconds
      setTimeout(() => setBookingSuccess(null), 5000);
    } catch (error) {
      alert('Booking failed. Please try again.');
      console.error('Booking error:', error);
    }
  };

  const handleSOSConfirm = async (sosData) => {
    try {
      const response = await ambulanceService.sendSOS(sosData);
      
      setSosSuccess({
        message: 'Emergency SOS sent! Nearest ambulances have been notified.',
        ambulancesNotified: response.ambulancesNotified || 'Multiple'
      });
      
      setShowSOSModal(false);

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSosSuccess(null), 5000);
    } catch (error) {
      alert('SOS failed to send. Please try calling directly.');
      console.error('SOS error:', error);
    }
  };

  const formatDistance = (meters) => {
    if (!meters) return 'Calculating...';
    if (meters < 1000) {
      return `${Math.round(meters)} meters away`;
    }
    return `${(meters / 1000).toFixed(1)} km away`;
  };

  const getAvailabilityColor = (status) => {
    return status === 'Available' 
      ? 'bg-green-100 text-green-800 border border-green-200' 
      : 'bg-red-100 text-red-800 border border-red-200';
  };

  const getDistanceColor = (meters) => {
    if (!meters) return 'text-gray-600';
    if (meters < 2000) return 'text-green-600 font-semibold';
    if (meters < 5000) return 'text-yellow-600 font-semibold';
    return 'text-orange-600 font-semibold';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Finding nearby ambulances...</p>
          <p className="text-sm text-gray-500">Detecting your location</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Messages */}
        {bookingSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-green-800 font-semibold">Ambulance Booked Successfully!</p>
                  <p className="text-green-700 text-sm">
                    {bookingSuccess.ambulance} ({bookingSuccess.vehicle}) is on the way.
                    Contact: <a href={`tel:${bookingSuccess.phone}`} className="underline">{bookingSuccess.phone}</a>
                  </p>
                </div>
              </div>
              <button onClick={() => setBookingSuccess(null)} className="text-green-600 hover:text-green-800">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {sosSuccess && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <p className="text-red-800 font-semibold">EMERGENCY SOS SENT!</p>
                  <p className="text-red-700 text-sm">
                    {sosSuccess.message} {sosSuccess.ambulancesNotified} ambulances notified.
                  </p>
                </div>
              </div>
              <button onClick={() => setSosSuccess(null)} className="text-red-600 hover:text-red-800">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Header with SOS Button */}
        <div className="text-center mb-8 relative">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Nearby Ambulances
          </h1>
          <p className="text-gray-600 mb-6">
            Emergency medical services near your location
          </p>
          
          {/* SOS Button */}
          <button
            onClick={() => setShowSOSModal(true)}
            className="bg-red-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-red-700 transition-all transform hover:scale-105 font-bold text-lg flex items-center mx-auto"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            EMERGENCY SOS
          </button>
        </div>

        {/* Location & Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {/* Location Display */}
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <p className="text-sm text-blue-800 font-medium">
                    Your Current Location
                  </p>
                  <p className="text-blue-600">
                    {locationAddress || 'Detecting...'}
                  </p>
                  {userLocation && (
                    <p className="text-xs text-blue-500 mt-1">
                      Coordinates: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={handleRetryLocation}
                className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search Within
                </label>
                <select
                  value={searchRadius}
                  onChange={(e) => setSearchRadius(Number(e.target.value))}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={5}>5 km radius</option>
                  <option value={10}>10 km radius</option>
                  <option value={20}>20 km radius</option>
                  <option value={50}>50 km radius</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="distance">Nearest First</option>
                  <option value="availability">Available First</option>
                  <option value="name">Driver Name</option>
                </select>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredAmbulances.length}</span> ambulances
              </p>
              <p className="text-xs text-gray-500">
                within {searchRadius} km of your location
              </p>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-yellow-800">{error}</p>
            </div>
          )}
        </div>

        {/* Ambulance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAmbulances.length > 0 ? (
            filteredAmbulances.map((ambulance) => (
              <div
                key={ambulance._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
              >
                {/* Ambulance Image */}
                <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden relative">
                  {ambulance.imageUrl ? (
                    <img
                      src={ambulance.imageUrl}
                      alt={ambulance.vehicleNumber}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </div>
                  )}
                  
                  {/* Distance Badge */}
                  {ambulance.distance && (
                    <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-sm font-medium">
                      {ambulance.distance < 1000 
                        ? `${Math.round(ambulance.distance)}m`
                        : `${(ambulance.distance / 1000).toFixed(1)}km`
                      }
                    </div>
                  )}
                </div>

                {/* Ambulance Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {ambulance.driverName}
                      </h3>
                      <p className="text-gray-500 text-sm">{ambulance.vehicleNumber}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(
                        ambulance.availability
                      )}`}
                    >
                      {ambulance.availability}
                    </span>
                  </div>

                  {/* Distance Information */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-sm text-gray-600">Distance from you:</span>
                      </div>
                      <span className={`text-sm ${getDistanceColor(ambulance.distance)}`}>
                        {formatDistance(ambulance.distance)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <a
                        href={`tel:${ambulance.phoneNumber}`}
                        className="hover:text-blue-600 transition-colors font-medium"
                      >
                        {ambulance.phoneNumber}
                      </a>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 space-y-2">
                    {ambulance.availability === 'Available' ? (
                      <>
                        <button
                          onClick={() => handleBookAmbulance(ambulance)}
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center font-medium"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Book Ambulance
                        </button>
                        <a
                          href={`tel:${ambulance.phoneNumber}`}
                          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center font-medium"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Call Directly
                        </a>
                      </>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-gray-400 text-white py-2 px-4 rounded-md cursor-not-allowed font-medium"
                      >
                        Currently Busy
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Ambulances Found
              </h3>
              <p className="text-gray-600 mb-4">
                No ambulances available within {searchRadius} km of your location.
              </p>
              <button
                onClick={() => setSearchRadius(50)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Search in 50 km radius
              </button>
            </div>
          )}
        </div>

        {/* Statistics */}
        {filteredAmbulances.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {filteredAmbulances.length}
                </p>
                <p className="text-gray-600">Total Found</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {filteredAmbulances.filter(a => a.availability === 'Available').length}
                </p>
                <p className="text-gray-600">Available Now</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">
                  {searchRadius} km
                </p>
                <p className="text-gray-600">Search Radius</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">
                  {filteredAmbulances.length > 0 
                    ? formatDistance(Math.min(...filteredAmbulances.map(a => a.distance || Infinity)))
                    : 'N/A'
                  }
                </p>
                <p className="text-gray-600">Nearest Ambulance</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showBookingModal && selectedAmbulance && (
        <BookingModal
          ambulance={selectedAmbulance}
          userLocation={userLocation}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedAmbulance(null);
          }}
          onConfirm={handleConfirmBooking}
        />
      )}

      {showSOSModal && userLocation && (
        <SOSModal
          userLocation={userLocation}
          locationAddress={locationAddress}
          onClose={() => setShowSOSModal(false)}
          onConfirm={handleSOSConfirm}
        />
      )}
    </div>
  );
};

export default AmbulanceList;