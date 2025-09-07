// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const BACKEND_URL = "http://localhost:5000";

// export default function AdminUsers() {
//   const [users, setUsers] = useState([]);
//   const [q, setQ] = useState("");
//   const [roleFilter, setRoleFilter] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");
//   const [password, setPassword] = useState("");
//   const [creating, setCreating] = useState(false);

//   const token = localStorage.getItem("token");

//   const load = async () => {
//     try {
//       const res = await axios.get(`${BACKEND_URL}/api/users`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Failed to load users:", err);
//     }
//   };

//   useEffect(() => load(), []);

//   const onCreate = async (e) => {
//     e.preventDefault();
//     if (name.length < 20 || name.length > 60) return alert("Name must be 20-60 chars");
//     try {
//       await axios.post(
//         `${BACKEND_URL}/api/users`,
//         { name, email, address, password, role: "user" },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("User created");
//       setName(""); setEmail(""); setAddress(""); setPassword("");
//       load();
//       setCreating(false);
//     } catch (err) {
//       alert("Failed to create user");
//     }
//   };

//   const onDelete = async (id) => {
//     if (!window.confirm("Delete user?")) return;
//     await axios.delete(`${BACKEND_URL}/api/users/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     load();
//   };

//   const filtered = users.filter((u) => {
//     const matchesQ = q === "" || u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()) || u.address.toLowerCase().includes(q.toLowerCase());
//     const matchesRole = roleFilter === "" || u.role === roleFilter;
//     return matchesQ && matchesRole;
//   });

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Users</h2>
//         <button onClick={() => setCreating((c) => !c)} className="px-3 py-1 border rounded">{creating ? "Close" : "Create user"}</button>
//       </div>

//       {creating && (
//         <form onSubmit={onCreate} className="bg-white p-4 rounded shadow mb-4">
//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//             <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name (20-60 chars)" className="border p-2" />
//             <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-2" />
//             <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="border p-2" />
//             <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border p-2" />
//           </div>
//           <div className="mt-3">
//             <button className="bg-green-600 text-white px-4 py-2 rounded">Create</button>
//           </div>
//         </form>
//       )}

//       <div className="mb-3 flex gap-2">
//         <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name/email/address" className="border p-2 rounded flex-1" />
//         <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="border p-2 rounded">
//           <option value="">All roles</option>
//           <option value="admin">admin</option>
//           <option value="owner">owner</option>
//           <option value="user">user</option>
//         </select>
//         <button onClick={load} className="px-3 py-1 border rounded">Refresh</button>
//       </div>

//       <div className="bg-white rounded shadow overflow-auto">
//         <table className="min-w-full text-left">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2">Name</th>
//               <th className="p-2">Email</th>
//               <th className="p-2">Address</th>
//               <th className="p-2">Role</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map((u) => (
//               <tr key={u.id} className="border-t">
//                 <td className="p-2">{u.name}</td>
//                 <td className="p-2">{u.email}</td>
//                 <td className="p-2">{u.address}</td>
//                 <td className="p-2">{u.role}</td>
//                 <td className="p-2">
//                   <button
//                     onClick={async () => {
//                       const newName = prompt("New name", u.name);
//                       if (newName) {
//                         await axios.put(
//                           `${BACKEND_URL}/api/users/${u.id}`,
//                           { name: newName },
//                           { headers: { Authorization: `Bearer ${token}` } }
//                         );
//                         load();
//                       }
//                     }}
//                     className="px-2 py-1 mr-2 border rounded"
//                   >
//                     Edit
//                   </button>
//                   <button onClick={() => onDelete(u.id)} className="px-2 py-1 border rounded text-red-600">Delete</button>
//                 </td>
//               </tr>
//             ))}
//             {filtered.length === 0 && <tr><td colSpan="5" className="p-4 text-center text-gray-500">No users</td></tr>}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const BACKEND_URL = "http://localhost:5000";

// export default function AdminUsers() {
//   const [users, setUsers] = useState([]);
//   const [q, setQ] = useState("");
//   const [creating, setCreating] = useState(false);
//   const [form, setForm] = useState({ name: "", email: "", address: "", password: "", role: "user" });

//   const token = localStorage.getItem("token");

//   const load = async () => {
//     try {
//       const res = await axios.get(`${BACKEND_URL}/api/users?query=${encodeURIComponent(q)}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     } catch (err) { console.error(err); }
//   };

//   useEffect(() => { load(); }, []);

//   const onCreate = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${BACKEND_URL}/api/users`, form, { headers: { Authorization: `Bearer ${token}` } });
//       alert("User created");
//       setForm({ name: "", email: "", address: "", password: "", role: "user" });
//       load();
//       setCreating(false);
//     } catch (err) { alert("Failed to create user"); }
//   };

//   const onDelete = async (id) => {
//     if (!window.confirm("Delete user?")) return;
//     await axios.delete(`${BACKEND_URL}/api/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
//     load();
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Users</h2>
//         <button onClick={() => setCreating(c => !c)} className="px-3 py-1 border rounded">{creating ? "Close" : "Create user"}</button>
//       </div>

//       {creating && (
//         <form onSubmit={onCreate} className="bg-white p-4 rounded shadow mb-4">
//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//             <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" className="border p-2" />
//             <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" className="border p-2" />
//             <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Address" className="border p-2" />
//             <input value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" className="border p-2" />
//             <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="border p-2">
//               <option value="user">user</option>
//               <option value="admin">admin</option>
//               <option value="owner">owner</option>
//             </select>
//           </div>
//           <div className="mt-3"><button className="bg-green-600 text-white px-4 py-2 rounded">Create</button></div>
//         </form>
//       )}

//       <div className="mb-3 flex gap-2">
//         <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search name/email/address" className="border p-2 rounded flex-1" />
//         <button onClick={load} className="px-3 py-1 border rounded">Refresh</button>
//       </div>

//       <div className="bg-white rounded shadow overflow-auto">
//         <table className="min-w-full text-left">
//           <thead className="bg-gray-100">
//             <tr><th className="p-2">Name</th><th className="p-2">Email</th><th className="p-2">Address</th><th className="p-2">Role</th><th className="p-2">Actions</th></tr>
//           </thead>
//           <tbody>
//             {users.map(u => (
//               <tr key={u.id} className="border-t">
//                 <td className="p-2">{u.name}</td>
//                 <td className="p-2">{u.email}</td>
//                 <td className="p-2">{u.address}</td>
//                 <td className="p-2">{u.role}</td>
//                 <td className="p-2">
//                   <button onClick={async () => {
//                     const newName = prompt("New name", u.name);
//                     if (newName) {
//                       await axios.put(`${BACKEND_URL}/api/users/${u.id}`, { name: newName }, { headers: { Authorization: `Bearer ${token}` } });
//                       load();
//                     }
//                   }} className="px-2 py-1 mr-2 border rounded">Edit</button>
//                   <button onClick={() => onDelete(u.id)} className="px-2 py-1 border rounded text-red-600">Delete</button>
//                 </td>
//               </tr>
//             ))}
//             {users.length === 0 && <tr><td colSpan="5" className="p-4 text-center text-gray-500">No users</td></tr>}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", address: "", password: "", role: "user" });

  const token = localStorage.getItem("token");

  const load = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/users?query=${encodeURIComponent(q)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      load();
    }, 500); // Debounce to reduce API calls

    return () => clearTimeout(delayDebounceFn);
  }, [q]); // Re-fetch whenever query `q` changes

  const onCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/api/users`, form, { headers: { Authorization: `Bearer ${token}` } });
      alert("User created");
      setForm({ name: "", email: "", address: "", password: "", role: "user" });
      load();
      setCreating(false);
    } catch (err) { alert("Failed to create user"); }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;
    await axios.delete(`${BACKEND_URL}/api/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
        <button onClick={() => setCreating(c => !c)} className="px-3 py-1 border rounded">{creating ? "Close" : "Create user"}</button>
      </div>

      {creating && (
        <form onSubmit={onCreate} className="bg-white p-4 rounded shadow mb-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" className="border p-2" />
            <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" className="border p-2" />
            <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Address" className="border p-2" />
            <input value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} type="password" placeholder="Password" className="border p-2" />
            <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="border p-2">
              <option value="user">user</option>
              <option value="admin">admin</option>
              <option value="owner">owner</option>
            </select>
          </div>
          <div className="mt-3"><button className="bg-green-600 text-white px-4 py-2 rounded">Create</button></div>
        </form>
      )}

      <div className="mb-3 flex gap-2">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search name/email/address" className="border p-2 rounded flex-1" />
        <button onClick={load} className="px-3 py-1 border rounded">Refresh</button>
      </div>

      <div className="bg-white rounded shadow overflow-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100"><tr><th className="p-2">Name</th><th className="p-2">Email</th><th className="p-2">Address</th><th className="p-2">Role</th><th className="p-2">Actions</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-t">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.address}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2">
                  <button onClick={async () => {
                    const newName = prompt("New name", u.name);
                    if (newName) {
                      await axios.put(`${BACKEND_URL}/api/users/${u.id}`, { name: newName }, { headers: { Authorization: `Bearer ${token}` } });
                      load();
                    }
                  }} className="px-2 py-1 mr-2 border rounded">Edit</button>
                  <button onClick={() => onDelete(u.id)} className="px-2 py-1 border rounded text-red-600">Delete</button>
                </td>
              </tr>
            ))}
            {users.length === 0 && <tr><td colSpan="5" className="p-4 text-center text-gray-500">No users</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}