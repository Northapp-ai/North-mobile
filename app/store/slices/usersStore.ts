import { StateCreator } from "zustand";
import { UsersStore } from "../store.types";
import { MOCK_PEOPLE } from "@/app/goal/_components/ActionModal/constants";

export const useUsersStore: StateCreator<UsersStore> = (set) => ({
  users: MOCK_PEOPLE,
  addUser: (user: any) => {
    set((state: any) => {
      const users = [...state.users, { id: 1, name: "Maicol" }];
      return { ...state, users };
    });
  },
});

// Selector
export const selectAllUsers = (state: UsersStore) => state.users;
