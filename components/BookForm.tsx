import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookFormData, bookFormSchema } from "../validation/schema";
import { TextInput } from "react-native-paper";
import { usePublishers } from "../services/BookService";
import { Picker } from "@react-native-picker/picker";
import { useLanguages } from "../services/Language";

interface SubmitFormProps {
  onSubmit: (data: BookFormData) => void;
}

const BookForm: React.FC<SubmitFormProps> = ({ onSubmit }) => {
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
      title: "",
      publisher_id: 0,
      isbn13: 0,
      num_pages: 0,
      language_id: 0,
    },
  });

  const onError = (formErrors: FieldErrors<BookFormData>) => {
    console.log("Login Validation Errors:", formErrors);
  };

  return (
    <View style={styles.formContainer}>
      <Controller
        control={control}
        name='title'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={"Title"}
            style={[styles.input, errors.title && styles.inputError]}
            placeholder='Title'
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

      <Controller
        control={control}
        name='isbn13'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={"ISBN"}
            style={[styles.input, errors.isbn13 && styles.inputError]}
            placeholder='ISBN'
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
            label={"Page Count"}
            style={[styles.input, errors.num_pages && styles.inputError]}
            placeholder='Page Number'
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
});

export default BookForm;
