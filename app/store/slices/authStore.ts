import { StateCreator } from "zustand";
import { AuthStore } from "../store.types";
import { User } from "@/app/auth/models/types";

export const useAuthStore: StateCreator<AuthStore> = (set) => ({
  isAuthenticated: true,
  user: {} as User,
  setUser: (user: any) => {
    set((state) => {
      return { ...state, user };
    });
  },
});
