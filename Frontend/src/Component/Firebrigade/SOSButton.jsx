

// src/components/SOSButton.jsx
import React from "react";
import { sendSOS } from "../../services/firebrigadeService";

const SOSButton = () => {
  const handleSOS = async () => {
    try {
      const userLocation = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) =>
            resolve({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            }),
          (err) => reject(err)
        );
      });

      await sendSOS(userLocation);
      alert("🚨 SOS sent to nearest fire brigade!");
    } catch (err) {
      console.error("Error sending SOS:", err);
      alert("Failed to send SOS. Try again.");
    }
  };

  return (
    <button
      onClick={handleSOS}
      className="fixed bottom-6 right-6 bg-red-600 text-white px-14 py-5 rounded-full shadow-lg hover:bg-red-700 transition"
    >
      🚨 Send SOS
    </button>
  );
};

export default SOSButton;


// // src/components/SOSButton.jsx - No changes needed, but ensured consistency
// import React from "react";
// import { sendSOS } from "../../services/firebrigadeService";

// const SOSButton = () => {
//   const handleSOS = async () => {
//     try {
//       const userLocation = await new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(
//           (pos) =>
//             resolve({
//               latitude: pos.coords.latitude,
//               longitude: pos.coords.longitude,
//             }),
//           (err) => reject(err)
//         );
//       });
//       await sendSOS(userLocation);
//       alert("🚨 SOS sent to nearest fire brigade!");
//     } catch (err) {
//       console.error("Error sending SOS:", err);
//       alert("Failed to send SOS. Try again.");
//     }
//   };

//   return (
//     <button
//       onClick={handleSOS}
//       className="fixed bottom-6 right-6 bg-red-600 text-white px-14 py-5 rounded-full shadow-lg hover:bg-red-700 transition"
//     >
//       🚨 Send SOS
//     </button>
//   );
// };

// export default SOSButton;