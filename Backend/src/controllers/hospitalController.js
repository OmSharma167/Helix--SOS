import Hospital from "../models/Hospital/Hospital.js";

// 1. Register a hospital
export const registerHospital = async (req, res) => {
  try {
    const {
      name,
      contactNumber,
      email,
      address,
      location,
      facilities,
      ambulances,
      imageUrl,
      gallery,
    } = req.body;

    const hospital = await Hospital.create({
      name,
      contactNumber,
      email,
      address,
      location,
      facilities,
      ambulances,
      imageUrl,
      gallery,
    });

    res.status(201).json({
      message: "🏥 Hospital registered successfully",
      hospital,
    });
  } catch (error) {
    console.error("Hospital Register Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// 2. Get all hospitals
export const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find().populate("ambulances");
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch hospitals" });
  }
};

// 3. Get hospital by ID
export const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id).populate(
      "ambulances"
    );

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    res.status(200).json(hospital);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Find nearest hospitals
export const findNearestHospitals = async (req, res) => {
  try {
    const { longitude, latitude } = req.query;

    if (!longitude || !latitude) {
      return res
        .status(400)
        .json({ message: "Longitude & Latitude are required" });
    }

    const hospitals = await Hospital.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: 10000, // within 10 km
        },
      },
      availability: "Available",
    });

    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Update hospital availability
export const updateHospitalAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { availability } = req.body;

    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    hospital.availability = availability || hospital.availability;
    await hospital.save();

    res.status(200).json({
      message: "Hospital availability updated ✅",
      hospital,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
