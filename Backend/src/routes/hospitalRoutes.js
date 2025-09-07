import express from "express";
import {
  registerHospital,
  getAllHospitals,
  getHospitalById,
  findNearestHospitals,
  updateHospitalAvailability,
} from "../controllers/hospitalController.js";

const router = express.Router();

// Register a hospital
router.post("/register", registerHospital);

// Get all hospitals
router.get("/", getAllHospitals);

// Get hospital by ID
router.get("/:id", getHospitalById);

// Find nearest hospitals
router.get("/nearest/search", findNearestHospitals);

// Update hospital availability
router.put("/:id/availability", updateHospitalAvailability);

export default router;
