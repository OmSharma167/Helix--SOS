// import React, { useState } from "react";
// import axios from "axios";

// export default function DoctorForm() {
//   const [formData, setFormData] = useState({
//     specialization: "",
//     qualifications: "",
//     experience: "",
//     location: "",
//     price: "",
//     timing: "",
//     bio: "",
//     certification: "",
//     language: "",
//     imageUrl: "",
//     socialMedia: "",
//     availability: true,
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post(
//         "http://localhost:5000/api/doctors/register",
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setMessage(res.data.message || "Doctor profile created successfully!");
//       setFormData({
//         specialization: "",
//         qualifications: "",
//         experience: "",
//         location: "",
//         price: "",
//         timing: "",
//         bio: "",
//         certification: "",
//         language: "",
//         imageUrl: "",
//         socialMedia: "",
//         availability: true,
//       });
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message || "Failed to create doctor profile"
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4 py-10">
//       <div className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-8">
//         <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
//           Doctor Registration
//         </h2>

//         {message && (
//           <p className="mb-4 text-center text-sm font-medium text-red-500">
//             {message}
//           </p>
//         )}

//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 gap-4"
//         >
//           <input
//             type="text"
//             name="specialization"
//             placeholder="Specialization"
//             value={formData.specialization}
//             onChange={handleChange}
//             className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
//             required
//           />
//           <input
//             type="text"
//             name="qualifications"
//             placeholder="Qualifications"
//             value={formData.qualifications}
//             onChange={handleChange}
//             className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
//             required
//           />
//           <input
//             type="number"
//             name="experience"
//             placeholder="Experience (years)"
//             value={formData.experience}
//             onChange={handleChange}
//             className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
//             required
//           />
//           <input
//             type="text"
//             name="location"
//             placeholder="Location"
//             value={formData.location}
//             onChange={handleChange}
//             className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
//             required
//           />
//           <input
//             type="number"
//             name="price"
//             placeholder="Consultation Fee"
//             value={formData.price}
//             onChange={handleChange}
//             className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
//           />
//           <input
//             type="text"
//             name="timing"
//             placeholder="Available Timing"
//             value={formData.timing}
//             onChange={handleChange}
//             className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
//           />
//           <input
//             type="text"
//             name="language"
//             placeholder="Languages (comma separated)"
//             value={formData.language}
//             onChange={handleChange}
//             className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
//           />
//           <input
//             type="text"
//             name="certification"
//             placeholder="Certifications"
//             value={formData.certification}
//             onChange={handleChange}
//             className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
//           />
//           <input
//             type="url"
//             name="imageUrl"
//             placeholder="Profile Image URL"
//             value={formData.imageUrl}
//             onChange={handleChange}
//             className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
//           />
//           <input
//             type="text"
//             name="socialMedia"
//             placeholder="Social Media Links"
//             value={formData.socialMedia}
//             onChange={handleChange}
//             className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
//           />

//           <div className="flex items-center col-span-1 md:col-span-2">
//             <input
//               type="checkbox"
//               name="availability"
//               checked={formData.availability}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <label className="text-gray-700">Available for consultation</label>
//           </div>

//           <textarea
//             name="bio"
//             placeholder="Write a short bio"
//             value={formData.bio}
//             onChange={handleChange}
//             className="col-span-1 md:col-span-2 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
//           ></textarea>

//           <button
//             type="submit"
//             className="col-span-1 md:col-span-2 w-full bg-indigo-600 text-white p-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
//           >
//             Submit Profile
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

//../services/doctorService

// src/components/DoctorForm.jsx
import React from "react";
import { useState } from "react";
import { registerDoctor } from "../../services/doctorService";
import { useAuth } from "../../context/AuthContext";

export default function DoctorForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    specialization: "",
    qualifications: "",
    experience: "",
    location: "",
    price: "",
    timing: "",
    bio: "",
    certification: "",
    language: "",
    imageUrl: "",
    socialMedia: "",
    availability: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerDoctor(formData, user?.token);
      setMessage("✅ Doctor profile created successfully!");
      console.log("Doctor created:", data);
    } catch (err) {
      setMessage("❌ Failed to register doctor: " + err.response?.data?.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">
        Doctor Profile Registration
      </h2>

      {message && <p className="mb-4 text-center text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="qualifications"
          placeholder="Qualifications"
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="experience"
          placeholder="Experience (years)"
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Consultation Fee"
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="timing"
          placeholder="Available Timings"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="language"
          placeholder="Languages (comma separated)"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="certification"
          placeholder="Certifications"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="socialMedia"
          placeholder="Social Media Links"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="availability"
          placeholder="Availability (e.g. Mon-Fri)"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Profile Image URL"
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />
        <textarea
          name="bio"
          placeholder="Short Bio"
          rows="3"
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />

        <button
          type="submit"
          className="col-span-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Register Profile
        </button>
      </form>
    </div>
  );
}
