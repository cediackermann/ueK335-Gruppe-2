import { BookItem } from "../components/Book";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { ActivityIndicator, Searchbar, Text } from "react-native-paper";
import { useBooks, usePublishers } from "../services/BookService";

export default function Books() {
  const [searchQuery, setSearchQuery] = useState("");
  const books = useBooks() || [];
  const publishers = usePublishers() || [];
  const filteredBooks =
    books.data
      ?.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 10) || [];

  return (
    <>
      <Searchbar
        placeholder='Book, author'
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {filteredBooks.length === 0 ? (
        <Text>No results found</Text>
      ) : (
        <ScrollView>
          {filteredBooks.map((book) => {
            const publisher = publishers.data?.find(
              (pub) => pub.id === book.publisher_id
            );

            return (
              <BookItem
                key={book.id}
                title={book.title}
                publisher={publisher?.publisher_name || "Unknown Publisher"}
              />
            );
          })}
        </ScrollView>
      )}
    </>
  );
}
