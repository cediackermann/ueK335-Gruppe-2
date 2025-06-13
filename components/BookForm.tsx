import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  useForm,
  Controller,
  FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookFormData, bookFormSchema } from "../validation/schema";
import { TextInput, Button as PaperButton } from "react-native-paper";
import { usePublishers } from "../services/BookService";
import { Picker } from "@react-native-picker/picker";
import { useLanguages } from "../services/Language";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface SubmitFormProps {
  onSubmit: (data: BookFormData) => void;
}

const BookForm: React.FC<SubmitFormProps> = ({ onSubmit }) => {
  const publishers = usePublishers();
  const languages = useLanguages();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<BookFormData>({
    mode: "onBlur",
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: "",
      publisher_id: 0,
      isbn13: "",
      num_pages: undefined,
      language_id: 0,
      publication_date: "",
    },
  });

  const onError = (formErrors: FieldErrors<BookFormData>) => {
    console.log("BookForm Validation Errors:", formErrors);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (selectedDate: Date | undefined) => {
    hideDatePicker();
    if (selectedDate) {
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const year = selectedDate.getFullYear();
      setValue("publication_date", `${year}-${month}-${day}`, { shouldValidate: true });
    }
  };

  return (
    <View style={styles.formContainer}>
      <Controller
        control={control}
        name='title'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={"Title"}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode='outlined'
            outlineColor={errors.title ? "red" : "#0A2543"}
            activeOutlineColor='#0A2543'
            error={!!errors.title}
            theme={{ colors: { primary: '#0A2543', background: '#FFFFFF' }}}
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
            label={"ISBN (13 digits)"}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType='numeric'
            maxLength={13}
            mode='outlined'
            outlineColor={errors.isbn13 ? "red" : "#0A2543"}
            activeOutlineColor='#0A2543'
            error={!!errors.isbn13}
            theme={{ colors: { primary: '#0A2543', background: '#FFFFFF' }}}
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
            label={"Number of Pages"}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(text) => {
              const num = parseInt(text, 10);
              onChange(isNaN(num) ? undefined : num);
            }}
            value={value !== undefined ? value.toString() : ""}
            keyboardType='numeric'
            mode='outlined'
            outlineColor={errors.num_pages ? "red" : "#0A2543"}
            activeOutlineColor='#0A2543'
            error={!!errors.num_pages}
            theme={{ colors: { primary: '#0A2543', background: '#FFFFFF' }}}
          />
        )}
      />
      {errors.num_pages && (
        <Text style={styles.errorText}>{errors.num_pages.message}</Text>
      )}

      <View style={[styles.pickerWrapper, errors.publisher_id && styles.inputErrorPicker]}>
        <Controller
          control={control}
          name='publisher_id'
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              style={styles.picker}
              prompt="Select Publisher"
            >
              <Picker.Item label='Select Publisher...' value={0} style={styles.pickerItemPlaceholder} />
              {publishers.data?.map((publisher) => (
                <Picker.Item
                  key={publisher.id}
                  label={publisher.publisher_name}
                  value={publisher.id}
                  style={styles.pickerItem}
                />
              ))}
            </Picker>
          )}
        />
      </View>
      {errors.publisher_id && (
        <Text style={styles.errorText}>{errors.publisher_id.message}</Text>
      )}
      
      <View style={[styles.pickerWrapper, errors.language_id && styles.inputErrorPicker]}>
        <Controller
          control={control}
          name='language_id'
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              style={styles.picker}
              prompt="Select Language"
            >
              <Picker.Item label='Select Language...' value={0} style={styles.pickerItemPlaceholder} />
              {languages.data?.map((language) => (
                <Picker.Item
                  key={language.id}
                  label={language.language_name}
                  value={language.id}
                  style={styles.pickerItem}
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
        render={({ field: { value, onBlur } }) => (
          <>
            <TouchableOpacity onPress={showDatePicker} activeOpacity={0.7}>
              <View pointerEvents='none'>
                <TextInput
                  label='Publication Date (YYYY-MM-DD)'
                  value={value}
                  editable={false}
                  style={styles.input}
                  right={<TextInput.Icon icon='calendar' color="#0A2543"/>}
                  onBlur={onBlur}
                  mode='outlined'
                  outlineColor={errors.publication_date ? "red" : "#0A2543"}
                  activeOutlineColor='#0A2543'
                  error={!!errors.publication_date}
                  theme={{ colors: { primary: '#0A2543', background: '#FFFFFF' }}}
                />
              </View>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode='date'
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
              date={value ? new Date(value + "T00:00:00") : new Date()}
              confirmTextIOS="Confirm"
              cancelTextIOS="Cancel"
            />
          </>
        )}
      />
      {errors.publication_date && (
        <Text style={styles.errorText}>{errors.publication_date.message}</Text>
      )}

      <PaperButton
        mode="contained"
        onPress={handleSubmit(onSubmit, onError)}
        disabled={!isValid || publishers.isLoading || languages.isLoading}
        style={styles.submitButton}
        labelStyle={styles.submitButtonLabel}
        loading={publishers.isLoading || languages.isLoading}
        uppercase={false}
        theme={{ roundness: 2 }}
      >
        Add Book
      </PaperButton>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: { 
    width: "100%", 
    paddingHorizontal: 20, 
    paddingVertical: 10 
  },
  input: {
    marginBottom: 8,
    backgroundColor: "#FFFFFF", 
  },
  inputErrorPicker: { 
    borderColor: "red", 
  },
  errorText: { 
    color: "red", 
    marginBottom: 10, 
    fontSize: 12,
    marginTop: -4, 
  },
  pickerWrapper: {
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#0A2543",
    borderRadius: 4, 
    height: 58, 
    justifyContent: 'center',
  },
  picker: {
    flex: 1,
    color: '#000000',
  },
  pickerItemPlaceholder: {
    color: '#A0A0A0',
  },
  pickerItem: {
    color: '#000000',
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: "#0A2543",
    paddingVertical: 8,
    borderRadius: 8,
  },
  submitButtonLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#FFFFFF',
  }
});

export default BookForm;
