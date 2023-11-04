import { getCurrentUser } from "@/queries/services/authService";
import { proxy } from "valtio";

const currentUser = getCurrentUser();

const state = proxy({
  user: currentUser,
  theme: currentUser?.theme || "light",
});

export default state;
