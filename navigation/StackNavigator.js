import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import HomeScreen from "../screens/HomeScreen";
import BadgesScreen from "../screens/BadgesScreen";
import LoginScreen from "../screens/LoginScreen";
import ChangeUsername from "../screens/ChangeUsername";
import ChangePassword from "../screens/ChangePassword";
import AccountSettings from "../screens/AccountSettings";

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
      <Stack.Screen name="Profile" component={ProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20
          },
        }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} 
      options={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20
        },
      }}/>
      <Stack.Screen name="Badges" component={BadgesScreen} 
      options={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20
        },
      }}/>
      <Stack.Screen name="Login" component={LoginScreen} 
      options={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20
        },
      }}/>
      <Stack.Screen name="Change Username" component={ChangeUsername} 
      options={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20
        },
      }}/>
      <Stack.Screen name="Change Password" component={ChangePassword} 
      options={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20
        },
      }}/>
      <Stack.Screen name="Account Settings" component={AccountSettings} 
      options={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20
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
            backgroundColor: '#f4511e',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20
          },
        }}/>
        <Stack.Screen name="Badges" component={BadgesScreen} 
        options={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20
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
            backgroundColor: '#f4511e',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20
          },
        }}/>
        <Stack.Screen name="Login" component={LoginScreen} 
        options={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20
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
          backgroundColor: '#f4511e',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20
        },
      }}/>
      <Stack.Screen name="Change Username" component={ChangeUsername} 
      options={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20
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
          backgroundColor: '#f4511e',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20
        },
      }}/>
      <Stack.Screen name="Change Password" component={ChangePassword} 
      options={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20
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
          backgroundColor: '#f4511e',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20
        },
      }}/>
      <Stack.Screen name="Account Settings" component={AccountSettings} 
      options={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20
        },
      }}/>
    </Stack.Navigator>
  );
}

export { ProfileScreenToSettings_StackNavigation, SettingsToBadges_StackNavigation, SettingsToLoginScreen_StackNavigation, SettingsToChangeUsername, SettingsToChangePassword, SettingsToAccountSettings};