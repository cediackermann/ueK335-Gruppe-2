import { fetchApi } from "./Api"
import queryClient from "./QueryClient";
import { setValueFor } from "./securestorage";

export type Book = {
  id: number,
  title: string,
  isbn13: string,
  language_id: number,
  num_pages: number,
  publication_date: string,
  publisher_id: number
}

export type Publisher = {
  id: number,
  publisher_name: string,
  incorporation_date: string
}

export async function getBooks() {
  const res = await fetchApi<{ books: Book[] }>("book", {
    method: "GET",
  });
  console.log("getbooks", res);
  return res.books;
}

export async function getPublisher() {
  const res = await fetchApi<{ publishers: Publisher[] }>("publisher", {
    method: "GET",
  });
  console.log("getpublishers", res);
  return res;
}

async function storeBooks(books: Book[]) {
  try {
    await setValueFor("books", "");
  } catch (error) {
    console.error("error setting books:", error);
  }
}