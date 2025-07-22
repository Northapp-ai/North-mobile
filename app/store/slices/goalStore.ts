import { StateCreator } from "zustand";
import { GoalStore, StepGoal } from "../store.types";
import { Goal } from "@/app/auth/models/types";

const initialState: GoalStore = {
  goals: [],
  currentGoal: {},
  currentStep: "photo",
  resetCurrentGoal: () => {},
  addCurrentGoal: (goal: Goal) => {},
  updateCurrentGoal: (dataGoal: Goal) => {},
  updateCurrentStep: (step: StepGoal) => {},
  addGoal: (goal: Goal) => {},
  updateGoal: (dataGoal: Goal) => {},
};

export const useGoalStore: StateCreator<GoalStore> = (set) => ({
  ...initialState,
  resetCurrentGoal: () => {
    set((state) => {
      return { ...state, currentGoal: {} };
    });
  },
  addCurrentGoal: (goal: Goal) => {
    set((state) => {
      return { ...state, currentGoal: { ...goal } };
    });
  },
  updateCurrentGoal: (dataGoal: Goal) => {
    set((state) => {
      return { ...state, currentGoal: { ...dataGoal } };
    });
  },
  updateCurrentStep: (step: StepGoal) => {
    set((state) => {
      return { ...state, currentStep: step };
    });
  },
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
  },
});
