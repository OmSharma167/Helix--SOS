import React, { useEffect, useState } from "react";
import { CalendarDays, Clock, Hospital, XCircle } from "lucide-react";
import { getMyHospitalBookings, cancelHospitalBooking } from "./HospitalAPI.js";
import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";

const StatusPill = ({ status }) => {
  const map = {
    Pending: "bg-yellow-100 text-yellow-800",
    Confirmed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
    Completed: "bg-blue-100 text-blue-800",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        map[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};

const MyHospitalBookings = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getMyHospitalBookings(); // { success, data: [...] }
      setBookings(res?.data || []);
    } catch (e) {
      console.error(e);
      alert(e.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const onCancel = async (id) => {
    if (!confirm("Cancel this appointment?")) return;
    try {
      await cancelHospitalBooking(id);
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (e) {
      console.error(e);
      alert(e.message || "Failed to cancel booking");
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (!bookings.length)
    return (
      <EmptyState
        message="You don't have any appointments yet."
        actionText={null}
      />
    );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">My Appointments</h2>

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          >
            <div className="flex items-start gap-3">
              <img
                src={
                  b.hospital?.imageUrl ||
                  "https://placehold.co/96x64?text=Hospital"
                }
                alt={b.hospital?.name}
                className="w-24 h-16 object-cover rounded"
              />
              <div>
                <div className="flex items-center gap-2">
                  <Hospital className="h-4 w-4 text-blue-600" />
                  <h3 className="font-semibold">{b.hospital?.name}</h3>
                  <StatusPill status={b.status} />
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>
                      {new Date(b.appointmentDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{b.appointmentTime}</span>
                  </div>
                  {Array.isArray(b.selectedServices) &&
                    b.selectedServices.length > 0 && (
                      <div className="mt-1">
                        <span className="text-xs text-gray-500">Services:</span>{" "}
                        {b.selectedServices.join(", ")}
                      </div>
                    )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {(b.status === "Pending" || b.status === "Confirmed") && (
                <button
                  onClick={() => onCancel(b._id)}
                  className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-1"
                >
                  <XCircle className="h-4 w-4" />
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHospitalBookings;
