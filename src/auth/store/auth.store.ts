import type { User } from "@/interfaces/User";
import { create } from "zustand";
import { loginAction } from "../actions/login.actions";

type authStatus = "authenticated" | "not-authenticated" | "checking";

type AuthStore = {
  //props
  user: User | null;
  token: string | null;
  authStatus: authStatus;

  //methods
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

// aux
const getInitials = (fullName: string): string => {
  return fullName
    .split(" ")
    .map((word) => {
      return word[0];
    })
    .join();
};

export const useAuthStore = create<AuthStore>()((set, get) => ({
  //Props
  user: null,
  token: null,
  authStatus: "checking",
  //Actions
  login: async (email: string, password: string) => {
    console.log({ email, password });

    try {
      const data = await loginAction({ email, password });
      localStorage.setItem("sessionToken", data.token);
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      return true;
    } catch (err) {
      console.info(err);
      localStorage.removeItem("sessionToken");
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("sessionToken");
    set({ user: null, token: null, authStatus: "not-authenticated" });
  },
}));
