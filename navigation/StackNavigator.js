import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import HomeScreen from "../screens/HomeScreen";
import BadgesScreen from "../screens/BadgesScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const ProfileScreenToSettings_StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Badges" component={BadgesScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

const SettingsToBadges_StackNavigation = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Badges" component={BadgesScreen} />
      </Stack.Navigator>
    );
};

const SettingsToLoginScreen_StackNavigation = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
};

export { ProfileScreenToSettings_StackNavigation, SettingsToBadges_StackNavigation, SettingsToLoginScreen_StackNavigation};