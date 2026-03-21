import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HospitalContext } from "../context/HospitalContext";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const navigate = useNavigate();

  const { patients, doctors, appointments, bills } =
    useContext(HospitalContext);

  const revenueData = bills.map((b) => ({
    date: new Date(b.date).toLocaleDateString(),
    revenue: Number(b.amount),
  }));

  const patientGrowth = patients.map((_, index) => ({
    name: `P${index + 1}`,
    total: index + 1,
  }));

  const totalRevenue = bills.reduce(
    (total, bill) => total + Number(bill.amount),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">

      {/* HERO */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white rounded-3xl p-6 md:p-10 mb-10 flex flex-col md:flex-row items-center justify-between shadow-lg">

        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Good Morning 👋
          </h1>
          <p className="text-teal-100 text-lg">
            Welcome back! Here's what's happening today.
          </p>

          <button
            onClick={() => navigate("/appointments")}
            className="mt-5 bg-white text-teal-700 px-6 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Create Appointment
          </button>
        </div>

        <div className="w-52 md:w-72 mt-6 md:mt-0 rounded-xl overflow-hidden shadow-md border border-white/20">
          <img
            src="/dashboard.png"
            alt="Doctor"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Patients" value={patients.length} icon="👨‍⚕️" />
        <StatCard title="Doctors" value={doctors.length} icon="🩺" />
        <StatCard title="Appointments" value={appointments.length} icon="📅" />
        <StatCard
          title="Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          icon="💰"
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Revenue Analytics
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#14b8a6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Patient Growth
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={patientGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#14b8a6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg transition flex items-center gap-4">
      <div className="bg-teal-100 text-teal-700 p-3 rounded-xl text-xl">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );
}