/**
 * @file This file defines the AddBook screen component, allowing users to add new books.
 * @module AddBook
 */
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import BookForm from "../components/BookForm";
import { addBook } from "../services/BookService";
import { BookFormData } from "../validation/schema";
import { useMutation, useMutationState } from "@tanstack/react-query";

/**
 * `AddBook` is a functional component that serves as a screen for adding new books.
 * It utilizes `BookForm` for input and `useMutation` from `@tanstack/react-query`
 * to handle the asynchronous book addition process.
 *
 */
export default function AddBook(): React.JSX.Element {
  const mutation = useMutation({
    mutationFn: (data: BookFormData) => addBook(data),
    onSuccess: () => {
      Alert.alert("Success", "Book added successfully!");
    },
    onError: (error: any) => {
      console.error("Error adding book:", error);
      Alert.alert("Error", "Failed to add book. Please try again.");
    },
  });
  return (
    <>
      <Text style={styles.title}>Add Book</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        {mutation.isPending ? (
          <Text>Loading...</Text>
        ) : (
          <BookForm
            onSubmit={(data: BookFormData) => {
              mutation.mutate(data);
            }}
          />
        )}
      </KeyboardAvoidingView>
    </>
  );
}

/**
 * StyleSheet for the AddBook component.
 * @constant
 */
const styles = StyleSheet.create({
  keyboardAvoidingContainer: { flex: 1 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    color: "#0A2543",
  },
});
