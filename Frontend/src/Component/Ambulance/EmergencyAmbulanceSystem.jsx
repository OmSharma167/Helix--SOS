import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Phone,
  AlertCircle,
  CheckCircle,
  XCircle,
  Navigation,
  Ambulance as AmbulanceIcon,
} from "lucide-react";

// Mock data for demonstration
const DEMO_USER = { id: "1", name: "John Doe", role: 1 }; // Role 1 = User
const DEMO_OWNER = { id: "2", name: "Ambulance Service", role: 2 }; // Role 2 = Owner

const EmergencyAmbulanceSystem = () => {
  const [userRole, setUserRole] = useState(1); // 1 = User, 2 = Ambulance Owner
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearbyAmbulances, setNearbyAmbulances] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    patientName: "",
    patientPhone: "",
    emergencyType: "General Emergency",
    dropAddress: "",
    notes: "",
  });
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  // Demo ambulances data
  const demoAmbulances = [
    {
      _id: "amb1",
      vehicleNumber: "DL-01-AB-1234",
      driverName: "Raj Kumar",
      driverPhone: "+91-9876543210",
      ambulanceType: "Advanced",
      location: { coordinates: [77.209, 28.6139] }, // Delhi coordinates
      isAvailable: true,
      distance: "2.3 km",
    },
    {
      _id: "amb2",
      vehicleNumber: "DL-02-CD-5678",
      driverName: "Amit Singh",
      driverPhone: "+91-9876543211",
      ambulanceType: "ICU",
      location: { coordinates: [77.2167, 28.6267] },
      isAvailable: true,
      distance: "3.1 km",
    },
    {
      _id: "amb3",
      vehicleNumber: "DL-03-EF-9012",
      driverName: "Priya Sharma",
      driverPhone: "+91-9876543212",
      ambulanceType: "Basic",
      location: { coordinates: [77.1947, 28.6358] },
      isAvailable: true,
      distance: "4.5 km",
    },
  ];



useEffect(() => {
  if (mapRef.current) {
    if (map) {
      map.remove(); // remove previous map instance
    }
    const newMap = L.map(mapRef.current).setView([28.6139, 77.209], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(newMap);
    setMap(newMap);
  }
}, []);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(location);

          if (map) {
            map.setView([location.lat, location.lng], 13);
            L.marker([location.lat, location.lng], {
              icon: L.divIcon({
                className: "custom-marker",
                html: '<div style="background: #ef4444; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white;"></div>',
              }),
            })
              .addTo(map)
              .bindPopup("Your Location");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          // Use Delhi as default
          const defaultLocation = { lat: 28.6139, lng: 77.209 };
          setCurrentLocation(defaultLocation);
        }
      );
    }
  }, [map]);

  // Add ambulance markers to map
  useEffect(() => {
    if (map && nearbyAmbulances.length > 0) {
      nearbyAmbulances.forEach((ambulance) => {
        const [lng, lat] = ambulance.location.coordinates;
        const marker = L.marker([lat, lng], {
          icon: L.divIcon({
            className: "ambulance-marker",
            html: '<div style="background: #10b981; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">🚑</div>',
          }),
        }).addTo(map);

        marker.bindPopup(`
          <strong>${ambulance.vehicleNumber}</strong><br/>
          Type: ${ambulance.ambulanceType}<br/>
          Driver: ${ambulance.driverName}<br/>
          Distance: ${ambulance.distance}
        `);
      });
    }
  }, [map, nearbyAmbulances]);

  // Load nearby ambulances
  const findNearbyAmbulances = () => {
    setNearbyAmbulances(demoAmbulances);
  };

  // Handle SOS button
  const handleSOS = () => {
    if (!currentLocation) {
      alert("Getting your location...");
      return;
    }

    const sosBooking = {
      id: "book-" + Date.now(),
      patientName: DEMO_USER.name,
      patientPhone: "+91-9999999999",
      emergencyType: "General Emergency",
      pickupAddress: "Current Location",
      dropAddress: "Nearest Hospital",
      status: "accepted",
      isSOS: true,
      ambulance: demoAmbulances[0],
      createdAt: new Date().toISOString(),
    };

    setBookings([sosBooking, ...bookings]);
    alert(
      "🚨 SOS Alert Sent! Nearest ambulance has been automatically assigned and is on the way!"
    );
  };

  // Handle regular booking
  const handleBooking = (ambulanceId) => {
    if (
      !bookingForm.patientName ||
      !bookingForm.patientPhone ||
      !bookingForm.dropAddress
    ) {
      alert("Please fill all required fields");
      return;
    }

    const selectedAmbulance = demoAmbulances.find((a) => a._id === ambulanceId);
    const newBooking = {
      id: "book-" + Date.now(),
      ...bookingForm,
      pickupAddress: "Current Location",
      status: "pending",
      isSOS: false,
      ambulance: selectedAmbulance,
      createdAt: new Date().toISOString(),
    };

    setBookings([newBooking, ...bookings]);
    setShowBookingForm(false);
    setBookingForm({
      patientName: "",
      patientPhone: "",
      emergencyType: "General Emergency",
      dropAddress: "",
      notes: "",
    });
    alert("Booking request sent successfully!");
  };

  // Ambulance owner actions
  const handleAcceptBooking = (bookingId) => {
    setBookings(
      bookings.map((b) =>
        b.id === bookingId ? { ...b, status: "accepted" } : b
      )
    );
    alert("Booking accepted!");
  };

  const handleRejectBooking = (bookingId) => {
    setBookings(
      bookings.map((b) =>
        b.id === bookingId ? { ...b, status: "rejected" } : b
      )
    );
    alert("Booking rejected!");
  };

  const handleUpdateStatus = (bookingId, newStatus) => {
    setBookings(
      bookings.map((b) =>
        b.id === bookingId ? { ...b, status: newStatus } : b
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "in-transit":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AmbulanceIcon size={32} />
            <h1 className="text-2xl font-bold">Emergency Ambulance System</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setUserRole(1)}
              className={`px-4 py-2 rounded ${
                userRole === 1 ? "bg-white text-red-600" : "bg-red-700"
              }`}
            >
              User View
            </button>
            <button
              onClick={() => setUserRole(2)}
              className={`px-4 py-2 rounded ${
                userRole === 2 ? "bg-white text-red-600" : "bg-red-700"
              }`}
            >
              Owner View
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        {/* USER VIEW */}
        {userRole === 1 && (
          <div className="space-y-6">
            {/* SOS Button */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8 rounded-lg shadow-xl">
              <h2 className="text-3xl font-bold mb-4 text-center">
                Emergency? Click SOS!
              </h2>
              <button
                onClick={handleSOS}
                className="w-full bg-white text-red-600 py-6 rounded-lg font-bold text-2xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
              >
                <AlertCircle size={40} />
                🚨 SOS - EMERGENCY
              </button>
              <p className="text-center mt-4 text-sm">
                Instant ambulance dispatch to your location
              </p>
            </div>

            {/* Map */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Map View</h3>
                <button
                  onClick={findNearbyAmbulances}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
                >
                  <Navigation size={20} />
                  Find Nearby Ambulances
                </button>
              </div>
              <div
                ref={mapRef}
                style={{ height: "400px", width: "100%", borderRadius: "8px" }}
              />
              <div className="mt-2 text-sm text-gray-600">
                <span className="inline-flex items-center gap-1">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span> Your
                  Location
                </span>
                <span className="inline-flex items-center gap-1 ml-4">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>{" "}
                  Available Ambulances
                </span>
              </div>
            </div>

            {/* Nearby Ambulances */}
            {nearbyAmbulances.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">
                  Nearby Ambulances ({nearbyAmbulances.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {nearbyAmbulances.map((ambulance) => (
                    <div
                      key={ambulance._id}
                      className="border rounded-lg p-4 hover:shadow-lg transition"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <AmbulanceIcon className="text-green-600" size={24} />
                        <span className="font-bold">
                          {ambulance.vehicleNumber}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>Type:</strong> {ambulance.ambulanceType}
                        </p>
                        <p>
                          <strong>Driver:</strong> {ambulance.driverName}
                        </p>
                        <p className="flex items-center gap-1">
                          <Phone size={14} />
                          {ambulance.driverPhone}
                        </p>
                        <p className="text-blue-600 font-semibold">
                          📍 {ambulance.distance} away
                        </p>
                      </div>
                      <button
                        onClick={() => setShowBookingForm(ambulance._id)}
                        className="w-full mt-3 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                      >
                        Book Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Booking Form Modal */}
            {showBookingForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                  <h3 className="text-xl font-bold mb-4">Book Ambulance</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Patient Name *
                      </label>
                      <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={bookingForm.patientName}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            patientName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Patient Phone *
                      </label>
                      <input
                        type="tel"
                        className="w-full border rounded px-3 py-2"
                        value={bookingForm.patientPhone}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            patientPhone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Emergency Type *
                      </label>
                      <select
                        className="w-full border rounded px-3 py-2"
                        value={bookingForm.emergencyType}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            emergencyType: e.target.value,
                          })
                        }
                      >
                        <option>General Emergency</option>
                        <option>Accident</option>
                        <option>Heart Attack</option>
                        <option>Stroke</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Drop Location *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter hospital or destination"
                        className="w-full border rounded px-3 py-2"
                        value={bookingForm.dropAddress}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            dropAddress: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Additional Notes
                      </label>
                      <textarea
                        className="w-full border rounded px-3 py-2"
                        rows="3"
                        value={bookingForm.notes}
                        onChange={(e) =>
                          setBookingForm({
                            ...bookingForm,
                            notes: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleBooking(showBookingForm)}
                        className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                      >
                        Confirm Booking
                      </button>
                      <button
                        onClick={() => setShowBookingForm(false)}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* My Bookings */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">My Bookings</h3>
              {bookings.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No bookings yet
                </p>
              ) : (
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {booking.status.toUpperCase()}
                          </span>
                          {booking.isSOS && (
                            <span className="ml-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                              🚨 SOS
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(booking.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p>
                            <strong>Patient:</strong> {booking.patientName}
                          </p>
                          <p>
                            <strong>Phone:</strong> {booking.patientPhone}
                          </p>
                          <p>
                            <strong>Emergency:</strong> {booking.emergencyType}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Pickup:</strong> {booking.pickupAddress}
                          </p>
                          <p>
                            <strong>Drop:</strong> {booking.dropAddress}
                          </p>
                          {booking.ambulance && (
                            <p>
                              <strong>Ambulance:</strong>{" "}
                              {booking.ambulance.vehicleNumber}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* AMBULANCE OWNER VIEW */}
        {userRole === 2 && (
          <div className="space-y-6">
            {/* Pending Bookings */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">
                Pending Booking Requests
              </h3>
              {bookings.filter((b) => b.status === "pending").length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No pending requests
                </p>
              ) : (
                <div className="space-y-3">
                  {bookings
                    .filter((b) => b.status === "pending")
                    .map((booking) => (
                      <div
                        key={booking.id}
                        className="border rounded-lg p-4 bg-yellow-50"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-semibold">
                              NEW REQUEST
                            </span>
                            <span className="ml-2 text-xs text-gray-500">
                              {new Date(booking.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <p>
                              <strong>Patient:</strong> {booking.patientName}
                            </p>
                            <p>
                              <strong>Phone:</strong> {booking.patientPhone}
                            </p>
                            <p>
                              <strong>Emergency Type:</strong>{" "}
                              {booking.emergencyType}
                            </p>
                          </div>
                          <div>
                            <p>
                              <strong>Pickup:</strong> {booking.pickupAddress}
                            </p>
                            <p>
                              <strong>Drop:</strong> {booking.dropAddress}
                            </p>
                            {booking.notes && (
                              <p>
                                <strong>Notes:</strong> {booking.notes}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAcceptBooking(booking.id)}
                            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2"
                          >
                            <CheckCircle size={20} />
                            Accept
                          </button>
                          <button
                            onClick={() => handleRejectBooking(booking.id)}
                            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2"
                          >
                            <XCircle size={20} />
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Active Bookings */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Active Bookings</h3>
              {bookings.filter((b) =>
                ["accepted", "in-transit"].includes(b.status)
              ).length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No active bookings
                </p>
              ) : (
                <div className="space-y-3">
                  {bookings
                    .filter((b) =>
                      ["accepted", "in-transit"].includes(b.status)
                    )
                    .map((booking) => (
                      <div
                        key={booking.id}
                        className="border rounded-lg p-4 bg-green-50"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {booking.status.toUpperCase()}
                          </span>
                          {booking.isSOS && (
                            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                              🚨 SOS EMERGENCY
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <p>
                              <strong>Patient:</strong> {booking.patientName}
                            </p>
                            <p>
                              <strong>Phone:</strong> {booking.patientPhone}
                            </p>
                            <p>
                              <strong>Emergency:</strong>{" "}
                              {booking.emergencyType}
                            </p>
                          </div>
                          <div>
                            <p>
                              <strong>Pickup:</strong> {booking.pickupAddress}
                            </p>
                            <p>
                              <strong>Drop:</strong> {booking.dropAddress}
                            </p>
                            <p>
                              <strong>Ambulance:</strong>{" "}
                              {booking.ambulance?.vehicleNumber}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {booking.status === "accepted" && (
                            <button
                              onClick={() =>
                                handleUpdateStatus(booking.id, "in-transit")
                              }
                              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                            >
                              Mark In Transit
                            </button>
                          )}
                          {booking.status === "in-transit" && (
                            <button
                              onClick={() =>
                                handleUpdateStatus(booking.id, "completed")
                              }
                              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                            >
                              Mark Completed
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Completed Bookings */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">
                Completed & Rejected Bookings
              </h3>
              {bookings.filter((b) =>
                ["completed", "rejected"].includes(b.status)
              ).length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No completed bookings
                </p>
              ) : (
                <div className="space-y-3">
                  {bookings
                    .filter((b) => ["completed", "rejected"].includes(b.status))
                    .map((booking) => (
                      <div
                        key={booking.id}
                        className="border rounded-lg p-4 bg-gray-50"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {booking.status.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(booking.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm">
                          <p>
                            <strong>Patient:</strong> {booking.patientName}
                          </p>
                          <p>
                            <strong>Emergency:</strong> {booking.emergencyType}
                          </p>
                          <p>
                            <strong>Route:</strong> {booking.pickupAddress} →{" "}
                            {booking.dropAddress}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css"
      />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js"></script>
    </div>
  );
};

export default EmergencyAmbulanceSystem;
