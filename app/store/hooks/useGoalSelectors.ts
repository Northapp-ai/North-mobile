import { useAppStore } from "../index";
import {
  selectCurrentGoal,
  selectSelectedGoalId,
  selectSelectedGoal,
  selectAllGoals,
  selectCurrentStep,
} from "../slices/goalStore";

/**
 * Hook to get the current goal (the one being created/edited)
 */
export const useCurrentGoal = () => {
  return useAppStore(selectCurrentGoal);
};

/**
 * Hook to get the selected goal ID
 */
export const useSelectedGoalId = () => {
  return useAppStore(selectSelectedGoalId);
};

/**
 * Hook to get the selected goal object
 */
export const useSelectedGoal = () => {
  return useAppStore(selectSelectedGoal);
};

/**
 * Hook to get all goals
 */
export const useAllGoals = () => {
  return useAppStore(selectAllGoals);
};

/**
 * Hook to get current step in goal creation
 */
export const useCurrentStep = () => {
  return useAppStore(selectCurrentStep);
};

/**
 * Hook to check if a specific goal is selected
 */
export const useIsGoalSelected = (goalId: string) => {
  return useAppStore((state) => state.goalSelectedId === goalId);
};

/**
 * Hook to get goal actions and setters together
 */
export const useGoalActions = () => {
  return useAppStore((state) => ({
    resetCurrentGoal: state.resetCurrentGoal,
    addCurrentGoal: state.addCurrentGoal,
    updateCurrentGoal: state.updateCurrentGoal,
    updateCurrentStep: state.updateCurrentStep,
    addGoal: state.addGoal,
    updateGoal: state.updateGoal,
    setGoalSelectedId: state.setGoalSelectedId,
  }));
};

/**
 * Hook to get a goal by ID
 */
export const useGoalById = (goalId: string) => {
  return useAppStore(
    (state) => state.goals.find((goal) => goal.id === goalId) || null
  );
};

/**
 * Hook to get computed goal statistics
 */
export const useGoalStats = () => {
  return useAppStore((state) => {
    const totalGoals = state.goals.length;
    const completedGoals = state.goals.filter(
      (goal) =>
        goal.actions?.every((action) => action.completed) &&
        goal.actions?.length > 0
    ).length;

    return {
      totalGoals,
      completedGoals,
      completionRate:
        totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0,
      activeGoals: totalGoals - completedGoals,
    };
  });
};
