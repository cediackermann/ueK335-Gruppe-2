import { Provider } from "react-native-paper";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./Router";
import queryClient from "./services/QueryClient";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Router />
      </Provider>
    </QueryClientProvider>
  );
}
