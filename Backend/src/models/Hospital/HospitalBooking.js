import mongoose from "mongoose";

const hospitalBookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    selectedServices: [
      {
        type: String,
        required: true,
      },
    ],
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
    },
  },
  { timestamps: true }
);

export default mongoose.model("HospitalBooking", hospitalBookingSchema);
