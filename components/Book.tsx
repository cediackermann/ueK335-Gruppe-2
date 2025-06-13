import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { BooksStackParamList, Book as BookType } from "../types";
import { useNavigation } from "@react-navigation/native";

type BookItemNavigationProp = StackNavigationProp<BooksStackParamList, "BooksList">;

export const BookItem = ({
  book,
  publisherName,
}: {
  book: BookType;
  publisherName: string;
}) => {
  const navigation = useNavigation<BookItemNavigationProp>();

  const handlePress = () => {
    navigation.navigate("BookDetails", { book: book });
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Card mode="elevated" style={styles.card}>
        <View style={styles.cardContentWrapper}>
          <View style={styles.textContainer}>
            <Title style={styles.cardTitle} numberOfLines={2} ellipsizeMode="tail">
              {book.title}
            </Title>
            <Paragraph style={styles.authorText}>
              {publisherName}
            </Paragraph>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    elevation: 2,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: "#E8E5EE",
  },
  cardContentWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#0D2A4F",
    lineHeight: 22,
    marginBottom: 2,
  },
  authorText: {
    fontSize: 14,
    color: "#4A4A4A",
    lineHeight: 18,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    padding: 6,
    marginLeft: 8,
  },
  iconButton: {
    color: "#0A2543",
    fontSize: 23,
  },
});
