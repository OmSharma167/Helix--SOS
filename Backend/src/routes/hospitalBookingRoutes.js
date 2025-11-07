import express from "express";
import {
  createHospitalBooking,
  getUserBookings,
  getHospitalBookings,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/hospitalBookingController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import Roles from "../enum/roles.js";

const router = express.Router();

// ✅ User creates booking
router.post(
  "/book",
  protect,
  authorizeRoles(Roles.USER),
  createHospitalBooking
);

// ✅ Get user bookings
router.get(
  "/my-bookings",
  protect,
  authorizeRoles(Roles.USER),
  getUserBookings
);

// ✅ Hospital gets its bookings
router.get(
  "/hospital/:hospitalId",
  protect,
  authorizeRoles(Roles.HOSPITAL),
  getHospitalBookings
);

// ✅ Hospital updates booking status
router.put(
  "/status/:bookingId",
  protect,
  authorizeRoles(Roles.HOSPITAL),
  updateBookingStatus
);

// ✅ User cancels booking
router.delete(
  "/cancel/:bookingId",
  protect,
  authorizeRoles(Roles.USER),
  deleteBooking
);

export default router;
