

// import Ambulance from "../models/Ambulnace/Ambulance.js";

// // import Ambulance from "../models/Ambulance/Ambulance.js";

// // @desc Register a new ambulance
// // @route POST /api/ambulances
// export const registerAmbulance = async (req, res) => {
//   try {
//     const {
//       userId,
//       driverName,
//       phoneNumber,
//       vehicleNumber,
//       location,
//       imageUrl,
//     } = req.body;

//     const ambulance = await Ambulance.create({
//       userId,
//       driverName,
//       phoneNumber,
//       vehicleNumber,
//       location,
//       imageUrl,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Ambulance registered successfully",
//       data: ambulance,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // @desc Get all ambulances
// // @route GET /api/ambulances
// export const getAmbulances = async (req, res) => {
//   try {
//     const ambulances = await Ambulance.find();
//     res.status(200).json({ success: true, data: ambulances });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // @desc Find nearest ambulances
// // @route GET /api/ambulances/nearest?lng=..&lat=..&distance=..
// export const getNearestAmbulances = async (req, res) => {
//   try {
//     const { lng, lat, distance } = req.query;

//     if (!lng || !lat) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Longitude and latitude required" });
//     }

//     const maxDistance = distance ? parseInt(distance) : 5000; // default 5km

//     const ambulances = await Ambulance.find({
//       location: {
//         $near: {
//           $geometry: {
//             type: "Point",
//             coordinates: [parseFloat(lng), parseFloat(lat)],
//           },
//           $maxDistance: maxDistance,
//         },
//       },
//     });

//     res.status(200).json({ success: true, data: ambulances });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // @desc Update ambulance availability
// // @route PUT /api/ambulances/:id
// export const updateAmbulance = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;

//     const ambulance = await Ambulance.findByIdAndUpdate(id, updates, {
//       new: true,
//     });

//     if (!ambulance) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Ambulance not found" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Ambulance updated successfully",
//       data: ambulance,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };



// controllers/ambulanceController.js


import Ambulance from "../models/Ambulnace/Ambulance.js";

// import Ambulance from "../models/Ambulance/Ambulance.js";
// import Ambulance from "../models/Ambulance/Ambulance.js";
import User from "../models/User/User.js";
import Roles from "../enum/roles.js";

// Register new ambulance
// export const registerAmbulance = async (req, res) => {
//   try {
//     const { userId, driverName, phoneNumber, vehicleNumber, coordinates, imageUrl } = req.body;

//     // Verify user exists and has ambulance role
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Check if ambulance already registered for this user
//     const existingAmbulance = await Ambulance.findOne({ userId });
//     if (existingAmbulance) {
//       return res.status(400).json({ message: "Ambulance already registered for this user" });
//     }

//     // Create new ambulance
//     const ambulance = new Ambulance({
//       userId,
//       driverName,
//       phoneNumber,
//       vehicleNumber,
//       location: {
//         type: "Point",
//         coordinates: coordinates // [longitude, latitude]
//       },
//       imageUrl: imageUrl || ""
//     });

//     await ambulance.save();

//     // Update user role to ambulance
//     await User.findByIdAndUpdate(userId, { role: Roles.AMBULANCE });

//     const populatedAmbulance = await Ambulance.findById(ambulance._id).populate('userId', 'name email phone');
    
//     res.status(201).json({
//       message: "Ambulance registered successfully",
//       ambulance: populatedAmbulance
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };


export const registerAmbulance = async (req, res) => {
  try {
    const { driverName, phoneNumber, vehicleNumber, coordinates, imageUrl } =
      req.body;

    // Use userId from authenticated user (req.user)
    const userId = req.user._id;

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if ambulance already registered for this user
    const existingAmbulance = await Ambulance.findOne({ userId });
    if (existingAmbulance) {
      return res
        .status(400)
        .json({ message: "Ambulance already registered for this user" });
    }

    // Create new ambulance
    const ambulance = new Ambulance({
      userId,
      driverName,
      phoneNumber,
      vehicleNumber,
      location: {
        type: "Point",
        coordinates: coordinates, // [longitude, latitude]
      },
      imageUrl: imageUrl || "",
    });

    await ambulance.save();

    // Update user role to ambulance
    await User.findByIdAndUpdate(userId, { role: Roles.AMBULANCE });

    const populatedAmbulance = await Ambulance.findById(ambulance._id).populate(
      "userId",
      "name email phone"
    );

    res.status(201).json({
      message: "Ambulance registered successfully",
      ambulance: populatedAmbulance,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Get all ambulances
export const getAllAmbulances = async (req, res) => {
  try {
    const ambulances = await Ambulance.find().populate('userId', 'name email phone');
    res.status(200).json({ ambulances });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get ambulance by ID
export const getAmbulanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const ambulance = await Ambulance.findById(id).populate('userId', 'name email phone');
    
    if (!ambulance) {
      return res.status(404).json({ message: "Ambulance not found" });
    }

    res.status(200).json({ ambulance });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Find nearest ambulances
export const findNearestAmbulances = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 10000 } = req.query; // maxDistance in meters

    if (!longitude || !latitude) {
      return res.status(400).json({ message: "Longitude and latitude are required" });
    }

    const ambulances = await Ambulance.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          distanceField: "distance",
          maxDistance: parseInt(maxDistance),
          spherical: true,
          query: { availability: "Available" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $project: {
          driverName: 1,
          phoneNumber: 1,
          vehicleNumber: 1,
          location: 1,
          availability: 1,
          imageUrl: 1,
          distance: 1,
          "user.name": 1,
          "user.email": 1,
          "user.phone": 1
        }
      }
    ]);

    res.status(200).json({ 
      message: `Found ${ambulances.length} available ambulances nearby`,
      ambulances 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update ambulance location
export const updateAmbulanceLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { coordinates } = req.body;

    if (!coordinates || coordinates.length !== 2) {
      return res.status(400).json({ message: "Valid coordinates [longitude, latitude] are required" });
    }

    const ambulance = await Ambulance.findByIdAndUpdate(
      id,
      {
        location: {
          type: "Point",
          coordinates: coordinates
        }
      },
      { new: true }
    ).populate('userId', 'name email phone');

    if (!ambulance) {
      return res.status(404).json({ message: "Ambulance not found" });
    }

    res.status(200).json({
      message: "Location updated successfully",
      ambulance
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update ambulance availability
export const updateAmbulanceAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { availability } = req.body;

    if (!["Available", "Busy"].includes(availability)) {
      return res.status(400).json({ message: "Availability must be 'Available' or 'Busy'" });
    }

    const ambulance = await Ambulance.findByIdAndUpdate(
      id,
      { availability },
      { new: true }
    ).populate('userId', 'name email phone');

    if (!ambulance) {
      return res.status(404).json({ message: "Ambulance not found" });
    }

    res.status(200).json({
      message: "Availability updated successfully",
      ambulance
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update ambulance details
export const updateAmbulance = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Remove userId from updates to prevent unauthorized changes
    delete updates.userId;
    delete updates.role;

    const ambulance = await Ambulance.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).populate('userId', 'name email phone');

    if (!ambulance) {
      return res.status(404).json({ message: "Ambulance not found" });
    }

    res.status(200).json({
      message: "Ambulance updated successfully",
      ambulance
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete ambulance
export const deleteAmbulance = async (req, res) => {
  try {
    const { id } = req.params;

    const ambulance = await Ambulance.findById(id);
    if (!ambulance) {
      return res.status(404).json({ message: "Ambulance not found" });
    }

    await Ambulance.findByIdAndDelete(id);

    // Reset user role back to USER
    await User.findByIdAndUpdate(ambulance.userId, { role: Roles.USER });

    res.status(200).json({ message: "Ambulance deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get ambulances by user ID
export const getAmbulanceByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const ambulance = await Ambulance.findOne({ userId }).populate('userId', 'name email phone');
    
    if (!ambulance) {
      return res.status(404).json({ message: "No ambulance found for this user" });
    }

    res.status(200).json({ ambulance });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};