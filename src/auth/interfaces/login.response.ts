import type { User } from "@/interfaces/User";

//Login, register, check-status
export interface Login {
  user: User;
  token: string;
}
