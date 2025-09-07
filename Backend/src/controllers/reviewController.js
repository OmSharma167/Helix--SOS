import Review from "../models/Review.js";
import Doctor from "../models/doctorModel/DoctorInformation.js";

// ✅ Add Review
export const addReview = async (req, res) => {
  try {
    const { doctorId, rating, reviewText } = req.body;

    const newReview = new Review({
      userId: req.user.id, // From JWT Auth
      doctorId,
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

// ✅ Get Reviews for a Doctor
export const getDoctorReviews = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const reviews = await Review.find({ doctorId })
      .populate("userId", "name email") // show user info
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reviews", error: error.message });
  }
};

// ✅ Get Average Rating of a Doctor
export const getDoctorRating = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const result = await Review.aggregate([
      { $match: { doctorId: new mongoose.Types.ObjectId(doctorId) } },
      {
        $group: {
          _id: "$doctorId",
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
