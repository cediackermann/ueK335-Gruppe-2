import React, { useLayoutEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Text,
  TextInput,
  ActivityIndicator,
  Card,
  Title,
  useTheme,
} from "react-native-paper";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { BooksStackParamList } from "../types";
import { usePublishers } from "../services/BookService";
import { useLanguages } from "../services/Language";
import { StackNavigationProp } from "@react-navigation/stack";

type BookDetailsScreenRouteProp = RouteProp<BooksStackParamList, "BookDetails">;
type BookDetailsScreenNavigationProp = StackNavigationProp<BooksStackParamList, "BookDetails">;

const BookDetailsScreen: React.FC = () => {
  const route = useRoute<BookDetailsScreenRouteProp>();
  const navigation = useNavigation<BookDetailsScreenNavigationProp>();
  const { book } = route.params;
  const theme = useTheme();

  const { data: publishersData, isLoading: isLoadingPublishers } = usePublishers();
  const { data: languagesData, isLoading: isLoadingLanguages } = useLanguages();

  useLayoutEffect(() => {
    navigation.setOptions({ 
      title: "Book Details"
    });
  }, [navigation]);

  if (isLoadingPublishers || isLoadingLanguages) {
    return (
      <View style={styles.centeredLoader}>
        <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />
      </View>
    );
  }

  const publisher = publishersData?.find((p) => p.id === book.publisher_id);
  const language = languagesData?.find((l) => l.id === book.language_id);

  return (
    <ScrollView style={styles.pageContainer} contentContainerStyle={styles.scrollContentContainer}>
      <View style={styles.contentView}>
        <Title style={styles.bookTitleHeader}>{book.title}</Title>
        
        <View style={styles.detailsCard}>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Author</Text>
              <TextInput
                value={publisher?.publisher_name || (isLoadingPublishers ? "Loading..." : "N/A")}
                editable={false}
                style={styles.textInput}
                mode="outlined"
                outlineColor="#CED4DA"
                textColor="#343A40"
                theme={{ colors: { background: styles.textInput.backgroundColor } }}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>ISBN</Text>
              <TextInput
                value={book.isbn13}
                editable={false}
                style={styles.textInput}
                mode="outlined"
                outlineColor="#CED4DA"
                textColor="#343A40"
                theme={{ colors: { background: styles.textInput.backgroundColor } }}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Number of pages</Text>
              <TextInput
                value={book.num_pages.toString()}
                editable={false}
                style={styles.textInput}
                mode="outlined"
                outlineColor="#CED4DA"
                textColor="#343A40"
                theme={{ colors: { background: styles.textInput.backgroundColor } }}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Publisher</Text>
              <TextInput
                value={publisher?.publisher_name || (isLoadingPublishers ? "Loading..." : "N/A")}
                editable={false}
                style={styles.textInput}
                mode="outlined"
                outlineColor="#CED4DA"
                textColor="#343A40"
                theme={{ colors: { background: styles.textInput.backgroundColor } }}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Language</Text>
              <TextInput
                value={language?.language_name || (isLoadingLanguages ? "Loading..." : "N/A")}
                editable={false}
                style={styles.textInput}
                mode="outlined"
                outlineColor="#CED4DA"
                textColor="#343A40"
                theme={{ colors: { background: styles.textInput.backgroundColor } }}
              />
            </View>
            
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Publication Date</Text>
              <TextInput
                value={book.publication_date}
                editable={false}
                style={styles.textInput}
                mode="outlined"
                outlineColor="#CED4DA"
                textColor="#343A40"
                theme={{ colors: { background: styles.textInput.backgroundColor } }}
              />
            </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#F5F3F9", 
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 30,
  },
  contentView: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  centeredLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F3F9",
  },
  bookTitleHeader: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0A2543",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 10, 
  },
  detailsCard: {
    backgroundColor: "#E6E0E9",
    borderRadius: 16,
    paddingHorizontal: 20,    
    paddingTop: 24,
    paddingBottom: 24,
    elevation: 3,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: "#4A4A4A", 
    marginBottom: 6,
    fontWeight: "500",
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    fontSize: 15,
    borderRadius: 8,
  },
  actionButton: {
    marginTop: 16,
    borderColor: "#0A2543",   
    borderWidth: 1.5,          
    borderRadius: 8,           
    paddingVertical: 7,        
    backgroundColor: '#FFFFFF',
  },
  deleteButton: {
    borderColor: "#C70039",   
    marginTop: 12, 
  },
  actionButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButtonLabel: {
  },
});

export default BookDetailsScreen;
