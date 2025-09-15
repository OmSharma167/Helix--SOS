// import express from "express";
// import {
//   registerAmbulance,
//   getAmbulances,
//   getNearestAmbulances,
//   updateAmbulance,
// } from "../controllers/ambulanceController.js";

// const router = express.Router();

// router.post("/", registerAmbulance);
// router.get("/", getAmbulances);
// router.get("/nearest", getNearestAmbulances);
// router.put("/:id", updateAmbulance);

// export default router;


// routes/userRoutes.js





// routes/ambulanceRoutes.js
import express from "express";
import {
  registerAmbulance,
  getAllAmbulances,
  getAmbulanceById,
  findNearestAmbulances,
  updateAmbulanceLocation,
  updateAmbulanceAvailability,
  updateAmbulance,
  deleteAmbulance,
  getAmbulanceByUserId
} from "../controllers/ambulanceController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes (for emergency services)
router.get("/nearest", findNearestAmbulances);
router.get("/all", getAllAmbulances);
router.get("/:id", getAmbulanceById);

// Protected routes
router.post("/register", authMiddleware, registerAmbulance);
router.put("/:id/location", authMiddleware, updateAmbulanceLocation);
router.put("/:id/availability", authMiddleware, updateAmbulanceAvailability);
router.put("/:id", authMiddleware, updateAmbulance);
router.delete("/:id", authMiddleware, deleteAmbulance);
router.get("/user/:userId", authMiddleware, getAmbulanceByUserId);

export default router;

