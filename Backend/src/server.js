import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import ambulanceRoutes from "./routes/ambulanceRoutes.js";
import emergencyRoutes from "./routes/emergencyRoutes.js";
import policeStationRoutes from "./routes/policeStationRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/ambulances", ambulanceRoutes);
app.use("/api/emergencies", emergencyRoutes);
app.use("/api/police-stations", policeStationRoutes);
app.use("/api/hospitals", hospitalRoutes);


// Database connection
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
