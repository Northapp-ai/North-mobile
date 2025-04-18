import { StateCreator } from "zustand";
import { UsersStore } from "../store.types";

export const useUsersStore: StateCreator<UsersStore> = (set) => ({
  users: [],
  addUser: (user: any) => {
    set((state: any) => {
      const users = [...state.users, { id: 1, name: "Maicol" }];
      return { ...state, users };
    });
  },
});
