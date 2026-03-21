import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const existingUser = JSON.parse(localStorage.getItem("user"));

    if (existingUser && existingUser.email === formData.email) {
      setError("User already exists with this email.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(formData));
    setMessage("Registration successful! Redirecting to login...");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-teal-700 p-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">
            Register
          </h2>

          {error && (
            <div className="mb-4 text-sm text-red-500 text-center">{error}</div>
          )}
          {message && (
            <div className="mb-4 text-sm text-green-500 text-center">{message}</div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 pr-20 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-sm text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-800 transition"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-700 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div
        className="hidden md:flex md:w-1/2 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/doctor.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Optional content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Welcome to Hospital Management
          </h1>
          <p className="text-white text-lg md:text-xl max-w-md">
            Manage patients, staff, and appointments efficiently.
          </p>
        </div>
      </div>
    </div>
  );
}