
import React from "react";
import { useEffect, useState } from "react";
import { getDoctors } from "../services/doctorService";

export default function DoctorListPage() {
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
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Doctors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doctors.map((doc) => (
          <div key={doc._id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">{doc.userId?.name}</h3>
            <p className="text-sm text-gray-600">{doc.userId?.email}</p>
            <p>Specialization: {doc.specialization}</p>
            <p>Experience: {doc.experience} years</p>
            <p>Location: {doc.location}</p>
            <p>Fee: ₹{doc.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
