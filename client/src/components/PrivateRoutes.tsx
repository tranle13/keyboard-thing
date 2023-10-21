import authService from "@/services/authService";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const user = authService.getCurrentUser();
  const location = useLocation();

  if (user) return <Outlet />;

  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoutes;
