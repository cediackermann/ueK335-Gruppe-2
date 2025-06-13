import { BookItem } from "../components/Book"; 
import React, { useState, useCallback } from "react";
import { View, StyleSheet, FlatList, RefreshControl, Platform, StatusBar } from "react-native";
import { ActivityIndicator, Searchbar, Text, useTheme } from "react-native-paper";
import { useBooks, usePublishers } from "../services/BookService";
import { Book as BookType } from "../types";
import { useFocusEffect } from "@react-navigation/native";

export default function BooksListScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const theme = useTheme();

  const {
    data: booksData,
    isLoading: isLoadingBooksInitial,
    error: booksError,
    refetch: refetchBooks,
    isRefetching: isRefetchingBooks,
  } = useBooks();
  const {
    data: publishersData,
    isLoading: isLoadingPublishersInitial,
    error: publishersError,
    refetch: refetchPublishers,
    isRefetching: isRefetchingPublishers,
  } = usePublishers();

  const isLoading = isLoadingBooksInitial || isLoadingPublishersInitial;
  const isRefetching = isRefetchingBooks || isRefetchingPublishers;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchBooks(), refetchPublishers()]);
    } catch (err) {
      console.error("Failed to refresh data:", err);
    }
    setRefreshing(false);
  }, [refetchBooks, refetchPublishers]);

  useFocusEffect(
    useCallback(() => {
      if (!isLoading) {
        onRefresh();
      }
    }, [isLoading, onRefresh])
  );

  const renderBookItem = ({ item }: { item: BookType }) => {
    const publisher = publishersData?.find(
      (pub) => pub.id === item.publisher_id
    );
    return (
      <BookItem
        book={item}
        publisherName={publisher?.publisher_name || "Unknown Publisher"}
      />
    );
  };

  if (isLoading && !isRefetching) { 
    return (
      <View style={styles.centered}>
        <ActivityIndicator animating={true} size="large" color={"#0A2543"} />
      </View>
    );
  }

  if (booksError || publishersError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.messageText}>Error loading books. Please pull down to refresh.</Text>
      </View>
    );
  }

  const filteredBooks =
    booksData?.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (publishersData?.find(p => p.id === book.publisher_id)?.publisher_name || "").toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Book, author"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
        iconColor={"#0A2543"}
        placeholderTextColor={"#8E8E93"}
        inputStyle={{ fontSize: 16, color: '#000000' }}
        elevation={1}
        theme={{ colors: { primary: '#0A2543', text: '#000000', placeholder: '#8E8E93' }}}
      />
      {filteredBooks.length === 0 && !isLoading ? (
        <View style={styles.centered}>
          <Text style={styles.messageText}>
            {booksData && booksData.length > 0
              ? `No books found for "${searchQuery}"`
              : "The library is currently empty."}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredBooks}
          renderItem={renderBookItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContentContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing || isRefetching}
              onRefresh={onRefresh} 
              colors={["#0A2543"]} 
              tintColor={"#0A2543"}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3F9', 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: '#F5F3F9',
  },
  messageText: {
    color: '#4A4A4A', 
    fontSize: 16,
    textAlign: 'center',
  },
  searchBar: {
    marginHorizontal: 16, 
    marginTop: 16,
    marginBottom: 12,
    borderRadius: 28, 
    backgroundColor: '#FFFFFF',
  },
  listContentContainer: {
    paddingTop: 8,
    paddingBottom: 20,
  },
});
