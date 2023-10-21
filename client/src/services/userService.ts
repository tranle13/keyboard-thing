import { SignupInterface } from "@/pages/RegisterPage";
import axios from "axios";

export function register(cred: SignupInterface) {
  return axios.post("/api/users/", { ...cred });
}
