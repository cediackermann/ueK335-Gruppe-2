import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getValueFor, setValueFor } from "./securestorage";
import queryClient from "./QueryClient";
import { User } from "../types";

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

export async function setActiveUser(user: User): Promise<void> {
  try {
    await setValueFor("activeUser", JSON.stringify(user));
    queryClient.invalidateQueries({ queryKey: ["activeUser"] });
  } catch (error) {
    console.error("Error setting active user:", error);
  }
}

export function useActiveUser() {
  return useQuery({
    queryKey: ["activeUser"],
    queryFn: getActiveUser,
  });
}
