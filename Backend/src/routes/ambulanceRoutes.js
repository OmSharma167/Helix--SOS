import express from "express";
import {
  registerAmbulance,
  getAmbulances,
  getNearestAmbulances,
  updateAmbulance,
} from "../controllers/ambulanceController.js";

const router = express.Router();

router.post("/", registerAmbulance);
router.get("/", getAmbulances);
router.get("/nearest", getNearestAmbulances);
router.put("/:id", updateAmbulance);

export default router;
