import authService from "@/queries/services/authService";
import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    authService.logout();
    window.location.href = "/";
  }, []);
  return null;
};

export default Logout;
