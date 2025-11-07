

import React, { useEffect, useState } from "react";
import {
  Star,
  Filter,
  Stethoscope,
  Heart,
  Brain,
  Eye,
  Baby,
  Bone,
  Activity
} from "lucide-react";
import { getDoctors } from "../../../services/doctorService";
import { useNavigate } from "react-router-dom";

const DoctorsSection = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const navigate = useNavigate();

  // Specializations with icons
  const specializations = [
    { id: "all", name: "All Doctors", icon: Stethoscope, count: 0 },
    { id: "cardiology", name: "Cardiology", icon: Heart, count: 0 },
    { id: "neurology", name: "Neurology", icon: Brain, count: 0 },
    { id: "ophthalmology", name: "Ophthalmology", icon: Eye, count: 0 },
    { id: "pediatrics", name: "Pediatrics", icon: Baby, count: 0 },
    { id: "orthopedics", name: "Orthopedics", icon: Bone, count: 0 },
    { id: "dentistry", name: "Dentistry", icon: Activity, count: 0 },
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getDoctors();
        setDoctors(res);
        setFilteredDoctors(res);

        // Update counts for each specialization
        const updatedSpecializations = specializations.map((spec) => ({
          ...spec,
          count:
            spec.id === "all"
              ? res.length
              : res.filter(
                  (doc) =>
                    doc.specialization?.toLowerCase() === spec.id.toLowerCase()
                ).length,
        }));

        // Update the specializations array (you might want to set this to state if you want reactive counts)
        specializations.forEach((spec, index) => {
          specializations[index].count = updatedSpecializations[index].count;
        });
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleFilter = (specialization) => {
    setSelectedSpecialization(specialization);

    if (specialization === "all") {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter((doc) =>
        doc.specialization?.toLowerCase().includes(specialization.toLowerCase())
      );
      setFilteredDoctors(filtered);
    }
  };

  if (loading) {
    return (
      <p className="text-center text-lg text-gray-600 py-20">
        Loading doctors...
      </p>
    );
  }

  return (
    <section id="doctors" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Our Doctors
          </h2>
          <p className="text-xl text-gray-600">
            Certified healthcare professionals ready to help you
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Filter className="h-5 w-5 text-teal-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              Filter by Specialization
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {specializations.map((spec) => {
              const IconComponent = spec.icon;
              return (
                <button
                  key={spec.id}
                  onClick={() => handleFilter(spec.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 ${
                    selectedSpecialization === spec.id
                      ? "bg-teal-600 text-white border-teal-600 shadow-md"
                      : "bg-white text-gray-700 border-gray-300 hover:border-teal-400 hover:shadow-sm"
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="font-medium">{spec.name}</span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      selectedSpecialization === spec.id
                        ? "bg-teal-500 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {spec.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 text-center">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-teal-600">
              {filteredDoctors.length}
            </span>
            {filteredDoctors.length === 1 ? " doctor" : " doctors"}
            {selectedSpecialization !== "all" && (
              <span>
                {" "}
                in{" "}
                <span className="font-semibold text-teal-600">
                  {
                    specializations.find((s) => s.id === selectedSpecialization)
                      ?.name
                  }
                </span>
              </span>
            )}
          </p>
        </div>

        {/* Doctor Cards */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-sm">
              <Stethoscope className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Doctors Found
              </h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any doctors matching your selected
                specialization.
              </p>
              <button
                onClick={() => handleFilter("all")}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                View All Doctors
              </button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doc) => (
              <div
                key={doc._id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]"
              >
                <img
                  src={
                    doc.imageUrl ||
                    "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=600"
                  }
                  alt={doc.userId?.name || "Doctor"}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">
                    {doc.userId?.name || "Dr. Unknown"}
                  </h3>
                  <p className="text-teal-600 mb-3 truncate">
                    {doc.specialization || "General Practitioner"}
                  </p>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {doc.description ||
                      "Providing quality healthcare and professional advice."}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{doc.rating || "4.8"}</span>
                    <span className="text-gray-600 text-sm">(verified)</span>
                  </div>

                  <button
                    onClick={() => navigate(`/book-doctor/${doc._id}`)}
                    className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorsSection;