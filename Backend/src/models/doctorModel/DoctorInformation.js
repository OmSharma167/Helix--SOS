import mongoose from 'mongoose';
import User from '../User/User.js';

import mongoose from "mongoose";
import Roles from "./enum/roles.js";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    qualifications: {
      type: [String],
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    role: {
      type: Number,
      enum: Object.values(Roles),
      default: Roles.DOCTOR,
    },
    timing: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    certification: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    socialMedia: {
      type: String,
    },
    availability: {
      type: String,
      enum: ["Available", "Not Available"],
      default: "Available",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
