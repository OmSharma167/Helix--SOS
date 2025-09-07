import Ambulance from "../models/Ambulnace/Ambulance.js";

// Register new ambulance service
export const registerAmbulance = async (req, res) => {
  try {
    const ambulance = await Ambulance.create(req.body);
    res.status(201).json(ambulance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Find nearest ambulances by user location
export const getNearestAmbulances = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 5000 } = req.query; // 5km default

    if (!longitude || !latitude) {
      return res.status(400).json({ message: "Longitude & Latitude required" });
    }

    const ambulances = await Ambulance.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseInt(maxDistance),
        },
      },
      availability: "Available",
    });

    res.status(200).json(ambulances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
