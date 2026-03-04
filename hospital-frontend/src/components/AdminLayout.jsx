import { Outlet } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

export default function AdminLayout() {
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









// import { Link } from "react-router-dom";
// import DarkModeToggle from "./DarkModeToggle";

// export default function AdminLayout({ children }) {
//   return (
//     <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 font-sans">

//       {/* Sidebar */}
//       <aside className="w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white p-6 hidden md:block">
//         <h1 className="text-3xl font-extrabold mb-10 drop-shadow-lg">🏥 Hospital Admin</h1>

//         <nav className="flex flex-col gap-4">
//           <SidebarLink to="/">Dashboard</SidebarLink>
//           <SidebarLink to="/patients">Patients</SidebarLink>
//           <SidebarLink to="/doctors">Doctors</SidebarLink>
//           <SidebarLink to="/appointments">Appointments</SidebarLink>
//           <SidebarLink to="/billing">Billing</SidebarLink>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         <header className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 shadow-md">
//           <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
//             Hospital Management System
//           </h2>
//           <DarkModeToggle />
//         </header>

//         <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 transition-colors">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

// // SidebarLink Component for hover & active effects
// function SidebarLink({ to, children }) {
//   return (
//     <Link
//       to={to}
//       className="text-lg font-semibold py-2 px-3 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
//     >
//       {children}
//     </Link>
//   );
// }