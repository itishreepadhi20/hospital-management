import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [generatedOtp, setGeneratedOtp] = useState("");

  const [data, setData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Generate OTP (frontend only simulation)
  const handleSendOtp = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.email !== data.email) {
      setMessage("Email not found");
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);

    console.log("OTP (for testing):", otp); // 👈 see in console

    setMessage("OTP sent (check console)");
    setStep(2);
  };

  // Verify OTP and reset password
  const handleResetPassword = () => {
    if (data.otp !== generatedOtp) {
      setMessage("Invalid OTP");
      return;
    }

    let storedUser = JSON.parse(localStorage.getItem("user"));

    storedUser.password = data.newPassword;

    localStorage.setItem("user", JSON.stringify(storedUser));

    setMessage("Password reset successful!");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-700 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Forgot Password
        </h2>

        {message && (
          <p className="text-center text-sm text-red-500 mb-4">{message}</p>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            <button
              onClick={handleSendOtp}
              className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800 transition"
            >
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={data.otp}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={data.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            <button
              onClick={handleResetPassword}
              className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800 transition"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}