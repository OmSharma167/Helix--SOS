

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Building2 } from "lucide-react";
import {
  registerHospital,
  updateHospital,
  getUserLocation,
} from "./HospitalAPI.js";

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
    location: { type: "Point", coordinates: [0, 0] },
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
        location: initialData.location || {
          type: "Point",
          coordinates: [0, 0],
        },
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
    else if (!/^https?:\/\//.test(formData.imageUrl))
      newErrors.imageUrl = "Main image must be a valid URL";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    formData.gallery.forEach((url, index) => {
      if (url && !/^https?:\/\//.test(url)) {
        newErrors[`gallery${index}`] = `Gallery image ${
          index + 1
        } must be a valid URL`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    try {
      let submitData = { ...formData };
      if (!isEdit) {
        try {
          const location = await getUserLocation();
          submitData = {
            ...submitData,
            gallery: formData.gallery.filter((url) => url.trim()),
            location: {
              type: "Point",
              coordinates: [location.longitude, location.latitude],
            },
          };
        } catch (geoError) {
          setErrors({
            submit: "Failed to get location. Please enable geolocation.",
          });
          setLoading(false);
          return;
        }
      } else {
        submitData = {
          ...submitData,
          gallery: formData.gallery.filter((url) => url.trim()),
        };
      }

      console.log("Submitting hospital data:", submitData);
      const result = isEdit
        ? await updateHospital(initialData._id, submitData)
        : await registerHospital(submitData);

      if (result.success) {
        onSuccess(result.data.hospital);
      } else {
        setErrors({
          submit: result.message || "Failed to save hospital details",
        });
      }
    } catch (error) {
      setErrors({ submit: error.message || "Failed to save hospital details" });
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
              {errors[`gallery${index}`] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`gallery${index}`]}
                </p>
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

export default HospitalRegistrationForm;