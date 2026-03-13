import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const API_BASE_URL = "https://zomato-like-gx27.onrender.com";

  const signup = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/signup`, {
        email,
        password,
      });

      localStorage.setItem("userId", res.data.userId);

      alert("Signup successful!");

      navigate("/");
    } catch (err) {
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Signup failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-8">Sign Up</h1>

      <input
        type="email"
        placeholder="Enter Email"
        className="p-3 m-2 w-72 rounded bg-gray-800 border border-gray-600"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password (min 8 characters)"
        className="p-3 m-2 w-72 rounded bg-gray-800 border border-gray-600"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={signup}
        className="mt-4 bg-indigo-500 hover:bg-indigo-600 px-6 py-2 rounded"
      >
        Sign Up
      </button>

      <p className="mt-6 text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-400 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;