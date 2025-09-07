import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    const res = await login(data.email, data.password);
    if (res.ok) nav("/dashboard");
    else alert(res.message || "Login failed");
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

