import express from "express";
import {
  createBooking,
  getMyBookings,
  getDoctorBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import Roles from "../enum/roles.js";

const router = express.Router();

// User creates booking
router.post("/", protect, authorizeRoles(Roles.USER), createBooking);

// User gets their own bookings
router.get("/my", protect, authorizeRoles(Roles.USER), getMyBookings);

// Doctor sees all their bookings
router.get("/doctor", protect, authorizeRoles(Roles.DOCTOR), getDoctorBookings);

// Doctor updates booking status
router.put(
  "/:id/status",
  protect,
  authorizeRoles(Roles.DOCTOR),
  updateBookingStatus
);

export default router;
