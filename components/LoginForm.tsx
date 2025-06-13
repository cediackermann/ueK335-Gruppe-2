import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../validation/schema";
import { TextInput } from "react-native-paper";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
}

/**
 * LoginForm component for user authentication.
 * @param {LoginFormProps} props - The component props.
 * @param {(data: LoginFormData) => void} props.onSubmit - Callback function when the form is submitted.
 */
const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin: SubmitHandler<LoginFormData> = (data) => {
    onSubmit(data);
  };

  const onError = (formErrors: FieldErrors<LoginFormData>) => {
    console.log("Login Validation Errors:", formErrors);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Login</Text>
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
            outlineColor='#0A2543'
            activeOutlineColor='#0A2543'
            mode='outlined'
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
            outlineColor='#0A2543'
            activeOutlineColor='#0A2543'
            mode='outlined'
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <Button
        title='Login'
        onPress={handleSubmit(handleLogin, onError)}
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
});

export default LoginForm;
