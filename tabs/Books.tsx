import { BookItem } from "../components/Book";
import React, { useState } from "react";
import { FlatList, Modal, Pressable, ScrollView, StatusBar, View } from "react-native";
import { ActivityIndicator, Card, Drawer, FAB, Searchbar, Text } from "react-native-paper";
import { useBooks, usePublishers } from "../services/BookService";
import { SortOption } from "../types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


export default function Books() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSort, setCurrentSort] = useState(SortOption.Author);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleSortChange = (option: SortOption) => {
    setCurrentSort(option);
    hideModal;
  }

  const books = useBooks() || [];
  const publishers = usePublishers() || [];
  const filteredBooks =
    books.data
      ?.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) 
      )
      .sort((a, b) => {
        switch(currentSort) {
          case SortOption.Author:
            return a.title.localeCompare(b.title)
          case SortOption.Bookname:
            return a.title.localeCompare(b.title)
          case SortOption.PageAsc:
            return a.num_pages - b.num_pages
          case SortOption.PagesDesc:
            return b.num_pages - a.num_pages
          default:
            return 0;
        }
      }) || [currentSort, searchQuery];
     
    

  return (
    <>
      <Searchbar
        placeholder='Book, author'
        value={searchQuery}
        onChangeText={searchQuery => setSearchQuery(searchQuery)}
      />
      <View>
        <Pressable onPress={showModal}>
          <Text variant="titleMedium">{currentSort} </Text>
        </Pressable>
      </View>
      {filteredBooks.length === 0 ? (
        <Text>No results found</Text>
      ) : (
        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const publisher = publishers.data?.find(
              (pub) => pub.id === item.publisher_id
            );

            return (
              <BookItem
                title={item.title}
                publisher={publisher?.publisher_name || "Unknown Publisher"}
              />
            );
          }}
        />
      )}
          <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => hideModal}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Sort by:</Text>
            <MaterialCommunityIcons name="close" onPress={hideModal} />

            {Object.values(SortOption).map((option) => (
              <Pressable key={option} onPress={() => handleSortChange(option)} style={{ paddingVertical: 10 }}>
                <Text style={{ fontSize: 16 }}>
                  {option} {currentSort === option ? <MaterialCommunityIcons name="check"/> : ''}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
      
    </>
  );
}
