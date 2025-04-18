import { create } from "zustand";

import { useAuthStore } from "./slices/authStore";
import { AppStore } from "./store.types";
import { useUsersStore } from "./slices/usersStore";
import { useGoalStore } from "./slices/goalStore";

export const useAppStore = create<AppStore>()((...store) => ({
  ...useAuthStore(...store),
  ...useUsersStore(...store),
  ...useGoalStore(...store),
}));
