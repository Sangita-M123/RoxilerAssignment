// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const BACKEND_URL = "http://localhost:5000";

// export default function AdminStores() {
//   const [stores, setStores] = useState([]);
//   const [creating, setCreating] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");
//   const [ownerUserId, setOwnerUserId] = useState("");
//   const [users, setUsers] = useState([]);

//   const token = localStorage.getItem("token");

//   const load = async () => {
//     try {
//       const resStores = await axios.get(`${BACKEND_URL}/api/stores/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStores(resStores.data);

//       const resUsers = await axios.get(`${BACKEND_URL}/api/users`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(resUsers.data);
//     } catch (err) {
//       console.error("Failed to load stores/users:", err);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const onCreate = async (e) => {
//     e.preventDefault();
//     if (!name) return alert("Name required");

//     try {
//       await axios.post(
//         `${BACKEND_URL}/api/stores`,
//         { name, email, address, ownerUserId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Store created");
//       setName("");
//       setEmail("");
//       setAddress("");
//       setOwnerUserId("");
//       load();
//       setCreating(false);
//     } catch (err) {
//       alert("Failed to create store");
//     }
//   };

//   const onDelete = async (id) => {
//     if (!window.confirm("Delete store?")) return;
//     await axios.delete(`${BACKEND_URL}/api/stores/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     load();
//   };

//   const onEdit = async (s) => {
//     const newName = prompt("Store name", s.name);
//     if (newName) {
//       await axios.put(
//         `${BACKEND_URL}/api/stores/${s.id}`,
//         { name: newName },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       load();
//     }
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Stores</h2>
//         <button
//           onClick={() => setCreating((c) => !c)}
//           className="px-3 py-1 border rounded"
//         >
//           {creating ? "Close" : "Create store"}
//         </button>
//       </div>

//       {creating && (
//         <form onSubmit={onCreate} className="bg-white p-4 rounded shadow mb-4">
//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//             <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Store name" className="border p-2" />
//             <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Store email" className="border p-2" />
//             <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="border p-2" />
//             <select value={ownerUserId} onChange={(e) => setOwnerUserId(e.target.value)} className="border p-2">
//               <option value="">Select owner (optional)</option>
//               {users.filter(u => u.role === "owner").map(o => (
//                 <option key={o.id} value={o.id}>{o.name}</option>
//               ))}
//             </select>
//           </div>
//           <div className="mt-3">
//             <button className="bg-green-600 text-white px-4 py-2 rounded">Create</button>
//           </div>
//         </form>
//       )}

//       <div className="bg-white rounded shadow overflow-auto">
//         <table className="min-w-full text-left">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2">Name</th>
//               <th className="p-2">Email</th>
//               <th className="p-2">Address</th>
//               <th className="p-2">Rating</th>
//               <th className="p-2">Owner</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stores.map((s) => {
//               const owner = users.find((u) => u.id === s.ownerUserId);
//               return (
//                 <tr key={s.id} className="border-t">
//                   <td className="p-2">{s.name}</td>
//                   <td className="p-2">{s.email}</td>
//                   <td className="p-2">{s.address}</td>
//                   <td className="p-2">{s.rating_avg} ({s.rating_count})</td>
//                   <td className="p-2">{owner?.name || "-"}</td>
//                   <td className="p-2">
//                     <button onClick={() => onEdit(s)} className="px-2 py-1 mr-2 border rounded">Edit</button>
//                     <button onClick={() => onDelete(s.id)} className="px-2 py-1 border rounded text-red-600">Delete</button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const BACKEND_URL = "http://localhost:5000";

// export default function AdminStores() {
//   const [stores, setStores] = useState([]);
//   const [creating, setCreating] = useState(false);
//   const [form, setForm] = useState({ name: "", email: "", address: "", ownerUserId: "" });
//   const [users, setUsers] = useState([]);
//   const token = localStorage.getItem("token");

//   const load = async () => {
//     try {
//       const res = await axios.get(`${BACKEND_URL}/api/stores`, { headers: { Authorization: `Bearer ${token}` } });
//       setStores(res.data);

//       const usersRes = await axios.get(`${BACKEND_URL}/api/users`, { headers: { Authorization: `Bearer ${token}` } });
//       setUsers(usersRes.data);
//     } catch (err) { console.error(err); }
//   };

//   useEffect(() => { load(); }, []);

//   const onCreate = async (e) => {
//     e.preventDefault();
//     if (!form.name) return alert("Store name required");

//     try {
//       await axios.post(`${BACKEND_URL}/api/stores`, form, { headers: { Authorization: `Bearer ${token}` } });
//       alert("Store created successfully!");
//       setForm({ name: "", email: "", address: "", ownerUserId: "" });
//       load();
//       setCreating(false);
//     } catch (err) {
//       alert(err.response?.data?.message || "Error creating store");
//     }
//   };

//   const onDelete = async (id) => {
//     if (!window.confirm("Delete store?")) return;
//     await axios.delete(`${BACKEND_URL}/api/stores/${id}`, { headers: { Authorization: `Bearer ${token}` } });
//     load();
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Stores</h2>
//         <button onClick={() => setCreating(c => !c)} className="px-3 py-1 border rounded">
//           {creating ? "Close" : "Create store"}
//         </button>
//       </div>

//       {creating && (
//         <form onSubmit={onCreate} className="bg-white p-4 rounded shadow mb-4">
//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//             <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Store name" className="border p-2" />
//             <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Store email" className="border p-2" />
//             <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Address" className="border p-2" />
//             <select value={form.ownerUserId} onChange={e => setForm({ ...form, ownerUserId: e.target.value })} className="border p-2">
//               <option value="">Select owner (optional)</option>
//               {users.filter(u => u.role === "owner").map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
//             </select>
//           </div>
//           <div className="mt-3"><button className="bg-green-600 text-white px-4 py-2 rounded">Create</button></div>
//         </form>
//       )}

//       <div className="bg-white rounded shadow overflow-auto">
//         <table className="min-w-full text-left">
//           <thead className="bg-gray-100"><tr><th className="p-2">Name</th><th className="p-2">Email</th><th className="p-2">Address</th><th className="p-2">Rating</th><th className="p-2">Owner</th><th className="p-2">Actions</th></tr></thead>
//           <tbody>
//             {stores.map(s => {
//               const owner = users.find(u => u.id === s.ownerUserId);
//               return (
//                 <tr key={s.id} className="border-t">
//                   <td className="p-2">{s.name}</td>
//                   <td className="p-2">{s.email}</td>
//                   <td className="p-2">{s.address}</td>
//                   <td className="p-2">{s.rating_avg} ({s.rating_count})</td>
//                   <td className="p-2">{owner?.name || "-"}</td>
//                   <td className="p-2">
//                     <button onClick={async () => {
//                       const newName = prompt('Store name', s.name);
//                       if (newName) {
//                         await axios.put(`${BACKEND_URL}/api/stores/${s.id}`, { name: newName }, { headers: { Authorization: `Bearer ${token}` } });
//                         load();
//                       }
//                     }} className="px-2 py-1 mr-2 border rounded">Edit</button>
//                     <button onClick={() => onDelete(s.id)} className="px-2 py-1 border rounded text-red-600">Delete</button>
//                   </td>
//                 </tr>
//               )
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

export default function AdminStores() {
  const [stores, setStores] = useState([]);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", address: "", ownerUserId: "" });
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  // Load stores and users
  const load = async () => {
    try {
      const resStores = await axios.get(`${BACKEND_URL}/api/stores`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStores(resStores.data);

      const resUsers = await axios.get(`${BACKEND_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(resUsers.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, []);

  // Create store
  const onCreate = async (e) => {
    e.preventDefault();
    if (!form.name) return alert("Store name required");

    const data = {
      name: form.name,
      email: form.email || null,
      address: form.address || null,
      ownerUserId: form.ownerUserId || null
    };

    try {
      await axios.post(`${BACKEND_URL}/api/stores`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Store created successfully!");
      setForm({ name: "", email: "", address: "", ownerUserId: "" });
      setCreating(false);
      load();
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Failed to create store. Make sure you are an admin.");
    }
  };

  // Delete store
  const onDelete = async (id) => {
    if (!window.confirm("Delete store?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/stores/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      load();
    } catch (err) {
      console.error(err);
      alert("Failed to delete store");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Stores</h2>
        <button onClick={() => setCreating(c => !c)} className="px-3 py-1 border rounded">
          {creating ? "Close" : "Create store"}
        </button>
      </div>

      {creating && (
        <form onSubmit={onCreate} className="bg-white p-4 rounded shadow mb-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Store name"
              className="border p-2"
              required
            />
            <input
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="Store email"
              className="border p-2"
            />
            <input
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
              placeholder="Address"
              className="border p-2"
            />
            <select
              value={form.ownerUserId}
              onChange={e => setForm({ ...form, ownerUserId: e.target.value })}
              className="border p-2"
            >
              <option value="">Select owner (optional)</option>
              {users.filter(u => u.role === "owner").map(o => (
                <option key={o.id} value={o.id}>{o.name}</option>
              ))}
            </select>
          </div>
          <div className="mt-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded">Create</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded shadow overflow-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Address</th>
              <th className="p-2">Rating</th>
              <th className="p-2">Owner</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stores.map(s => {
              const owner = users.find(u => u.id === s.ownerUserId);
              return (
                <tr key={s.id} className="border-t">
                  <td className="p-2">{s.name}</td>
                  <td className="p-2">{s.email || "-"}</td>
                  <td className="p-2">{s.address || "-"}</td>
                  <td className="p-2">{s.rating_avg} ({s.rating_count})</td>
                  <td className="p-2">{owner?.name || "-"}</td>
                  <td className="p-2">
                    <button
                      onClick={async () => {
                        const newName = prompt('Store name', s.name);
                        if (newName) {
                          await axios.put(`${BACKEND_URL}/api/stores/${s.id}`, { name: newName }, {
                            headers: { Authorization: `Bearer ${token}` }
                          });
                          load();
                        }
                      }}
                      className="px-2 py-1 mr-2 border rounded"
                    >Edit</button>
                    <button onClick={() => onDelete(s.id)} className="px-2 py-1 border rounded text-red-600">Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
