import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "./Api";
import { Language } from "../types";

export async function getLanguages() {
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

export function useLanguages() {
  return useQuery({
    queryKey: ["book_language"],
    queryFn: getLanguages,
  });
}
