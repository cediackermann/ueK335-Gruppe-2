import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { LoginFormData, SignupApiPayload } from "../validation/schema";
import { login, signUp } from "../services/Auth";
import { Image } from "react-native";

const Auth: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState<boolean>(true);

  const handleLoginSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert(
        "Login Failed",
        "Please check your credentials and try again."
      );
    }
  };

  const handleSignupSubmit = async (data: SignupApiPayload) => {
    try {
      await signUp(data);
    } catch (error) {
      console.error("Signup Error:", error);
      Alert.alert("Signup Failed", "Please check your details and try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        {isLoginView ? (
          <LoginForm onSubmit={handleLoginSubmit} />
        ) : (
          <SignupForm onSubmit={handleSignupSubmit} />
        )}

        <Text>
          {isLoginView ? "Don't have an account?" : "Already have an account?"}
        </Text>
        <Text onPress={() => setIsLoginView(!isLoginView)}>
          {isLoginView ? "Sign Up" : "Login"}
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
    marginTop: 20,
  },
});

export default Auth;
