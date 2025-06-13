import React, { useEffect, useState } from 'react'
import { Text } from "react-native-paper";
import { Alert, KeyboardAvoidingView, Platform, View } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import BookEditForm from '../components/BookEditForm';
import { BookFormData } from '../validation/schema';
import { Book } from '../types';
import { editBook } from '../services/BookService';


export default function EditBook({ id }: {id: number}) {
  const mutation = useMutation({
    mutationFn: (data: BookFormData) => editBook(data, id),
    onSuccess: () => {
      Alert.alert("Success", "Book edited successfully!");
    },
    onError: (error: any) => {
      console.error("Error editing book:", error);
      Alert.alert("Error", "Failed to edit book. Please try again.");
    },
  });
  return (
    <>
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      {mutation.isPending ? (
        <Text>Loading...</Text>
      ) : (
        <BookEditForm onSubmit={(data: BookFormData) => {
              mutation.mutate(data);
            } } id={id}        />
      )}
    </KeyboardAvoidingView>

    </>
  )
}

