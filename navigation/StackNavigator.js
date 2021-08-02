import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import {darkModeStyling, darkModeOn, lightModeStyling} from '../screens/screenStylings/styling.js';

import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import HomeScreen from "../screens/HomeScreen";
import BadgesScreen from "../screens/BadgesScreen";
import LoginScreen from "../screens/LoginScreen";
import ChangeUsername from "../screens/ChangeUsername";
import ChangePassword from "../screens/ChangePassword";
import AccountSettings from "../screens/AccountSettings";
import AppStyling from "../screens/AppStylingScreen";
import ChatScreen from "../screens/ChatScreen";

import { NavigationImages } from '../navigation/navigationImages.js';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const ProfileScreenToSettings_StackNavigation = () => {
  /*
    Use the images in navigationImages.js to 
  */
  if (darkModeOn === true) {
    var styling = darkModeStyling;
  } else {
    var styling = lightModeStyling;
  }
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile Name Here" component={ProfileScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 5,
            ...styling.navBackgroundColor,
            ...styling.borderColor
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
            ...styling.textColor
          },
          headerBackTitleStyle: {
            ...styling.textColor,
          },
          /*headerTintColor: { Add tint colour to support dark mode for the back navigation arrow
            ...styling.tintColor
          }*/
        }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} 
      options={{
        headerStyle: {
          ...styling.navBackgroundColor,
          ...styling.borderColor
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
          ...styling.textColor
        },
        headerBackTitleStyle: {
          ...styling.textColor,
        },/*
        headerTintColor: {  Add tint colour to support dark mode for the back navigation arrow
          ...styling.tintColor
        }*/
      }}/>
      <Stack.Screen name="Badges" component={BadgesScreen} 
      options={{
        headerStyle: {
          ...styling.navBackgroundColor,
          ...styling.borderColor
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
          ...styling.textColor
        },
        headerBackTitleStyle: {
          ...styling.textColor,
        },
      }}/>
      <Stack.Screen name="Login" component={LoginScreen} 
      options={{
        headerStyle: {
          ...styling.navBackgroundColor,
          ...styling.borderColor
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
          ...styling.textColor
        },
        headerBackTitleStyle: {
          ...styling.textColor,
        },
      }}/>
      <Stack.Screen name="Change Username" component={ChangeUsername} 
      options={{
        headerStyle: {
          ...styling.navBackgroundColor,
          ...styling.borderColor
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
          ...styling.textColor
        },
        headerBackTitleStyle: {
          ...styling.textColor,
        },
      }}/>
      <Stack.Screen name="Change Password" component={ChangePassword} 
      options={{
        headerStyle: {
          ...styling.navBackgroundColor,
          ...styling.borderColor
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
          ...styling.textColor
        },
        headerBackTitleStyle: {
          ...styling.textColor,
        },
      }}/>
      <Stack.Screen name="Account Settings" component={AccountSettings} 
      options={{
        headerStyle: {
          ...styling.navBackgroundColor,
          ...styling.borderColor
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
          ...styling.textColor
        },
        headerBackTitleStyle: {
          ...styling.textColor,
        },
      }}/>
      <Stack.Screen name="App Styling" component={AppStyling} 
      options={{
        headerStyle: {
          ...styling.navBackgroundColor,
          ...styling.borderColor
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
          ...styling.textColor
        },
        headerBackTitleStyle: {
          ...styling.textColor,
        },
      }}/>
    </Stack.Navigator>
  );
};

const ChatScreen_Stack = () => {
  if (darkModeOn === true) {
    var styling = darkModeStyling;
  } else {
    var styling = lightModeStyling;
  }
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Chat" component={ChatScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 3,
            ...styling.navBackgroundColor,
            ...styling.borderColor
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
            ...styling.textColor
          },
          headerBackTitleStyle: {
            ...styling.textColor,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export { ProfileScreenToSettings_StackNavigation, ChatScreen_Stack, AppStyling};