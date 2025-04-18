import { StateCreator } from "zustand";
import { UIStore } from "../store.types";
import { Goal } from "@/app/auth/models/types";

export const useUIStore: StateCreator<UIStore> = (set) => ({
  goals: [],
  addGoal: (goal: Goal) => {
    set((state) => {
      return { ...state, goals: [...state.goals, goal] };
    });
  },
  updateGoal: (dataGoal: Goal) => {
    set((state) => {
      const goals = state.goals.map((goal) =>
        goal.id === dataGoal.id ? { ...dataGoal } : goal
      );
      return { ...state, goals };
    });
  }
});
