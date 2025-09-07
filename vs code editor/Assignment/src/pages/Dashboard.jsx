import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "http://localhost:5000";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) {
      nav("/login");
      return;
    }
    setUser(savedUser);

    // Fetch stats only for admin/owner dashboards
    const token = localStorage.getItem("token");
    if (savedUser.role !== "user") {
      axios
        .get(`${BACKEND_URL}/api/stores`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setStats({ totalStores: res.data.length }))
        .catch((err) => console.error("Error fetching stats:", err));
    }
  }, [nav]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    nav("/login");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        Welcome, {user.name} ({user.role})
      </h2>

      {/* MENU */}
      <div className="flex gap-4 mb-4">
        {user.role === "admin" && (
          <>
            <button
              onClick={() => nav("/admin/users")}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Manage Users
            </button>
            <button
              onClick={() => nav("/admin/stores")}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Manage Stores
            </button>
          </>
        )}

        {user.role === "owner" && (
          <>
            <button
              onClick={() => nav("/owner/stores")}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              My Stores
            </button>
          </>
        )}

        {user.role === "user" && (
          <>
            <button
              onClick={() => nav("/stores")}
              className="px-4 py-2 bg-purple-600 text-white rounded"
            >
              View & Rate Stores
            </button>
          </>
        )}

        <button
          onClick={handleLogout}
          className="ml-auto px-4 py-2 bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>

      {/* STATS SECTION */}
      {user.role !== "user" && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Statistics</h3>
          <p>Total Stores: {stats.totalStores || 0}</p>
        </div>
      )}
    </div>
  );
}
