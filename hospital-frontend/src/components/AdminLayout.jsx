import { Outlet } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

 function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-8">🏥 MedAdmin</h1>

        <nav className="flex flex-col gap-4">
          <Link to="/">Dashboard</Link>
          <Link to="/patients">Patients</Link>
          <Link to="/doctors">Doctors</Link>
          <Link to="/appointments">Appointments</Link>
          <Link to="/billing">Billing</Link>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 shadow">
          <h2 className="text-xl font-bold dark:text-white">
            Hospital Management System
          </h2>

          <div className="flex items-center gap-4">
            <DarkModeToggle />
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </header>

        {/* ✅ THIS IS IMPORTANT */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default AdminLayout







