import { BookItem } from "../components/BookItem";
import React, { useState, useCallback, useMemo } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Searchbar, Text } from "react-native-paper";
import { useBooks, usePublishers } from "../services/BookService";
import { SortOption, Book } from "../types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const SortHeader = ({
  currentSort,
  onPress,
}: {
  currentSort: SortOption;
  onPress: () => void;
}) => (
  <Pressable onPress={onPress}>
    <View style={styles.sortHeader}>
      <Text variant='titleMedium' style={styles.text}>
        {currentSort}
      </Text>
      <MaterialCommunityIcons name='chevron-down' size={20} color='#1a1a2e' />
    </View>
    <View style={styles.underline} />
  </Pressable>
);

const SortModal = ({
  visible,
  currentSort,
  onClose,
  onSortChange,
}: {
  visible: boolean;
  currentSort: SortOption;
  onClose: () => void;
  onSortChange: (option: SortOption) => void;
}) => (
  <Modal
    visible={visible}
    transparent
    animationType='slide'
    onRequestClose={onClose}
  >
    <View style={styles.menu}>
      <View style={styles.menuContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.header}>Sort by:</Text>
          <MaterialCommunityIcons
            style={styles.icon}
            name='close'
            onPress={onClose}
          />
        </View>
        {Object.values(SortOption).map((option) => (
          <Pressable
            key={option}
            onPress={() => onSortChange(option)}
            style={styles.sortOption}
          >
            <Text style={styles.text}>
              {option}
              {currentSort === option && (
                <MaterialCommunityIcons style={styles.icon} name='check' />
              )}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  </Modal>
);

export default function Books() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSort, setCurrentSort] = useState(SortOption.Publisher);
  const [visible, setVisible] = useState(false);

  const { data: books = [], isLoading: booksLoading } = useBooks();
  const { data: publishers = [], isLoading: publishersLoading } =
    usePublishers();

  const showModal = useCallback(() => setVisible(true), []);
  const hideModal = useCallback(() => setVisible(false), []);

  const handleSortChange = useCallback(
    (option: SortOption) => {
      setCurrentSort(option);
      hideModal();
    },
    [hideModal]
  );

  const filteredBooks = useMemo(() => {
    return books
      .filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        switch (currentSort) {
          case SortOption.Publisher: {
            const pubA = publishers.find((p) => p.id === a.publisher_id);
            const pubB = publishers.find((p) => p.id === b.publisher_id);
            return (pubA?.publisher_name ?? "").localeCompare(
              pubB?.publisher_name ?? ""
            );
          }
          case SortOption.Bookname:
            return a.title.localeCompare(b.title);
          case SortOption.PageAsc:
            return a.num_pages - b.num_pages;
          case SortOption.PagesDesc:
            return b.num_pages - a.num_pages;
          default:
            return 0;
        }
      });
  }, [books, publishers, searchQuery, currentSort]);

  const renderItem = useCallback(
    ({ item }: { item: Book }) => {
      const publisher = publishers.find((pub) => pub.id === item.publisher_id);
      return (
        <BookItem
          id={item.id}
          title={item.title}
          publisher={publisher?.publisher_name ?? "Unknown Publisher"}
        />
      );
    },
    [publishers]
  );

  return (
    <View style={styles.page}>
      <View>
        <Searchbar
          placeholder='Book, publisher'
          placeholderTextColor='#0D2A4F'
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchbar}
          iconColor='#0D2A4F'
          rippleColor='#0D2A4F'
        />
        <SortHeader currentSort={currentSort} onPress={showModal} />
      </View>

      {booksLoading || publishersLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#0D2A4F' />
        </View>
      ) : filteredBooks.length === 0 ? (
        <Text style={styles.text}>No results found</Text>
      ) : (
        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
        />
      )}

      <SortModal
        visible={visible}
        currentSort={currentSort}
        onClose={hideModal}
        onSortChange={handleSortChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
    paddingTop: 25,
  },
  searchbar: {
    backgroundColor: "#fff",
    color: "#0D2A4F",
    outlineColor: "#0D2A4F",
    outlineStyle: "solid",
    outlineWidth: 1,
  },
  text: {
    color: "#0D2A4F",
    fontSize: 16,
    paddingTop: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0D2A4F",
  },
  menu: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  menuContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  icon: {
    color: "#0D2A4F",
    fontSize: 24,
  },
  underline: {
    marginTop: 4,
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
  },
  sortHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sortOption: {
    paddingVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

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