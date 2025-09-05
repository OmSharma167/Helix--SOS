import Booking from "../models/Booking/Booking.js";
import Doctor from "../models/doctorModel/DoctorInformation.js";

// @desc Book a doctor appointment
// @route POST /api/bookings
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
      .populate("doctorId", "specialization price location")
      .populate("userId", "name email");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// @desc Get bookings for a doctor
// @route GET /api/bookings/doctor
export const getDoctorBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ doctorId: req.user._id })
      .populate("userId", "name email")
      .populate("doctorId", "specialization");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctor bookings" });
  }
};

// @desc Update booking status (doctor only)
// @route PUT /api/bookings/:id/status
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status || booking.status;
    await booking.save();

    res.json({ message: "Booking updated", booking });
  } catch (error) {
    res.status(500).json({ message: "Failed to update booking" });
  }
};
