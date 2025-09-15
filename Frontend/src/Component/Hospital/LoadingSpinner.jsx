import React from "react";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
  </div>
);

export default LoadingSpinner;
