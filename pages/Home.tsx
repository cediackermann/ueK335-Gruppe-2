import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Text, Button, Card, Title, Paragraph } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RootStackParamList,
  Book as BookType,
  Publisher as PublisherType,
} from "../types"; // Stelle sicher, dass der Pfad korrekt ist
import { useBooks, usePublishers } from "../services/BookService"; // Stelle sicher, dass der Pfad korrekt ist
import { BookItem } from "../components/BookItem";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  const {
    data: booksData,
    isLoading: isLoadingBooks,
    error: booksError,
  } = useBooks();
  const {
    data: publishersData,
    isLoading: isLoadingPublishers,
    error: publishersError,
  } = usePublishers();

  const [todaysBook, setTodaysBook] = useState<{
    bookname: string;
    author: string; // In deinem Fall der Publisher Name
    pages: string;
  } | null>(null);

  useEffect(() => {
    if (booksData && booksData.length > 0 && publishersData) {
      // Wähle ein zufälliges Buch aus
      const randomIndex = Math.floor(Math.random() * booksData.length);
      const randomBook: BookType = booksData[randomIndex];

      // Finde den zugehörigen Publisher
      const publisher: PublisherType | undefined = publishersData.find(
        (p) => p.id === randomBook.publisher_id
      );

      setTodaysBook({
        bookname: randomBook.title,
        author: publisher?.publisher_name || "Unknown Publisher",
        pages: randomBook.num_pages.toString(), // num_pages ist eine Zahl, konvertiere sie zu String
      });
    }
  }, [booksData, publishersData]); // Abhängigkeiten: Effekt neu ausführen, wenn sich Bücher oder Verlage ändern

  const handleEnterPress = () => {
    navigation.navigate("Main", { screen: "Books" });
  };

  const renderBookRecommendation = () => {
    if (isLoadingBooks || isLoadingPublishers) {
      return (
        <ActivityIndicator
          size='small'
          color='#0A2543'
          style={styles.loadingIndicator}
        />
      );
    }

    if (booksError || publishersError) {
      return (
        <Text style={styles.errorText}>
          Could not load book recommendation.
        </Text>
      );
    }

    if (!todaysBook) {
      return (
        <Text style={styles.infoText}>
          No books available for recommendation.
        </Text>
      );
    }

    return (
      <BookItem
        id={0}
        title={todaysBook.bookname}
        publisher={todaysBook.author}
      />
    );
  };

  return (
    <View style={styles.pageContainer}>
      <StatusBar barStyle='dark-content' backgroundColor='#F5F3F9' />

      <View style={styles.contentContainer}>
        <Image source={require("../assets/logo.png")} style={styles.appLogo} />

        <Text style={styles.welcomeTitle} variant='headlineMedium'>
          Welcome dear customer
        </Text>
        <Text style={styles.welcomeSubtitle}>
          click on the big button below to get started!
        </Text>

        <Text style={styles.recommendationTitle} variant='titleMedium'>
          Todays Book recommendation:
        </Text>
        {renderBookRecommendation()}
      </View>

      <View style={styles.footerContainer}>
        <Button
          mode='contained'
          onPress={handleEnterPress}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          contentStyle={styles.buttonContent}
          uppercase={true}
        >
          ENTER
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // ELEGANT STYLES FORMATIERT
  pageContainer: {
    flex: 1,
    backgroundColor: "#F5F3F9",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 10 : 30,
    paddingBottom: 80,
  },
  contentContainer: { alignItems: "center" },
  appLogo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 60,
    marginBottom: 30,
    alignSelf: "center",
  },
  welcomeTitle: {
    fontWeight: "bold",
    color: "#0A2543",
    marginBottom: 6,
    textAlign: "center",
    fontSize: 24,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#4A4A4A",
    textAlign: "center",
    marginBottom: 70,
    paddingHorizontal: 10,
  },
  recommendationTitle: {
    fontWeight: "bold",
    color: "#0A2543",
    marginBottom: 12,
    textAlign: "center",
    fontSize: 16,
  },
  card: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "#E8E5EE",
    elevation: 3,
    borderRadius: 12,
    paddingVertical: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
  bookName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#0A2543",
    flexShrink: 1,
  },
  authorText: { fontSize: 15, color: "#333", marginTop: 2 },
  pagesText: { fontSize: 13, color: "#333", marginLeft: 8 },
  footerContainer: { width: "100%", alignItems: "center" },
  button: {
    backgroundColor: "#0A2543",
    borderRadius: 5,
    width: "100%",
    height: 45,
    maxWidth: 350,
  },
  buttonContent: { paddingVertical: 2 },
  buttonLabel: { fontSize: 16, fontWeight: "bold", color: "#FFFFFF" },
  loadingIndicator: { marginTop: 20 },
  errorText: { marginTop: 20, color: "red", textAlign: "center" },
  infoText: { marginTop: 20, color: "#555", textAlign: "center" },
});

export default Home;
