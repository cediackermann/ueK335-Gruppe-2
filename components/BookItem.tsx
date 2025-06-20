import React from "react";
import { View, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Card, Text } from "react-native-paper";
import { useDeleteBook } from "../services/BookService";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";

/**
 * BookItem component displays a single book with options to view, edit, or delete.
 * @param {object} props - The component props.
 * @param {number} props.id - The ID of the book.
 * @param {string} props.title - The title of the book.
 * @param {string} props.publisher - The publisher of the book.
 */
export const BookItem = React.memo(
  ({
    id,
    title,
    publisher,
  }: {
    id: number;
    title: string;
    publisher: string;
  }) => {
    const { mutate: deleteBookMutation, isPending: isDeleting } =
      useDeleteBook();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleDelete = () => {
      deleteBookMutation(id);
    };

    const handleEdit = () => {
      navigation.navigate("BookEdit", { bookId: id });
    };

    const handlePress = () => {
      navigation.navigate("BookDetail", { bookId: id });
    };

    return (
      <Pressable onPress={handlePress}>
        <Card mode='elevated' style={styles.card}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Card.Content style={{ flex: 1 }}>
              <View style={styles.cardHeader}>
                <Text
                  variant='titleLarge'
                  style={styles.cardHeader}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                >
                  {title}
                </Text>
              </View>
              <Text
                variant='bodyMedium'
                style={styles.authorText}
                numberOfLines={1}
                ellipsizeMode='tail'
              >
                by {publisher}
              </Text>
            </Card.Content>
            <View style={{ justifyContent: "center", paddingRight: 5 }}>
              <Card.Actions>
                <MaterialCommunityIcons
                  name='pencil-outline'
                  style={styles.button}
                  onPress={handleEdit}
                />
                {isDeleting ? (
                  <ActivityIndicator
                    size='small'
                    color='#0A2543'
                    style={styles.button}
                  />
                ) : (
                  <MaterialCommunityIcons
                    onPress={handleDelete}
                    name='trash-can-outline'
                    style={styles.button}
                  />
                )}
              </Card.Actions>
            </View>
          </View>
        </Card>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    height: 100,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 12,
    paddingVertical: 5,
    marginHorizontal: 5,
    marginVertical: 10,
    backgroundColor: "#E6E0E9",
    color: "#0D2A4F",
  },
  cardHeader: {
    marginBottom: 3,
    fontSize: 17,
    fontWeight: "600",
    color: "#0D2A4F",
  },
  authorText: {
    fontSize: 15,
    color: "#0D2A4F",
  },
  button: {
    color: "#0A2543",
    fontSize: 24,
    paddingRight: 10,
  },
});
