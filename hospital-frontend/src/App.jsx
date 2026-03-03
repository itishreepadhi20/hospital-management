import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HospitalProvider } from "./context/HospitalContext";
import AdminLayout from "./components/AdminLayout";

import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Billing from "./pages/Billing";

function App() {
  return (
    <HospitalProvider>
      <BrowserRouter>
        <Routes>

          {/* Dashboard */}
          <Route
            path="/"
            element={
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            }
          />

          {/* Patients */}
          <Route
            path="/patients"
            element={
              <AdminLayout>
                <Patients />
              </AdminLayout>
            }
          />

          {/* Doctors */}
          <Route
            path="/doctors"
            element={
              <AdminLayout>
                <Doctors />
              </AdminLayout>
            }
          />

          {/* Appointments */}
          <Route
            path="/appointments"
            element={
              <AdminLayout>
                <Appointments />
              </AdminLayout>
            }
          />

          {/* Billing */}
          <Route
            path="/billing"
            element={
              <AdminLayout>
                <Billing />
              </AdminLayout>
            }
          />

        </Routes>
      </BrowserRouter>
    </HospitalProvider>
  );
}

export default App