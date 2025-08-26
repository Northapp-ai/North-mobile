import { StateCreator } from "zustand";
import { GoalStore, StepGoal } from "../store.types";
import { Goal, GoalAction } from "@/app/auth/models/types";

const initialState: GoalStore = {
  goals: [],
  goalSelectedId: "",
  currentGoal: {},
  currentStep: "photo",
  resetCurrentGoal: () => {},
  addCurrentGoal: (goal: Goal) => {},
  updateCurrentGoal: (dataGoal: Goal) => {},
  updateCurrentStep: (step: StepGoal) => {},
  addGoal: (goal: Goal) => {},
  updateGoal: (dataGoal: Goal) => {},
  setGoalSelectedId: (id: string) => {},
  addActionToSelectedGoal: (action: GoalAction) => {},
  toggleActionCompletion: (goalId: string, actionId: string) => {},
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
  setGoalSelectedId(id) {
    set((state) => {
      return { ...state, goalSelectedId: id };
    });
  },
  addActionToSelectedGoal(action: GoalAction) {
    set((state) => {
      const goal = state.goals.find((goal) => goal.id === state.goalSelectedId);
      if (goal) {
        const updatedGoal = {
          ...goal,
          actions: [...(goal.actions || []), action],
        };
        const goals = state.goals.map((g) =>
          g.id === updatedGoal.id ? updatedGoal : g
        );
        return { ...state, goals };
      }
      return state;
    });
  },
  toggleActionCompletion(goalId: string, actionId: string) {
    set((state) => {
      const goal = state.goals.find((goal) => goal.id === goalId);
      if (goal) {
        const updatedActions = goal.actions.map((action) =>
          action.id === actionId
            ? { ...action, completed: !action.completed }
            : action
        );
        const updatedGoal = { ...goal, actions: updatedActions };
        const goals = state.goals.map((g) =>
          g.id === updatedGoal.id ? updatedGoal : g
        );
        return { ...state, goals };
      }
      return state;
    });
  },
});

// SELECTORS
export const selectCurrentGoal = (state: GoalStore) => state.currentGoal;

export const selectSelectedGoalId = (state: GoalStore) => state.goalSelectedId;

export const selectSelectedGoal = (state: GoalStore) => {
  if (!state.goalSelectedId) return null;
  return state.goals.find((goal) => goal.id === state.goalSelectedId) || null;
};

export const selectAllGoals = (state: GoalStore) => state.goals;

export const selectCurrentStep = (state: GoalStore) => state.currentStep;
