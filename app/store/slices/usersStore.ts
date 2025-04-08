import { StateCreator } from "zustand";
import { UsersSrore } from "../store.types";

export const useUsersStore: StateCreator<UsersSrore> = (set) => ({
  users: [],
  addUser: (user: any) => {
    set((state: any) => {
      const users = [...state.users, { id: 1, name: "Maicol" }];
      return { ...state, users };
    });
  },
});
