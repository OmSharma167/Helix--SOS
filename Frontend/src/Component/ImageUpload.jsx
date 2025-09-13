import React, { useState } from "react";

export default function ImageUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      await onUpload(file);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={handleChange} />
      <div className="flex items-center gap-2">
        <button
          onClick={handleUpload}
          className="px-3 py-1 bg-blue-600 text-white rounded"
          disabled={!file || uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {file && <span className="text-sm">{file.name}</span>}
      </div>
    </div>
  );
}
