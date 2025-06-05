import { getValueFor } from "./securestorage";
const baseURL = process.env.EXPO_PUBLIC_BASE_URL;
console.log("Base URL:", baseURL);

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
