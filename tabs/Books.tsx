import { BookItem } from "../components/Book";
import React, { useState } from "react";
import { FlatList, Modal, Pressable, View, StyleSheet } from "react-native";
import { ActivityIndicator, Card, Divider, Drawer, FAB, Searchbar, Text } from "react-native-paper";
import { useBooks, usePublishers } from "../services/BookService";
import { Publisher, SortOption } from "../types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function Books() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSort, setCurrentSort] = useState(SortOption.Publisher);
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
          case SortOption.Publisher: {
            const pubA = publishers.data?.find(p => p.id === a.publisher_id);
            const pubB = publishers.data?.find(p => p.id === b.publisher_id);
            return (pubA?.publisher_name || '').localeCompare(pubB?.publisher_name || '');          
          }
          case SortOption.Bookname:
            return a.title.localeCompare(b.title)
          case SortOption.PageAsc:
            return a.num_pages - b.num_pages
          case SortOption.PagesDesc:
            return b.num_pages - a.num_pages
          default:
            return 0;
        }
      }) || [currentSort];
     
    

  return (
    <>
    <View style={styles.page}>
    <View>
      <Searchbar
        placeholder='Book, publisher'
        placeholderTextColor='#0D2A4F'
        value={searchQuery}
        onChangeText={searchQuery => setSearchQuery(searchQuery)}
        style={styles.searchbar}
        iconColor="0D2A4F"
        rippleColor="#0D2A4F"
      />
      <View>
        <Pressable onPress={showModal}>
          <Text variant="titleMedium" style={styles.text}>{currentSort} </Text>
            <MaterialCommunityIcons name="chevron-down" size={20} color="#1a1a2e" />
          <View style={styles.underline} />
        </Pressable>
      </View>
    </View>
      {filteredBooks.length === 0 ? (
        <Text style={styles.text}>No results found</Text>
      ) : (
        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const publisher = publishers.data?.find(
              (pub) => pub.id === item.publisher_id
            );

            return (
              <BookItem
                id={item.id}
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
        <View style={styles.menu}>
          <View style={styles.menuContainer}>
            <Text style={styles.header}>Sort by:</Text>
            <MaterialCommunityIcons style={styles.icon} name="close" onPress={hideModal} />

            {Object.values(SortOption).map((option) => (
              <Pressable key={option} onPress={() => handleSortChange(option)} style={{ paddingVertical: 10 }}>
                <Text style={styles.text}>
                  {option} {currentSort === option ? <MaterialCommunityIcons style={styles.icon} name="check"/> : ''}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingLeft: 20, 
    paddingRight: 20, 
    paddingTop: 25
  },
  searchbar: {
    backgroundColor: '#fff', color: '#0D2A4F', outlineColor: '#0D2A4F', outlineStyle: 'solid', outlineWidth: 1
  },
  text: {
    color: '#0D2A4F',
    fontSize: 16,
    paddingTop: 5
  },
  header: {
    fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#0D2A4F'
  },
  menu: {
    flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)'
  },
  menuContainer: {
    backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20
  },
  menuText: {
    fontSize: 18, fontWeight: 'bold', marginBottom: 10
  },
  icon: {
    color: '#0D2A4F',
    fontSize: 24
  },
    underline: {
    marginTop: 4,
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
  },
})