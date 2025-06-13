// pages/Main.tsx
import React from "react";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { BottomNavigation, MD3DarkTheme, MD3LightTheme, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { CommonActions, RouteProp, NavigationState } from "@react-navigation/native";
import BooksNavigator from "../tabs/BooksNavigator";
import AddBook from "../tabs/AddBook";
import Profile from "../tabs/Profile";
import { MainTabParamList } from "../types";

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs() {
  const theme = useTheme(); // Aktuelles Theme holen

  return (
    <Tab.Navigator
      initialRouteName="BooksStack"
      screenOptions={{
        headerShown: false, 
      }}
      tabBar={({
        navigation,
        state,
        descriptors,
        insets,
      }: BottomTabBarProps) => (
        <BottomNavigation.Bar
          navigationState={state as NavigationState<MainTabParamList>}
          safeAreaInsets={insets}
          activeColor="#0A2543" 
          inactiveColor="#757575" 
          // Verwende Theme-Farben für den Hintergrund, um Dark Mode zu unterstützen
          // oder setze eine explizite Farbe für helles Design
          style={{ 
            backgroundColor: theme.colors.surface, // Passt sich an Hell/Dunkel an
            borderTopWidth: StyleSheet.hairlineWidth, // Subtile Linie oben
            borderTopColor: theme.colors.outlineVariant, // Farbe für die Linie
          }} 
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            let iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'] = 'help-circle'; // Default Icon
            let iconSize = focused ? 26 : 24;

            if (route.name === 'BooksStack') {
              iconName = focused ? 'book-open-page-variant' : 'book-open-page-variant-outline';
            } else if (route.name === 'AddBook') {
              iconName = focused ? 'plus-circle' : 'plus-circle-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'account-circle' : 'account-circle-outline';
            }
            
            if (options.tabBarIcon) { // Falls spezifisches Icon in options definiert ist
                 return options.tabBarIcon({ focused, color, size: iconSize });
            }
            return <MaterialCommunityIcons name={iconName} color={color} size={iconSize} />;
          }}
          getLabelText={({
            route,
          }: {
            route: RouteProp<MainTabParamList, keyof MainTabParamList>;
          }) => {
            const { options } = descriptors[route.key];
            if (route.name === "BooksStack") {
              return options.tabBarLabel !== undefined ? String(options.tabBarLabel) : "Books";
            }
            if (options.tabBarLabel !== undefined) {
              return String(options.tabBarLabel);
            }
            if (options.title !== undefined) {
              return options.title;
            }
            return route.name;
          }}
        />
      )}
    >
      <Tab.Screen
        name="BooksStack"
        component={BooksNavigator}
        options={{
          tabBarLabel: "Books",
          // Icon wird jetzt in renderIcon oben dynamisch gesetzt
        }}
      />
      <Tab.Screen
        name="AddBook"
        component={AddBook}
        options={{
          tabBarLabel: "Add book", 
          // Icon wird jetzt in renderIcon oben dynamisch gesetzt
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          // Icon wird jetzt in renderIcon oben dynamisch gesetzt
        }}
      />
    </Tab.Navigator>
  );
}