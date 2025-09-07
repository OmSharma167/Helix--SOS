import express from "express";
import {
  registerAmbulance,
  getNearestAmbulances,
} from "../controllers/ambulanceController.js";

const router = express.Router();

// Register ambulance
router.post("/register", registerAmbulance);

// Get nearest ambulances
router.get("/nearest", getNearestAmbulances);

export default router;
