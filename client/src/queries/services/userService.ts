import { SignupInterface } from "@/pages/RegisterPage";
import httpService from "./httpService";

export function register(cred: SignupInterface) {
  return httpService.post("/api/users/", { ...cred });
}
