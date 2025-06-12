import { Provider as PaperProvider } from "react-native-paper";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import Router from "./Router";
import queryClient from "./services/QueryClient";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}
