import mongoose from "mongoose";

// const sosRequestSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     location: {
//       type: { type: String, enum: ["Point"], default: "Point" },
//       coordinates: { type: [Number], required: true }, // [lng, lat]
//     },
//     nearestProviders: [
//       {
//         providerId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Firebrigade",
//         },
//         status: {
//           type: String,
//           enum: ["Pending", "Accepted", "Rejected"],
//           default: "Pending",
//         },
//       },
//     ],
//     status: {
//       type: String,
//       enum: ["Pending", "In Progress", "Completed"],
//       default: "Pending",
//     },
//   },
//   { timestamps: true }
// );

// sosRequestSchema.index({ location: "2dsphere" });

// export default mongoose.model("SOSRequest", sosRequestSchema);


const sosRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // <-- make optional
  },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true },
  },
  nearestProviders: [
    {
      providerId: { type: mongoose.Schema.Types.ObjectId, ref: "Firebrigade" },
      status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
      },
    },
  ],
});


sosRequestSchema.index({ location: "2dsphere" });

export default mongoose.model("SOSRequest", sosRequestSchema);