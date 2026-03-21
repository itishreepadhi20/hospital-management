import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800
                    px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl
                      border border-white/20 rounded-2xl shadow-2xl
                      p-8 text-white">

        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-indigo-400 mb-2">
            🏥 Hospital Admin
          </div>
          <p className="text-sm text-gray-300">
            Secure login to access the management dashboard
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 
                          border border-red-400 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-sm mb-2 text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@hospital.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg 
                         bg-white/20 text-white placeholder-gray-300
                         border border-white/30
                         focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-300">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg 
                         bg-white/20 text-white placeholder-gray-300
                         border border-white/30
                         focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold
                       bg-indigo-600 hover:bg-indigo-700
                       transition duration-300 shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-6 text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-400 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}