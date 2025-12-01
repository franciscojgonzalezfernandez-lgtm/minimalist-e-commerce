import type { User } from "@/interfaces/User";
import { create } from "zustand";
import { loginAction } from "../actions/login.actions";
import { checkStatus } from "../actions/check-status.actions";

type authStatus = "authenticated" | "not-authenticated" | "checking";

type AuthStore = {
  //props
  user: User | null;
  token: string | null;
  authStatus: authStatus;

  //getters
  isAdmin: () => boolean;

  //methods
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
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

  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkStatus();
      set({ user: user, token: token, authStatus: "authenticated" });
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }
  },

  isAdmin: () => {
    return get().user?.roles.includes("admin") || false;
  },
}));
