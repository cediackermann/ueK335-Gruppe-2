import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useActiveUser } from "./services/ActiveUser";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import MainTabs from "./pages/Main";
import EditBook from "./tabs/EditBook";
import BookDetail from "./tabs/BookDetail"; // Import BookDetail
import { RootStackParamList } from "./types";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {
  const activeUser = useActiveUser();

  if (activeUser.isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {activeUser.data !== null ? (
        <>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Main' component={MainTabs} />
          <Stack.Screen name='BookEdit' component={EditBook} />
          <Stack.Screen name='BookDetail' component={BookDetail} />
        </>
      ) : (
        <Stack.Screen name='Auth' component={Auth} />
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
