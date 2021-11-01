import React, {useEffect, useState} from "react";
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
import AccountSettings from "../screens/AccountSettings";
import ChatScreen from "../screens/ChatScreen";
import Signup from "../screens/Signup.js";

import { NavigationImages } from '../navigation/navigationImages.js';

import { CredentialsContext } from "../components/CredentialsContext.js";
import { NavigationContainer } from '@react-navigation/native';
import FindScreen from "../screens/FindScreen.js";
import Post_FullScreen from "../posts/post_fullscreen.js";
import Tabs from "./tabs.js";

import TermsOfService from "../screens/TermsOfService.js";

import AsyncStorage from "@react-native-async-storage/async-storage";
import IntroScreen from "../screens/IntroductionScreens/IntroScreen.js";
import PrivacyPolicy from "../screens/PrivacyPolicy.js";

const Stack = createStackNavigator();


const Start_Stack = () => {
    const [HasOpened, setHasOpened] = useState();
    async function GetHasOpenedSocialSquareKey() {
        var HasOpened = await AsyncStorage.getItem('HasOpenedSocialSquare');
        setHasOpened(HasOpened);
    }
    GetHasOpenedSocialSquareKey();
    console.log("HasOpened variable is " + HasOpened);
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
                >
                    {HasOpened == 'true' ?
                    storedCredentials ? (
                        <>
                            <Stack.Screen 
                                name="Tabs" 
                                component={Tabs}
                                options={{
                                    animationEnabled: false,
                                }}
                            />
                            <Stack.Screen 
                                name="LoginScreen" 
                                component={LoginScreen}
                                options={{
                                    animationEnabled: false,
                                }}
                            />
                        </>
                    ) : ( 
                        <>
                            <Stack.Screen 
                                name="LoginScreen" 
                                component={LoginScreen}
                                options={{
                                    animationEnabled: false,
                                }}
                            />
                            <Stack.Screen 
                                name="Signup" 
                                component={Signup}
                                options={{
                                    animationEnabled: false,
                                }}
                            />
                            <Stack.Screen name="Tabs" component={Tabs}/>
                            <Stack.Screen 
                                name="Terms of Service" 
                                component={TermsOfService}
                                options={{
                                    animationEnabled: false,
                                }}
                            />
                            <Stack.Screen 
                                name="PrivacyPolicy" 
                                component={PrivacyPolicy}
                                options={{
                                    animationEnabled: false,
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="IntroScreen" component={IntroScreen}/>
                            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy}/>
                            <Stack.Screen name="TermsOfService" component={TermsOfService}/>
                            <Stack.Screen name="Login_Screen" component={LoginScreen}/>
                            <Stack.Screen name="Signup" component={Signup}/>
                            <Stack.Screen name="Tabs" component={Tabs}/>
                            <Stack.Screen name="Terms of Service" component={TermsOfService}/>
                        </>
                    )}
                </Stack.Navigator>
          )}
      </CredentialsContext.Consumer>
  )
}




export { Start_Stack };