import { useQuery } from "@tanstack/react-query";
import { Book, Publisher } from "../types";
import { fetchApi } from "./Api";

export async function getBooks() {
  try {
    const res = await fetchApi<Book[]>("book", {
      method: "GET",
    });

    if (res) {
      return res;
    }
  } catch (error) {
    console.error("Error fetching books:", error);
  }
  return [];
}

export async function getPublisher() {
  try {
    const res = await fetchApi<Publisher[]>("publisher", {
      method: "GET",
    });

    if (res) {
      return res;
    }
  } catch (error) {
    console.error("Error fetching publishers:", error);
  }
  return [];
}

export function useBooks() {
  return useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });
}

export function usePublishers() {
  return useQuery({
    queryKey: ["publishers"],
    queryFn: getPublisher,
  });
}
