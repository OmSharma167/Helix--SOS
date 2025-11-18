

import express from "express";
import { body, param, query } from "express-validator";
import {
  registerHospital,
  updateHospital,
  getHospitalById,
  getAllHospitals,
  getNearestHospitals,
  deleteHospital,
  bookAppointment,
  getAppointments
} from "../controllers/hospitalController.js";
// import { authenticateToken, authorizeRoles } from "../middleware/auth.js"; 

const router = express.Router();

// Validation middleware for hospital registration
const validateHospitalRegistration = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Hospital name must be between 2 and 100 characters")
    .notEmpty()
    .withMessage("Hospital name is required"),

  body("contactNumber")
    .trim()
    .matches(/^[+]?[\d\s-()]+$/)
    .withMessage("Invalid contact number format")
    .isLength({ min: 10, max: 15 })
    .withMessage("Contact number must be between 10 and 15 digits")
    .notEmpty()
    .withMessage("Contact number is required"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("address")
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage("Address must be between 10 and 200 characters")
    .notEmpty()
    .withMessage("Address is required"),

  body("facilities")
    .optional()
    .isArray()
    .withMessage("Facilities must be an array"),

  body("facilities.*")
    .optional()
    .isIn([
      "Emergency Ward",
      "ICU",
      "Operation Theater",
      "X-Ray",
      "Pharmacy",
      "Blood Bank",
      "Ambulance Service",
      "Other",
    ])
    .withMessage("Invalid facility type"),

  body("imageUrl")
    .trim()
    .isURL()
    .withMessage("Invalid image URL format")
    .notEmpty()
    .withMessage("Hospital image URL is required"),

  body("gallery")
    .optional()
    .isArray()
    .withMessage("Gallery must be an array of URLs"),

  body("gallery.*")
    .optional()
    .isURL()
    .withMessage("Each gallery item must be a valid URL"),
];

// Validation middleware for hospital updates
const validateHospitalUpdate = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Hospital name must be between 2 and 100 characters"),

  body("contactNumber")
    .optional()
    .trim()
    .matches(/^[+]?[\d\s-()]+$/)
    .withMessage("Invalid contact number format")
    .isLength({ min: 10, max: 15 })
    .withMessage("Contact number must be between 10 and 15 digits"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("address")
    .optional()
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage("Address must be between 10 and 200 characters"),

  body("facilities")
    .optional()
    .isArray()
    .withMessage("Facilities must be an array"),

  body("facilities.*")
    .optional()
    .isIn([
      "Emergency Ward",
      "ICU",
      "Operation Theater",
      "X-Ray",
      "Pharmacy",
      "Blood Bank",
      "Ambulance Service",
      "Other",
    ])
    .withMessage("Invalid facility type"),

  body("availability")
    .optional()
    .isIn(["Available", "Not Available"])
    .withMessage("Availability must be either 'Available' or 'Not Available'"),

  body("imageUrl")
    .optional()
    .trim()
    .isURL()
    .withMessage("Invalid image URL format"),

  body("gallery")
    .optional()
    .isArray()
    .withMessage("Gallery must be an array of URLs"),

  body("gallery.*")
    .optional()
    .isURL()
    .withMessage("Each gallery item must be a valid URL"),
];

// Validation middleware for MongoDB ObjectId
const validateObjectId = [
  param("id").isMongoId().withMessage("Invalid hospital ID format"),
];

// Validation middleware for nearest hospitals query
const validateNearestQuery = [
  query("latitude")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be a valid number between -90 and 90"),

  query("longitude")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be a valid number between -180 and 180"),

  query("maxDistance")
    .optional()
    .isInt({ min: 100, max: 100000 })
    .withMessage("Max distance must be between 100 and 100000 meters"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50"),
];

// Validation middleware for general queries
const validateGeneralQuery = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  query("availability")
    .optional()
    .isIn(["Available", "Not Available"])
    .withMessage("Availability must be either 'Available' or 'Not Available'"),

  query("search")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Search query must not exceed 100 characters"),
];


router.post("/register", validateHospitalRegistration, registerHospital);


router.get("/nearest", validateNearestQuery, getNearestHospitals);

router.get("/", validateGeneralQuery, getAllHospitals);


router.get("/:id", validateObjectId, getHospitalById);

// @route   PUT /api/hospitals/:id
// @desc    Update hospital details
// @access  Private (hospital owner only)
// router.put("/:id", authenticateToken, authorizeRoles(['HOSPITAL']), validateObjectId, validateHospitalUpdate, updateHospital);
router.put("/:id", validateObjectId, validateHospitalUpdate, updateHospital);

// @route   DELETE /api/hospitals/:id
// @desc    Delete hospital
// @access  Private (hospital owner only)
// router.delete("/:id", authenticateToken, authorizeRoles(['HOSPITAL']), validateObjectId, deleteHospital);
router.delete("/:id", validateObjectId, deleteHospital);




// Appointement Booking for Hospital


// Book an appointment
router.post("/:id/appointments",  bookAppointment);

// Get all appointments for a hospital
router.get("/:id/appointments",getAppointments);

export default router;