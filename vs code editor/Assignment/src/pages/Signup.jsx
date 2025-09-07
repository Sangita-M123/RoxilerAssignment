import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();
  const { signup } = useAuth();

  const onSubmit = async (data) => {
    const res = await signup(data);
    if (res.ok) {
      alert("Signup successful! Redirecting to dashboard.");
      nav("/dashboard");
    } else alert(res.message || "Signup failed");
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

