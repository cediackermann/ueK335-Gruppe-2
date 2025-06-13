import React from "react";
import { Button, Text } from "react-native-paper";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import BookEditForm from "../components/BookEditForm";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

/**
 * BookDetail component displays the details of a single book in a read-only form.
 * It retrieves the book ID from the navigation parameters.
 * @returns The book detail screen component.
 */
export default function BookDetail() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "BookDetail">>();
  const bookId = route.params?.bookId;
  if (bookId === undefined) {
    return <Text>Error: Book ID not provided.</Text>;
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <BookEditForm id={bookId} readOnly={true} />
      </KeyboardAvoidingView>
      <Button onPress={() => navigation.goBack()}>Go Back</Button>
    </>
  );
}
