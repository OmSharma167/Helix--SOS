import React, { useState } from "react";

function HospitalRegistrationForm() {
  const [formData, setFormData] = useState({
    hospitalName: "",
    address: "",
    contactNumber: "",
    email: "",
    registrationId: "",
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Hospital Registration</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="hospitalName"
            placeholder="Hospital Name"
            value={formData.hospitalName}
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
            placeholder="Hospital Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="registrationId"
            placeholder="Registration ID"
            value={formData.registrationId}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Register Hospital
          </button>
        </form>
      </div>
    </div>
  );
}

export default HospitalRegistrationForm;
