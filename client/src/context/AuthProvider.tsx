import { getCurrentUser } from "@/queries/services/authService";
import { ReactNode } from "react";
import AuthContext from "./authContext";

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const user = getCurrentUser();

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
