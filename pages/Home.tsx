import React from 'react';
import { View, StyleSheet, Image, Platform, StatusBar } from 'react-native';
import { Text, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Books: undefined;
  Login: undefined;
  Main: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  const todaysBook = {
    bookname: "Best book ever",
    author: "Loris Imbrogno",
    pages: "200",
  };

  return (
    <View style={styles.pageContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F3F9" />

      <View style={styles.contentContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.appLogo}
        />
       

        <Text style={styles.welcomeTitle} variant="headlineMedium">
          Welcome dear customer
        </Text>
        <Text style={styles.welcomeSubtitle}>
          click on the big button below to get started!
        </Text>

        <Text style={styles.recommendationTitle} variant="titleMedium">
          Todays Book recommendation:
        </Text>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Title style={styles.bookName}>{todaysBook.bookname}</Title>
              <Paragraph style={styles.pagesText}>{todaysBook.pages} Pages</Paragraph>
            </View>
            <Paragraph style={styles.authorText}>Author: {todaysBook.author}</Paragraph>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.footerContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Books')}
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
  pageContainer: { flex: 1, backgroundColor: "#F5F3F9", justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 30, paddingBottom: 80 },
  contentContainer: { alignItems: "center" },
  appLogo: { width: 200, height: 200, resizeMode: "contain", marginTop: 60, marginBottom: 30, alignSelf: "center" },
  welcomeTitle: { fontWeight: 'bold', color: "#0D2A4F", marginBottom: 6, textAlign: 'center', fontSize: 24 },
  welcomeSubtitle: { fontSize: 14, color: '#4A4A4A', textAlign: 'center', marginBottom: 70, paddingHorizontal: 10 },
  recommendationTitle: { fontWeight: 'bold', color: "#0D2A4F", marginBottom: 12, textAlign: 'center', fontSize: 16 },
  card: { width: '100%', maxWidth: 350, backgroundColor: '#E8E5EE', elevation: 3, borderRadius: 12, paddingVertical: 5 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 },
  bookName: { fontSize: 17, fontWeight: '600', color: '#0D2A4F' },
  authorText: { fontSize: 15, color: '#333', marginTop: 2 },
  pagesText: { fontSize: 13, color: '#333' },
  footerContainer: { width: '100%', alignItems: 'center' },
  button: { backgroundColor: "#0D2A4F", borderRadius: 5, width: '100%', height: 45, maxWidth: 350 },
  buttonContent: { paddingVertical: 2 },
  buttonLabel: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
});

export default Home;