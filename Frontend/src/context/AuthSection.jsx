

// import React from "react";
// import { Users } from "lucide-react";
// import { useAuth } from "../context/AuthContext";

// // Mapping backend roles to display names for better UX
// const roleDisplayNames = {
//   0: "User",
//   1: "Doctor",
//   2: "Ambulance",
//   3: "Police",
//   4: "Hospital",
//   5: "Fire",
// };

// const AuthSection = () => {
//   const { user, login, logout } = useAuth();

//   // If no user is logged in, show login prompt
//   if (!user) {
//     return (
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               <Users className="h-5 w-5 text-blue-600" />
//               <span className="font-medium">Guest Mode</span>
//             </div>
//           </div>
//           <div className="flex space-x-2">
//             <button
//               onClick={() => (window.location.href = "/login")}
//               className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
//             >
//               Login
//             </button>
//             <button
//               onClick={() => (window.location.href = "/register")}
//               className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
//             >
//               Register
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Display role-based UI for logged-in users
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-2">
//             <Users className="h-5 w-5 text-blue-600" />
//             <span className="font-medium">
//               {roleDisplayNames[user.role] || "User"} Mode
//             </span>
//           </div>
//         </div>
//         <div className="flex space-x-2">
//           <button
//             onClick={() => logout()}
//             className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
//           >
//             Logout
//           </button>
//           {user.role === 4 && (
//             <button
//               onClick={() => login({ ...user, role: 4 })} // Keep hospital role
//               className="px-4 py-2 rounded-md bg-green-600 text-white"
//             >
//               Hospital Dashboard
//             </button>
//           )}
//           <button
//             onClick={() => login({ ...user, role: 0 })} // Switch to user role
//             className={`px-4 py-2 rounded-md ${
//               user.role === 0
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             User View
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthSection;


import React, { useState } from "react";
import { Users } from "lucide-react";
import { useAuth } from "./AuthContext";

// Mapping backend roles to display names for better UX
const roleDisplayNames = {
  0: "User",
  1: "Doctor",
  2: "Ambulance",
  3: "Police",
  4: "Hospital",
  5: "Fire",
};

const AuthSection = () => {
  const { user, logout } = useAuth();
  const [activeRole, setActiveRole] = useState(user ? user.role : 0); // Default to USER role

  // Update activeRole when user changes
  React.useEffect(() => {
    if (user) {
      setActiveRole(user.role);
    } else {
      setActiveRole(0); // Guest defaults to USER view
    }
  }, [user]);

  // If no user is logged in, show login prompt
  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Guest Mode</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => (window.location.href = "/login")}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Login
            </button>
            <button
              onClick={() => (window.location.href = "/register")}
              className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle role switching (client-side only, no API call)
  const switchRole = (role) => {
    setActiveRole(role);
  };

  // Display role-based UI for logged-in users
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="font-medium">
              {roleDisplayNames[activeRole] || "User"} Mode
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => logout()}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </button>
          {user.role === 4 && (
            <button
              onClick={() => switchRole(4)} // Switch to HOSPITAL role
              className={`px-4 py-2 rounded-md ${
                activeRole === 4
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Hospital Dashboard
            </button>
          )}
          <button
            onClick={() => switchRole(0)} // Switch to USER role
            className={`px-4 py-2 rounded-md ${
              activeRole === 0
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            User View
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthSection;