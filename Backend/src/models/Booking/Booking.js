import mongoose from "mongoose";
import Roles from "../../enum/roles.js";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
    reason: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      enum: Object.values(Roles),
      default: Roles.USER, // booking always created by USER
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
