


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
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes (for emergency services)
router.get("/nearest", findNearestAmbulances);
router.get("/all", getAllAmbulances);
router.get("/:id", getAmbulanceById);

// Protected routes
router.post("/register", protect, registerAmbulance);
router.put("/:id/location", protect, updateAmbulanceLocation);
router.put("/:id/availability", protect, updateAmbulanceAvailability);
router.put("/:id", protect, updateAmbulance);
router.delete("/:id", protect, deleteAmbulance);
router.get("/user/:userId", protect, getAmbulanceByUserId);

export default router;

