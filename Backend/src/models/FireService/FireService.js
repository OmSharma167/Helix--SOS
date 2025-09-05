import mongoose from "mongoose";
import Roles from "./enum/roles.js";

const fireServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    stationCode: {
      type: String,
      unique: true, // Unique identifier for fire station/van
      required: true,
    },

    // contactNumber: {
    //   type: String,
    //   required: true,
    // },

    email: {
      type: String,
    },

    address: {
      type: String,
      required: true,
    },

    // GeoJSON for nearest fire service search
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },

    // Fire Vans registered under this station
    fireVans: [
      {
        vanNumber: { type: String, required: true }, // unique van number
        driverName: { type: String, required: true },
        driverContact: { type: String, required: true },
        availability: {
          type: String,
          enum: ["Available", "Busy", "Under Maintenance"],
          default: "Available",
        },
      },
    ],

    // Role (to identify Fire Service in system)
    role: {
      type: Number,
      enum: Object.values(Roles),
      default: Roles.FIRE,
    },

    // Availability of station
    availability: {
      type: String,
      enum: ["Available", "Busy", "Closed"],
      default: "Available",
    },

    // Station image
    imageUrl: {
      type: String,
      required: true,
    },

    // Emergencies assigned to this station
    emergenciesAssigned: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Emergency",
      },
    ],
  },
  { timestamps: true }
);

// Geo index for nearest search
fireServiceSchema.index({ location: "2dsphere" });

export default mongoose.model("FireService", fireServiceSchema);
