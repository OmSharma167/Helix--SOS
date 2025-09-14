// import Hospital from "../models/Hospital/Hospital.js";

// // 1. Register a hospital
// export const registerHospital = async (req, res) => {
//   try {
//     const {
//       name,
//       contactNumber,
//       email,
//       address,
//       location,
//       facilities,
//       ambulances,
//       imageUrl,
//       gallery,
//     } = req.body;

//     const hospital = await Hospital.create({
//       name,
//       contactNumber,
//       email,
//       address,
//       location,
//       facilities,
//       ambulances,
//       imageUrl,
//       gallery,
//     });

//     res.status(201).json({
//       message: "🏥 Hospital registered successfully",
//       hospital,
//     });
//   } catch (error) {
//     console.error("Hospital Register Error:", error);
//     res.status(400).json({ message: error.message });
//   }
// };

// // 2. Get all hospitals
// export const getAllHospitals = async (req, res) => {
//   try {
//     const hospitals = await Hospital.find().populate("ambulances");
//     res.status(200).json(hospitals);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch hospitals" });
//   }
// };

// // 3. Get hospital by ID
// export const getHospitalById = async (req, res) => {
//   try {
//     const hospital = await Hospital.findById(req.params.id).populate(
//       "ambulances"
//     );

//     if (!hospital) {
//       return res.status(404).json({ message: "Hospital not found" });
//     }

//     res.status(200).json(hospital);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // 4. Find nearest hospitals
// export const findNearestHospitals = async (req, res) => {
//   try {
//     const { longitude, latitude } = req.query;

//     if (!longitude || !latitude) {
//       return res
//         .status(400)
//         .json({ message: "Longitude & Latitude are required" });
//     }

//     const hospitals = await Hospital.find({
//       location: {
//         $near: {
//           $geometry: {
//             type: "Point",
//             coordinates: [parseFloat(longitude), parseFloat(latitude)],
//           },
//           $maxDistance: 10000, // within 10 km
//         },
//       },
//       availability: "Available",
//     });

//     res.status(200).json(hospitals);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // 5. Update hospital availability
// export const updateHospitalAvailability = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { availability } = req.body;

//     const hospital = await Hospital.findById(id);
//     if (!hospital) {
//       return res.status(404).json({ message: "Hospital not found" });
//     }

//     hospital.availability = availability || hospital.availability;
//     await hospital.save();

//     res.status(200).json({
//       message: "Hospital availability updated ✅",
//       hospital,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



// import Hospital from "../models/Hospital.js";

import Hospital from "../models/Hospital/Hospital.js";
import Roles from "../enum/roles.js";
import axios from "axios";
import { validationResult } from "express-validator";

// Utility function to get coordinates from address using Mapbox Geocoding API
// const getCoordinatesFromAddress = async (address) => {
//   try {
//     const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN;
//     if (!mapboxToken) {
//       throw new Error("Mapbox access token not configured");
//     }

//     const encodedAddress = encodeURIComponent(address);
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxToken}&limit=1`;

//     const response = await axios.get(url);

//     if (response.data.features && response.data.features.length > 0) {
//       const coordinates = response.data.features[0].center;
//       return {
//         longitude: coordinates[0],
//         latitude: coordinates[1],
//       };
//     } else {
//       throw new Error("Address not found");
//     }
//   } catch (error) {
//     console.error("Geocoding error:", error.message);
//     throw new Error("Failed to get coordinates from address");
//   }
// };



export const getCoordinatesFromAddress = async (address) => {
  // Try Mapbox if token is available
  const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN;

  if (mapboxToken) {
    try {
      const encodedAddress = encodeURIComponent(address);
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxToken}&limit=1`;

      const response = await axios.get(url);

      if (response.data.features && response.data.features.length > 0) {
        const [longitude, latitude] = response.data.features[0].center;
        return { longitude, latitude };
      } else {
        console.log("Mapbox: Address not found, falling back to OSM");
      }
    } catch (error) {
      console.log("Mapbox error, falling back to OSM:", error.message);
    }
  }

  // Fallback to OpenStreetMap
  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`;

    const response = await axios.get(url, {
      headers: { "User-Agent": "YourAppName/1.0" },
    });

    if (response.data && response.data.length > 0) {
      const latitude = parseFloat(response.data[0].lat);
      const longitude = parseFloat(response.data[0].lon);
      return { longitude, latitude };
    } else {
      throw new Error("Address not found in OSM");
    }
  } catch (osmError) {
    console.error("OSM Geocoding error:", osmError.message);
    throw new Error("Failed to get coordinates from address");
  }
};

// Alternative function using OpenStreetMap Nominatim (free option)
const getCoordinatesFromAddressOSM = async (address) => {
  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`;

    const response = await axios.get(url, {
      headers: {
        "User-Agent": "YourAppName/1.0", // Required by Nominatim
      },
    });

    if (response.data && response.data.length > 0) {
      return {
        longitude: parseFloat(response.data[0].lon),
        latitude: parseFloat(response.data[0].lat),
      };
    } else {
      throw new Error("Address not found");
    }
  } catch (error) {
    console.error("OSM Geocoding error:", error.message);
    throw new Error("Failed to get coordinates from address");
  }
};

// @desc    Register/Add new hospital
// @route   POST /api/hospitals/register
// @access  Public (for hospital owners)
export const registerHospital = async (req, res) => {
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

    const {
      name,
      contactNumber,
      email,
      address,
      facilities,
      imageUrl,
      gallery,
    } = req.body;

    // Check if hospital already exists
    const existingHospital = await Hospital.findOne({
      $or: [
        { name: name.trim() },
        { contactNumber },
        { email: email?.toLowerCase() },
      ],
    });

    if (existingHospital) {
      return res.status(400).json({
        success: false,
        message:
          "Hospital with this name, contact number, or email already exists",
      });
    }

    // Get coordinates from address
    let coordinates;
    try {
      // Try Mapbox first, fallback to OSM
      try {
        const coords = await getCoordinatesFromAddress(address);
        coordinates = [coords.longitude, coords.latitude];
      } catch (mapboxError) {
        console.log("Mapbox failed, trying OSM:", mapboxError.message);
        const coords = await getCoordinatesFromAddressOSM(address);
        coordinates = [coords.longitude, coords.latitude];
      }
    } catch (geocodingError) {
      return res.status(400).json({
        success: false,
        message:
          "Could not find coordinates for the provided address. Please check the address and try again.",
        error: geocodingError.message,
      });
    }

    // Create hospital object
    const hospitalData = {
      name: name.trim(),
      contactNumber,
      email: email?.toLowerCase(),
      address: address.trim(),
      location: {
        type: "Point",
        coordinates,
      },
      facilities: facilities || [],
      imageUrl,
      gallery: gallery || [],
      role: Roles.HOSPITAL,
      availability: "Available",
    };

    // Create and save hospital
    const hospital = new Hospital(hospitalData);
    const savedHospital = await hospital.save();

    res.status(201).json({
      success: true,
      message: "Hospital registered successfully",
      data: {
        hospital: {
          id: savedHospital._id,
          name: savedHospital.name,
          contactNumber: savedHospital.contactNumber,
          email: savedHospital.email,
          address: savedHospital.address,
          location: savedHospital.location,
          facilities: savedHospital.facilities,
          availability: savedHospital.availability,
          imageUrl: savedHospital.imageUrl,
          gallery: savedHospital.gallery,
          createdAt: savedHospital.createdAt,
        },
      },
    });
  } catch (error) {
    console.error("Register hospital error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to register hospital",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

// @desc    Update hospital details and facilities
// @route   PUT /api/hospitals/:id
// @access  Private (hospital owner only)
export const updateHospital = async (req, res) => {
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

    // Find hospital
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    // If address is being updated, get new coordinates
    if (updates.address && updates.address !== hospital.address) {
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

    // Update hospital
    const updatedHospital = await Hospital.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Hospital updated successfully",
      data: {
        hospital: updatedHospital,
      },
    });
  } catch (error) {
    console.error("Update hospital error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update hospital",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

// @desc    Get hospital details by ID
// @route   GET /api/hospitals/:id
// @access  Public
export const getHospitalById = async (req, res) => {
  try {
    const { id } = req.params;

    const hospital = await Hospital.findById(id).populate("ambulances");

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        hospital,
      },
    });
  } catch (error) {
    console.error("Get hospital error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get hospital details",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

// @desc    Get all hospitals with optional filters
// @route   GET /api/hospitals
// @access  Public
export const getAllHospitals = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      availability,
      facilities,
      search,
    } = req.query;

    // Build query
    const query = {};

    if (availability) {
      query.availability = availability;
    }

    if (facilities) {
      const facilitiesArray = facilities.split(",");
      query.facilities = { $in: facilitiesArray };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
      ];
    }

    // Execute query with pagination
    const hospitals = await Hospital.find(query)
      .populate("ambulances")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Hospital.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        hospitals,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          count: hospitals.length,
          totalRecords: total,
        },
      },
    });
  } catch (error) {
    console.error("Get all hospitals error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get hospitals",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

// @desc    Find nearest hospitals
// @route   GET /api/hospitals/nearest
// @access  Public
export const getNearestHospitals = async (req, res) => {
  try {
    const { latitude, longitude, maxDistance = 10000, limit = 10 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required",
      });
    }

    const hospitals = await Hospital.find({
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
      .populate("ambulances")
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: {
        hospitals,
        searchCenter: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
        maxDistance: parseInt(maxDistance),
      },
    });
  } catch (error) {
    console.error("Get nearest hospitals error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to find nearest hospitals",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

// @desc    Delete hospital
// @route   DELETE /api/hospitals/:id
// @access  Private (hospital owner only)
export const deleteHospital = async (req, res) => {
  try {
    const { id } = req.params;

    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    await Hospital.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Hospital deleted successfully",
    });
  } catch (error) {
    console.error("Delete hospital error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete hospital",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};