import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import {darkModeStyling, darkModeOn, lightModeStyling} from '../screens/screenStylings/styling.js';

import {Colors} from '../screens/screenStylings/styling.js'
const {primary, tertiary} = Colors;

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
import Signup from "../screens/Signup.js";

import { NavigationImages } from '../navigation/navigationImages.js';

import { CredentialsContext } from "../components/CredentialsContext.js";
import { NavigationContainer } from '@react-navigation/native';
import FindScreen from "../screens/FindScreen.js";
import Post from "../posts/post.js";
import Post_FullScreen from "../posts/post_fullscreen.js";
import Tabs from "./tabs.js";

const Stack = createStackNavigator();


const Start_Stack = () => {
  return(
      <CredentialsContext.Consumer>
          {({storedCredentials}) => (
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: 'transparent',
                        },
                        headerShown: false,
                        headerTintColor: tertiary,
                        headerTransparent: true,
                        headerTitle: '',
                        headerLeftContainerStyle: {
                            paddingLeft: 20,
                        },
                    }}
                    initialRouteName="LoginScreen"
                >
                    {storedCredentials ? (
                        <>
                            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                            <Stack.Screen name="Signup" component={Signup}/>
                            <Stack.Screen name="Tabs" component={Tabs}/>
                        </>
                    ) : ( 
                        <>
                            <Stack.Screen name="Tabs" component={Tabs}/>
                        </>
                    )}
                </Stack.Navigator>
          )}
      </CredentialsContext.Consumer>
  )
}




export { Start_Stack };