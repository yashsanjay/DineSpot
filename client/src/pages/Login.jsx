import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const API_BASE_URL = "https://zomato-like-gx27.onrender.com";

  const login = async () => {

    try {

      const res = await axios.post(
        `${API_BASE_URL}/auth/login`,
        { email, password }
      );

      localStorage.setItem("userId", res.data.userId);

      alert("Login successful");

      navigate("/");

    } catch (err) {

      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Invalid email or password");
      }

    }

  };

  const logout = () => {

    localStorage.removeItem("userId");

    alert("Logged out");

    navigate("/");

  };

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">

      <h1 className="text-4xl font-bold mb-8">
        {userId ? "Account" : "Login"}
      </h1>

      {userId ? (

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded"
        >
          Logout
        </button>

      ) : (

        <>
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
            onClick={login}
            className="mt-4 bg-indigo-500 hover:bg-indigo-600 px-6 py-2 rounded"
          >
            Login
          </button>

          <p className="mt-6 text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-400 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </>
      )}

    </div>

  );
}

export default Login;