

import React from "react";
import { Search, Plus } from "lucide-react";

const NavigationTabs = ({ activeTab, setActiveTab, user, editingHospital }) => (
  <div className="bg-white rounded-lg shadow-md mb-6">
    <div className="flex border-b">
      <button
        onClick={() => setActiveTab("browse")}
        className={`flex-1 py-4 px-6 text-center font-medium ${
          activeTab === "browse"
            ? "border-b-2 border-blue-600 text-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <div className="flex items-center justify-center space-x-2">
          <Search className="h-4 w-4" />
          <span>Browse Hospitals</span>
        </div>
      </button>
      {user && user.role === 4 && (
        <button
          onClick={() => {
            setActiveTab("register");
            editingHospital && setEditingHospital(null);
          }}
          className={`flex-1 py-4 px-6 text-center font-medium ${
            activeTab === "register"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>{editingHospital ? "Edit Hospital" : "Add Hospital"}</span>
          </div>
        </button>
      )}
    </div>
  </div>
);

export default NavigationTabs;