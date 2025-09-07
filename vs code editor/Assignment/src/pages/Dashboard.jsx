
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) {
      nav("/login");
      return;
    }
    setUser(savedUser);
  }, [nav]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.name} ({user.role})</h2>

      <div className="flex gap-4 mb-4">
        {user.role === "admin" && (
          <>
            <button onClick={() => nav("/admin/users")} className="px-4 py-2 bg-blue-600 text-white rounded">Manage Users</button>
            <button onClick={() => nav("/admin/stores")} className="px-4 py-2 bg-green-600 text-white rounded">Manage Stores</button>
          </>
        )}

        {user.role === "owner" && (
          <button onClick={() => nav("/owner")} className="px-4 py-2 bg-yellow-500 text-white rounded">My Stores</button>
        )}

        {user.role === "user" && (
          <button onClick={() => nav("/stores")} className="px-4 py-2 bg-purple-600 text-white rounded">View & Rate Stores</button>
        )}

        <button onClick={() => { localStorage.clear(); nav("/login"); }} className="ml-auto px-4 py-2 bg-red-600 text-white rounded">Logout</button>
      </div>
    </div>
  );
}
