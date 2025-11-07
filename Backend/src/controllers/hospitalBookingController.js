import HospitalBooking from "../models/Hospital/HospitalBooking.js";
import Hospital from "../models/Hospital/Hospital.js";
import User from "../models/User/User.js";

// ✅ Create booking
export const createHospitalBooking = async (req, res) => {
  try {
    const {
      hospitalId,
      selectedServices,
      appointmentDate,
      appointmentTime,
      reason,
    } = req.body;
    const userId = req.user._id;

    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res
        .status(404)
        .json({ success: false, message: "Hospital not found" });
    }

    const newBooking = await HospitalBooking.create({
      user: userId,
      hospital: hospitalId,
      selectedServices,
      appointmentDate,
      appointmentTime,
      reason,
    });

    res.status(201).json({
      success: true,
      message: "Hospital booking created successfully",
      data: newBooking,
    });
  } catch (error) {
    console.error("Error creating hospital booking:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get bookings for logged-in user
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await HospitalBooking.find({ user: req.user._id })
      .populate("hospital", "name address contactNumber imageUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get bookings for a hospital
export const getHospitalBookings = async (req, res) => {
  try {
    const hospitalId = req.params.hospitalId;
    const bookings = await HospitalBooking.find({ hospital: hospitalId })
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error("Error fetching hospital bookings:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Update booking status (hospital side)
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const validStatuses = ["Pending", "Confirmed", "Cancelled", "Completed"];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const booking = await HospitalBooking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Delete booking (user can cancel)
export const deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await HospitalBooking.findById(bookingId);

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    // Only allow the user who created or admin to delete
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await booking.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
