import mongoose from "mongoose";
import Roles from "../../enum/roles.js";

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },

    // GeoJSON format for nearest hospital search
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

    // Facilities available
    facilities: {
      type: [String],
      enum: [
        "Emergency Ward",
        "ICU",
        "Operation Theater",
        "X-Ray",
        "Pharmacy",
        "Blood Bank",
        "Ambulance Service",
        "Other",
      ],
    },

    // Doctors working in hospital
    // doctors: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Doctor",
    //   },
    // ],

    // Ambulances linked to hospital
    ambulances: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ambulance",
      },
    ],

    // Role (to identify hospital in system)
    role: {
      type: Number,
      enum: Object.values(Roles),
      default: Roles.HOSPITAL,
    },

    // Availability
    availability: {
      type: String,
      enum: ["Available", "Not Available"],
      default: "Available",
    },

    // ✅ Single main image for hospital
    imageUrl: {
      type: String,
      required: true, // you can make it optional if not always available
    },

    // ✅ Optionally allow multiple images (gallery)
    gallery: [
      {
        type: String, // Cloudinary or S3 image URLs
      },
    ],

    // Appointments for the hospital
    appointments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        doctor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Doctor",
        },
        appointmentDate: {
          type: Date,
          required: true,
        },
        appointmentTime: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
          default: "Pending",
        },
        reason: {
          type: String,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

// Geo index for nearest hospital queries
hospitalSchema.index({ location: "2dsphere" });

export default mongoose.model("Hospital", hospitalSchema);
