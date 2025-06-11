import { fetchApi } from "./Api";
import { getValueFor, setValueFor } from "./securestorage";
import queryClient from "./QueryClient";
import { User } from "../types";
import { LoginFormData, SignupApiPayload } from "../validation/schema";

export async function login({
  email,
  password,
}: LoginFormData): Promise<{ accessToken: string; user: User }> {
  const res = await fetchApi<{ accessToken: string; user: User }>("login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (res.user) {
    await setValueFor("activeUser", JSON.stringify(res.user));
  }
  if (res.accessToken) {
    await storeToken(res.accessToken);
    queryClient.invalidateQueries({ queryKey: ["activeUser"] });
  }
  return res;
}

export async function signUp({
  firstName,
  lastName,
  email,
  password,
  birthdate,
}: SignupApiPayload): Promise<{ accessToken: string; user: User }> {
  const res = await fetchApi<{ accessToken: string; user: User }>("register", {
    method: "POST",
    body: JSON.stringify({ firstName, lastName, email, password, birthdate }),
  });
  if (res.user) {
    await setValueFor("activeUser", JSON.stringify(res.user));
  }
  if (res.accessToken) {
    await storeToken(res.accessToken);
    queryClient.invalidateQueries({ queryKey: ["activeUser"] });
  }
  return res;
}

export async function logout() {
  try {
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
