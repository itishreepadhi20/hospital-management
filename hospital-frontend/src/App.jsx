import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HospitalProvider } from "./context/HospitalContext";

import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/protectedRoute";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Billing from "./pages/Billing";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <HospitalProvider>
      <BrowserRouter>
        <Routes>

          {/* 🔓 Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔐 Protected Admin Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Nested Routes */}
            <Route index element={<Dashboard />} />
            <Route path="patients" element={<Patients />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="billing" element={<Billing />} />
          </Route>

          {/* 🚫 404 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </HospitalProvider>
  );
}

export default App;