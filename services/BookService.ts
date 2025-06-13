import { useQuery, useMutation } from "@tanstack/react-query";
import { Book, Publisher } from "../types";
import { fetchApi } from "./Api";
import { BookFormData } from "../validation/schema";
import queryClient from "./QueryClient";

/**
 * Fetches all books from the API.
 * @returns A promise that resolves with an array of books.
 */
export async function getBooks(): Promise<Book[]> {
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

/**
 * Fetches all publishers from the API.
 * @returns A promise that resolves with an array of publishers.
 */
export async function getPublisher(): Promise<Publisher[]> {
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

/**
 * Fetches a book by its ID.
 * @param {object} params - The parameters object.
 * @param {number} params.id - The ID of the book to fetch.
 * @returns A promise that resolves with the book data or null if an error occurs.
 */
export async function getBookById({
  id,
}: {
  id: number;
}): Promise<Book | null> {
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

/**
 * Performs the deletion of a book by its ID.
 * @param {number} id - The ID of the book to delete.
 * @returns A promise that resolves when the book is successfully deleted.
 * @throws {Error} If the book deletion fails.
 */
async function performDeleteBook(id: number): Promise<{}> {
  const res = await fetchApi<{}>(`book/${id}`, {
    method: "DELETE",
  });
  if (!res) {
    throw new Error("Failed to delete book");
  }
  return res;
}

/**
 * Custom hook for deleting a book.
 */
export function useDeleteBook() {
  return useMutation({
    mutationFn: performDeleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      console.error("Error deleting book:", error);
    },
  });
}

/**
 * Adds a new book to the API.
 * @param {BookFormData} book - The book data to add.
 * @returns A promise that resolves with the added book data or null if an error occurs.
 */
export async function addBook(book: BookFormData): Promise<Book | null> {
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

/**
 * Edits an existing book by its ID.
 * @param {BookFormData} book - The updated book data.
 * @param {number} id - The ID of the book to edit.
 * @returns A promise that resolves with the updated book data or null if an error occurs.
 */
export async function editBook(
  book: BookFormData,
  id: number
): Promise<Book | null> {
  try {
    const res = await fetchApi<Book>(`book/${id}`, {
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

/**
 * Custom hook for fetching books.
 */
export function useBooks() {
  return useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });
}

/**
 * Custom hook for fetching publishers.
 */
export function usePublishers() {
  return useQuery({
    queryKey: ["publishers"],
    queryFn: getPublisher,
  });
}
