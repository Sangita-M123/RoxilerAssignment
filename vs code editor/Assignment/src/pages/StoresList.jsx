
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RatingStars from "../components/RatingStars";

const BACKEND_URL = "http://localhost:5000";

export default function StoresList() {
  const [query, setQuery] = useState("");
  const [stores, setStores] = useState([]);

  const fetchStores = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BACKEND_URL}/api/stores?query=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStores(res.data);
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  useEffect(() => { fetchStores(); }, [query]);

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name or address" className="border p-2 rounded flex-1" />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {stores.length === 0 ? (
          <div className="text-center text-gray-500 p-6 bg-white rounded shadow">No stores found</div>
        ) : (
          stores.map(store => (
            <div key={store.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
              <div>
                <Link to={`/stores/${store.id}`} className="text-lg font-semibold">{store.name}</Link>
                <div className="text-sm text-gray-600">{store.address || "-"}</div>
                <div className="mt-2 flex items-center gap-2">
                  <RatingStars value={Math.round(store.rating_avg) || 0} readonly />
                  <span className="text-sm text-gray-600">{(store.rating_avg||0).toFixed(1)} ({store.rating_count})</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm">Your rating</div>
                <div className="mt-2">
                  <Link to={`/stores/${store.id}`} className="text-blue-600">Rate / View</Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
