import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  User as UserIcon,
  CheckCircle2,
  XCircle,
  ClipboardCheck,
} from "lucide-react";
import {
  getHospitalBookings,
  updateHospitalBookingStatus,
} from "./HospitalAPI.js";
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

const HospitalBookingsDashboard = ({ hospitalId: hospitalIdProp }) => {
  const [hospitalId, setHospitalId] = useState(
    hospitalIdProp || localStorage.getItem("hospitalId") || ""
  );
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [saving, setSaving] = useState(null); // bookingId in-flight

  const load = async (hid) => {
    if (!hid) return;
    setLoading(true);
    try {
      const res = await getHospitalBookings(hid); // { success, data: [...] }
      setBookings(res?.data || []);
    } catch (e) {
      console.error(e);
      alert(e.message || "Failed to load hospital bookings");
    } finally {
      setLoading(false);
    }
  };

  const persistHospitalId = () => {
    if (!hospitalId) return alert("Enter a Hospital ID");
    localStorage.setItem("hospitalId", hospitalId);
    load(hospitalId);
  };

  const setStatus = async (id, status) => {
    setSaving(id);
    try {
      await updateHospitalBookingStatus(id, status);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    } catch (e) {
      console.error(e);
      alert(e.message || "Failed to update status");
    } finally {
      setSaving(null);
    }
  };

  useEffect(() => {
    if (hospitalId) load(hospitalId);
  }, [hospitalId]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h2 className="text-xl font-semibold">Hospital Appointments</h2>
        <div className="flex items-center gap-2">
          <input
            value={hospitalId}
            onChange={(e) => setHospitalId(e.target.value)}
            placeholder="Hospital ID (Mongo _id)"
            className="px-3 py-2 border rounded-md"
          />
          <button
            onClick={persistHospitalId}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Load
          </button>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : !bookings.length ? (
        <EmptyState message="No bookings found for this hospital." />
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b._id} className="border rounded-lg p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold">
                      {b.user?.name}{" "}
                      <span className="text-xs text-gray-500">
                        ({b.user?.phone || b.user?.email})
                      </span>
                    </span>
                    <StatusPill status={b.status} />
                  </div>

                  <div className="mt-1 text-sm text-gray-600">
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
                          <span className="text-xs text-gray-500">
                            Services:
                          </span>{" "}
                          {b.selectedServices.join(", ")}
                        </div>
                      )}
                    {b.reason && (
                      <div className="mt-1">
                        <span className="text-xs text-gray-500">Reason:</span>{" "}
                        {b.reason}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {b.status === "Pending" && (
                    <>
                      <button
                        disabled={saving === b._id}
                        onClick={() => setStatus(b._id, "Confirmed")}
                        className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-1 disabled:opacity-50"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Accept
                      </button>
                      <button
                        disabled={saving === b._id}
                        onClick={() => setStatus(b._id, "Cancelled")}
                        className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-1 disabled:opacity-50"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </button>
                    </>
                  )}

                  {b.status === "Confirmed" && (
                    <button
                      disabled={saving === b._id}
                      onClick={() => setStatus(b._id, "Completed")}
                      className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1 disabled:opacity-50"
                    >
                      <ClipboardCheck className="h-4 w-4" />
                      Mark Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HospitalBookingsDashboard;
