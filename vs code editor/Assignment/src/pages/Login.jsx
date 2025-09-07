// import React from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Login() {
//   const { register, handleSubmit } = useForm();
//   const { login } = useAuth();
//   const nav = useNavigate();

//   const onSubmit = async (data) => {
//     const res = await login(data.email, data.password);
//     if (res.ok) nav("/stores");
//     else alert(res.message || "Login failed");
//   };

//   return (
//     <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Login</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//           <label className="block text-sm">Email</label>
//           <input {...register("email")} className="w-full border p-2 rounded" />
//         </div>
//         <div>
//           <label className="block text-sm">Password</label>
//           <input {...register("password")} type="password" className="w-full border p-2 rounded" />
//         </div>
//         <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
//       </form>
//     </div>
//   );
// }
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/login`, data);
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        nav("/dashboard"); // redirect to dashboard after login
      } else {
        alert("Login failed!");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("email")} placeholder="Email" className="w-full border p-2 rounded" />
        <input {...register("password")} type="password" placeholder="Password" className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
