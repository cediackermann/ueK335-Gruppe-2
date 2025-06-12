import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signupSchema,
  SignupFormData,
  SignupApiPayload,
} from "../validation/schema";
import { TextInput } from "react-native-paper";

interface SignupFormProps {
  onSubmit: (data: SignupApiPayload) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthdate: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignup: SubmitHandler<SignupFormData> = (data) => {
    const { confirmPassword, ...signupPayload } = data;
    onSubmit(signupPayload);
  };

  const onError = (formErrors: FieldErrors<SignupFormData>) => {
    console.log("Signup Validation Errors:", formErrors);
  };

  const [birthdateText, setBirthdateText] = React.useState("");
  const [birthdate, setBirthdate] = useState<Date>(new Date());

  const [showPicker, setShowPicker] = React.useState(false);

  const showDatePicker = (): void => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = (): void => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (selectedDate: Date | undefined): void => {
    hideDatePicker();
    if (selectedDate) {
      setBirthdate(selectedDate);
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const year = selectedDate.getFullYear();
      setBirthdateText(`${month}/${day}/${year}`);
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Sign Up</Text>
      <Controller
        control={control}
        name='firstName'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.firstName && styles.inputError]}
            placeholder='First Name'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize='words'
          />
        )}
      />
      {errors.firstName && (
        <Text style={styles.errorText}>{errors.firstName.message}</Text>
      )}
      <Controller
        control={control}
        name='lastName'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.lastName && styles.inputError]}
            placeholder='Last Name'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize='words'
          />
        )}
      />
      {errors.lastName && (
        <Text style={styles.errorText}>{errors.lastName.message}</Text>
      )}

      <Controller
        control={control}
        name='birthdate'
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TouchableOpacity onPress={showDatePicker}>
              <View pointerEvents='none'>
                <TextInput
                  label='Birthdate'
                  value={value}
                  style={styles.input}
                  editable={false}
                  placeholder='05/06/2025'
                  right={<TextInput.Icon icon='calendar' />}
                  theme={{ roundness: 8 }}
                  pointerEvents='none'
                  onBlur={onBlur}
                />
              </View>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode='date'
              onConfirm={(date) => {
                handleConfirmDate(date);
                onChange(date.toISOString().split("T")[0]);
              }}
              onCancel={hideDatePicker}
              date={birthdate}
            />
            {errors.birthdate && (
              <Text style={styles.errorText}>{errors.birthdate.message}</Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder='Email'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType='email-address'
            autoCapitalize='none'
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        name='password'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder='Password'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <Controller
        control={control}
        name='confirmPassword'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.confirmPassword && styles.inputError]}
            placeholder='Confirm Password'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
      )}

      <View style={styles.button}>
        <Button
          title='Sign Up'
          onPress={handleSubmit(handleSignup, onError)}
          disabled={!isValid}
          color='#0A2543'
        />
      </View>
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
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  inputError: { borderColor: "red" },
  errorText: { color: "red", marginBottom: 10, fontSize: 12 },
  button: {
    backgroundColor: "#0A2543",
  },
});

export default SignupForm;
