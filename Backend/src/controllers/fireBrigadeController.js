// // controllers/fireBrigadeController.js
// import Firebrigade from "../models/FireBrigade/Firebrigade.js";
// import User from "../models/User/User.js";
// import Roles from "../enum/roles.js";
// import SOSRequest from "../models/FireBrigade/SOSRequest.js";


// import axios from "axios";
// import { validationResult } from "express-validator";

// export const getCoordinatesFromAddress = async (address) => {
//   // Try Mapbox if token is available
//   const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN;

//   if (mapboxToken) {
//     try {
//       const encodedAddress = encodeURIComponent(address);
//       const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxToken}&limit=1`;

//       const response = await axios.get(url);

//       if (response.data.features && response.data.features.length > 0) {
//         const [longitude, latitude] = response.data.features[0].center;
//         return { longitude, latitude };
//       } else {
//         console.log("Mapbox: Address not found, falling back to OSM");
//       }
//     } catch (error) {
//       console.log("Mapbox error, falling back to OSM:", error.message);
//     }
//   }

//   // Fallback to OpenStreetMap
//   try {
//     const encodedAddress = encodeURIComponent(address);
//     const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`;

//     const response = await axios.get(url, {
//       headers: { "User-Agent": "YourAppName/1.0" },
//     });

//     if (response.data && response.data.length > 0) {
//       const latitude = parseFloat(response.data[0].lat);
//       const longitude = parseFloat(response.data[0].lon);
//       return { longitude, latitude };
//     } else {
//       throw new Error("Address not found in OSM");
//     }
//   } catch (osmError) {
//     console.error("OSM Geocoding error:", osmError.message);
//     throw new Error("Failed to get coordinates from address");
//   }
// };

// // Alternative function using OpenStreetMap Nominatim (free option)
// const getCoordinatesFromAddressOSM = async (address) => {
//   try {
//     const encodedAddress = encodeURIComponent(address);
//     const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`;

//     const response = await axios.get(url, {
//       headers: {
//         "User-Agent": "YourAppName/1.0", // Required by Nominatim
//       },
//     });

//     if (response.data && response.data.length > 0) {
//       return {
//         longitude: parseFloat(response.data[0].lon),
//         latitude: parseFloat(response.data[0].lat),
//       };
//     } else {
//       throw new Error("Address not found");
//     }
//   } catch (error) {
//     console.error("OSM Geocoding error:", error.message);
//     throw new Error("Failed to get coordinates from address");
//   }
// };

// // @desc    Register/Add new firebrigade (from existing user)
// // @route   POST /api/firebrigades/register
// // @access  Private
// export const registerFirebrigade = async (req, res) => {
//   try {
//     // Check for validation errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         errors: errors.array(),
//       });
//     }

//     const { userId, name, contactNumber, email, address, imageUrl, gallery } =
//       req.body;

//     // Check if user exists and get user details
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Check if firebrigade already exists for this user
//     const existingFirebrigade = await Firebrigade.findOne({
//       $or: [
//         { userId },
//         { name: name.trim() },
//         { contactNumber },
//         { email: email?.toLowerCase() },
//       ],
//     });

//     if (existingFirebrigade) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Firebrigade already exists for this user or with this name, contact number, or email",
//       });
//     }

//     // Get coordinates from address
//     let coordinates;
//     try {
//       // Try Mapbox first, fallback to OSM
//       try {
//         const coords = await getCoordinatesFromAddress(address);
//         coordinates = [coords.longitude, coords.latitude];
//       } catch (mapboxError) {
//         console.log("Mapbox failed, trying OSM:", mapboxError.message);
//         const coords = await getCoordinatesFromAddressOSM(address);
//         coordinates = [coords.longitude, coords.latitude];
//       }
//     } catch (geocodingError) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Could not find coordinates for the provided address. Please check the address and try again.",
//         error: geocodingError.message,
//       });
//     }

//     // Create firebrigade object
//     const firebrigadeData = {
//       userId, // Link to user
//       name: name.trim(),
//       contactNumber,
//       email: email?.toLowerCase(),
//       address: address.trim(),
//       location: {
//         type: "Point",
//         coordinates,
//       },
//       imageUrl,
//       gallery: gallery || [],
//       role: Roles.FIRE,
//       availability: "Available",
//     };

//     // Create and save firebrigade
//     const firebrigade = new Firebrigade(firebrigadeData);
//     const savedFirebrigade = await firebrigade.save();

//     // Update user role to FIRE
//     await User.findByIdAndUpdate(userId, { role: Roles.FIRE });

//     res.status(201).json({
//       success: true,
//       message: "Firebrigade registered successfully and user role updated",
//       data: {
//         firebrigade: {
//           id: savedFirebrigade._id,
//           userId: savedFirebrigade.userId,
//           name: savedFirebrigade.name,
//           contactNumber: savedFirebrigade.contactNumber,
//           email: savedFirebrigade.email,
//           address: savedFirebrigade.address,
//           location: savedFirebrigade.location,
//           availability: savedFirebrigade.availability,
//           imageUrl: savedFirebrigade.imageUrl,
//           gallery: savedFirebrigade.gallery,
//           role: savedFirebrigade.role,
//           createdAt: savedFirebrigade.createdAt,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Register firebrigade error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to register firebrigade",
//       error:
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Internal server error",
//     });
//   }
// };

// // @desc    Update firebrigade details
// // @route   PUT /api/firebrigades/:id
// // @access  Private
// export const updateFirebrigade = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;

//     // Check for validation errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         errors: errors.array(),
//       });
//     }

//     // Find firebrigade
//     const firebrigade = await Firebrigade.findById(id);
//     if (!firebrigade) {
//       return res.status(404).json({
//         success: false,
//         message: "Firebrigade not found",
//       });
//     }

//     // If address is being updated, get new coordinates
//     if (updates.address && updates.address !== firebrigade.address) {
//       try {
//         // Try Mapbox first, fallback to OSM
//         let coordinates;
//         try {
//           const coords = await getCoordinatesFromAddress(updates.address);
//           coordinates = [coords.longitude, coords.latitude];
//         } catch (mapboxError) {
//           const coords = await getCoordinatesFromAddressOSM(updates.address);
//           coordinates = [coords.longitude, coords.latitude];
//         }

//         updates.location = {
//           type: "Point",
//           coordinates,
//         };
//       } catch (geocodingError) {
//         return res.status(400).json({
//           success: false,
//           message: "Could not find coordinates for the new address",
//           error: geocodingError.message,
//         });
//       }
//     }

//     // Update firebrigade
//     const updatedFirebrigade = await Firebrigade.findByIdAndUpdate(
//       id,
//       updates,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Firebrigade updated successfully",
//       data: {
//         firebrigade: updatedFirebrigade,
//       },
//     });
//   } catch (error) {
//     console.error("Update firebrigade error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update firebrigade",
//       error:
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Internal server error",
//     });
//   }
// };

// // @desc    Get firebrigade details by ID
// // @route   GET /api/firebrigades/:id
// // @access  Public
// export const getFirebrigadeById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const firebrigade = await Firebrigade.findById(id).populate(
//       "userId",
//       "name email phone"
//     );

//     if (!firebrigade) {
//       return res.status(404).json({
//         success: false,
//         message: "Firebrigade not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: {
//         firebrigade,
//       },
//     });
//   } catch (error) {
//     console.error("Get firebrigade error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to get firebrigade details",
//       error:
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Internal server error",
//     });
//   }
// };

// // @desc    Get firebrigade by user ID
// // @route   GET /api/firebrigades/user/:userId
// // @access  Private
// export const getFirebrigadeByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const firebrigade = await Firebrigade.findOne({ userId }).populate(
//       "userId",
//       "name email phone"
//     );

//     if (!firebrigade) {
//       return res.status(404).json({
//         success: false,
//         message: "Firebrigade not found for this user",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: {
//         firebrigade,
//       },
//     });
//   } catch (error) {
//     console.error("Get firebrigade by user ID error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to get firebrigade details",
//       error:
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Internal server error",
//     });
//   }
// };

// // @desc    Get all firebrigades with optional filters
// // @route   GET /api/firebrigades
// // @access  Public
// export const getAllFirebrigades = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, availability, search } = req.query;

//     // Build query
//     const query = {};

//     if (availability) {
//       query.availability = availability;
//     }

//     if (search) {
//       query.$or = [
//         { name: { $regex: search, $options: "i" } },
//         { address: { $regex: search, $options: "i" } },
//       ];
//     }

//     // Execute query with pagination
//     const firebrigades = await Firebrigade.find(query)
//       .populate("userId", "name email phone")
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .sort({ createdAt: -1 });

//     const total = await Firebrigade.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       data: {
//         firebrigades,
//         pagination: {
//           current: page,
//           total: Math.ceil(total / limit),
//           count: firebrigades.length,
//           totalRecords: total,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Get all firebrigades error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to get firebrigades",
//       error:
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Internal server error",
//     });
//   }
// };

// // @desc    Find nearest firebrigades
// // @route   GET /api/firebrigades/nearest
// // @access  Public
// export const getNearestFirebrigades = async (req, res) => {
//   try {
//     const { latitude, longitude, maxDistance = 20000, limit = 10 } = req.query;

//     if (!latitude || !longitude) {
//       return res.status(400).json({
//         success: false,
//         message: "Latitude and longitude are required",
//       });
//     }

//     const firebrigades = await Firebrigade.find({
//       location: {
//         $near: {
//           $geometry: {
//             type: "Point",
//             coordinates: [parseFloat(longitude), parseFloat(latitude)],
//           },
//           $maxDistance: parseInt(maxDistance),
//         },
//       },
//       availability: "Available",
//     })
//       .populate("userId", "name email phone")
//       .limit(parseInt(limit));

//     res.status(200).json({
//       success: true,
//       data: {
//         firebrigades,
//         searchCenter: {
//           latitude: parseFloat(latitude),
//           longitude: parseFloat(longitude),
//         },
//         maxDistance: parseInt(maxDistance),
//       },
//     });
//   } catch (error) {
//     console.error("Get nearest firebrigades error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to find nearest firebrigades",
//       error:
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Internal server error",
//     });
//   }
// };

// // @desc    Delete firebrigade and revert user role
// // @route   DELETE /api/firebrigades/:id
// // @access  Private
// export const deleteFirebrigade = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const firebrigade = await Firebrigade.findById(id);
//     if (!firebrigade) {
//       return res.status(404).json({
//         success: false,
//         message: "Firebrigade not found",
//       });
//     }

//     // Revert user role to USER
//     await User.findByIdAndUpdate(firebrigade.userId, { role: Roles.USER });

//     // Delete firebrigade
//     await Firebrigade.findByIdAndDelete(id);

//     res.status(200).json({
//       success: true,
//       message:
//         "Firebrigade deleted successfully and user role reverted to USER",
//     });
//   } catch (error) {
//     console.error("Delete firebrigade error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete firebrigade",
//       error:
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Internal server error",
//     });
//   }
// };





// // for SOS



// // controllers/fireBrigadeController.js - Update sendSOS function
// export const sendSOS = async (req, res) => {
//   try {
//     const { latitude, longitude } = req.body;
//     const userId = req.user?._id; // Get user from auth middleware

//     if (!latitude || !longitude) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Location required" 
//       });
//     }

//     // Find nearest available firebrigades
//     const nearestProviders = await Firebrigade.find({
//       availability: "Available",
//       location: {
//         $near: {
//           $geometry: {
//             type: "Point",
//             coordinates: [parseFloat(longitude), parseFloat(latitude)],
//           },
//           $maxDistance: 10000, // 10km
//         },
//       },
//     }).limit(5);

//     if (!nearestProviders || nearestProviders.length === 0) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "No fire brigades found nearby" 
//       });
//     }

//     // Create SOS request
//     const sosRequest = new SOSRequest({
//       userId: userId || null,
//       location: {
//         type: "Point",
//         coordinates: [parseFloat(longitude), parseFloat(latitude)],
//       },
//       nearestProviders: nearestProviders.map((p) => ({ 
//         providerId: p.userId, // Use userId instead of firebrigade _id
//         firebrigadeId: p._id,
//         status: "Pending" 
//       })),
//     });

//     await sosRequest.save();

//     // Populate the SOS request with user details before emitting
//     const populatedSOS = await SOSRequest.findById(sosRequest._id)
//       .populate('userId', 'name email phone')
//       .populate('nearestProviders.providerId', 'name email');

//     // Emit to all provider rooms
//     nearestProviders.forEach(provider => {
//       req.io.to(provider.userId.toString()).emit("newSOS", populatedSOS);
//     });

//     res.status(201).json({
//       success: true,
//       message: "SOS sent to nearest fire brigades",
//       data: populatedSOS,
//     });
//   } catch (error) {
//     console.error("Send SOS error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to send SOS",
//       error: error.message,
//     });
//   }
// };

// export const getSOSForProvider = async (req, res) => {
//   try {
//     const { providerId } = req.params;
//     const sosRequests = await SOSRequest.find({
//       "nearestProviders.providerId": providerId,
//     })
//       .populate("userId", "name email phone")
//       .populate("nearestProviders.providerId", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       data: sosRequests,
//     });
//   } catch (error) {
//     console.error("Get SOS for provider error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to get SOS requests",
//       error:
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Internal server error",
//     });
//   }
// };



// Backend: controllers/fireBrigadeController.js - Fixed: Added updateFirebrigadeLocation controller, minor fixes in existing
import Firebrigade from "../models/FireBrigade/Firebrigade.js";
import User from "../models/User/User.js";
import Roles from "../enum/roles.js";
import SOSRequest from "../models/FireBrigade/SOSRequest.js";
import axios from "axios";
import { validationResult } from "express-validator";



// Assuming User, Firebrigade, Roles, validationResult are imported

// Unified geocoding function (Mapbox + Enhanced OSM fallback)
export const getCoordinatesFromAddress = async (address) => {
  console.log(`Geocoding address: "${address}"`); // Debug log

  // Try Mapbox if token is available
  const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN;
  if (mapboxToken) {
    try {
      const encodedAddress = encodeURIComponent(address);
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxToken}&limit=1`;
      const response = await axios.get(url);
      if (response.data.features && response.data.features.length > 0) {
        const [longitude, latitude] = response.data.features[0].center;
        console.log(`Mapbox success: lat=${latitude}, lon=${longitude}`);
        return { longitude, latitude };
      } else {
        console.log("Mapbox: Address not found, falling back to OSM");
      }
    } catch (error) {
      console.log("Mapbox error, falling back to OSM:", error.message);
    }
  }

  // Enhanced OSM fallback with address variants
  const variants = [
    address, // Original
    address.replace(/, /g, " "), // Replace ", " with space
    address.replace(/, India/g, "").replace(/ - \d{6}/g, ""), // Remove ", India" and pin code (e.g., " - 110096")
    address.split(",")[0]?.trim() + " Delhi", // Simplest: Street + "Delhi"
  ];

  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i].trim();
    if (!variant) continue; // Skip empty

    try {
      console.log(`Trying OSM variant ${i + 1}: "${variant}"`); // Debug log
      const encodedAddress = encodeURIComponent(variant);
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1&countrycodes=in`; // Added country filter for India
      const response = await axios.get(url, {
        headers: { "User-Agent": "YourAppName/1.0" }, // Required by Nominatim
      });
      if (response.data && response.data.length > 0) {
        const latitude = parseFloat(response.data[0].lat);
        const longitude = parseFloat(response.data[0].lon);
        console.log(
          `OSM success (variant ${i + 1}): lat=${latitude}, lon=${longitude}`
        );
        return { longitude, latitude };
      }
    } catch (error) {
      console.warn(`OSM variant ${i + 1} failed:`, error.message);
      // Continue to next variant
    }
  }

  // If all fail
  const errorMsg = `Failed to geocode after trying ${
    variants.length
  } variants: ${variants.join(" | ")}`;
  console.error(errorMsg);
  throw new Error(errorMsg);
};

// @desc Register/Add new firebrigade (from existing user)
// @route POST /api/firebrigades/register
// @access Private
export const registerFirebrigade = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    const { userId, name, contactNumber, email, address, imageUrl, gallery } =
      req.body;

    // Validate required fields
    if (!address || address.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: "Valid address is required (min 5 characters)",
      });
    }

    // Check if user exists and get user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if firebrigade already exists for this user
    const existingFirebrigade = await Firebrigade.findOne({
      $or: [
        { userId },
        { name: name.trim() },
        { contactNumber },
        { email: email?.toLowerCase() },
      ],
    });
    if (existingFirebrigade) {
      return res.status(400).json({
        success: false,
        message:
          "Firebrigade already exists for this user or with this name, contact number, or email",
      });
    }

    // Get coordinates from address (now with enhanced fallback)
    let coordinates;
    try {
      const coords = await getCoordinatesFromAddress(address.trim());
      coordinates = [coords.longitude, coords.latitude];
    } catch (geocodingError) {
      return res.status(400).json({
        success: false,
        message:
          "Could not find coordinates for the provided address. Please check the address and try again. (Tried simplified variants automatically.)",
        error: geocodingError.message, // Includes tried variants for debugging
      });
    }

    // Create firebrigade object
    const firebrigadeData = {
      userId, // Link to user
      name: name.trim(),
      contactNumber,
      email: email?.toLowerCase(),
      address: address.trim(),
      location: {
        type: "Point",
        coordinates,
      },
      imageUrl,
      gallery: gallery || [],
      role: Roles.FIRE,
      availability: "Available",
    };

    // Create and save firebrigade
    const firebrigade = new Firebrigade(firebrigadeData);
    const savedFirebrigade = await firebrigade.save();

    // Update user role to FIRE
    await User.findByIdAndUpdate(userId, { role: Roles.FIRE });

    res.status(201).json({
      success: true,
      message: "Firebrigade registered successfully and user role updated",
      data: {
        firebrigade: {
          id: savedFirebrigade._id,
          userId: savedFirebrigade.userId,
          name: savedFirebrigade.name,
          contactNumber: savedFirebrigade.contactNumber,
          email: savedFirebrigade.email,
          address: savedFirebrigade.address,
          location: savedFirebrigade.location,
          availability: savedFirebrigade.availability,
          imageUrl: savedFirebrigade.imageUrl,
          gallery: savedFirebrigade.gallery,
          role: savedFirebrigade.role,
          createdAt: savedFirebrigade.createdAt,
        },
      },
    });
  } catch (error) {
    console.error("Register firebrigade error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to register firebrigade",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

// @desc Update firebrigade location by userId
// @route PUT /api/firebrigades/:userId/location
// @access Private
export const updateFirebrigadeLocation = async (req, res) => {
  try {
    const { userId } = req.params;
    const { location } = req.body;

    if (!location || !location.coordinates || location.coordinates.length !== 2) {
      return res.status(400).json({
        success: false,
        message: "Invalid location data",
      });
    }

    const firebrigade = await Firebrigade.findOne({ userId });
    if (!firebrigade) {
      return res.status(404).json({
        success: false,
        message: "Firebrigade not found for this user",
      });
    }

    firebrigade.location = location;
    const updatedFirebrigade = await firebrigade.save();

    res.status(200).json({
      success: true,
      message: "Location updated successfully",
      data: {
        firebrigade: updatedFirebrigade,
      },
    });
  } catch (error) {
    console.error("Update firebrigade location error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update location",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

// @desc Update firebrigade details
// @route PUT /api/firebrigades/:id
// @access Private
export const updateFirebrigade = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    // Find firebrigade
    const firebrigade = await Firebrigade.findById(id);
    if (!firebrigade) {
      return res.status(404).json({
        success: false,
        message: "Firebrigade not found",
      });
    }
    // If address is being updated, get new coordinates
    if (updates.address && updates.address !== firebrigade.address) {
      try {
        // Try Mapbox first, fallback to OSM
        let coordinates;
        try {
          const coords = await getCoordinatesFromAddress(updates.address);
          coordinates = [coords.longitude, coords.latitude];
        } catch (mapboxError) {
          const coords = await getCoordinatesFromAddressOSM(updates.address);
          coordinates = [coords.longitude, coords.latitude];
        }
        updates.location = {
          type: "Point",
          coordinates,
        };
      } catch (geocodingError) {
        return res.status(400).json({
          success: false,
          message: "Could not find coordinates for the new address",
          error: geocodingError.message,
        });
      }
    }
    // Update firebrigade
    const updatedFirebrigade = await Firebrigade.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Firebrigade updated successfully",
      data: {
        firebrigade: updatedFirebrigade,
      },
    });
  } catch (error) {
    console.error("Update firebrigade error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update firebrigade",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

// @desc Get firebrigade details by ID
// @route GET /api/firebrigades/:id
// @access Public
export const getFirebrigadeById = async (req, res) => {
  try {
    const { id } = req.params;
    const firebrigade = await Firebrigade.findById(id).populate(
      "userId",
      "name email phone"
    );
    if (!firebrigade) {
      return res.status(404).json({
        success: false,
        message: "Firebrigade not found",
      });
    }
    res.status(200).json({
      success: true,
      data: {
        firebrigade,
      },
    });
  } catch (error) {
    console.error("Get firebrigade error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get firebrigade details",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

// @desc Get firebrigade by user ID
// @route GET /api/firebrigades/user/:userId
// @access Private
export const getFirebrigadeByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const firebrigade = await Firebrigade.findOne({ userId }).populate(
      "userId",
      "name email phone"
    );
    if (!firebrigade) {
      return res.status(404).json({
        success: false,
        message: "Firebrigade not found for this user",
      });
    }
    res.status(200).json({
      success: true,
      data: {
        firebrigade,
      },
    });
  } catch (error) {
    console.error("Get firebrigade by user ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get firebrigade details",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

// @desc Get all firebrigades with optional filters
// @route GET /api/firebrigades
// @access Public
export const getAllFirebrigades = async (req, res) => {
  try {
    const { page = 1, limit = 10, availability, search } = req.query;
    // Build query
    const query = {};
    if (availability) {
      query.availability = availability;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
      ];
    }
    // Execute query with pagination
    const firebrigades = await Firebrigade.find(query)
      .populate("userId", "name email phone")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    const total = await Firebrigade.countDocuments(query);
    res.status(200).json({
      success: true,
      data: {
        firebrigades,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          count: firebrigades.length,
          totalRecords: total,
        },
      },
    });
  } catch (error) {
    console.error("Get all firebrigades error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get firebrigades",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

// @desc Find nearest firebrigades
// @route GET /api/firebrigades/nearest
// @access Public
export const getNearestFirebrigades = async (req, res) => {
  try {
    const { latitude, longitude, maxDistance = 20000, limit = 10 } = req.query;
    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required",
      });
    }
    const firebrigades = await Firebrigade.find({
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
    })
      .populate("userId", "name email phone")
      .limit(parseInt(limit));
    res.status(200).json({
      success: true,
      data: {
        firebrigades,
        searchCenter: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
        maxDistance: parseInt(maxDistance),
      },
    });
  } catch (error) {
    console.error("Get nearest firebrigades error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to find nearest firebrigades",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

// @desc Delete firebrigade and revert user role
// @route DELETE /api/firebrigades/:id
// @access Private
export const deleteFirebrigade = async (req, res) => {
  try {
    const { id } = req.params;
    const firebrigade = await Firebrigade.findById(id);
    if (!firebrigade) {
      return res.status(404).json({
        success: false,
        message: "Firebrigade not found",
      });
    }
    // Revert user role to USER
    await User.findByIdAndUpdate(firebrigade.userId, { role: Roles.USER });
    // Delete firebrigade
    await Firebrigade.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message:
        "Firebrigade deleted successfully and user role reverted to USER",
    });
  } catch (error) {
    console.error("Delete firebrigade error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete firebrigade",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

// for SOS
// controllers/fireBrigadeController.js - Update sendSOS function
export const sendSOS = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const userId = req.user?._id; // Get user from auth middleware
    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Location required"
      });
    }
    // Find nearest available firebrigades
    const nearestProviders = await Firebrigade.find({
      availability: "Available",
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: 10000, // 10km
        },
      },
    }).limit(5);
    if (!nearestProviders || nearestProviders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No fire brigades found nearby"
      });
    }
    // Create SOS request
    const sosRequest = new SOSRequest({
      userId: userId || null,
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
      nearestProviders: nearestProviders.map((p) => ({
        providerId: p.userId, // Use userId instead of firebrigade _id
        firebrigadeId: p._id,
        status: "Pending"
      })),
    });
    await sosRequest.save();
    // Populate the SOS request with user details before emitting
    const populatedSOS = await SOSRequest.findById(sosRequest._id)
      .populate('userId', 'name email phone')
      .populate('nearestProviders.providerId', 'name email');
    // Emit to all provider rooms
    nearestProviders.forEach(provider => {
      req.io.to(provider.userId.toString()).emit("newSOS", populatedSOS);
    });
    res.status(201).json({
      success: true,
      message: "SOS sent to nearest fire brigades",
      data: populatedSOS,
    });
  } catch (error) {
    console.error("Send SOS error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send SOS",
      error: error.message,
    });
  }
};

export const getSOSForProvider = async (req, res) => {
  try {
    const { providerId } = req.params;
    const sosRequests = await SOSRequest.find({
      "nearestProviders.providerId": providerId,
    })
      .populate("userId", "name email phone")
      .populate("nearestProviders.providerId", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: sosRequests,
    });
  } catch (error) {
    console.error("Get SOS for provider error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get SOS requests",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};