

// // import express from "express";
// // import {
// //   registerFirebrigade,
// //   updateFirebrigade,
// //   getFirebrigadeById,
// //   getFirebrigadeByUserId,
// //   getAllFirebrigades,
// //   getNearestFirebrigades,
// //   deleteFirebrigade,
// // } from "../controllers/fireBrigadeController.js";
// // import { body } from "express-validator";

// // const router = express.Router();

// // // Validation rules
// // const firebrigadeValidation = [
// //   body("userId")
// //     .notEmpty()
// //     .withMessage("User ID is required")
// //     .isMongoId()
// //     .withMessage("Valid user ID is required"),
// //   body("name")
// //     .notEmpty()
// //     .withMessage("Name is required")
// //     .isLength({ min: 2 })
// //     .withMessage("Name must be at least 2 characters long"),
// //   body("contactNumber")
// //     .notEmpty()
// //     .withMessage("Contact number is required")
// //     .isMobilePhone()
// //     .withMessage("Valid contact number is required"),
// //   body("email").optional().isEmail().withMessage("Valid email is required"),
// //   body("address")
// //     .notEmpty()
// //     .withMessage("Address is required")
// //     .isLength({ min: 5 })
// //     .withMessage("Address must be at least 5 characters long"),
// //   body("imageUrl")
// //     .notEmpty()
// //     .withMessage("Image URL is required")
// //     .isURL()
// //     .withMessage("Valid image URL is required"),
// // ];

// // const updateFirebrigadeValidation = [
// //   body("name")
// //     .optional()
// //     .isLength({ min: 2 })
// //     .withMessage("Name must be at least 2 characters long"),
// //   body("contactNumber")
// //     .optional()
// //     .isMobilePhone()
// //     .withMessage("Valid contact number is required"),
// //   body("email").optional().isEmail().withMessage("Valid email is required"),
// //   body("address")
// //     .optional()
// //     .isLength({ min: 5 })
// //     .withMessage("Address must be at least 5 characters long"),
// //   body("imageUrl")
// //     .optional()
// //     .isURL()
// //     .withMessage("Valid image URL is required"),
// //   body("availability")
// //     .optional()
// //     .isIn(["Available", "Not Available"])
// //     .withMessage("Availability must be either 'Available' or 'Not Available'"),
// // ];

// // // @route   POST /api/firebrigades/register
// // // @desc    Register a new firebrigade (convert user to firebrigade)
// // // @access  Private
// // router.post("/register", firebrigadeValidation, registerFirebrigade);

// // // @route   GET /api/firebrigades
// // // @desc    Get all firebrigades with optional filters
// // // @access  Public
// // router.get("/", getAllFirebrigades);

// // // @route   GET /api/firebrigades/nearest
// // // @desc    Find nearest firebrigades based on coordinates
// // // @access  Public
// // router.get("/nearest", getNearestFirebrigades);

// // // @route   GET /api/firebrigades/user/:userId
// // // @desc    Get firebrigade by user ID
// // // @access  Private
// // router.get("/user/:userId", getFirebrigadeByUserId);

// // // @route   GET /api/firebrigades/:id
// // // @desc    Get firebrigade details by ID
// // // @access  Public
// // router.get("/:id", getFirebrigadeById);

// // // @route   PUT /api/firebrigades/:id
// // // @desc    Update firebrigade details
// // // @access  Private
// // router.put("/:id", updateFirebrigadeValidation, updateFirebrigade);

// // // @route   DELETE /api/firebrigades/:id
// // // @desc    Delete a firebrigade and revert user role
// // // @access  Private
// // router.delete("/:id", deleteFirebrigade);

// // export default router;



// // import express from "express";
// // import {
// //   registerFirebrigade,
// //   updateFirebrigade,
// //   getFirebrigadeById,
// //   getFirebrigadeByUserId,
// //   getAllFirebrigades,
// //   getNearestFirebrigades,
// //   deleteFirebrigade,
// // } from "../controllers/fireBrigadeController.js";
// // import { body } from "express-validator";

// // const router = express.Router();

// // const firebrigadeValidation = [
// //   body("userId").notEmpty().withMessage("User ID is required").isMongoId(),
// //   body("name").notEmpty().isLength({ min: 2 }),
// //   body("contactNumber").notEmpty().isMobilePhone(),
// //   body("email").optional().isEmail(),
// //   body("address").notEmpty().isLength({ min: 5 }),
// //   body("imageUrl").notEmpty().isURL(),
// // ];

// // const updateFirebrigadeValidation = [
// //   body("name").optional().isLength({ min: 2 }),
// //   body("contactNumber").optional().isMobilePhone(),
// //   body("email").optional().isEmail(),
// //   body("address").optional().isLength({ min: 5 }),
// //   body("imageUrl").optional().isURL(),
// //   body("availability").optional().isIn(["Available", "Not Available"]),
// // ];

// // router.post("/register", firebrigadeValidation, registerFirebrigade);
// // router.get("/", getAllFirebrigades);
// // router.get("/nearest", getNearestFirebrigades);
// // router.get("/user/:userId", getFirebrigadeByUserId);
// // router.get("/:id", getFirebrigadeById);
// // router.put("/:id", updateFirebrigadeValidation, updateFirebrigade);
// // router.delete("/:id", deleteFirebrigade);

// // export default router;


// import express from "express";
// import {
//   registerFirebrigade,
//   updateFirebrigade,
//   getFirebrigadeById,
//   getFirebrigadeByUserId,
//   getAllFirebrigades,
//   getNearestFirebrigades,
//   deleteFirebrigade,
//   sendSOS, // ✅ import the new controller
//   getSOSForProvider,
// } from "../controllers/fireBrigadeController.js";
// import { body } from "express-validator";
// import protect from "../middleware/authMiddleware.js";

// const router = express.Router();

// const firebrigadeValidation = [
//   body("userId").notEmpty().withMessage("User ID is required").isMongoId(),
//   body("name").notEmpty().isLength({ min: 2 }),
//   body("contactNumber").notEmpty().isMobilePhone(),
//   body("email").optional().isEmail(),
//   body("address").notEmpty().isLength({ min: 5 }),
//   body("imageUrl").notEmpty().isURL(),
// ];

// const updateFirebrigadeValidation = [
//   body("name").optional().isLength({ min: 2 }),
//   body("contactNumber").optional().isMobilePhone(),
//   body("email").optional().isEmail(),
//   body("address").optional().isLength({ min: 5 }),
//   body("imageUrl").optional().isURL(),
//   body("availability").optional().isIn(["Available", "Not Available"]),
// ];

// router.post("/register", firebrigadeValidation, registerFirebrigade);
// router.get("/", getAllFirebrigades);
// router.get("/nearest", getNearestFirebrigades);
// router.get("/user/:userId", getFirebrigadeByUserId);
// router.get("/:id", getFirebrigadeById);
// router.put("/:id", updateFirebrigadeValidation, updateFirebrigade);
// router.delete("/:id", deleteFirebrigade);

// // ✅ Add SOS route
// router.post("/sos", sendSOS);
// router.get("/sos/provider/:providerId", protect, getSOSForProvider);

// export default router;


// Backend: routes/fireBrigadeRoutes.js - Fixed: Added route for update location by userId
import express from "express";
import {
  registerFirebrigade,
  updateFirebrigade,
  getFirebrigadeById,
  getFirebrigadeByUserId,
  getAllFirebrigades,
  getNearestFirebrigades,
  deleteFirebrigade,
  sendSOS, // ✅ import the new controller
  getSOSForProvider,
  updateFirebrigadeLocation, // ✅ Added import
} from "../controllers/fireBrigadeController.js";
import { body } from "express-validator";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

const firebrigadeValidation = [
  body("userId").notEmpty().withMessage("User ID is required").isMongoId(),
  body("name").notEmpty().isLength({ min: 2 }),
  body("contactNumber").notEmpty().isMobilePhone(),
  body("email").optional().isEmail(),
  body("address").notEmpty().isLength({ min: 5 }),
  body("imageUrl").notEmpty().isURL(),
];

const updateFirebrigadeValidation = [
  body("name").optional().isLength({ min: 2 }),
  body("contactNumber").optional().isMobilePhone(),
  body("email").optional().isEmail(),
  body("address").optional().isLength({ min: 5 }),
  body("imageUrl").optional().isURL(),
  body("availability").optional().isIn(["Available", "Not Available"]),
];

router.post("/register", protect, firebrigadeValidation, registerFirebrigade); // Added protect
router.get("/", getAllFirebrigades);
router.get("/nearest", getNearestFirebrigades);
router.get("/user/:userId", protect, getFirebrigadeByUserId); // Added protect
router.get("/:id", getFirebrigadeById);
router.put("/:id", protect, updateFirebrigadeValidation, updateFirebrigade); // Added protect
router.delete("/:id", protect, deleteFirebrigade); // Added protect
router.put("/:userId/location", protect, updateFirebrigadeLocation); // ✅ Added route

// ✅ Add SOS route
router.post("/sos", protect, sendSOS); // Added protect for auth
router.get("/sos/provider/:providerId", protect, getSOSForProvider);

export default router;