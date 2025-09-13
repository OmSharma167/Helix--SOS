// import express from "express";
// import { upload } from "../middleware/multer.middleware.js";
// import { uploadOnCloudinary } from "../config/cloudinary.js";

// const router = express.Router();

// // POST /api/upload
// // router.post("/", upload.single("image"), async (req, res) => {
// //   try {
// //     const localFilePath = req.file.path;
// //     const cloudinaryUrl = await uploadOnCloudinary(localFilePath);

// //     if (!cloudinaryUrl) {
// //       return res.status(500).json({ message: "Upload failed" });
// //     }

// //     res.json({ imageUrl: cloudinaryUrl });
// //   } catch (error) {
// //     console.error("Upload API Error:", error);
// //     res.status(500).json({ message: "Something went wrong" });
// //   }
// // });
// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     console.log("➡️ File received from frontend:", req.file);

//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const localFilePath = req.file.path;
//     console.log("➡️ Local file path:", localFilePath);

//     const cloudinaryUrl = await uploadOnCloudinary(localFilePath);

//     if (!cloudinaryUrl) {
//       return res.status(500).json({ message: "Cloudinary upload failed" });
//     }

//     res.json({ imageUrl: cloudinaryUrl });
//   } catch (error) {
//     console.error("❌ Upload API Error:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });

// export default router;



import express from "express";
import { uploadImage } from "../controllers/uploadController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", upload.single("image"), uploadImage);

export default router;
