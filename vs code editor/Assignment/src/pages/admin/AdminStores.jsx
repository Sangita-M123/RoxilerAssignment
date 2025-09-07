
import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

export default function AdminStores() {
  const [stores, setStores] = useState([]);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", address: "", ownerUserId: "" });
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const load = async () => {
    try {
      const [resStores, resUsers] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/stores`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${BACKEND_URL}/api/users`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setStores(resStores.data);
      setUsers(resUsers.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { load(); }, []);

  const onCreate = async (e) => {
    e.preventDefault();
    if (!form.name) return alert("Store name required");

    try {
      await axios.post(`${BACKEND_URL}/api/stores`, form, { headers: { Authorization: `Bearer ${token}` } });
      alert("Store created successfully!");
      setForm({ name: "", email: "", address: "", ownerUserId: "" });
      setCreating(false);
      load();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create store");
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete store?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/stores/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      load();
    } catch (err) {
      console.error(err);
      alert("Failed to delete store");
    }
  };

  const onEdit = async (s) => {
    const newName = prompt("Store name", s.name);
    if (!newName) return;
    try {
      await axios.put(`${BACKEND_URL}/api/stores/${s.id}`, { name: newName }, { headers: { Authorization: `Bearer ${token}` } });
      load();
    } catch (err) { alert("Failed to update store"); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Stores</h2>
        <button onClick={() => setCreating(c => !c)} className="px-3 py-1 border rounded">{creating ? "Close" : "Create store"}</button>
      </div>

      {creating && (
        <form onSubmit={onCreate} className="bg-white p-4 rounded shadow mb-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Store name" className="border p-2" required />
            <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Store email" className="border p-2" />
            <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Address" className="border p-2" />
            <select value={form.ownerUserId} onChange={e => setForm({ ...form, ownerUserId: e.target.value })} className="border p-2">
              <option value="">Select owner (optional)</option>
              {users.filter(u => u.role === "owner").map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
            </select>
          </div>
          <div className="mt-3"><button className="bg-green-600 text-white px-4 py-2 rounded">Create</button></div>
        </form>
      )}

      <div className="bg-white rounded shadow overflow-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100"><tr><th className="p-2">Name</th><th className="p-2">Email</th><th className="p-2">Address</th><th className="p-2">Rating</th><th className="p-2">Owner</th><th className="p-2">Actions</th></tr></thead>
          <tbody>
            {stores.map(s => {
              const owner = users.find(u => u.id === s.ownerUserId);
              return (
                <tr key={s.id} className="border-t">
                  <td className="p-2">{s.name}</td>
                  <td className="p-2">{s.email || "-"}</td>
                  <td className="p-2">{s.address || "-"}</td>
                  <td className="p-2">{(s.rating_avg||0).toFixed(1)} ({s.rating_count||0})</td>
                  <td className="p-2">{owner?.name || "-"}</td>
                  <td className="p-2">
                    <button onClick={() => onEdit(s)} className="px-2 py-1 mr-2 border rounded">Edit</button>
                    <button onClick={() => onDelete(s.id)} className="px-2 py-1 border rounded text-red-600">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
