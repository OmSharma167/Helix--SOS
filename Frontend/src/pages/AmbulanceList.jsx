import React, { useEffect, useState } from "react";
import api from "../api/api";
import AmbulanceCard from "../components/AmbulanceCard";

export default function AmbulanceList() {
  const [ambulances, setAmbulances] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/ambulances");
        setAmbulances(data.data || data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-4">
      <h2 className="text-2xl font-semibold">All Ambulances</h2>
      {loading ? (
        <p>Loading...</p>
      ) : ambulances.length === 0 ? (
        <p>No ambulances found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {ambulances.map((a) => (
            <AmbulanceCard key={a._id} ambulance={a} />
          ))}
        </div>
      )}
    </div>
  );
}
