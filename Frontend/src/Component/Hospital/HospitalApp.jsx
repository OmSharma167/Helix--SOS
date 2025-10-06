
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import HospitalCard from "./HospitalCard";
import HospitalDetailsModal from "./HospitalDetailsModal";
import HospitalRegistrationForm from "./HospitalRegistrationForm";
import SearchAndFilter from "./SearchAndFilter";
import AuthSection from "../../context/AuthSection"; // Updated import path
import NavigationTabs from "./NavigationTabs";
import Pagination from "./Pagination";
import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";
import { getAllHospitals, getNearestHospitals } from "./HospitalAPI.js";
import HospitalLandingPage from "./HospitalLandingPage.jsx";

const HospitalApp = () => {
  const { user, loading: authLoading } = useAuth(); // Added authLoading
  const [activeTab, setActiveTab] = useState("browse");
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [editingHospital, setEditingHospital] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({ current: 1, total: 1 });

  // Load hospitals
  const loadHospitals = async (params = {}) => {
    setLoading(true);
    try {
      const result = await getAllHospitals(params);
      if (result.success) {
        setHospitals(result.data.hospitals);
        setPagination(result.data.pagination);
      }
    } catch (error) {
      console.error("Failed to load hospitals:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load nearest hospitals
  const loadNearestHospitals = async (location) => {
    setLoading(true);
    try {
      const result = await getNearestHospitals(
        location.latitude,
        location.longitude,
        100000
      );
      if (result.success) {
        setHospitals(result.data.hospitals);
        setPagination({ current: 1, total: 1 });
      }
    } catch (error) {
      console.error("Failed to load nearest hospitals:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    const params = { ...filters, search: searchTerm, page: 1 };
    loadHospitals(params);
  };

  // Handle filters
  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    const params = { ...newFilters, page: 1 };
    loadHospitals(params);
  };

  // Handle location search
  const handleLocationSearch = (location) => {
    loadNearestHospitals(location);
  };

  // Handle hospital registration/update success
  const handleHospitalSuccess = (hospital) => {
    if (editingHospital) {
      setHospitals((prev) =>
        prev.map((h) => (h._id === hospital._id ? hospital : h))
      );
      setEditingHospital(null);
    } else {
      setHospitals((prev) => [hospital, ...prev]);
    }
    setActiveTab("browse");
  };

  // Handle hospital edit
  const handleEdit = (hospital) => {
    setEditingHospital(hospital);
    setActiveTab("register");
  };

  // Handle hospital delete
  const handleDelete = (hospitalId) => {
    setHospitals((prev) => prev.filter((h) => h._id !== hospitalId));
  };

  // Handle view details
  const handleViewDetails = (hospital) => {
    setShowDetails(hospital);
  };

  // Load initial data
  useEffect(() => {
    loadHospitals();
  }, []);

  // Show loading spinner while auth is loading
  if (authLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen  bg-gray-100">
      <HospitalLandingPage/>
      <div className="container mx-auto px-4 py-8">
        

        {/* <AuthSection /> */}
        {/* <NavigationTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={user}
          editingHospital={editingHospital}
        /> */}

        {activeTab === "browse" && (
          <div>
            <SearchAndFilter
              onSearch={handleSearch}
              onFilter={handleFilter}
              filters={filters}
              onLocationSearch={handleLocationSearch}
            />
            {loading ? (
              <LoadingSpinner />
            ) : hospitals.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hospitals.map((hospital) => (
                    <HospitalCard
                      key={hospital._id}
                      hospital={hospital}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onViewDetails={handleViewDetails}
                      showActions={user && user.role === 4} // Updated to numeric role
                    />
                  ))}
                </div>
                <Pagination
                  pagination={pagination}
                  filters={filters}
                  loadHospitals={loadHospitals}
                />
              </>
            ) : (
              <EmptyState
                message="No hospitals found. Try adjusting your search criteria."
                actionText={user && user.role === 4 ? "Add Hospital" : null}
                onAction={
                  user && user.role === 4
                    ? () => setActiveTab("register")
                    : null
                }
              />
            )}
          </div>
        )}

        {activeTab === "register" && user && user.role === 4 && (
          <HospitalRegistrationForm
            onSuccess={handleHospitalSuccess}
            initialData={editingHospital}
            isEdit={!!editingHospital}
          />
        )}

        {showDetails && (
          <HospitalDetailsModal
            hospital={showDetails}
            onClose={() => setShowDetails(null)}
          />
        )}

        {/* <StatsFooter hospitals={hospitals} /> */}
      </div>
    </div>
  );
};

export default HospitalApp;



