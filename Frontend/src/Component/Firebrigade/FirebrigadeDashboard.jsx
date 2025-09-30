// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000");

// const ProviderDashboard = ({ providerId }) => {
//   const [sosRequests, setSosRequests] = useState([]);

//   useEffect(() => {
//     socket.emit("joinProviderRoom", providerId);

//     socket.on("newSOS", (sos) => {
//       // Show only if this provider is in nearestProviders
//       const isForMe = sos.nearestProviders.some(
//         (p) => p.providerId === providerId
//       );
//       if (isForMe) setSosRequests((prev) => [...prev, sos]);
//     });

//     return () => socket.off("newSOS");
//   }, [providerId]);

//   const handleResponse = (sosId, status) => {
//     socket.emit("respondSOS", { sosId, providerId, status });
//     setSosRequests((prev) =>
//       prev.map((s) =>
//         s._id === sosId
//           ? { ...s, nearestProviders: [{ providerId, status }] }
//           : s
//       )
//     );
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Incoming SOS Requests</h2>
//       {sosRequests.length === 0 && <p>No SOS requests</p>}
//       {sosRequests.map((sos) => (
//         <div key={sos._id} className="border p-4 mb-4 rounded shadow">
//           <p>
//             User Location: {sos.location.coordinates[1]},{" "}
//             {sos.location.coordinates[0]}
//           </p>
//           <div className="mt-2 space-x-2">
//             <button
//               className="bg-green-600 text-white px-3 py-1 rounded"
//               onClick={() => handleResponse(sos._id, "Accepted")}
//             >
//               Accept
//             </button>
//             <button
//               className="bg-red-600 text-white px-3 py-1 rounded"
//               onClick={() => handleResponse(sos._id, "Rejected")}
//             >
//               Reject
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProviderDashboard;


import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../../context/AuthContext";

const socket = io("http://localhost:5000");

const ProviderDashboard = () => {
  const { user, activeRole } = useAuth(); // Get logged-in user
  const [sosRequests, setSosRequests] = useState([]);

  const providerId = user?._id; // Firebrigade's ID

  useEffect(() => {
    if (!providerId) return;

    // Join provider room
    socket.emit("joinProviderRoom", providerId);

    // Listen for new SOS requests
    socket.on("newSOS", (sos) => {
      const isForMe = sos.nearestProviders.some(
        (p) => p.providerId === providerId
      );
      if (isForMe) setSosRequests((prev) => [...prev, sos]);
    });

    return () => {
      socket.off("newSOS");
      socket.emit("leaveProviderRoom", providerId); // optional cleanup
    };
  }, [providerId]);

  const handleResponse = (sosId, status) => {
    socket.emit("respondSOS", { sosId, providerId, status });
    setSosRequests((prev) =>
      prev.map((s) =>
        s._id === sosId
          ? {
              ...s,
              nearestProviders: s.nearestProviders.map((p) =>
                p.providerId === providerId ? { ...p, status } : p
              ),
            }
          : s
      )
    );
  };

  if (!user) return <p>Loading dashboard...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Welcome, {user.name} - Incoming SOS Requests
      </h2>
      {sosRequests.length === 0 && <p>No SOS requests</p>}
      {sosRequests.map((sos) => (
        <div key={sos._id} className="border p-4 mb-4 rounded shadow">
          <p>
            User Location: {sos.location.coordinates[1]},{" "}
            {sos.location.coordinates[0]}
          </p>
          <div className="mt-2 space-x-2">
            <button
              className="bg-green-600 text-white px-3 py-1 rounded"
              onClick={() => handleResponse(sos._id, "Accepted")}
            >
              Accept
            </button>
            <button
              className="bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => handleResponse(sos._id, "Rejected")}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProviderDashboard;
