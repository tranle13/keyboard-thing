import AuthContext from "@/context/authContext";
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (user) return <Outlet />;

  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoutes;
