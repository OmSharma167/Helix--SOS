import Emergency from "../models/Emergency/Emergency.js";
import Ambulance from "../models/Ambulnace/Ambulance.js";
import Doctor from "../models/doctorModel/DoctorInformation.js";
import User from "../models/User/User.js";
// 👉 Add Police, Hospital models if you have them

// 1. Raise a new emergency
export const raiseEmergency = async (req, res) => {
  try {
    const { userId, emergencyType, description, location, servicesRequired } =
      req.body;

    const emergency = await Emergency.create({
      userId,
      emergencyType,
      description,
      location,
      servicesRequired,
    });

    res.status(201).json({
      message: "Emergency raised successfully 🚨",
      emergency,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 2. Get all emergencies (Admin/Service Providers can see)
export const getAllEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find()
      .populate("userId", "name email")
      .populate("assignedServiceProviders.providerId");
    res.status(200).json(emergencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Get emergency by ID
export const getEmergencyById = async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id)
      .populate("userId", "name email")
      .populate("assignedServiceProviders.providerId");

    if (!emergency) {
      return res.status(404).json({ message: "Emergency not found" });
    }

    res.status(200).json(emergency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Assign a service provider (Police, Ambulance, etc.)
export const assignServiceProvider = async (req, res) => {
  try {
    const { emergencyId } = req.params;
    const { providerId, providerType } = req.body;

    const emergency = await Emergency.findById(emergencyId);
    if (!emergency) {
      return res.status(404).json({ message: "Emergency not found" });
    }

    emergency.assignedServiceProviders.push({
      providerId,
      providerType,
      status: "Notified",
    });

    emergency.status = "In Progress";
    await emergency.save();

    res.status(200).json({
      message: `${providerType} assigned successfully ✅`,
      emergency,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Update emergency status
export const updateEmergencyStatus = async (req, res) => {
  try {
    const { emergencyId } = req.params;
    const { status } = req.body;

    const emergency = await Emergency.findById(emergencyId);
    if (!emergency) {
      return res.status(404).json({ message: "Emergency not found" });
    }

    emergency.status = status;
    await emergency.save();

    res.status(200).json({
      message: "Emergency status updated ✅",
      emergency,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
