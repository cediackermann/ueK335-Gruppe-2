export type MainTabParamList = {
  Books: undefined;
  AddBook: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  Main: { screen?: keyof MainTabParamList; params?: any };
  BookEdit?: { bookId: number };
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
  birthdate: string; // Format: 'YYYY-MM-DD'
};