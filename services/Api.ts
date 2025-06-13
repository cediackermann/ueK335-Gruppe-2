import { getValueFor } from "./securestorage";
const baseURL = process.env.EXPO_PUBLIC_BASE_URL;

/**
 * Fetches data from the API.
 * @template T The expected return type of the API response.
 * @param {string} path The API endpoint path.
 * @param {RequestInit} [options] Optional request initialization options.
 * @param {any} [body] Optional request body.
 * @returns {Promise<T>} A promise that resolves with the fetched data.
 * @throws {Error} If the API response is not OK.
 */
export async function fetchApi<T>(
  path: string,
  options?: RequestInit,
  body?: any
): Promise<T> {
  const authToken = await getValueFor("accessToken");

  const response = await fetch(`${baseURL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...options?.headers,
    },
    body: body ? JSON.stringify(body) : options?.body,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch data");
  }

  return response.json();
}
