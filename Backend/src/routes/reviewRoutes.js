import express from "express";
import {
  addReview,
  getDoctorReviews,
  getDoctorRating,
} from "../controllers/reviewController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/reviews/add
router.post("/add", authMiddleware, addReview);

// GET /api/reviews/doctor/:doctorId
router.get("/doctor/:doctorId", getDoctorReviews);

// GET /api/reviews/rating/:doctorId
router.get("/rating/:doctorId", getDoctorRating);

export default router;
