import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  // Convert string to boolean safely
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // If not logged in → redirect to login
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} // saves previous route (for future enhancement)
      />
    );
  }

  return children;
}