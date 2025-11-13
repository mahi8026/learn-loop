import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
  const { register, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Register - LearnLoop";
  }, []);
  const [form, setForm] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });
  const validatePassword = (p) =>
    /[A-Z]/.test(p) && /[a-z]/.test(p) && p.length >= 6;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(form.password)) {
      return toast.error(
        "Password must have uppercase, lowercase and at least 6 chars"
      );
    }
    try {
      await register(form.name, form.email, form.password, form.photo);
      toast.success("Registered");
      navigate("/");
    } catch (e) {
      toast.error("Register failed");
    }
  };
  return (
    <div className="container shadow-2xl mx-auto px-4 py-8 bg-gray-900  rounded-lg max-w-md mt-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          value={form.photo}
          onChange={(e) => setForm({ ...form, photo: e.target.value })}
          placeholder="Photo URL"
          className="w-full p-2 border rounded"
        />
        <input
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          type="password"
          className="w-full p-2 border rounded"
          required
        />
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-4 w-full py-2 font-semibold bg-green-600 hover:bg-green-800 text-white rounded"
          >
            Register
          </button>
        </div>
      </form>
      <div className="mt-4">
        <button
          onClick={async () => {
            try {
              await signInWithGoogle();
              navigate("/");
            } catch (e) {
              toast.error("Google sign in failed");
            }
          }}
          className="btn btn-outline btn-primary w-full"
        >
         <FcGoogle size={24} /> Sign up with Google
        </button>
      </div>
    </div>
  );
}
