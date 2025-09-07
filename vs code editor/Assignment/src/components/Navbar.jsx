import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const onLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center text-white">
        {/* Brand */}
        <Link to="/" className="font-extrabold text-xl tracking-wide hover:opacity-90 transition">
          Store Ratings
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/dashboard" className="px-3 py-1 rounded-full hover:bg-white hover:text-blue-700 transition text-sm font-medium">
                Dashboard
              </Link>
              <Link to="/stores" className="px-3 py-1 rounded-full hover:bg-white hover:text-blue-700 transition text-sm font-medium">
                Stores
              </Link>

              {user.role === "admin" && (
                <>
                  <Link to="/admin/users" className="px-3 py-1 rounded-full hover:bg-white hover:text-blue-700 transition text-sm font-medium">
                    Manage Users
                  </Link>
                  <Link to="/admin/stores" className="px-3 py-1 rounded-full hover:bg-white hover:text-blue-700 transition text-sm font-medium">
                    Manage Stores
                  </Link>
                </>
              )}

              {user.role === "owner" && (
                <Link to="/owner" className="px-3 py-1 rounded-full hover:bg-white hover:text-blue-700 transition text-sm font-medium">
                  Owner Dashboard
                </Link>
              )}

              <Link to="/change-password" className="px-3 py-1 rounded-full hover:bg-white hover:text-blue-700 transition text-sm font-medium">
                Change Password
              </Link>

              {/* User Info */}
              <span className="text-sm font-semibold px-3 py-1 bg-white/20 rounded-full">
                {user.name} ({user.role})
              </span>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="px-4 py-1 bg-red-500 hover:bg-red-600 rounded-full text-sm font-semibold transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 rounded-full hover:bg-white hover:text-blue-700 transition text-sm font-medium">
                Login
              </Link>
              <Link to="/signup" className="px-3 py-1 rounded-full hover:bg-white hover:text-blue-700 transition text-sm font-medium">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
