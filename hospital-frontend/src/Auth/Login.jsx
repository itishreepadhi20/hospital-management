import React, { useState } from "react";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login Successful");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input type="email" name="email" placeholder="Email"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md" required />

        <input type="password" name="password" placeholder="Password"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md" required />

        <button className="w-full bg-blue-600 text-white py-2 rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;