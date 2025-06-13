import React, { useEffect, useState } from "react";
import { Button, Text } from "react-native-paper";
import { Alert, KeyboardAvoidingView, Platform, View } from "react-native";
import { useMutation } from "@tanstack/react-query";
import BookEditForm from "../components/BookEditForm";
import { BookFormData } from "../validation/schema";
import { editBook } from "../services/BookService";
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import { RootStackParamList } from "../types";
import queryClient from "../services/QueryClient";

/**
 * EditBook component for editing an existing book.
 * It retrieves the book ID from the navigation parameters and handles the submission of the edited book data.
 * @returns The edit book screen component.
 */
export default function EditBook() {
  const route = useRoute<RouteProp<RootStackParamList, "BookEdit">>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const bookId = route.params?.bookId;
  if (bookId === undefined) {
    return <Text>Error: Book ID not provided.</Text>;
  }

  const mutation = useMutation({
    mutationFn: (data: BookFormData) => editBook(data, bookId),
    onSuccess: () => {
      Alert.alert("Success", "Book edited successfully!");
      queryClient.invalidateQueries({ queryKey: ["books"] });
      navigation.goBack();
    },
    onError: (error: any) => {
      console.error("Error editing book:", error);
      Alert.alert("Error", "Failed to edit book. Please try again.");
    },
  });
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {mutation.isPending ? (
          <Text>Loading...</Text>
        ) : (
          <BookEditForm
            onSubmit={(data: BookFormData) => {
              mutation.mutate(data);
            }}
            id={bookId}
          />
        )}
      </KeyboardAvoidingView>
      <Button onPress={() => navigation.goBack()}>Go Back</Button>
    </>
  );
}
