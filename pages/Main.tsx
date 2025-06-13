import React from "react";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { CommonActions, RouteProp } from "@react-navigation/native";
import Books from "../tabs/Books";
import AddBook from "../tabs/AddBook";
import Profile from "../tabs/Profile";
import { MainTabParamList } from "../types";

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Books'
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
          navigationState={state as any}
          safeAreaInsets={insets}
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
            return options.tabBarIcon
              ? options.tabBarIcon({ focused, color, size: 24 })
              : null;
          }}
          getLabelText={({
            route,
          }: {
            route: RouteProp<MainTabParamList, keyof MainTabParamList>;
          }) => {
            const { options } = descriptors[route.key];
            if (typeof options.tabBarLabel === "string") {
              return options.tabBarLabel;
            }
            if (typeof options.title === "string") {
              return options.title;
            }
            return route.name;
          }}
        />
      )}
    >
      <Tab.Screen
        name='Books'
        component={Books}
        options={{
          tabBarLabel: "Books",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='book-open-page-variant'
              color={color}
              size={size || 26}
            />
          ),
        }}
      />
      <Tab.Screen
        name='AddBook'
        component={AddBook}
        options={{
          tabBarLabel: "Add Book",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='plus-circle'
              color={color}
              size={size || 26}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='account-circle'
              color={color}
              size={size || 26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
