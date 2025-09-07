// import React from "react";
// import { useForm } from "react-hook-form";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const BACKEND_URL = "http://localhost:5000";

// export default function ChangePassword() {
//   const { user, logout } = useAuth();
//   const { register, handleSubmit } = useForm();
//   const nav = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post(
//         `${BACKEND_URL}/api/users/${user.id}/change-password`,
//         data,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.data?.ok) {
//         alert("Password changed! Please login again.");
//         logout();
//         nav("/login");
//       } else {
//         alert(res.data?.message || "Password change failed");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Password change failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-xl mb-4">Change Password</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
//         <div>
//           <label className="block text-sm">Current Password</label>
//           <input {...register("currentPassword")} type="password" className="w-full border p-2 rounded" />
//         </div>
//         <div>
//           <label className="block text-sm">New Password</label>
//           <input {...register("newPassword")} type="password" className="w-full border p-2 rounded" />
//           <div className="text-xs text-gray-500">8-16 chars, include uppercase & special char</div>
//         </div>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded">Change</button>
//       </form>
//     </div>
//   );
// }
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "http://localhost:5000";

export default function ChangePassword() {
  const { user, logout } = useAuth();
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${BACKEND_URL}/api/auth/change-password`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(res.data.message || "Password changed");
      logout();
      nav("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div><label className="block text-sm">Current Password</label><input {...register("currentPassword")} type="password" className="w-full border p-2 rounded" /></div>
        <div><label className="block text-sm">New Password</label><input {...register("newPassword")} type="password" className="w-full border p-2 rounded" /></div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Change</button>
      </form>
    </div>
  );
}
