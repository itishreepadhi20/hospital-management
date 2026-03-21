import { useContext } from "react";
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
  const { patients, doctors, appointments, bills } =
    useContext(HospitalContext);

  /* ---------------- Revenue Data ---------------- */
  const revenueData = bills.map((b) => ({
    date: new Date(b.date).toLocaleDateString(),
    revenue: Number(b.amount),
  }));

  /* ---------------- Patient Growth ---------------- */
  const patientGrowth = patients.map((_, index) => ({
    name: `P${index + 1}`,
    total: index + 1,
  }));

  const totalRevenue = bills.reduce(
    (total, bill) => total + Number(bill.amount),
    0
  );

  return (
    <div className="space-y-10">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 dark:text-slate-100">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Monitor hospital performance and analytics
        </p>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Patients" value={patients.length} />
        <StatCard title="Total Doctors" value={doctors.length} />
        <StatCard title="Appointments" value={appointments.length} />
        <StatCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
        />
      </div>

      {/* ================= REVENUE CHART ================= */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 border border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
          Revenue Analytics
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#2563eb" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= PATIENT GROWTH ================= */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 border border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
          Patient Growth
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={patientGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#16a34a"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

/* ================= PROFESSIONAL STAT CARD ================= */

function StatCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
      <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mt-2">
        {value}
      </h3>
    </div>
  );
}