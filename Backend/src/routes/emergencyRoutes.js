import express from "express";
import {
  raiseEmergency,
  getAllEmergencies,
  getEmergencyById,
  assignServiceProvider,
  updateEmergencyStatus,
} from "../controllers/emergencyController.js";

const router = express.Router();

// Raise new emergency
router.post("/raise", raiseEmergency);

// Get all emergencies
router.get("/", getAllEmergencies);

// Get emergency by ID
router.get("/:id", getEmergencyById);

// Assign service provider
router.put("/:emergencyId/assign", assignServiceProvider);

// Update emergency status
router.put("/:emergencyId/status", updateEmergencyStatus);

export default router;
