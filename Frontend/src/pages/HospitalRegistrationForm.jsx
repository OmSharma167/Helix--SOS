import React, { useState } from "react";

function HospitalRegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    address: "",
    location: "",
    facilities: "",
    ambulances: "",
    imageUrl: "",
    gallery: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hospital Registered:", formData);
    alert("Hospital registered successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 to-blue-300 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-700 mb-2 text-center">
          Hospital Registration
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Register your hospital with HelixSOS.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Hospital Name" value={formData.name} onChange={handleChange} required className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none" />
          <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} required className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none" />
          <input type="email" name="email" placeholder="Hospital Email" value={formData.email} onChange={handleChange} required className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none" />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none" />
          <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none" />
          <input type="text" name="facilities" placeholder="Facilities (comma separated)" value={formData.facilities} onChange={handleChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none" />
          <input type="number" name="ambulances" placeholder="Number of Ambulances" value={formData.ambulances} onChange={handleChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none" />
          <input type="text" name="imageUrl" placeholder="Main Image URL" value={formData.imageUrl} onChange={handleChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none" />
          <input type="text" name="gallery" placeholder="Gallery Images (comma separated)" value={formData.gallery} onChange={handleChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none" />

          <button type="submit" className="w-full bg-indigo-600 text-white font-semibold p-3 rounded-xl hover:bg-indigo-700 transition">
            Register Hospital
          </button>
        </form>
      </div>
    </div>
  );
}

export default HospitalRegistrationForm;
