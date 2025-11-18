import mongoose from "mongoose";
import Roles from "../../enum/roles.js";

const ambulanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driverName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
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
    role: {
      type: Number,
      enum: Object.values(Roles),
      default: Roles.AMBULANCE,
    },
    availability: {
      type: String,
      enum: ["Available", "Busy"],
      default: "Available",
    },
    imageUrl: {
      type: String, 
      default: "", 
    },
  },
  { timestamps: true }
);

// Add geospatial index for nearest search
ambulanceSchema.index({ location: "2dsphere" });

export default mongoose.model("Ambulance", ambulanceSchema);
