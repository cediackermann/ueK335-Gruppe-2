import { useQuery } from "@tanstack/react-query";
import { getValueFor, setValueFor } from "./securestorage";
import queryClient from "./QueryClient";
import { User } from "../types";

/**
 * Retrieves the active user from secure storage.
 * @returns A Promise that resolves to the active user (User) or null if not found or an error occurs.
 */
async function getActiveUser(): Promise<User | null> {
  try {
    const user = await getValueFor("activeUser");
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving active user:", error);
    return null;
  }
}

/**
 * Sets the active user in secure storage and invalidates the 'activeUser' query.
 * @param user The user object to set as the active user.
 * @returns A Promise that resolves when the operation is complete.
 */
export async function setActiveUser(user: User): Promise<void> {
  try {
    await setValueFor("activeUser", JSON.stringify(user));
    queryClient.invalidateQueries({ queryKey: ["activeUser"] });
  } catch (error) {
    console.error("Error setting active user:", error);
  }
}

/**
 * A React Query hook to access the active user.
 * @returns The result of the useQuery hook for the active user.
 */
export function useActiveUser() {
  return useQuery({
    queryKey: ["activeUser"],
    queryFn: getActiveUser,
  });
}
