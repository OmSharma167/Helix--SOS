import streamifier from "streamifier";
import cloudinary from "../config/cloudinaryConfig.js";
import Image from "../models/Image.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const buffer = req.file.buffer;

    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "uploads" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });

    const result = await streamUpload();

    // Save to MongoDB
    const image = await Image.create({
      url: result.secure_url,
      public_id: result.public_id,
    });

    res.json(image);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
};
