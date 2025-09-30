
import mongoose from "mongoose";
import Roles from "../../enum/roles.js";


const firebrigadeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
    role: {
      type: Number,
      enum: Object.values(Roles),
      default: Roles.FIRE,
    },
    availability: {
      type: String,
      enum: ["Available", "Not Available"],
      default: "Available",
    },
    imageUrl: {
      type: String,
      required: true,
    },
    gallery: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

// Geo index for nearest firebrigade queries
firebrigadeSchema.index({ location: "2dsphere" });

export default mongoose.model("Firebrigade", firebrigadeSchema);
