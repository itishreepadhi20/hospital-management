import { useContext } from "react";
import { HospitalContext } from "../context/HospitalContext";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const { patients, doctors, bills } = useContext(HospitalContext);

  const revenueData = bills.map((b) => ({
    date: new Date(b.date).toLocaleDateString(),
    revenue: b.amount,
  }));

  const patientGrowth = patients.map((p, index) => ({
    name: `P${index + 1}`,
    total: index + 1,
  }));

  const totalRevenue = bills.reduce((a, b) => a + b.amount, 0);

  return (
    <div className="p-6 min-h-screen space-y-8 bg-gray-900 text-gray-100 font-sans">

      {/* Dashboard Header */}
      <h1 className="text-4xl font-extrabold text-amber-400 drop-shadow-lg">
        Hospital Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mt-4">
        <Card title="Total Patients" value={patients.length} icon="👨‍👩‍👧" />
        <Card title="Total Doctors" value={doctors.length} icon="🩺" />
        <Card title="Appointments" value={patients.length} icon="📅" />
        <Card title="Revenue" value={`₹${totalRevenue}`} icon="💰" />
      </div>

      {/* Revenue Chart */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-amber-400 mb-4">Revenue Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#fcd34d" />
            <YAxis stroke="#fcd34d" />
            <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderRadius: "8px", color: "#fcd34d" }} />
            <Bar dataKey="revenue" fill="#3b82f6" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Patient Growth Chart */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-amber-400 mb-4">Patient Growth</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={patientGrowth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#fcd34d" />
            <YAxis stroke="#fcd34d" />
            <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderRadius: "8px", color: "#fcd34d" }} />
            <Line type="monotone" dataKey="total" stroke="#16a34a" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Card Component
function Card({ title, value, icon }) {
  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-lg flex items-center justify-between hover:scale-105 transition-transform">
      <div>
        <h2 className="text-lg font-semibold text-amber-400">{title}</h2>
        <p className="text-3xl font-extrabold mt-2 text-gray-100">{value}</p>
      </div>
      <span className="text-4xl">{icon}</span>
    </div>
  );
}