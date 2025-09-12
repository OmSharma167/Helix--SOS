import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; // axios instance
import { uploadToCloudinary } from "../utils/cloudinary"

const RegisterAmbulance = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    driverName: "",
    phoneNumber: "",
    vehicleNumber: "",
    location: { type: "Point", coordinates: [0, 0] },
    imageUrl: "",
  });

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  // handle longitude / latitude
  const handleCoords = (e) => {
    const { name, value } = e.target;
    const coord = parseFloat(value || 0);
    setForm((s) => {
      const coords = [...s.location.coordinates];
      if (name === "lng") coords[0] = coord;
      if (name === "lat") coords[1] = coord;
      return { ...s, location: { type: "Point", coordinates: coords } };
    });
  };

  // image upload
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const res = await uploadToCloudinary(file);
    setForm((s) => ({ ...s, imageUrl: res.secure_url }));
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      const { data } = await api.post("/ambulances", payload);
      navigate("/ambulances"); // redirect after success
    } catch (err) {
      console.error(err);
      alert("Failed to register ambulance");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">Register Ambulance</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <div>
          <label className="block text-sm">Driver name</label>
          <input
            name="driverName"
            value={form.driverName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm">Phone</label>
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm">Vehicle number</label>
          <input
            name="vehicleNumber"
            value={form.vehicleNumber}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm">Longitude</label>
            <input
              name="lng"
              type="number"
              step="0.000001"
              onChange={handleCoords}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Latitude</label>
            <input
              name="lat"
              type="number"
              step="0.000001"
              onChange={handleCoords}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="w-full"
          />
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="ambulance"
              className="mt-2 h-32 rounded object-cover"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterAmbulance;
