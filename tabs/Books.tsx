import { BookItem } from "../components/Book";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Searchbar } from 'react-native-paper';
import { Book, getBooks, getPublisher, Publisher } from "../services/BookService";

export default async function Books() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  
  return (
    <>
  <Searchbar 
    placeholder="Book, author"  
    value={searchQuery} 
    onChangeText={setSearchQuery} />
  <ScrollView>
    {books.map((book) => 
      <BookItem title={book.title} publisher="placeholder" />
    )}
  </ScrollView>
    </>
    );
}
