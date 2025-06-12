import { useQuery } from "@tanstack/react-query";
import { Book, Publisher } from "../types";
import { fetchApi } from "./Api";
import { BookFormData } from "../validation/schema";

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

export async function getBookById({ id}: {id: number}) {
  try {
    const res = await fetchApi<Book>(`book/${id}`, {
      method: "GET",
    });
    if (res) {
      return res;
    }
  } catch (error) {
    console.error("Error getting book by id:", error);
  }
  return null;
}

export async function addBook(book: BookFormData) {
  try {
    const res = await fetchApi<Book>("book", {
      method: "POST",
      body: JSON.stringify(book),
    });
    if (res) {
      return res;
    }
  } catch (error) {
    console.error("Error adding book:", error);
  }
  return null;
}

export async function editBook(book: Book) {
  try {
    const res = await fetchApi<Book>(`book/${book.id}`, {
      method: "PUT",
      body: JSON.stringify(book),
    });
    if (res) {
      return res;
    }
  } catch (error) {
    console.error("Error updating book:", error);
  }
  return null;
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
