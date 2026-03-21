import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === formData.email &&
      storedUser.password === formData.password
    ) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-teal-700 p-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">
            Sign In
          </h2>

          {error && (
            <div className="mb-4 text-sm text-red-500 text-center">{error}</div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <select className="w-full px-4 py-3 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>Employee</option>
              <option>Admin</option>
            </select>

            <input
              type="email"
              name="email"
              placeholder="Username / Email"
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

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-800 transition"
              >
                Login
              </button>

              <Link
                to="/forgot"
                className="text-sm text-gray-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </form>

          <p className="text-sm text-center mt-6 text-gray-500">
            Don’t have an account?{" "}
            <Link to="/register" className="text-teal-700 font-semibold">
              Register
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

        {/* Centered heading */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Hospital Management System
          </h1>
          <p className="text-white text-lg md:text-xl max-w-md">
            Efficiently manage patients, staff, and appointments with ease.
          </p>
        </div>
      </div>
    </div>
  );
}