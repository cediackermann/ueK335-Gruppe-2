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
  id: number;
  onSubmit?: (data: BookFormData) => void;
  readOnly?: boolean;
}

/**
 * BookEditForm component for editing book details.
 * @param {SubmitFormPropsWithID} props - The component props.
 * @param {number} props.id - The ID of the book to edit.
 * @param {(data: BookFormData) => void} [props.onSubmit] - Callback function when the form is submitted.
 * @param {boolean} [props.readOnly=false] - If true, the form fields will be read-only.
 */
const BookEditForm: React.FC<SubmitFormPropsWithID> = ({
  onSubmit,
  id,
  readOnly = false,
}: SubmitFormPropsWithID) => {
  const [book, setBook] = useState<Book>();
  const publishers = usePublishers();
  const languages = useLanguages();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<BookFormData>({
    mode: "onChange",
    resolver: zodResolver(bookFormSchema),
  });

  useEffect(() => {
    const fetchBook = async () => {
      const res = await getBookById({ id });
      if (!res) {
        console.error(`Book with ID ${id} not found.`);
        return;
      }
      setBook(res as Book);
      reset({
        title: res.title,
        publisher_id: res.publisher_id,
        isbn13: parseInt(res.isbn13 || "0"),
        num_pages: res.num_pages,
        language_id: res.language_id,
        publication_date: res.publication_date,
      });
    };
    if (id) {
      fetchBook();
    }
  }, [id, reset]);

  const onError = (formErrors: FieldErrors<BookFormData>) => {
    console.log("Error editing book:", formErrors);
  };
  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>
        {readOnly ? "" : "Edit"} {book?.title}, {book?.id}
      </Text>
      <Controller
        control={control}
        name='title'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={"Title"}
            style={[styles.input, errors.title && styles.inputError]}
            placeholder={book?.title}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || ""}
            keyboardType='default'
            autoCapitalize='none'
            mode='outlined'
            outlineColor='#0A2543'
            activeOutlineColor='#0A2543'
            editable={!readOnly}
          />
        )}
      />
      {errors.title && (
        <Text style={styles.errorText}>{errors.title.message}</Text>
      )}
      <Controller
        control={control}
        name='isbn13'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={"ISBN"}
            style={[styles.input, errors.isbn13 && styles.inputError]}
            placeholder={book?.isbn13?.toString()}
            onBlur={onBlur}
            onChangeText={(text) => {
              const num = parseInt(text, 10);
              onChange(isNaN(num) ? 0 : num);
            }}
            value={value ? value.toString() : ""}
            keyboardType='numeric'
            mode='outlined'
            outlineColor='#0A2543'
            activeOutlineColor='#0A2543'
            editable={!readOnly}
          />
        )}
      />
      {errors.isbn13 && (
        <Text style={styles.errorText}>{errors.isbn13.message}</Text>
      )}
      <Controller
        control={control}
        name='num_pages'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={"Page Number"}
            style={[styles.input, errors.num_pages && styles.inputError]}
            placeholder={book?.num_pages?.toString()}
            onBlur={onBlur}
            onChangeText={(text) => {
              const num = parseInt(text, 10);
              onChange(isNaN(num) ? 0 : num);
            }}
            value={value ? value.toString() : ""}
            keyboardType='numeric'
            mode='outlined'
            outlineColor='#0A2543'
            activeOutlineColor='#0A2543'
            editable={!readOnly}
          />
        )}
      />
      {errors.num_pages && (
        <Text style={styles.errorText}>{errors.num_pages.message}</Text>
      )}
      <Text style={styles.label}>Publisher</Text>
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
              enabled={!readOnly}
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
      <Text style={styles.label}>Language</Text>
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
              enabled={!readOnly}
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
            placeholder={book?.publication_date}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || ""}
            keyboardType='default'
            mode='outlined'
            outlineColor='#0A2543'
            activeOutlineColor='#0A2543'
            editable={!readOnly}
          />
        )}
      />
      {errors.publication_date && (
        <Text style={styles.errorText}>{errors.publication_date.message}</Text>
      )}
      {!readOnly && onSubmit && (
        <Button
          title='Save Changes'
          onPress={handleSubmit(onSubmit, onError)}
          disabled={!isValid}
          color='#0A2543'
        />
      )}
    </View>
  );
};

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
  label: {
    fontSize: 16,
    color: "#0A2543",
    marginBottom: 5,
    marginTop: 10,
  },
});

export default BookEditForm;
