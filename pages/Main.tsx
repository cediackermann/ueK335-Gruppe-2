import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  CommonActions,
  createStaticNavigation,
} from "@react-navigation/native";
import Books from "../tabs/Books";
import AddBook from "../tabs/AddBook";
import Profile from "../tabs/Profile";

const Tabs = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
  },
  tabBar: ({ navigation, state, descriptors, insets }) => (
    <BottomNavigation.Bar
      navigationState={state}
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
      renderIcon={({ route, focused, color }) =>
        descriptors[route.key].options.tabBarIcon?.({
          focused,
          color,
          size: 24,
        }) || null
      }
      getLabelText={({ route }) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : typeof options.title === "string"
            ? options.title
            : route.name;

        return label;
      }}
    />
  ),
  screens: {
    Books: {
      screen: Books,
      options: {
        tabBarLabel: "Books",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name='book-open-page-variant'
            color={color}
            size={size || 26}
          />
        ),
      },
    },

    AddBook: {
      screen: AddBook,
      options: {
        tabBarLabel: "Add Book",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name='plus-circle'
            color={color}
            size={size || 26}
          />
        ),
      },
    },

    Profile: {
      screen: Profile,
      options: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name='account-circle'
            color={color}
            size={size || 26}
          />
        ),
      },
    },
  },
});

const Navigation = createStaticNavigation(Tabs);

export default function Main() {
  return <Navigation />;
}
