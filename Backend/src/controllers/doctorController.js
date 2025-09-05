import Doctor from "../models/doctorModel/DoctorInformation.js";
import User from "../models/User/User.js";

// @desc Register doctor profile
// @route POST /api/doctors/register
export const registerDoctor = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      specialization,
      qualifications,
      experience,
      location,
      price,
      timing,
      bio,
      certification,
      language,
      imageUrl,
      socialMedia,
      availability,
    } = req.body;

    const existing = await Doctor.findOne({ userId });
    if (existing)
      return res.status(400).json({ message: "Doctor profile already exists" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const doctor = await Doctor.create({
      userId,
      specialization,
      qualifications,
      experience,
      location,
      price,
      timing,
      bio,
      certification,
      language,
      imageUrl,
      socialMedia,
      availability,
    });

    res.status(201).json({
      message: "Doctor profile created",
      doctor: { ...doctor._doc, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Doctor Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get all doctors
// @route GET /api/doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("userId", "name email");
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
};
