import { fetchApi } from "./Api";
import { getValueFor, setValueFor } from "./securestorage";
import queryClient from "./QueryClient";
import { User } from "../types";
import { LoginFormData, SignupApiPayload } from "../validation/schema";

/**
 * Authenticates a user with the provided email and password.
 * Stores the active user and access token upon successful login.
 * @param {LoginFormData} { email, password } - The login credentials.
 * @returns {Promise<{ accessToken: string; user: User }>} A promise that resolves with the access token and user object.
 */
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

/**
 * Registers a new user with the provided details.
 * Stores the active user and access token upon successful registration.
 * @param {SignupApiPayload} { firstName, lastName, email, password, birthdate } - The signup details.
 * @returns {Promise<{ accessToken: string; user: User }>} A promise that resolves with the access token and user object.
 */
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

/**
 * Logs out the current user by clearing the active user data from secure storage
 * and invalidating the 'activeUser' query.
 * @returns {Promise<void>} A promise that resolves when the logout operation is complete.
 */
export async function logout() {
  try {
    await setValueFor("activeUser", "");
    queryClient.invalidateQueries({ queryKey: ["activeUser"] });
  } catch (error) {
    console.error("Error during logout:", error);
  }
}

/**
 * Stores the provided access token securely.
 * @param {string} token The access token to store.
 * @returns {Promise<void>} A promise that resolves when the token is stored.
 */
async function storeToken(token: string) {
  try {
    await setValueFor("accessToken", token);
  } catch (error) {
    console.error("Error storing token:", error);
  }
}
