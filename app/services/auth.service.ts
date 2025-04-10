import api from "./api";
import { LoginCredentials, SignupData, User } from "../types";

export const authService = {
  async login(
    credentials: LoginCredentials
  ): Promise<{ user: User; token: string }> {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  async signup(data: SignupData): Promise<{ user: User; token: string }> {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  },
};
