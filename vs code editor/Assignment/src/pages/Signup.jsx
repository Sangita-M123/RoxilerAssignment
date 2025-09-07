// import React from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";

// const BACKEND_URL = "http://localhost:5000";

// export default function Signup() {
//   const { register, handleSubmit } = useForm();
//   const { login } = useAuth();
//   const nav = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       const res = await axios.post(`${BACKEND_URL}/api/auth/signup`, data);
//       if (res.data?.token) {
//         // store token and user
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//         alert("Signup successful! Please login.");
//         nav("/login");
//       } else {
//         alert("Signup failed!");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Signup failed!");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//           <label className="block text-sm">Name</label>
//           <input {...register("name")} className="w-full border p-2 rounded" />
//           <div className="text-xs text-gray-500">Name must be 20-60 characters</div>
//         </div>
//         <div>
//           <label className="block text-sm">Email</label>
//           <input {...register("email")} className="w-full border p-2 rounded" />
//         </div>
//         <div>
//           <label className="block text-sm">Address</label>
//           <textarea {...register("address")} className="w-full border p-2 rounded" />
//         </div>
//         <div>
//           <label className="block text-sm">Password</label>
//           <input {...register("password")} type="password" className="w-full border p-2 rounded" />
//           <div className="text-xs text-gray-500">8-16 chars, include uppercase & special char</div>
//         </div>
//         <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Sign Up</button>
//       </form>
//     </div>
//   );
// }
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000"; // Direct backend URL

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/signup`, data);
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Signup successful!");
        nav("/login");
      } else {
        alert("Signup failed!");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("name")} placeholder="Name" className="w-full border p-2 rounded" />
        <input {...register("email")} placeholder="Email" className="w-full border p-2 rounded" />
        <textarea {...register("address")} placeholder="Address" className="w-full border p-2 rounded" />
        <input {...register("password")} type="password" placeholder="Password" className="w-full border p-2 rounded" />
        <select {...register("role")} className="w-full border p-2 rounded">
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="owner">Owner</option>
        </select>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Sign Up</button>
      </form>
    </div>
  );
}
