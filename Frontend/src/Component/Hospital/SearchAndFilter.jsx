

import React, { useState } from "react";
import { Search, Navigation } from "lucide-react";
import { getUserLocation } from "./HospitalAPI.js";

const SearchAndFilter = ({ onSearch, onFilter, filters, onLocationSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [localFilters, setLocalFilters] = useState(filters);
  const [locationLoading, setLocationLoading] = useState(false);

  const facilitiesOptions = [
    "Emergency Ward",
    "ICU",
    "Operation Theater",
    "X-Ray",
    "Pharmacy",
    "Blood Bank",
    "Ambulance Service",
    "Other",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilter(newFilters);
  };

  const handleNearMeClick = async () => {
    setLocationLoading(true);
    try {
      const location = await getUserLocation();
      onLocationSearch(location);
    } catch (error) {
      alert("Unable to get your location. Please enable location services.");
    } finally {
      setLocationLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <form onSubmit={handleSearch} className="flex gap-4 mb-4">
        <div className="flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search hospitals by name or location..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
        >
          <Search className="h-4 w-4" />
          <span>Search</span>
        </button>
        <button
          type="button"
          onClick={handleNearMeClick}
          disabled={locationLoading}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center space-x-2 disabled:opacity-50"
        >
          {locationLoading ? (
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <Navigation className="h-4 w-4" />
          )}
          <span>Near Me</span>
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Availability
          </label>
          <select
            value={localFilters.availability || ""}
            onChange={(e) => handleFilterChange("availability", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Hospitals</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Facilities
          </label>
          <select
            value={localFilters.facilities || ""}
            onChange={(e) => handleFilterChange("facilities", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Facilities</option>
            {facilitiesOptions.map((facility) => (
              <option key={facility} value={facility}>
                {facility}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Results per page
          </label>
          <select
            value={localFilters.limit || "10"}
            onChange={(e) => handleFilterChange("limit", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;