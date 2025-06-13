import { Image, ScrollView, StyleSheet, View } from "react-native";
import { logout } from "../services/Auth";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { useActiveUser } from "../services/ActiveUser";

/**
 * Profile component displays the user's dashboard with their information and a logout button.
 * It fetches the active user's data and displays it in disabled TextInput fields.
 */
export default function Profile() {
  const activeUser = useActiveUser();

  return (
    <View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>User Dashboard</Text>
        <View style={styles.formContainer}>
          {activeUser.data &&
            Object.entries(activeUser.data).map(([key, value]) => (
              <TextInput
                key={key}
                label={key}
                value={String(value)}
                disabled={true}
                style={styles.input}
                mode='outlined'
              ></TextInput>
            ))}
        </View>
        <Button
          onPress={() => {
            logout();
          }}
          mode='contained'
          contentStyle={{ width: "100%" }}
          style={styles.button}
        >
          Logout
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: { width: "100%", padding: 20 },
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
  input: {
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#0A2543",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    color: "#0A2543",
  },
});
