

import Ambulance from "../models/Ambulnace/Ambulance.js";

// import Ambulance from "../models/Ambulance/Ambulance.js";

// @desc Register a new ambulance
// @route POST /api/ambulances
export const registerAmbulance = async (req, res) => {
  try {
    const {
      userId,
      driverName,
      phoneNumber,
      vehicleNumber,
      location,
      imageUrl,
    } = req.body;

    const ambulance = await Ambulance.create({
      userId,
      driverName,
      phoneNumber,
      vehicleNumber,
      location,
      imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Ambulance registered successfully",
      data: ambulance,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all ambulances
// @route GET /api/ambulances
export const getAmbulances = async (req, res) => {
  try {
    const ambulances = await Ambulance.find();
    res.status(200).json({ success: true, data: ambulances });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Find nearest ambulances
// @route GET /api/ambulances/nearest?lng=..&lat=..&distance=..
export const getNearestAmbulances = async (req, res) => {
  try {
    const { lng, lat, distance } = req.query;

    if (!lng || !lat) {
      return res
        .status(400)
        .json({ success: false, message: "Longitude and latitude required" });
    }

    const maxDistance = distance ? parseInt(distance) : 5000; // default 5km

    const ambulances = await Ambulance.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: maxDistance,
        },
      },
    });

    res.status(200).json({ success: true, data: ambulances });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update ambulance availability
// @route PUT /api/ambulances/:id
export const updateAmbulance = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const ambulance = await Ambulance.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!ambulance) {
      return res
        .status(404)
        .json({ success: false, message: "Ambulance not found" });
    }

    res.status(200).json({
      success: true,
      message: "Ambulance updated successfully",
      data: ambulance,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
