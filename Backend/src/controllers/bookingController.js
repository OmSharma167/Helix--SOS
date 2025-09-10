import Booking from "../models/Booking/Booking.js";
import Doctor from "../models/doctorModel/DoctorInformation.js";

export const createBooking = async (req, res) => {
  try {
    const { doctorId, appointmentDate, reason } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    const booking = await Booking.create({
      userId: req.user._id,
      doctorId,
      appointmentDate,
      reason,
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      booking,
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get bookings for logged-in user
// @route GET /api/bookings/my
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      // .populate("doctorId", "specialization price location")
      .populate("doctorId", "name specialization price location")
      .populate("userId", "name email");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};




export const getDoctorBookings = async (req, res) => {
  try {

    // 1️⃣ Find doctor profile for logged-in user
    const doctor = await Doctor.findOne({ userId: req.user._id });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    // 2️⃣ Fetch bookings using doctor._id
    const bookings = await Booking.find({ doctorId: doctor._id })
      .populate("userId", "name email phone address")
      .populate("doctorId", "specialization price location");


    res.json(bookings);
  } catch (error) {
    console.error("DoctorBookings Error:", error);
    res.status(500).json({ message: "Failed to fetch doctor bookings" });
  }
};




export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Only allow Confirmed or Cancelled
    if (!["Confirmed", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // 1️⃣ Find doctor profile for logged-in user
    const doctor = await Doctor.findOne({ userId: req.user._id });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    // 2️⃣ Find the booking
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 3️⃣ Ensure booking belongs to this doctor
    if (booking.doctorId.toString() !== doctor._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this booking" });
    }

    // 4️⃣ Update status
    booking.status = status;
    await booking.save();

    res.json({
      message: `Booking ${status.toLowerCase()} successfully`,
      booking,
    });
  } catch (error) {
    console.error("UpdateBookingStatus Error:", error);
    res.status(500).json({ message: "Failed to update booking" });
  }
};
