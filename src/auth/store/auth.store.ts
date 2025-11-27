import type { User } from "@/interfaces/User";
import { create } from "zustand";

type AuthStore = {
  //props
  user: User | null;
  token: string | null;

  //methods
  login: (email: string, password: string) => Promise<boolean>;
};

const useAuthStore = create<Store>()((set) => ({
  user: null,
  token: null,

  login: async (email: string, password: string) => {
    console.log({ email, password });
    return true;
  },
}));
