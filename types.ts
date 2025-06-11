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

export type RootStackParamList = {
  Home: undefined;
  Books: undefined;
  Login: undefined;
  Main: undefined;
  Register: undefined;
  BookEdit: undefined;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthdate: string;
};