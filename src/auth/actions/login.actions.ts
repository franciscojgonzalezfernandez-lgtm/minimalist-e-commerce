import { teslaApi } from "@/api/TesloApi";
import type { Login } from "../interfaces/login.response";

interface Options {
  email: string;
  password: string;
}

export const loginAction = async ({
  email,
  password,
}: Options): Promise<Login> => {
  try {
    const { data, status } = await teslaApi.post<Login>(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      {
        email,
        password,
      }
    );
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
