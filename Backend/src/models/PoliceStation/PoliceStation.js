import mongoose from "mongoose";
import Roles from "../../enum/roles.js";

const policeStationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    stationCode: {
      type: String,
      unique: true, // Unique code for identification
      required: true,
    },

    contactNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    // GeoJSON for nearest police station search
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

 

    // Role (to identify station in system)
    role: {
      type: Number,
      enum: Object.values(Roles),
      default: Roles.POLICE,
    },

    // Availability (open / closed / busy)
    availability: {
      type: String,
      enum: ["Available", "Busy", "Closed"],
      default: "Available",
    },

    // Station Image
    imageUrl: {
      type: String,
      required: true,
    },

    // Emergency cases handled by this police station
    emergenciesAssigned: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Emergency",
      },
    ],
  },
  { timestamps: true }
);

// Geo index for nearest police station queries
policeStationSchema.index({ location: "2dsphere" });

export default mongoose.model("PoliceStation", policeStationSchema);
