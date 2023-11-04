import { SignupInterface } from "@/pages/RegisterPage";
import httpService from "./httpService";

export function register(cred: SignupInterface) {
  return httpService.post("/api/users/", { ...cred });
}

interface UpdateProfile {
  _id: string;
  bio: string;
  theme: string;
}
export function updateProfile(params: UpdateProfile) {
  return httpService.patch("/api/users/me", params);
}
