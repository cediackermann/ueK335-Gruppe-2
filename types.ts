export type MainTabParamList = {
  Books: undefined;
  AddBook: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Books: undefined;
  Main: { screen?: keyof MainTabParamList; params?: any };
  BookEdit?: { bookId: number };
  BookDetail?: { bookId: number }; // Add BookDetail route
  Home: undefined;
};

export type Book = {
  id: number;
  title: string;
  isbn13: string;
  language_id: number;
  num_pages: number;
  publication_date: string;
  publisher_id: number;
};

export type Publisher = {
  id: number;
  publisher_name: string;
  incorporation_date: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthdate: string;
};

export type Language = {
  id: number;
  language_code: string;
  language_name: string;
};

export enum SortOption {
  Publisher = "Publisher",
  Bookname = "Bookname",
  PageAsc = "Pages ascending",
  PagesDesc = "Pages descending",
}
