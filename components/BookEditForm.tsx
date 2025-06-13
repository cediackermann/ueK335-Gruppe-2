import React, { useEffect, useState } from "react";
import { BookFormData, bookFormSchema } from "../validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FieldError, FieldErrors, useForm } from "react-hook-form";
import { Book } from "../types";
import { getBookById, usePublishers } from "../services/BookService";
import { View, Text, StyleSheet, Button } from "react-native";
import { TextInput } from "react-native-paper";
import { useLanguages } from "../services/Language";
import { Picker } from "@react-native-picker/picker";

interface SubmitFormPropsWithID {
  onSubmit: (data: BookFormData) => void;
  id:number
}

const BookEditForm: React.FC<SubmitFormPropsWithID> = ({ onSubmit,id }: SubmitFormPropsWithID) => {
  const [book, setBook] = useState<Book>();
  const publishers = usePublishers();
  const languages = useLanguages();
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

  useEffect(() => {
    const fetchBook = async () => {
      const res = await getBookById({id});
      setBook(res as Book);
    }
    fetchBook();
  })

  const onError = (formErrors: FieldErrors<BookFormData>) => {
    console.log("Error editing book:", formErrors)
  }
  return (
    <>
    <View>
      <Text style={styles.title}>Edit {book?.title}, {book?.id}</Text>
      <Controller control={control} name='title' render={({ field: { onChange, onBlur, value } }) => (
        <TextInput 
          label={"Title"} 
          style={[styles.input, errors.title && styles.inputError]} 
          placeholder={book?.title} 
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          keyboardType='default'
          autoCapitalize='none'
          mode='outlined'
          outlineColor='#0A2543'
          activeOutlineColor='#0A2543'
        />
      )} 
      />
      {errors.title && (
        <Text style={styles.errorText}>{errors.title.message}</Text>
      )}
      <Controller control={control} name='isbn13' render={({ field: { onChange, onBlur, value } }) => (
        <TextInput 
          label={'ISBN'} 
          style={[styles.input, errors.title && styles.inputError]} 
          placeholder={book?.title} 
          onBlur={onBlur}
          onChangeText={(text) => {
            const num = parseInt(text, 10);
            onChange(isNaN(num) ? 0 : num);
          }}
          value={value ? value.toString(): ""}
          keyboardType='numeric'
          mode='outlined'
          outlineColor='#0A2543'
          activeOutlineColor='#0A2543'
        />
      )} 
      />
      {errors.isbn13 && (
        <Text style={styles.errorText}>{errors.isbn13.message}</Text>
      )}
      <Controller control={control} name='num_pages' render={({ field: { onChange, onBlur, value } }) => (
        <TextInput 
          label={'Page Number'} 
          style={[styles.input, errors.title && styles.inputError]} 
          placeholder={book?.title} 
          onBlur={onBlur}
          onChangeText={(text) => {
            const num = parseInt(text, 10);
            onChange(isNaN(num) ? 0 : num);
          }}
          value={value ? value.toString(): ""}
          keyboardType='numeric'
          mode='outlined'
          outlineColor='#0A2543'
          activeOutlineColor='#0A2543'
        />
      )} 
      />
      {errors.num_pages && (
        <Text style={styles.errorText}>{errors.num_pages.message}</Text>
      )}
      <View style={styles.select}>
          <Controller
            control={control}
            name='publisher_id'
            render={({ field: { onChange, onBlur, value } }) => (
              <Picker
                mode='dropdown'
                selectedValue={value}
                onValueChange={onChange}
                style={[errors.publisher_id && styles.inputError]}
                onBlur={onBlur}
              >
                {publishers.data &&
                  publishers.data.map((publisher) => (
                    <Picker.Item
                      key={publisher.id}
                      label={publisher.publisher_name}
                      value={publisher.id}
                    />
                  ))}
              </Picker>
            )}
          />
          {errors.publisher_id && (
            <Text style={styles.errorText}>{errors.publisher_id.message}</Text>
          )}
        </View>
        <View style={styles.select}>
          <Controller
            control={control}
            name='language_id'
            render={({ field: { onChange, onBlur, value } }) => (
              <Picker
                mode='dropdown'
                selectedValue={value}
                onValueChange={onChange}
                style={[errors.language_id && styles.inputError]}
                onBlur={onBlur}
              >
                {languages.data &&
                  languages.data.map((language) => (
                    <Picker.Item
                      key={language.id}
                      label={language.language_name}
                      value={language.id}
                    />
                  ))}
              </Picker>
            )}
          />
        </View>
        {errors.language_id && (
          <Text style={styles.errorText}>{errors.language_id.message}</Text>
        )}
        <Controller
          control={control}
          name='publication_date'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label={"Publication Date"}
              style={[styles.input, errors.publication_date && styles.inputError]}
              placeholder='Publication Date (YYYY-MM-DD)'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType='default'
              mode='outlined'
              outlineColor='#0A2543'
              activeOutlineColor='#0A2543'
            />
          )}
        />
        {errors.publication_date && (
          <Text style={styles.errorText}>{errors.publication_date.message}</Text>
        )}
        <Button
            title='Add Book'
            onPress={handleSubmit(onSubmit, onError)}
            disabled={!isValid}
            color='#0A2543'
          />
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  formContainer: { width: "100%", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  inputError: { borderColor: "red" },
  errorText: { color: "red", marginBottom: 10, fontSize: 12 },
  select: {
    backgroundColor: "#fff",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#0A2543",
    borderRadius: 5,
  },
});

export default BookEditForm;