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

/**
 * SortHeader component displays the current sort option and allows opening the sort modal.
 * @returns {JSX.Element} The rendered SortHeader component.
 */
interface SortHeaderProps {
  currentSort: SortOption;
  onPress: () => void;
}

const SortHeader = ({ currentSort, onPress }: SortHeaderProps) => (
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

/**
 * Props for the SortModal component.
 */
interface SortModalProps {
  visible: boolean;
  currentSort: SortOption;
  onClose: () => void;
  onSortChange: (option: SortOption) => void;
}

/**
 * SortModal component provides a modal for selecting sort options.
 * @returns {JSX.Element} The rendered SortModal component.
 */
const SortModal = ({
  visible,
  currentSort,
  onClose,
  onSortChange,
}: SortModalProps) => (
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

/**
 * Books component displays a list of books with search and sort functionality.
 * @returns {JSX.Element} The rendered Books component.
 */
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
          getItemLayout={(data, index) => ({
            length: 100,
            offset: 100 * index,
            index,
          })}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={21}
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
    backgroundColor: "rgba(0,0,0,0)",
    color: "#0D2A4F",
    outlineColor: "#0D2A4F",
    outlineStyle: "solid",
    outlineWidth: 1,
  },
  text: {
    color: "#0D2A4F",
    fontSize: 16,
    paddingTop: 5,
    justifyContent: 'space-around',
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  menuContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(10, 37, 67, 0.4)',
  },
  sortOption: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(10, 37, 67, 0.1)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
