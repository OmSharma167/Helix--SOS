
// import React from "react";
// import { useEffect, useState } from "react";
// import { getDoctors } from "../services/doctorService";

// export default function DoctorListPage() {
//   const [doctors, setDoctors] = useState([]);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const data = await getDoctors();
//         setDoctors(data);
//       } catch (err) {
//         console.error("Error fetching doctors:", err);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h2 className="text-2xl font-bold text-indigo-600 mb-4">Doctors</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {doctors.map((doc) => (
//           <div key={doc._id} className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-lg font-bold">{doc.userId?.name}</h3>
//             <p className="text-sm text-gray-600">{doc.userId?.email}</p>
//             <p>Specialization: {doc.specialization}</p>
//             <p>Experience: {doc.experience} years</p>
//             <p>Location: {doc.location}</p>
//             <p>Fee: ₹{doc.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { getDoctors } from "../services/doctorService";
import { useNavigate } from "react-router-dom";

export default function DoctorListPage() {
    const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">Doctors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            {/* Doctor Image */}
            {doc.imageUrl && (
              <img
                src={doc.imageUrl}
                alt={doc.userId?.name}
                className="w-24 h-24 rounded-full object-cover mb-4 mx-auto"
              />
            )}

            {/* Basic Info */}
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              {doc.userId?.name}
            </h3>
            <p className="text-sm text-gray-500 text-center mb-3">
              {doc.userId?.email}
            </p>

            {/* Details */}
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">Specialization:</span>{" "}
                {doc.specialization}
              </p>
              <p>
                <span className="font-medium">Qualifications:</span>{" "}
                {doc.qualifications?.join(", ")}
              </p>
              <p>
                <span className="font-medium">Experience:</span>{" "}
                {doc.experience} years
              </p>
              <p>
                <span className="font-medium">Location:</span> {doc.location}
              </p>
              <p>
                <span className="font-medium">Fee:</span> ₹{doc.price}
              </p>
              <p>
                <span className="font-medium">Timing:</span> {doc.timing}
              </p>
              <p>
                <span className="font-medium">Languages:</span> {doc.language}
              </p>
              <p>
                <span className="font-medium">Certification:</span>{" "}
                {doc.certification}
              </p>
              <p>
                <span className="font-medium">Availability:</span>{" "}
                <span
                  className={
                    doc.availability === "Available" ||
                    doc.availability === true
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {doc.availability === true ? "Available" : doc.availability}
                </span>
              </p>
            </div>

            {/* Bio */}
            {doc.bio && (
              <p className="mt-4 text-gray-600 text-sm border-t pt-3">
                {doc.bio}
              </p>
            )}

            <button
              onClick={() => navigate(`/book-doctor/${doc._id}`)}
              className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Book Appointment
            </button>

            {/* Social Media */}
            {doc.socialMedia && (
              <a
                href={doc.socialMedia}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-indigo-600 text-sm font-medium hover:underline"
              >
                Connect on Social Media
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
