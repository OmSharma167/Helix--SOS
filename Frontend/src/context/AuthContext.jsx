

// // import React, { createContext, useContext, useState, useEffect } from "react";

// // import { loginUser, signupUser,me } from "../services/authService";

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       const token = localStorage.getItem("token");
// //       if (token) {
// //         try {
// //           const res = await me();
// //           // setUser(res);
// //           setUser({ ...res, token });
// //         } catch (err) {
// //           console.error("Auto-login failed:", err);
// //           localStorage.removeItem("token");
// //         }
// //       }
// //     };
// //     fetchUser();
// //   }, []);

// //   const login = async (credentials) => {
// //     try {
// //       const res = await loginUser(credentials);
// //       setUser(res); // ✅ store entire user object
// //       localStorage.setItem("token", res.token);
// //       window.location.href = "/";
// //     } catch (error) {
// //       alert(error.response?.data?.message || "Login failed");
// //     }
// //   };

// //   const signup = async (userData) => {
// //     try {
// //       const res = await signupUser(userData);
// //       setUser(res); // ✅ store entire user object
// //       localStorage.setItem("token", res.token);
// //       window.location.href = "/";
// //     } catch (error) {
// //       alert(error.response?.data?.message || "Signup failed");
// //     }
// //   };

// //   const logout = () => {
// //     setUser(null);
// //     localStorage.removeItem("token");
// //     window.location.href = "/login";
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, login, signup, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);



// import React, { createContext, useContext, useState, useEffect } from "react";
// import { loginUser, signupUser, me } from "../services/authService";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeRole, setActiveRole] = useState(0); // Default to USER role

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         try {
//           const res = await me();
//           setUser({ ...res, token });
//           setActiveRole(res.role); // Set initial active role to user's actual role
//         } catch (err) {
//           console.error("Auto-login failed:", err);
//           localStorage.removeItem("token");
//         }
//       }
//       setLoading(false);
//     };
//     fetchUser();
//   }, []);

//   const login = async (credentials) => {
//     try {
//       const res = await loginUser(credentials);
//       setUser(res);
//       setActiveRole(res.role); // Set active role on login
//       localStorage.setItem("token", res.token);
//       window.location.href = "/";
//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//     }
//   };

//   const signup = async (userData) => {
//     try {
//       const res = await signupUser(userData);
//       setUser(res);
//       setActiveRole(res.role); // Set active role on signup
//       localStorage.setItem("token", res.token);
//       window.location.href = "/";
//     } catch (error) {
//       alert(error.response?.data?.message || "Signup failed");
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setActiveRole(0); // Reset to USER role
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   };

//   const switchRole = (role) => {
//     if (user && (role === 0 || (role === 4 && user.role === 4))) {
//       setActiveRole(role);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, login, signup, logout, loading, activeRole, switchRole }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);




// src/context/AuthContext.js - Fixed switchRole to support FIRE role (5)
import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, signupUser, me } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeRole, setActiveRole] = useState(0); // Default to USER role

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await me();
          setUser({ ...res, token });
          setActiveRole(res.role); // Set initial active role to user's actual role
        } catch (err) {
          console.error("Auto-login failed:", err);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (credentials) => {
    try {
      const res = await loginUser(credentials);
      setUser(res);
      setActiveRole(res.role); // Set active role on login
      localStorage.setItem("token", res.token);
      window.location.href = "/";
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const signup = async (userData) => {
    try {
      const res = await signupUser(userData);
      setUser(res);
      setActiveRole(res.role); // Set active role on signup
      localStorage.setItem("token", res.token);
      window.location.href = "/";
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  const logout = () => {
    setUser(null);
    setActiveRole(0); // Reset to USER role
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const switchRole = (role) => {
    if (user && (role === 0 || role === user.role)) {
      setActiveRole(role);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, loading, activeRole, switchRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);