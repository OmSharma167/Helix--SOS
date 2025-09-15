import React from "react";
import { Building2 } from "lucide-react";

const EmptyState = ({ message, actionText, onAction }) => (
  <div className="text-center py-12">
    <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <p className="text-gray-600 mb-4">{message}</p>
    {actionText && onAction && (
      <button
        onClick={onAction}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        {actionText}
      </button>
    )}
  </div>
);

export default EmptyState;
