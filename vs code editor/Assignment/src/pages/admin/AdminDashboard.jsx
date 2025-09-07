
import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BACKEND_URL}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) { console.error(err); }
    };
    fetch();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-600">Total Users</div>
          <div className="text-2xl font-bold">{stats?.totalUsers ?? "-"}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-600">Total Stores</div>
          <div className="text-2xl font-bold">{stats?.totalStores ?? "-"}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-600">Total Ratings</div>
          <div className="text-2xl font-bold">{stats?.totalRatings ?? "-"}</div>
        </div>
      </div>
    </div>
  );
}
