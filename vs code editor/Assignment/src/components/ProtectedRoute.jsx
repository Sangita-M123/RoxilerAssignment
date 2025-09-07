// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ children, role }) {
//   const { user, loading } = useAuth();

//   // Show simple loader if auth status is still being checked
//   if (loading) {
//     return <div className="text-center p-4">Loading...</div>;
//   }

//   // If not logged in, redirect to login page
//   if (!user) {
//      return <Navigate to="/login" />
//   }

//   // If role is required and doesn't match, redirect to home
//   if (role && user.role !== role) return <Navigate to="/" />

//   // Otherwise, render the protected content
//   return children;
// }
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;  // wait until user is loaded

  if (!user) return <Navigate to="/login" />; // if no user → redirect to login

  if (role && user.role !== role) return <Navigate to="/" />; // role mismatch → redirect to home

  return children;
}

