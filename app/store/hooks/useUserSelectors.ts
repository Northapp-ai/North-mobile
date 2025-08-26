import { useAppStore } from "../index";
import { selectAllUsers } from "../slices/usersStore";

/**
 * Hook to get all users
 */
export const useAllUsers = () => {
  return useAppStore(selectAllUsers);
};
