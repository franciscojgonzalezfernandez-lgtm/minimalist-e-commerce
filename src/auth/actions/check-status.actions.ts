import { teslaApi } from "@/api/TesloApi";
import type { Login } from "../interfaces/login.response";

export const checkStatus = async (): Promise<Login> => {
  try {
    const { data } = await teslaApi.get<Login>("/auth/check-status");
    localStorage.setItem("sessionToken", data.token);
    return data;
  } catch (_) {
    localStorage.removeItem("sessionToken");
    throw new Error("No valid token");
  }
};
