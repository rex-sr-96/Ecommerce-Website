import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

const AdminProtectedRoute = () => {
  const { adminToken } = useAdminAuth();

  if (!adminToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
