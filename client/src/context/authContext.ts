import { User } from "@/entities/User";
import { createContext } from "react";

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
