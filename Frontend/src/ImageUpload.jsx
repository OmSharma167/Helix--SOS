import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select an image first!");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUploadedUrl(res.data.url);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Image</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
        />

        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="preview"
              className="w-full h-48 object-cover rounded-lg shadow"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium"
        >
          Upload
        </button>
      </form>

      {uploadedUrl && (
        <div className="mt-4">
          <p className="text-green-600 font-medium">Uploaded Successfully!</p>
          <img
            src={uploadedUrl}
            alt="uploaded"
            className="w-full h-48 object-cover rounded-lg shadow mt-2"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
