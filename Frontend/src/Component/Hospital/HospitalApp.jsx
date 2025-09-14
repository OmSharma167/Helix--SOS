import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  MapPin,
  Phone,
  Mail,
  Star,
  Edit,
  Trash2,
  Eye,
  Filter,
  Heart,
  Navigation,
  Clock,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  Users,
  Building2,
  Stethoscope,
} from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

// // Mock authentication context
// const useAuth = () => {
//   const [user, setUser] = useState({ role: "user", id: null }); // 'user' or 'owner'

//   const login = (role) => {
//     setUser({ role, id: Date.now() });
//   };

//   const logout = () => {
//     setUser({ role: "user", id: null });
//   };

//   return { user, login, logout };
// };

import { useAuth } from "../../context/AuthContext";


// Utility function to get user's location
const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  });
};

// API functions
const hospitalAPI = {
  async registerHospital(hospitalData) {
    const response = await fetch(`${API_BASE_URL}/hospitals/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hospitalData),
    });
    return response.json();
  },

  async getAllHospitals(params = {}) {
    const queryParams = new URLSearchParams(params);
    const response = await fetch(`${API_BASE_URL}/hospitals?${queryParams}`);
    return response.json();
  },

  async getNearestHospitals(latitude, longitude, maxDistance = 10000) {
    const response = await fetch(
      `${API_BASE_URL}/hospitals/nearest?latitude=${latitude}&longitude=${longitude}&maxDistance=${maxDistance}&limit=20`
    );
    return response.json();
  },

  async getHospitalById(id) {
    const response = await fetch(`${API_BASE_URL}/hospitals/${id}`);
    return response.json();
  },

  async updateHospital(id, hospitalData) {
    const response = await fetch(`${API_BASE_URL}/hospitals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hospitalData),
    });
    return response.json();
  },

  async deleteHospital(id) {
    const response = await fetch(`${API_BASE_URL}/hospitals/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },
};

// Hospital Registration Form Component
const HospitalRegistrationForm = ({
  onSuccess,
  initialData = null,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    address: "",
    facilities: [],
    imageUrl: "",
    gallery: [""],
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const facilitiesOptions = [
    "Emergency Ward",
    "ICU",
    "Operation Theater",
    "X-Ray",
    "Pharmacy",
    "Blood Bank",
    "Ambulance Service",
    "Other",
  ];

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        contactNumber: initialData.contactNumber || "",
        email: initialData.email || "",
        address: initialData.address || "",
        facilities: initialData.facilities || [],
        imageUrl: initialData.imageUrl || "",
        gallery: initialData.gallery || [""],
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFacilityChange = (facility) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  const handleGalleryChange = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.map((item, i) => (i === index ? value : item)),
    }));
  };

  const addGalleryField = () => {
    setFormData((prev) => ({ ...prev, gallery: [...prev.gallery, ""] }));
  };

  const removeGalleryField = (index) => {
    if (formData.gallery.length > 1) {
      setFormData((prev) => ({
        ...prev,
        gallery: prev.gallery.filter((_, i) => i !== index),
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Hospital name is required";
    if (!formData.contactNumber.trim())
      newErrors.contactNumber = "Contact number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.imageUrl.trim())
      newErrors.imageUrl = "Main image URL is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const submitData = {
        ...formData,
        gallery: formData.gallery.filter((url) => url.trim()),
      };

      const result = isEdit
        ? await hospitalAPI.updateHospital(initialData._id, submitData)
        : await hospitalAPI.registerHospital(submitData);

      if (result.success) {
        onSuccess(result.data.hospital);
      } else {
        setErrors({ submit: result.message });
      }
    } catch (error) {
      setErrors({ submit: "Failed to save hospital details" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {isEdit ? "Update Hospital Details" : "Register Your Hospital"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hospital Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter hospital name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Number *
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1-555-123-4567"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contactNumber}
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="hospital@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Image URL *
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/hospital-image.jpg"
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Address *
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter complete hospital address including street, city, state, zip"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* Facilities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Available Facilities
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {facilitiesOptions.map((facility) => (
              <label
                key={facility}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.facilities.includes(facility)}
                  onChange={() => handleFacilityChange(facility)}
                  className="rounded text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{facility}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Gallery Images (Optional)
          </label>
          {formData.gallery.map((url, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="url"
                value={url}
                onChange={(e) => handleGalleryChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Gallery image ${index + 1} URL`}
              />
              {formData.gallery.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeGalleryField(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addGalleryField}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            <Plus className="h-4 w-4" />
            <span>Add Gallery Image</span>
          </button>
        </div>

        {errors.submit && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.submit}
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
          >
            {loading ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Building2 className="h-4 w-4" />
            )}
            <span>{isEdit ? "Update Hospital" : "Register Hospital"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

// Hospital Card Component
const HospitalCard = ({
  hospital,
  onEdit,
  onDelete,
  showActions = false,
  onViewDetails,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this hospital?")) {
      setLoading(true);
      try {
        const result = await hospitalAPI.deleteHospital(hospital._id);
        if (result.success) {
          onDelete(hospital._id);
        }
      } catch (error) {
        console.error("Failed to delete hospital:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const calculateDistance = (coords) => {
    // This would normally calculate actual distance
    return Math.floor(Math.random() * 10) + 1;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={
            hospital.imageUrl ||
            "https://via.placeholder.com/300x200?text=Hospital"
          }
          alt={hospital.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            if (
              e.target.src !==
              "https://via.placeholder.com/300x200.png?text=Hospital"
            ) {
              e.target.src =
                "https://via.placeholder.com/300x200.png?text=Hospital";
            }
          }}
        />
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              hospital.availability === "Available"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {hospital.availability === "Available" ? (
              <CheckCircle className="h-3 w-3 inline mr-1" />
            ) : (
              <XCircle className="h-3 w-3 inline mr-1" />
            )}
            {hospital.availability}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {hospital.name}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="truncate">{hospital.address}</span>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <Phone className="h-4 w-4 mr-2" />
            <span>{hospital.contactNumber}</span>
          </div>

          {hospital.email && (
            <div className="flex items-center text-gray-600 text-sm">
              <Mail className="h-4 w-4 mr-2" />
              <span className="truncate">{hospital.email}</span>
            </div>
          )}
        </div>

        {hospital.facilities && hospital.facilities.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Facilities:
            </p>
            <div className="flex flex-wrap gap-1">
              {hospital.facilities.slice(0, 3).map((facility, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {facility}
                </span>
              ))}
              {hospital.facilities.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{hospital.facilities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-3 border-t">
          <div className="flex space-x-2">
            <button
              onClick={() => onViewDetails(hospital)}
              className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 text-sm"
            >
              <Eye className="h-4 w-4" />
              <span>Details</span>
            </button>
          </div>

          {showActions && (
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(hospital)}
                className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200 text-sm"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200 text-sm disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin h-4 w-4 border-2 border-red-800 border-t-transparent rounded-full" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Hospital Details Modal
const HospitalDetailsModal = ({ hospital, onClose }) => {
  if (!hospital) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {hospital.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img
                src={
                  hospital.imageUrl ||
                  "https://via.placeholder.com/400x300?text=Hospital"
                }
                alt={hospital.name}
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => {
                  if (
                    e.target.src !==
                    "https://via.placeholder.com/300x200.png?text=Hospital"
                  ) {
                    e.target.src =
                      "https://via.placeholder.com/300x200.png?text=Hospital";
                  }
                }}
              />

              {hospital.gallery && hospital.gallery.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-2">Gallery</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {hospital.gallery.slice(0, 6).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${hospital.name} ${index + 1}`}
                        className="w-full h-20 object-cover rounded"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Contact Information
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{hospital.contactNumber}</span>
                  </div>
                  {hospital.email && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{hospital.email}</span>
                    </div>
                  )}
                  <div className="flex items-start text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                    <span>{hospital.address}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">Availability</h4>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    hospital.availability === "Available"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {hospital.availability === "Available" ? (
                    <CheckCircle className="h-4 w-4 mr-1" />
                  ) : (
                    <XCircle className="h-4 w-4 mr-1" />
                  )}
                  {hospital.availability}
                </span>
              </div>

              {hospital.facilities && hospital.facilities.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Available Facilities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {hospital.facilities.map((facility, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={() => {
                    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      hospital.address
                    )}`;
                    window.open(url, "_blank");
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Navigation className="h-4 w-4" />
                  <span>Get Directions</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Search and Filter Component
const SearchAndFilter = ({ onSearch, onFilter, filters, onLocationSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [localFilters, setLocalFilters] = useState(filters);
  const [locationLoading, setLocationLoading] = useState(false);

  const facilitiesOptions = [
    "Emergency Ward",
    "ICU",
    "Operation Theater",
    "X-Ray",
    "Pharmacy",
    "Blood Bank",
    "Ambulance Service",
    "Other",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilter(newFilters);
  };

  const handleNearMeClick = async () => {
    setLocationLoading(true);
    try {
      const location = await getUserLocation();
      onLocationSearch(location);
    } catch (error) {
      alert("Unable to get your location. Please enable location services.");
    } finally {
      setLocationLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <form onSubmit={handleSearch} className="flex gap-4 mb-4">
        <div className="flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search hospitals by name or location..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
        >
          <Search className="h-4 w-4" />
          <span>Search</span>
        </button>
        <button
          type="button"
          onClick={handleNearMeClick}
          disabled={locationLoading}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center space-x-2 disabled:opacity-50"
        >
          {locationLoading ? (
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <Navigation className="h-4 w-4" />
          )}
          <span>Near Me</span>
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Availability
          </label>
          <select
            value={localFilters.availability || ""}
            onChange={(e) => handleFilterChange("availability", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Hospitals</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Facilities
          </label>
          <select
            value={localFilters.facilities || ""}
            onChange={(e) => handleFilterChange("facilities", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Facilities</option>
            {facilitiesOptions.map((facility) => (
              <option key={facility} value={facility}>
                {facility}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Results per page
          </label>
          <select
            value={localFilters.limit || "10"}
            onChange={(e) => handleFilterChange("limit", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const HospitalApp = () => {
  const { user, login, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("browse");
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [editingHospital, setEditingHospital] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({ current: 1, total: 1 });

  // Load hospitals
  const loadHospitals = async (params = {}) => {
    setLoading(true);
    try {
      const result = await hospitalAPI.getAllHospitals(params);
      if (result.success) {
        setHospitals(result.data.hospitals);
        setPagination(result.data.pagination);
      }
    } catch (error) {
      console.error("Failed to load hospitals:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load nearest hospitals
  const loadNearestHospitals = async (location) => {
    setLoading(true);
    try {
      const result = await hospitalAPI.getNearestHospitals(
        location.latitude,
        location.longitude,
        100000 // 10km radius
      );
      if (result.success) {
        setHospitals(result.data.hospitals);
        setPagination({ current: 1, total: 1 });
      }
    } catch (error) {
      console.error("Failed to load nearest hospitals:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    const params = { ...filters, search: searchTerm, page: 1 };
    loadHospitals(params);
  };

  // Handle filters
  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    const params = { ...newFilters, page: 1 };
    loadHospitals(params);
  };

  // Handle location search
  const handleLocationSearch = (location) => {
    loadNearestHospitals(location);
  };

  // Handle hospital registration/update success
  const handleHospitalSuccess = (hospital) => {
    if (editingHospital) {
      setHospitals((prev) =>
        prev.map((h) => (h._id === hospital._id ? hospital : h))
      );
      setEditingHospital(null);
    } else {
      setHospitals((prev) => [hospital, ...prev]);
    }
    setActiveTab("browse");
  };

  // Handle hospital edit
  const handleEdit = (hospital) => {
    setEditingHospital(hospital);
    setActiveTab("register");
  };

  // Handle hospital delete
  const handleDelete = (hospitalId) => {
    setHospitals((prev) => prev.filter((h) => h._id !== hospitalId));
  };

  // Handle view details
  const handleViewDetails = (hospital) => {
    setShowDetails(hospital);
  };

  // Load initial data
  useEffect(() => {
    loadHospitals();
  }, []);

  // Auth Section
  const AuthSection = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="font-medium">
              {user.role === "owner" ? "Hospital Owner" : "User"} Mode
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => login("user")}
            className={`px-4 py-2 rounded-md ${
              user.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            User View
          </button>
          <button
            onClick={() => login("owner")}
            className={`px-4 py-2 rounded-md ${
              user.role === "owner"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Hospital Owner
          </button>
        </div>
      </div>
    </div>
  );

  // Navigation Tabs
  const NavigationTabs = () => (
    <div className="bg-white rounded-lg shadow-md mb-6">
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("browse")}
          className={`flex-1 py-4 px-6 text-center font-medium ${
            activeTab === "browse"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Search className="h-4 w-4" />
            <span>Browse Hospitals</span>
          </div>
        </button>
        {user.role === "owner" && (
          <button
            onClick={() => {
              setActiveTab("register");
              setEditingHospital(null);
            }}
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === "register"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>{editingHospital ? "Edit Hospital" : "Add Hospital"}</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );

  // Pagination Component
  const Pagination = () => {
    if (pagination.total <= 1) return null;

    const pages = Array.from({ length: pagination.total }, (_, i) => i + 1);

    return (
      <div className="flex justify-center space-x-2 mt-6">
        <button
          onClick={() => {
            if (pagination.current > 1) {
              const params = { ...filters, page: pagination.current - 1 };
              loadHospitals(params);
            }
          }}
          disabled={pagination.current === 1}
          className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50"
        >
          Previous
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => {
              const params = { ...filters, page };
              loadHospitals(params);
            }}
            className={`px-3 py-2 border rounded-md ${
              page === pagination.current
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => {
            if (pagination.current < pagination.total) {
              const params = { ...filters, page: pagination.current + 1 };
              loadHospitals(params);
            }
          }}
          disabled={pagination.current === pagination.total}
          className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    );
  };

  // Loading Component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
    </div>
  );

  // Empty State Component
  const EmptyState = ({ message, actionText, onAction }) => (
    <div className="text-center py-12">
      <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-600 mb-4">{message}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {actionText}
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Hospital Management System
          </h1>
          <p className="text-gray-600">
            Find nearby hospitals and manage healthcare facilities
          </p>
        </div>

        {/* Auth Section */}
        <AuthSection />

        {/* Navigation */}
        <NavigationTabs />

        {/* Content */}
        {activeTab === "browse" && (
          <div>
            {/* Search and Filters */}
            <SearchAndFilter
              onSearch={handleSearch}
              onFilter={handleFilter}
              filters={filters}
              onLocationSearch={handleLocationSearch}
            />

            {/* Hospitals Grid */}
            {loading ? (
              <LoadingSpinner />
            ) : hospitals.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hospitals.map((hospital) => (
                    <HospitalCard
                      key={hospital._id}
                      hospital={hospital}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onViewDetails={handleViewDetails}
                      showActions={user.role === "owner"}
                    />
                  ))}
                </div>
                <Pagination />
              </>
            ) : (
              <EmptyState
                message="No hospitals found. Try adjusting your search criteria."
                actionText={user.role === "owner" ? "Add Hospital" : null}
                onAction={
                  user.role === "owner" ? () => setActiveTab("register") : null
                }
              />
            )}
          </div>
        )}

        {activeTab === "register" && user.role === "owner" && (
          <HospitalRegistrationForm
            onSuccess={handleHospitalSuccess}
            initialData={editingHospital}
            isEdit={!!editingHospital}
          />
        )}

        {/* Hospital Details Modal */}
        {showDetails && (
          <HospitalDetailsModal
            hospital={showDetails}
            onClose={() => setShowDetails(null)}
          />
        )}

        {/* Stats Footer */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">
                {hospitals.length}
              </div>
              <div className="text-gray-600">Hospitals Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">
                {hospitals.filter((h) => h.availability === "Available").length}
              </div>
              <div className="text-gray-600">Available Now</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {
                  Array.from(
                    new Set(hospitals.flatMap((h) => h.facilities || []))
                  ).length
                }
              </div>
              <div className="text-gray-600">Unique Facilities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600">
          <p>&copy; 2024 Hospital Management System. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="hover:text-blue-600">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-600">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-600">
              Contact Support
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HospitalApp;
