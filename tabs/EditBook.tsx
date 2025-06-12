import React, { useEffect, useState } from 'react'
import { Button, Text } from "react-native-paper";
import { getBookById } from '../services/BookService';
import { Book } from '../types';
import { View } from 'react-native';
import { Controller, FieldErrors, useForm } from 'react-hook-form';
import { BookFormData, bookFormSchema } from '../validation/schema';
import { zodResolver } from '@hookform/resolvers/zod';


export default function EditBook({ id }: {id: number}) {
  const [book, setBook] = useState<Book>();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BookFormData>({
    mode: "onChange",
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: book?.title,
      publisher_id: book?.publisher_id,
      isbn13: parseInt(book?.isbn13 || '0'),
      num_pages: book?.num_pages,
      language_id: book?.language_id,
    },
  });

  const onError = (formErrors: FieldErrors<BookFormData>) => {
    console.log("Error editing Book:", formErrors);
  };

  const onSubmit = (data: BookFormData) => {
    
  }

  useEffect(() => {
    const fetchBook = async () => {
      const result = await getBookById({id});
      setBook(result as Book);
    };
    fetchBook();
  })
  return (
    <>
    <Text>Edit {book?.title}</Text>
    <View>
      <Controller />
    </View>
    <Button title='Confirm Changes' onPress={handleSubmit(onSubmit, onError)}/>
    </>
  )
}