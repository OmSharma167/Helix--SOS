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
import reviewRoutes from "./routes/reviewRoutes.js";
import hospitalReviewRoutes from "./routes/hospitalReviewRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import fireBrigadeRoutes from "./routes/fireBrigadeRoutes.js";


import http from "http";
import { Server } from "socket.io";





dotenv.config();
const app = express();


const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use((req, res, next) => {
  req.io = io; // attach io to request object
  next();
});

// Socket.io events
io.on("connection", (socket) => {
  console.log("Provider connected:", socket.id);

  // Join a room for a provider (room = providerId)
  socket.on("joinProviderRoom", (providerId) => {
    socket.join(providerId);
  });

  // Accept/Reject SOS
  socket.on("respondSOS", async ({ sosId, providerId, status }) => {
    const SOSRequest = require("./models/FireBrigade/SOSRequest.js").default;
    const sos = await SOSRequest.findById(sosId);
    if (!sos) return;

    const providerEntry = sos.nearestProviders.find((p) => p.providerId.toString() === providerId);
    if (providerEntry) {
      providerEntry.status = status;
      await sos.save();

      // Notify user or other providers if needed
      io.to(providerId).emit("sosResponseUpdate", sos);
    }
  });

  socket.on("disconnect", () => {
    console.log("Provider disconnected:", socket.id);
  });
});



// Middleware
app.use(cors());
// app.use(
//   cors({
//     origin: ["https://helix-sos.vercel.app"], // frontend domain
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/bookings", bookingRoutes);
// app.use("/api/ambulances", ambulanceRoutes);
app.use("/api/ambulances", ambulanceRoutes);
app.use("/api/emergencies", emergencyRoutes);
app.use("/api/police-stations", policeStationRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/hospital-reviews", hospitalReviewRoutes);
// app.use("/api/upload", uploadRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/api/fire-brigades", fireBrigadeRoutes);


// Database connection
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Start server

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

