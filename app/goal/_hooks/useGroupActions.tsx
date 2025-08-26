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

  const todayActions = actions.filter((action) => isToday(action.date));
  const tomorrowActions = actions.filter((action) => isTomorrow(action.date));
  const upcomingActions = actions
    .filter((action) => action.date > tomorrow)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return {
    todayActions,
    tomorrowActions,
    upcomingActions,
  };
}
