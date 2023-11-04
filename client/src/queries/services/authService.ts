import { User } from "@/entities/User";
import { LoginInterface } from "@/pages/LoginPage";
import jwtDecode from "jwt-decode";
import http from "./httpService";

interface JWT {
  exp: number;
  iat: number;
  image: string;
  username: string;
  theme: string;
  _id: string;
}

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
    if (!jwt) return null;

    const decoded: JWT = jwtDecode(jwt);
    if (decoded.exp * 1000 < Date.now()) return null;

    const user: User = {
      username: decoded.username,
      image: decoded.image,
      theme: decoded.theme,
      _id: decoded._id,
    };
    return user;
  } catch (e) {
    return null;
  }
}

export default { login, loginWithJwt, logout, getJwt, getCurrentUser };
