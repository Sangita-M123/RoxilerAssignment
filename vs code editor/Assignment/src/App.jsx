import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StoresList from "./pages/StoresList";
import StoreDetail from "./pages/StoreDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminStores from "./pages/admin/AdminStores";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import OwnerRaters from "./pages/owner/OwnerRaters";
import ChangePassword from "./pages/ChangePassword";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Store Routes */}
          <Route
            path="/stores"
            element={<ProtectedRoute><StoresList /></ProtectedRoute>}
          />
          <Route
            path="/stores/:id"
            element={<ProtectedRoute><StoreDetail /></ProtectedRoute>}
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}
          />
          <Route
            path="/admin/users"
            element={<ProtectedRoute role="admin"><AdminUsers /></ProtectedRoute>}
          />
          <Route
            path="/admin/stores"
            element={<ProtectedRoute role="admin"><AdminStores /></ProtectedRoute>}
          />

          {/* Owner Routes */}
          <Route
            path="/owner"
            element={<ProtectedRoute role="owner"><OwnerDashboard /></ProtectedRoute>}
          />
          <Route
            path="/owner/stores/:storeId/raters"
            element={<ProtectedRoute role="owner"><OwnerRaters /></ProtectedRoute>}
          />

          {/* Profile Routes */}
          <Route
            path="/change-password"
            element={<ProtectedRoute><ChangePassword /></ProtectedRoute>}
          />

          {/* Default Routes */}
          <Route
            path="/"
            element={<Navigate to={user ? "/stores" : "/login"} replace />}
          />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="*" element={<div className="p-8">404 - Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}
