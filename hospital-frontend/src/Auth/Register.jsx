import React, { useState } from "react";

const Register = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registered Successfully");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input type="text" name="name" placeholder="Full Name"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md" required />

        <input type="email" name="email" placeholder="Email"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md" required />

        <input type="password" name="password" placeholder="Password"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md" required />

        <button className="w-full bg-green-600 text-white py-2 rounded-md">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;