import HospitalReview from "../models/HospitalReview.js";
import mongoose from "mongoose";

// ✅ Add Review
export const addHospitalReview = async (req, res) => {
  try {
    const { hospitalId, rating, reviewText } = req.body;

    const newReview = new HospitalReview({
      userId: req.user.id,
      hospitalId,
      rating,
      reviewText,
    });

    await newReview.save();

    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding review", error: error.message });
  }
};

// ✅ Get Reviews for a Hospital
export const getHospitalReviews = async (req, res) => {
  try {
    const { hospitalId } = req.params;

    const reviews = await HospitalReview.find({ hospitalId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reviews", error: error.message });
  }
};

// ✅ Get Average Rating of a Hospital
export const getHospitalRating = async (req, res) => {
  try {
    const { hospitalId } = req.params;

    const result = await HospitalReview.aggregate([
      { $match: { hospitalId: new mongoose.Types.ObjectId(hospitalId) } },
      {
        $group: {
          _id: "$hospitalId",
          avgRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(200).json({ avgRating: 0, totalReviews: 0 });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error calculating rating", error: error.message });
  }
};
