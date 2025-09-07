
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

export default function OwnerRaters() {
  const { storeId } = useParams();
  const [raters, setRaters] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BACKEND_URL}/api/owner/stores/${storeId}/raters`, { headers: { Authorization: `Bearer ${token}` } });
        setRaters(res.data);
      } catch (err) { console.error(err); }
    };
    if (storeId) fetch();
  }, [storeId]);

  return (
    <div>
      <h2 className="text-xl mb-4">Raters for store</h2>
      <div className="bg-white rounded shadow overflow-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100"><tr><th className="p-2">Name</th><th className="p-2">Email</th><th className="p-2">Score</th><th className="p-2">Updated</th></tr></thead>
          <tbody>
            {raters.map(r => (
              <tr key={r.id || r.user_id} className="border-t">
                <td className="p-2">{r.user?.name || r.name}</td>
                <td className="p-2">{r.user?.email || r.email}</td>
                <td className="p-2">{r.score}</td>
                <td className="p-2">{r.updatedAt ? new Date(r.updatedAt).toLocaleString() : '-'}</td>
              </tr>
            ))}
            {raters.length === 0 && <tr><td colSpan="4" className="p-4 text-center text-gray-500">No raters yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
