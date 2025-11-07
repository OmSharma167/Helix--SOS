// import React from "react";
// import { useAuth } from "../context/AuthContext";

// const Navigation = () => {
//   const { user, activeRole, switchRole, logout } = useAuth();

//   return (
//     <nav className="bg-red-600 shadow-lg">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <span className="text-white text-xl font-bold">FireRescue</span>
//           </div>

//           {/* Navigation Links */}
//           <div className="flex items-center space-x-4">
//             {user ? (
//               <>
//                 {/* Role Switch for Firebrigade Users */}
//                 {user.role === 5 && (
//                   <div className="flex items-center space-x-2">
//                     <span className="text-red-100 text-sm">View as:</span>
//                     <select
//                       value={activeRole}
//                       onChange={(e) => switchRole(parseInt(e.target.value))}
//                       className="bg-red-700 text-white border border-red-500 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-300"
//                     >
//                       <option value={0}>User</option>
//                       <option value={5}>Firebrigade</option>
//                     </select>
//                   </div>
//                 )}

//                 {/* Firebrigade Dashboard Link */}
//                 {activeRole === 5 && (
//                   <a
//                     href="/firebrigade/dashboard"
//                     className="text-red-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//                   >
//                     Dashboard
//                   </a>
//                 )}

//                 {/* User Menu */}
//                 <div className="relative group">
//                   <button className="text-red-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
//                     {user.name}
//                     <svg
//                       className="ml-1 h-4 w-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </svg>
//                   </button>
//                   <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                     <a
//                       href="/profile"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
//                     >
//                       Profile
//                     </a>
//                     {activeRole === 0 && user.role === 5 && (
//                       <a
//                         href="/firebrigade/dashboard"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
//                       >
//                         Firebrigade Dashboard
//                       </a>
//                     )}
//                     <button
//                       onClick={logout}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <div className="flex items-center space-x-2">
//                 <a
//                   href="/login"
//                   className="text-red-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//                 >
//                   Login
//                 </a>
//                 <a
//                   href="/signup"
//                   className="bg-red-700 text-white hover:bg-red-800 px-3 py-2 rounded-md text-sm font-medium"
//                 >
//                   Sign Up
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navigation;


// src/components/Navigation.js - Minor adjustment for role switching (already mostly correct, but ensured consistency)
import React from "react";
import { useAuth } from "../context/AuthContext";

const Navigation = () => {
  const { user, activeRole, switchRole, logout } = useAuth();

  return (
    <nav className="bg-red-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-white text-xl font-bold">FireRescue</span>
          </div>
          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Role Switch for Firebrigade Users */}
                {user.role === 5 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-red-100 text-sm">View as:</span>
                    <select
                      value={activeRole}
                      onChange={(e) => switchRole(parseInt(e.target.value))}
                      className="bg-red-700 text-white border border-red-500 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-300"
                    >
                      <option value={0}>User</option>
                      <option value={5}>Firebrigade</option>
                    </select>
                  </div>
                )}
                {/* Firebrigade Dashboard Link */}
                {activeRole === 5 && (
                  <a
                    href="/firebrigade/dashboard"
                    className="text-red-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </a>
                )}
                {/* User Menu */}
                <div className="relative group">
                  <button className="text-red-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    {user.name}
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
                    >
                      Profile
                    </a>
                    {activeRole === 0 && user.role === 5 && (
                      <a
                        href="/firebrigade/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
                      >
                        Firebrigade Dashboard
                      </a>
                    )}
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <a
                  href="/login"
                  className="text-red-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="bg-red-700 text-white hover:bg-red-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;