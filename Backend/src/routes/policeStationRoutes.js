import express from "express";
import {
  registerPoliceStation,
  getAllPoliceStations,
  getPoliceStationById,
  findNearestPoliceStations,
  updatePoliceStationStatus,
} from "../controllers/policeStationController.js";

const router = express.Router();

// Register new police station
router.post("/register", registerPoliceStation);

// Get all police stations
router.get("/", getAllPoliceStations);

// Get police station by ID
router.get("/:id", getPoliceStationById);

// Find nearest police stations (based on location)
router.get("/nearest/search", findNearestPoliceStations);

// Update status (Available, Busy, Closed)
router.put("/:id/status", updatePoliceStationStatus);

export default router;
