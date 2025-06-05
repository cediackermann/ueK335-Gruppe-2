import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { login } from "../services/Auth";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.login} variant='headlineLarge'>
        Log in
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          label='Email'
          mode='outlined'
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label='Password'
          mode='outlined'
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View>
        <Text>
          Don't have an account{" "}
          <Text
            onPress={() => {
              alert("Navigate to Sign Up screen");
            }}
          >
            Sign up
          </Text>
        </Text>
      </View>
      <Text onPress={handleLogin}>Log in</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 60,
    marginBottom: 30,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  login: {
    fontWeight: "bold",
    margin: 40,
  },
  inputContainer: {
    width: 300,
    alignSelf: "center",
  },
  input: {
    marginBottom: 20,
  },
});
