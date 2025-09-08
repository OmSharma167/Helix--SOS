import React, { useState } from "react";

function PoliceStationRegistrationForm() {
  const [formData, setFormData] = useState({
    stationName: "",
    address: "",
    contactNumber: "",
    email: "",
    stationCode: "",
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Police Station Registration</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="stationName"
            placeholder="Station Name"
            value={formData.stationName}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="stationCode"
            placeholder="Station Code"
            value={formData.stationCode}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Register Police Station
          </button>
        </form>
      </div>
    </div>
  );
}

export default PoliceStationRegistrationForm;
