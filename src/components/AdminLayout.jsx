import { Outlet, Link, useNavigate } from "react-router-dom";

/* ================= SIDEBAR LINK ================= */
function SidebarLink({ to, label, icon }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition"
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-gradient-to-b from-teal-700 to-emerald-600 text-white p-6 hidden md:flex flex-col justify-between rounded-r-3xl shadow-xl">
        
        {/* TOP */}
        <div>
          <h1 className="text-2xl font-bold mb-10 text-center tracking-wide">
            MedAdmin
          </h1>

          <nav className="flex flex-col gap-3">
            <SidebarLink to="/" label="Dashboard" icon="📊" />
            <SidebarLink to="/patients" label="Patients" icon="👨‍⚕️" />
            <SidebarLink to="/doctors" label="Doctors" icon="🩺" />
            <SidebarLink to="/appointments" label="Appointments" icon="📅" />
            <SidebarLink to="/billing" label="Billing" icon="💳" />
          </nav>
        </div>

        {/* LOGOUT */}
        <div className="border-t border-teal-400 pt-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-red-500/90 hover:bg-red-600 transition"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 flex flex-col bg-gray-100">

        {/* HEADER */}
        <header className="px-6 py-6 
        bg-gradient-to-r from-teal-600 to-emerald-500 
        text-white shadow-lg rounded-b-3xl">
          
          <h2 className="text-xl md:text-2xl font-bold tracking-wide">
            Hospital Management System
          </h2>
        </header>

        {/* MAIN CONTENT (OVERLAP EFFECT) */}
        <main className="flex-1 p-6 -mt-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;