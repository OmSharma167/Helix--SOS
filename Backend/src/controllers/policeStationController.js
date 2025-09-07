import PoliceStation from "../models/PoliceStation/PoliceStation.js";
import Emergency from "../models/Emergency/Emergency.js";

// 1. Register new police station
export const registerPoliceStation = async (req, res) => {
  try {
    const { name, stationCode, contactNumber, address, location, imageUrl } =
      req.body;

    const policeStation = await PoliceStation.create({
      name,
      stationCode,
      contactNumber,
      address,
      location,
      imageUrl,
    });

    res.status(201).json({
      message: "🚓 Police station registered successfully",
      policeStation,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 2. Get all police stations
export const getAllPoliceStations = async (req, res) => {
  try {
    const stations = await PoliceStation.find().populate("emergenciesAssigned");
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Get police station by ID
export const getPoliceStationById = async (req, res) => {
  try {
    const station = await PoliceStation.findById(req.params.id).populate(
      "emergenciesAssigned"
    );

    if (!station) {
      return res.status(404).json({ message: "Police station not found" });
    }

    res.status(200).json(station);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Find nearest police stations
export const findNearestPoliceStations = async (req, res) => {
  try {
    const { longitude, latitude } = req.query;

    if (!longitude || !latitude) {
      return res
        .status(400)
        .json({ message: "Longitude & Latitude are required" });
    }

    const stations = await PoliceStation.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: 5000, // 5 km range
        },
      },
      availability: "Available",
    });

    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Update police station availability/status
export const updatePoliceStationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { availability } = req.body;

    const station = await PoliceStation.findById(id);
    if (!station) {
      return res.status(404).json({ message: "Police station not found" });
    }

    station.availability = availability || station.availability;
    await station.save();

    res.status(200).json({
      message: "Police station status updated ✅",
      station,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
