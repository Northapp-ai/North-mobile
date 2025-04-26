import { Goal, User } from "@/app/auth/models/types";

export type AuthStore = {
  isAuthenticated: boolean;
  user: User;
  setUser: (user: any) => void;
  setUserProfilePhoto: (profilePhoto: string) => void;
  setUserBio: (profilePhoto: string) => void;
};

export type UsersStore = {
  users: User[];
  addUser: (user: any) => void;
};

export type StepGoal = "photo" | "name" | "date" | "review";

export type GoalActions = {
  setCurrentGoal: () => void;
  updateCurrentStep: (step: StepGoal) => void;
  addCurrentGoal: (goal: Goal) => void;
  updateCurrentGoal: (dataGoal: Goal) => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (dataGoal: Goal) => void;
};

export type GoalStore = {
  currentStep: StepGoal;
  goals: Goal[];
  currentGoal: Partial<Goal>;
} & GoalActions;

export type AppStore = AuthStore & UsersStore & GoalStore;
