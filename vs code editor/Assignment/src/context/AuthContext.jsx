// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const AuthContext = createContext();
// const BACKEND_URL = "http://localhost:5000"; // direct URL here

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const userData = localStorage.getItem("user");
//     if (userData) setUser(JSON.parse(userData));
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const res = await axios.post(`${BACKEND_URL}/api/auth/login`, { email, password });
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       setUser(res.data.user);
//       return { ok: true };
//     } catch (err) {
//       return { ok: false, message: err.response?.data?.message || "Login failed" };
//     }
//   };

//   const signup = async (payload) => {
//     try {
//       const res = await axios.post(`${BACKEND_URL}/api/auth/signup`, payload);
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       setUser(res.data.user);
//       return { ok: true };
//     } catch (err) {
//       return { ok: false, message: err.response?.data?.message || "Signup failed" };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   const refreshUser = async () => {
//     const token = localStorage.getItem("token");
//     if (!token || !user) return;

//     try {
//       const res = await axios.get(`${BACKEND_URL}/api/users/${user.id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data);
//       localStorage.setItem("user", JSON.stringify(res.data));
//     } catch (err) {
//       console.error("Refresh failed:", err);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
const BACKEND_URL = "http://localhost:5000";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/auth/login`, { email, password });
    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);  // <-- This makes Navbar update instantly
      return { ok: true };
    }
    return { ok: false, message: "Login failed" };
  } catch (err) {
    return { ok: false, message: err.response?.data?.message || "Login failed" };
  }
};

const signup = async (data) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/auth/signup`, data);
    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);  // <-- This fixes navbar issue too
      return { ok: true };
    }
    return { ok: false, message: "Signup failed" };
  } catch (err) {
    return { ok: false, message: err.response?.data?.message || "Signup failed" };
  }
};


  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
