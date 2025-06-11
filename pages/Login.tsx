import React from "react";
import { Image, StyleSheet, View, Alert } from "react-native"; // Alert importiert für deine bestehende Fehlerbehandlung
import { Text, TextInput } from "react-native-paper";
import { login } from "../services/Auth";
import { setActiveUser } from "../services/ActiveUser";
import { useNavigation } from "@react-navigation/native"; // Benötigt für navigation.navigate

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation = useNavigation(); // Hol dir die Navigation Instanz

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      await setActiveUser(res.user);

      // ----- HIER IST DIE EINZIGE ÄNDERUNG -----
      // Ersetze 'Main' durch den genauen Namen deines Screens im Navigator,
      // der Main.tsx rendert.
      navigation.navigate("Main");
      // ----------------------------------------

    } catch (error) {
      console.error("Login failed:", error);
      // Deine ursprüngliche Fehlerbehandlung
      Alert.alert("Login failed. Please check your credentials.");
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
          style={styles.input} // Style hinzugefügt, falls es im Original gefehlt hat (war im vorherigen Snippet so)
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View>
        <Text>
          Don't have an account{" "}
          <Text
            onPress={() => {
              // Deine ursprüngliche Sign Up Navigation/Alert
              Alert.alert("Navigate to Sign Up screen");
            }}
          >
            Sign up
          </Text>
        </Text>
      </View>
      {/* Dein ursprünglicher Login Text-Button */}
      <Text style={styles.loginButtonText} onPress={handleLogin}>Log in</Text>
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
    paddingHorizontal: 20, // Empfohlen für gleichmäßiges Padding
  },
  login: {
    fontWeight: "bold",
    marginVertical: 20, // Angepasst von margin: 40 für besseres Spacing mit Padding
  },
  inputContainer: {
    width: "100%", // Nutzt die Breite innerhalb des Paddings
    maxWidth: 350, // Gute maximale Breite
    alignSelf: "center",
    marginBottom: 20, // Platz vor dem "Don't have an account" Text
  },
  input: {
    marginBottom: 20,
  },
  // Style für den Text "Log in" Button, um ihn klickbarer aussehen zu lassen (optional)
  loginButtonText: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#6200ee", // Beispiel Farbe, passend zu Paper
    color: "white",
    borderRadius: 4,
    textAlign: "center",
    fontWeight: "bold",
    width: "100%", // Nutzt die Breite innerhalb des Paddings
    maxWidth: 350, // Gute maximale Breite
  },
});