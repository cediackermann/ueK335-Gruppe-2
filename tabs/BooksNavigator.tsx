// tabs/BooksNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BooksListScreen from "./Books"; 
import BookDetailsScreen from "../pages/BookDetails"; 
import { BooksStackParamList } from "../types";

const Stack = createNativeStackNavigator<BooksStackParamList>();

export default function BooksNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="BooksList"
      
    >
      <Stack.Screen
        name="BooksList"
        component={BooksListScreen}
        options={{ title: "Books", headerShown: false }} // Titel für die Bücherliste gemäß Mockup
      />
      <Stack.Screen
        name="BookDetails"
        component={BookDetailsScreen}
        // Der Titel "Bookname" im Mockup wird in der BookDetailsScreen-Komponente
        // als große Überschrift *unterhalb* des Headers angezeigt.
        // Der Header-Titel hier kann generisch sein oder auch der Buchtitel, je nach Präferenz.
        // Hier behalten wir den dynamischen Titel bei, der in BookDetails gesetzt wird,
        // falls man doch einen spezifischen Header-Titel möchte.
        // Für das Mockup-Design ist der Titel "Book Details" oder leer passender,
        // da der Haupttitel im Content-Bereich steht.
        options={{ title: "Book Details", headerShown: false }} // Generischer Titel, da der Haupttitel im Screen ist
      />
    </Stack.Navigator>
  );
}
