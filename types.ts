export type BooksStackParamList = {
  BooksList: undefined;
  BookDetails: { book: Book };
};

export type MainTabParamList = {
  BooksStack: undefined;
  AddBook: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  Main: { screen?: keyof MainTabParamList; params?: any };
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
