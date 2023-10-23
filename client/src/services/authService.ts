import { User } from "@/entities/User";
import { LoginInterface } from "@/pages/LoginPage";
import jwtDecode from "jwt-decode";
import http from "./httpService";

const tokenKey = "kb";

http.setJwt(getJwt());

export async function login(cred: LoginInterface) {
  const { data: jwt } = await http.post("/api/auth/", { ...cred });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt: string) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  return localStorage.getItem(tokenKey) || "";
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt || "") as User;
  } catch (e) {
    return null;
  }
}

export default { login, loginWithJwt, logout, getJwt, getCurrentUser };
