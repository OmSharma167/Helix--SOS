import express from "express";
import {
  registerDoctor,
  getAllDoctors,
} from "../controllers/doctorController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import Roles from "../enum/roles.js";

const router = express.Router();

// Only a Doctor role can register doctor profile
// router.post("/register", protect, authorizeRoles(Roles.DOCTOR), registerDoctor);

router.post("/register", protect, authorizeRoles(Roles.DOCTOR), registerDoctor);

//protect,
// Anyone logged in can view doctors
router.get("/", getAllDoctors);
export default router;
