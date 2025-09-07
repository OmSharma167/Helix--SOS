import express from "express";
import {
  addHospitalReview,
  getHospitalReviews,
  getHospitalRating,
} from "../controllers/hospitalReviewController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/hospital-reviews/add
router.post("/add", authMiddleware, addHospitalReview);

// GET /api/hospital-reviews/hospital/:hospitalId
router.get("/hospital/:hospitalId", getHospitalReviews);

// GET /api/hospital-reviews/rating/:hospitalId
router.get("/rating/:hospitalId", getHospitalRating);

export default router;
