import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchApi } from "./Api";
import { Language } from "../types";

/**
 * Fetches all languages from the API.
 * @returns {Promise<Language[]>} A promise that resolves with an array of languages.
 */
export async function getLanguages(): Promise<Language[]> {
  try {
    const res = await fetchApi<Language[]>("book_language", {
      method: "GET",
    });

    if (res) {
      return res;
    }
  } catch (error) {
    console.error("Error fetching languages:", error);
  }
  return [];
}

/**
 * Custom hook for fetching languages.
 * @returns {UseQueryResult<Language[], Error>} A query object from `@tanstack/react-query`.
 */
export function useLanguages(): UseQueryResult<Language[], Error> {
  return useQuery<Language[], Error>({
    queryKey: ["book_language"],
    queryFn: getLanguages,
  });
}
