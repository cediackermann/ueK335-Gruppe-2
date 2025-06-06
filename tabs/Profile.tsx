import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { logout } from "../services/Auth";

export default function Profile() {
  return (
    <View>
      <Text variant='headlineLarge'>Profile</Text>
      <Button
        onPress={() => {
          logout();
        }}
      >
        Logout
      </Button>
    </View>
  );
}
