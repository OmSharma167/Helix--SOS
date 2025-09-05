
import mongoose from "mongoose";
import Roles from "../../enum/roles.js";


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      enum: Object.values(Roles),
      default: Roles.USER,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
