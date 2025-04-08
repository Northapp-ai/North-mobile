import { User } from "@/app/auth/models/types";

export type AuthStore = {
  isAuthenticated: boolean;
  user: User;
  setUser: (user: any) => void;
};

export type UsersSrore = {
  users: User[];
  addUser: (user: any) => void;
};

export type AppStore = AuthStore & UsersSrore;
