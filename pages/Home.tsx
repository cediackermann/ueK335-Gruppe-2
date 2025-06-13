import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Platform, StatusBar, ActivityIndicator } from 'react-native';
import { Text, Button, Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Book as BookType, Publisher as PublisherType } from '../types';
import { useBooks, usePublishers } from '../services/BookService';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const { data: booksData, isLoading: isLoadingBooks, error: booksError } = useBooks();
  const { data: publishersData, isLoading: isLoadingPublishers, error: publishersError } = usePublishers();

  const [todaysBook, setTodaysBook] = useState<{
    bookname: string;
    publisherName: string;
    pages: string;
  } | null>(null);

  useEffect(() => {
    if (booksData && booksData.length > 0 && publishersData && publishersData.length > 0) {
      const randomIndex = Math.floor(Math.random() * booksData.length);
      const randomBook: BookType = booksData[randomIndex];
      const publisher: PublisherType | undefined = publishersData.find(
        (p) => p.id === randomBook.publisher_id
      );

      setTodaysBook({
        bookname: randomBook.title,
        publisherName: publisher?.publisher_name || 'Unknown Publisher',
        pages: randomBook.num_pages.toString(),
      });
    }
  }, [booksData, publishersData]);

  const handleEnterPress = () => {
    navigation.navigate('Main', { screen: 'BooksStack' });
  };

  const renderBookRecommendation = () => {
    if (isLoadingBooks || isLoadingPublishers) {
      return <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loadingIndicator} />;
    }
    if (booksError || publishersError) {
      return <Text style={styles.errorText}>Could not load book recommendation. Please try again later.</Text>;
    }
    if (!todaysBook) {
      return <Text style={styles.infoText}>No books available for recommendation at the moment.</Text>;
    }
    return (
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title style={styles.bookName} numberOfLines={2} ellipsizeMode="tail">{todaysBook.bookname}</Title>
            <Paragraph style={styles.pagesText}>{todaysBook.pages} Pages</Paragraph>
          </View>
          <Paragraph style={styles.publisherText}>by {todaysBook.publisherName}</Paragraph>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.pageContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F3F9" />
      <View style={styles.contentContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.appLogo}
        />
        <Text style={styles.welcomeTitle}>
          Welcome, dear customer!
        </Text>
        <Text style={styles.welcomeSubtitle}>
          Click the button below to explore our book collection.
        </Text>
        <Text style={styles.recommendationTitle}>
          Today's Book Recommendation:
        </Text>
        {renderBookRecommendation()}
      </View>
      <View style={styles.footerContainer}>
        <Button
          mode="contained"
          onPress={handleEnterPress}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          contentStyle={styles.buttonContent} // Stellt sicher, dass Label-Style greift
          uppercase={false}
          theme={{ roundness: 2 }} // Für eckigere Buttons (Paper v5)
        >
          Explore Books
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: { 
    flex: 1, 
    backgroundColor: "#F5F3F9", 
    justifyContent: 'space-between', 
    paddingHorizontal: 24, 
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 20 : 50, // Mehr Platz oben, besonders für iOS
    paddingBottom: Platform.OS === 'ios' ? 50 : 40, // Mehr Platz unten für den Button
  },
  contentContainer: { 
    alignItems: "center",
    flex: 1, 
    justifyContent: 'center', 
  },
  appLogo: { 
    width: 160, // Etwas kleiner für mehr Platz
    height: 160, 
    resizeMode: "contain", 
    marginBottom: 25, 
  },
  welcomeTitle: { 
    fontWeight: 'bold', 
    color: "#0A2543", 
    marginBottom: 10, 
    textAlign: 'center', 
    fontSize: 28, 
  },
  welcomeSubtitle: { 
    fontSize: 16, 
    color: '#4A4A4A', 
    textAlign: 'center', 
    marginBottom: 50, 
    paddingHorizontal: 15,
    lineHeight: 24,
  },
  recommendationTitle: { 
    fontWeight: '600', 
    color: "#0A2543", 
    marginBottom: 16, 
    textAlign: 'center', 
    fontSize: 18, 
  },
  card: { 
    width: '100%', 
    maxWidth: 360, 
    backgroundColor: '#E8E5EE', // Hintergrund wie BookItem
    elevation: 3, 
    borderRadius: 12, 
    paddingVertical: 12, // Innenpadding
    paddingHorizontal: 8,
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    marginBottom: 5, 
  },
  bookName: { 
    fontSize: 17, 
    fontWeight: '600', 
    color: '#0A2543', 
    flex: 1, 
    marginRight: 8,
    lineHeight: 22,
  },
  publisherText: { 
    fontSize: 14, 
    color: '#333333', 
    marginTop: 3, 
    lineHeight: 18,
  },
  pagesText: { 
    fontSize: 13, 
    color: '#4A4A4A', 
    marginLeft: 8,
    fontWeight: '500',
  },
  footerContainer: { 
    width: '100%', 
    alignItems: 'center',
  },
  button: { 
    backgroundColor: "#0A2543", 
    borderRadius: 8, 
    width: '100%', 
    maxWidth: 360,
    height: 50, // Explizite Höhe
    justifyContent: 'center', // Zentriert Label vertikal
  },
  buttonContent: { // Um die Höhe des Buttons zu beeinflussen
     height: '100%',
  },
  buttonLabel: { 
    fontSize: 17, 
    fontWeight: 'bold', 
    color: '#FFFFFF',
  },
  loadingIndicator: { marginTop: 25, transform: [{ scale: 1.2 }] },
  errorText: { marginTop: 25, color: '#C70039', textAlign: 'center', fontSize: 16, paddingHorizontal: 10 },
  infoText: { marginTop: 25, color: '#555555', textAlign: 'center', fontSize: 16, paddingHorizontal: 10 },
});

export default Home;
