import express from "express";
import {
  createHospitalBooking,
  getUserBookings,
  getHospitalBookings,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/hospitalBookingController.js";

import authenticate from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";
import Roles from "../enum/roles.js";

const router = express.Router();

// ✅ User creates booking
router.post(
  "/book",
  authenticate,
  authorizeRoles(Roles.USER),
  createHospitalBooking
);

// ✅ Get user bookings
router.get(
  "/my-bookings",
  authenticate,
  authorizeRoles(Roles.USER),
  getUserBookings
);

// ✅ Hospital gets its bookings
router.get(
  "/hospital/:hospitalId",
  authenticate,
  authorizeRoles(Roles.HOSPITAL),
  getHospitalBookings
);

// ✅ Hospital updates booking status
router.put(
  "/status/:bookingId",
  authenticate,
  authorizeRoles(Roles.HOSPITAL),
  updateBookingStatus
);

// ✅ User cancels booking
router.delete(
  "/cancel/:bookingId",
  authenticate,
  authorizeRoles(Roles.USER),
  deleteBooking
);

export default router;
