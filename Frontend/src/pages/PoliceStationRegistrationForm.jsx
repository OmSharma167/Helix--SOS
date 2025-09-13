import React, { useState } from "react";

function PoliceStationRegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    stationCode: "",
    contactNumber: "",
    address: "",
    location: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Police Station Registered:", formData);
    alert("Police Station registered successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 to-blue-300 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-700 mb-2 text-center">
          Police Station Registration
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Secure your community with HelixSOS.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Station Name" value={formData.name} onChange={handleChange} required className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none" />
          <input type="text" name="stationCode" placeholder="Station Code" value={formData.stationCode} onChange={handleChange} required className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none" />
          <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} required className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none" />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none" />
          <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none" />
          <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none" />

          <button type="submit" className="w-full bg-indigo-600 text-white font-semibold p-3 rounded-xl hover:bg-indigo-700 transition">
            Register Police Station
          </button>
        </form>
      </div>
    </div>
  );
}

export default PoliceStationRegistrationForm;
