import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';

import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import HomeScreen from "../screens/HomeScreen";
import BadgesScreen from "../screens/BadgesScreen";
import LoginScreen from "../screens/LoginScreen";
import ChangeUsername from "../screens/ChangeUsername";
import ChangePassword from "../screens/ChangePassword";
import AccountSettings from "../screens/AccountSettings";
import AppStyling from "../screens/AppStylingScreen";

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
      <Stack.Screen name="Profile Name Here" component={ProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: '#2E3440',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center'
          },
        }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} 
      options={{
        headerStyle: {
          backgroundColor: '#2E3440',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center'
        },
      }}/>
      <Stack.Screen name="Badges" component={BadgesScreen} 
      options={{
        headerStyle: {
          backgroundColor: '#2E3440',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center'
        },
      }}/>
      <Stack.Screen name="Login" component={LoginScreen} 
      options={{
        headerStyle: {
          backgroundColor: '#2E3440',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center'
        },
      }}/>
      <Stack.Screen name="Change Username" component={ChangeUsername} 
      options={{
        headerStyle: {
          backgroundColor: '#2E3440',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center'
        },
      }}/>
      <Stack.Screen name="Change Password" component={ChangePassword} 
      options={{
        headerStyle: {
          backgroundColor: '#2E3440',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center'
        },
      }}/>
      <Stack.Screen name="Account Settings" component={AccountSettings} 
      options={{
        headerStyle: {
          backgroundColor: '#2E3440',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center'
        },
      }}/>
      <Stack.Screen name="App Styling" component={AppStyling} 
      options={{
        headerStyle: {
          backgroundColor: '#2E3440',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center'
        },
      }}/>
    </Stack.Navigator>
  );
};

const SettingsToBadges_StackNavigation = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Settings" component={SettingsScreen} 
        options={{
          headerStyle: {
            backgroundColor: '#2E3440',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center'
          },
        }}/>
        <Stack.Screen name="Badges" component={BadgesScreen} 
        options={{
          headerStyle: {
            backgroundColor: '#2E3440',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center'
          },
        }}/>
      </Stack.Navigator>
    );
};

const SettingsToLoginScreen_StackNavigation = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Settings" component={SettingsScreen} 
        options={{
          headerStyle: {
            backgroundColor: '#2E3440',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center'
          },
        }}/>
        <Stack.Screen name="Login" component={LoginScreen} 
        options={{
          headerStyle: {
            backgroundColor: '#2E3440',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center'
          },
        }}/>
      </Stack.Navigator>
    );
};

const SettingsToChangeUsername = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Settings" component={SettingsScreen} 
      options={{
        headerStyle: {
          backgroundColor: '#2E3440',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center'
        },
      }}/>
      <Stack.Screen name="Change Username" component={ChangeUsername} 
      options={{
        headerStyle: {
          backgroundColor: '#2E3440',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center'
        },
      }}/>
    </Stack.Navigator>
  );
}

const SettingsToChangePassword = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Settings" component={SettingsScreen} 
      options={{
        headerStyle: {
          backgroundColor: '#2E3440',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center'
        },
      }}/>
      <Stack.Screen name="Change Password" component={ChangePassword} 
      options={{
        headerStyle: {
          backgroundColor: '#2E3440',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center'
        },
      }}/>
    </Stack.Navigator>
  );
}

const SettingsToAccountSettings = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Settings" component={SettingsScreen} 
      options={{
        headerStyle: {
          backgroundColor: '#2E3440',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center'
        },
      }}/>
      <Stack.Screen name="Account Settings" component={AccountSettings} 
      options={{
        headerStyle: {
          backgroundColor: '#2E3440',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center'
        },
      }}/>
    </Stack.Navigator>
  );
}

const SettingsToAppStyling = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Settings" component={SettingsScreen} 
      options={{
        headerStyle: {
          backgroundColor: '#2E3440',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center'
        },
      }}/>
      <Stack.Screen name="App Styling" component={AppStyling} 
      options={{
        headerStyle: {
          backgroundColor: '#2E3440',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center'
        },
      }}/>
    </Stack.Navigator>
  );
}

export { ProfileScreenToSettings_StackNavigation, SettingsToBadges_StackNavigation, SettingsToLoginScreen_StackNavigation, SettingsToChangeUsername, SettingsToChangePassword, SettingsToAccountSettings, AppStyling};