import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import BookForm from "../components/BookForm";
import { addBook } from "../services/BookService";
import { BookFormData } from "../validation/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddBook() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: BookFormData) => addBook(data),
    onSuccess: (data) => {
      Alert.alert("Success", `Book "${data?.title}" added successfully!`);
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["publishers"]}); 
    },
    onError: (error: any) => {
      console.error("Error adding book:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to add book. Please try again.";
      Alert.alert("Error", errorMessage);
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} 
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.pageTitle}>Add New Book</Text>
        {mutation.isPending ? (
           <View style={styles.loadingContainer}>
            <ActivityIndicator animating={true} size="large" color={"#0A2543"} />
            <Text style={styles.loadingText}>Adding book...</Text>
          </View>
        ) : (
          <BookForm
            onSubmit={(data: BookFormData) => {
              mutation.mutate(data);
            }}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingContainer: { 
    flex: 1, 
    backgroundColor: '#F5F3F9' 
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center', 
    paddingHorizontal: 0,
    paddingBottom: 20, 
  },
  pageTitle: {
    fontSize: 26, 
    fontWeight: "bold",
    textAlign: "center",
    marginTop: Platform.OS === 'ios' ? 50 : 40, 
    marginBottom: 20, 
    color: "#0A2543",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#0A2543",
  }
});
