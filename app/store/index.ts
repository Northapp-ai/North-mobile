import { create } from "zustand";

import { useAuthStore } from "./slices/authStore";
import { AppStore } from "./store.types";
import { useUsersStore } from "./slices/usersStore";

export const useAppStore = create<AppStore>()((...a) => ({
  ...useAuthStore(...a),
  ...useUsersStore(...a),
}));
