import { useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "./Api";
import { getValueFor, setValueFor } from "./securestorage";
import queryClient from "./QueryClient";
import { User } from "../types";

export async function login(email: string, password: string) {
  const res = await fetchApi<{ accessToken: string; user: User }>("login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (res.accessToken) {
    await storeToken(res.accessToken);
    queryClient.invalidateQueries({ queryKey: ["activeUser"] });
  }
  if (res.user) {
    await setValueFor("activeUser", JSON.stringify(res.user));
  }
  return res;
}

export async function logout() {
  try {
    await setValueFor("accessToken", "");
    await setValueFor("activeUser", "");
    queryClient.invalidateQueries({ queryKey: ["activeUser"] });
  } catch (error) {
    console.error("Error during logout:", error);
  }
}

async function storeToken(token: string) {
  try {
    await setValueFor("accessToken", token);
  } catch (error) {
    console.error("Error storing token:", error);
  }
}

async function getToken(): Promise<string | null> {
  try {
    const token = await getValueFor("accessToken");
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
}
