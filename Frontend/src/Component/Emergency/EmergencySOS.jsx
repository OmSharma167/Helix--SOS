import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  PhoneCall,
  MapPin,
  Loader2,
  Edit,
  Check,
  Shield,
  Zap,
} from "lucide-react";

const EmergencySOS = () => {
  const [isAlertSent, setIsAlertSent] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [emergencyType, setEmergencyType] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [pulseAnimation, setPulseAnimation] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const geocodingApiKey = "73f3baf98bc04cbb90501f6673e059ae";

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(coords);

          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?key=${geocodingApiKey}&q=${coords.latitude},${coords.longitude}&no_annotations=1`
            );
            const data = await response.json();
            const result = data.results[0];

            if (result) {
              setLocationDetails({
                street: result.components.road || "",
                pincode: result.components.postcode || "",
                village:
                  result.components.village || result.components.hamlet || "",
                city: result.components.city || result.components.town || "",
                district: result.components.county || "",
                state: result.components.state || "",
              });
            } else {
              setLocationDetails(null);
            }
          } catch (error) {
            setLocationError("Error fetching location details");
          }
          setIsLoading(false);
        },
        (error) => {
          setLocationError(error.message);
          setIsLoading(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser");
      setIsLoading(false);
    }
  }, []);

  const handleSOS = () => {
    if (location && selectedServices.length > 0) {
      console.log("Emergency Alert:", {
        location,
        emergencyType,
        services: selectedServices,
        additionalInfo,
      });
      setPulseAnimation(true);
      setIsAlertSent(true);
      setTimeout(() => {
        setIsAlertSent(false);
        setPulseAnimation(false);
      }, 5000);
    }
  };

  const handleServiceChange = (value) => {
    setSelectedServices((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const handleEdit = (field, value) => {
    setLocationDetails((prev) => ({ ...prev, [field]: value }));
  };

  const emergencyTypes = [
    {
      value: "medical",
      label: "Medical Emergency",
      color: "from-red-500 to-pink-500",
      icon: "🚑",
    },
    {
      value: "fire",
      label: "Fire Emergency",
      color: "from-orange-500 to-red-500",
      icon: "🔥",
    },
    {
      value: "police",
      label: "Police Assistance",
      color: "from-blue-500 to-indigo-500",
      icon: "👮",
    },
    {
      value: "accident",
      label: "Accident",
      color: "from-yellow-500 to-orange-500",
      icon: "⚠️",
    },
    {
      value: "other",
      label: "Other",
      color: "from-gray-500 to-gray-600",
      icon: "📞",
    },
  ];

  const serviceTypes = [
    { 
      value: "police", 
      label: "Police", 
      icon: "🚓", 
      selectedClass: "bg-blue-50 border-blue-300 shadow-blue-200/50",
      checkColor: "text-blue-500"
    },
    { 
      value: "ambulance", 
      label: "Ambulance", 
      icon: "🚑", 
      selectedClass: "bg-red-50 border-red-300 shadow-red-200/50",
      checkColor: "text-red-500"
    },
    { 
      value: "hospital", 
      label: "Hospital", 
      icon: "🏥", 
      selectedClass: "bg-green-50 border-green-300 shadow-green-200/50",
      checkColor: "text-green-500"
    },
    { 
      value: "fire", 
      label: "Fire Brigade", 
      icon: "🚒", 
      selectedClass: "bg-orange-50 border-orange-300 shadow-orange-200/50",
      checkColor: "text-orange-500"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white px-4 py-8">
      {/* Animated background effects */}
      

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Badge */}
        

        {/* Main Card */}
        <div className="bg-white backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with gradient */}
         

          <div className="p-8 space-y-8">
            {/* Emergency Type Selection */}
            <div>
              <label className="text-gray-800 text-lg font-semibold mb-4 block">
                Select Emergency Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {emergencyTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setEmergencyType(type.value)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      emergencyType === type.value
                        ? `bg-gradient-to-br ${type.color} border-white shadow-lg scale-105 text-white`
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    <div className="text-3xl mb-2">{type.icon}</div>
                    <div className="text-sm font-medium">
                      {type.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Service Type Selection */}
            <div>
              <label className="text-gray-800 text-lg font-semibold mb-4 block">
                Select Services Needed
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {serviceTypes.map((service) => (
                  <button
                    key={service.value}
                    onClick={() => handleServiceChange(service.value)}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                      selectedServices.includes(service.value)
                        ? service.selectedClass
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {selectedServices.includes(service.value) && (
                      <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
                        <Check
                          className={service.checkColor}
                          size={16}
                        />
                      </div>
                    )}
                    <div className="text-4xl mb-2">{service.icon}</div>
                    <div className="text-gray-800 font-medium">
                      {service.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Information Section */}
            <div>
              <label className="text-gray-800 text-lg font-semibold mb-4 block">
                Additional Information (Optional)
              </label>
              <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 rounded-2xl border border-orange-200 p-4 shadow-lg">
                <div className="mb-3">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Describe the situation where you are and what help you need.
                    Include details like:
                  </p>
                  <ul className="mt-2 text-gray-600 text-xs space-y-1 ml-4">
                    <li>• Number of people involved</li>
                    <li>• Severity of the emergency</li>
                    <li>• Specific landmarks or location details</li>
                    <li>• Any immediate hazards or dangers</li>
                  </ul>
                </div>
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Example: 'Two people injured in car accident on highway near XYZ mall. Heavy bleeding. Need immediate medical attention...'"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none transition-all"
                  rows="4"
                />
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    More details help responders prepare better
                  </span>
                  <span
                    className={`font-medium ${
                      additionalInfo.length > 0
                        ? "text-emerald-500"
                        : "text-gray-500"
                    }`}
                  >
                    {additionalInfo.length} characters
                  </span>
                </div>
              </div>
            </div>

            {/* Location Status */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
              {isLoading ? (
                <div className="flex items-center justify-center text-gray-700 space-x-3">
                  <Loader2 className="animate-spin text-blue-500" size={24} />
                  <span className="text-lg">Acquiring your location...</span>
                </div>
              ) : locationError ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
                  Error: {locationError}
                </div>
              ) : location ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="text-emerald-500" size={24} />
                    <span className="text-gray-800 font-semibold text-lg">
                      Your Location
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-emerald-500 to-transparent"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(locationDetails || {}).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="bg-white rounded-lg p-3 shadow-sm"
                        >
                          <div className="text-gray-500 text-xs uppercase mb-1">
                            {key}
                          </div>
                          {isEditing ? (
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => handleEdit(key, e.target.value)}
                              className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1 text-gray-800"
                            />
                          ) : (
                            <div className="text-gray-800 font-medium">
                              {value || "Not available"}
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>

                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="mt-4 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center space-x-2 transition-all"
                  >
                    <Edit size={16} />
                    <span>{isEditing ? "Save Changes" : "Edit Location"}</span>
                  </button>
                </div>
              ) : null}
            </div>

            {/* SOS Button */}
            <div className="text-center space-y-4">
              <button
                onClick={handleSOS}
                disabled={
                  !location || selectedServices.length === 0 || isLoading
                }
                className={`relative group w-full max-w-md mx-auto py-6 px-8 rounded-full text-2xl font-bold transition-all duration-300 ${
                  !location || selectedServices.length === 0 || isLoading
                    ? "bg-red-400 cursor-not-allowed opacity-50 text-gray-500"
                    : "bg-gradient-to-r from-red-500 via-red-400 to-pink-500 hover:shadow-2xl hover:shadow-red-300/50 hover:scale-105 active:scale-95 "
                }`}
              >
                {pulseAnimation && (
                  <>
                    <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></span>
                    <span className="absolute inset-0 rounded-full bg-red-500 animate-pulse"></span>
                  </>
                )}
                <span className="relative flex items-center justify-center space-x-3">
                  <PhoneCall
                    size={32}
                    className={pulseAnimation ? "animate-bounce" : ""}
                  />
                  <span>SEND SOS ALERT</span>
                </span>
              </button>

              <p className="text-gray-600 text-sm max-w-md mx-auto">
                Your exact location and selected services will be immediately
                shared with emergency responders
              </p>
            </div>

            {/* Success Message */}
            {isAlertSent && (
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl p-6 text-center shadow-xl animate-pulse">
                <div className="flex justify-center mb-3">
                  <div className="bg-green-300 rounded-full p-3">
                    <Check className="text-emerald-500" size={32} />
                  </div>
                </div>
                <div className="text-green-600 text-xl font-bold mb-2">
                  SOS Alert Sent Successfully!
                </div>
                <div className="text-red-600">
                  Emergency services have been notified and are on their way
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center space-y-3">
          <div className="flex justify-center space-x-6 text-gray-600 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span>Secure Connection</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Real-time Tracking</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>Instant Response</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencySOS;