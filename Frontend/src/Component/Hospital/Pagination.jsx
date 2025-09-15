import React from "react";

const Pagination = ({ pagination, filters, loadHospitals }) => {
  if (pagination.total <= 1) return null;

  const pages = Array.from({ length: pagination.total }, (_, i) => i + 1);

  return (
    <div className="flex justify-center space-x-2 mt-6">
      <button
        onClick={() => {
          if (pagination.current > 1) {
            const params = { ...filters, page: pagination.current - 1 };
            loadHospitals(params);
          }
        }}
        disabled={pagination.current === 1}
        className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50"
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => {
            const params = { ...filters, page };
            loadHospitals(params);
          }}
          className={`px-3 py-2 border rounded-md ${
            page === pagination.current
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-300 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => {
          if (pagination.current < pagination.total) {
            const params = { ...filters, page: pagination.current + 1 };
            loadHospitals(params);
          }
        }}
        disabled={pagination.current === pagination.total}
        className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
