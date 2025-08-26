import { useSelectedGoal } from "@/app/store/hooks/useGoalSelectors";

export default function useGroupActions() {
  const currentGoal = useSelectedGoal();
  const actions = currentGoal?.actions ?? [];

  // Group actions by date
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const isTomorrow = (date: Date) => {
    return date.toDateString() === tomorrow.toDateString();
  };

  // Filter actions by completion status
  const todoActions = actions.filter((action) => !action.completed);
  const doneActions = actions.filter((action) => action.completed);

  // Group TODO actions by date
  const todayActions = todoActions.filter((action) => isToday(action.date));
  const tomorrowActions = todoActions.filter((action) =>
    isTomorrow(action.date)
  );
  const upcomingActions = todoActions
    .filter((action) => action.date > tomorrow)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // All completed actions in a single list, sorted by date
  const completedActions = doneActions.sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  return {
    todayActions,
    tomorrowActions,
    upcomingActions,
    completedActions,
    totalTodoCount: todoActions.length,
    totalDoneCount: doneActions.length,
  };
}
