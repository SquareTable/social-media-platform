import React, {useEffect, useState} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import {darkModeStyling, darkModeOn, lightModeStyling} from '../screens/screenStylings/styling.js';

import {Colors} from '../screens/screenStylings/styling.js'
const {primary, tertiary} = Colors;

import LoginScreen from "../screens/LoginScreen";
import Signup from "../screens/Signup.js";

import { NavigationImages } from '../navigation/navigationImages.js';

import { CredentialsContext } from "../components/CredentialsContext.js";
import Tabs from "./tabs.js";

import AsyncStorage from "@react-native-async-storage/async-storage";
import IntroScreen from "../screens/IntroductionScreens/IntroScreen.js";
import DestroyingLocalDataScreen from "../screens/DestroyingLocalDataScreen.js";

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
                        title: '',
                        headerLeftContainerStyle: {
                            paddingLeft: 20,
                        },
                    }}
                    initialRouteName={storedCredentials ? "Tabs" : "IntroScreen"}
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
                            <Stack.Screen name="IntroScreen" component={IntroScreen}/>
                            <Stack.Group screenOptions={{presentation: 'modal'}}>
                                <Stack.Screen name="ModalLoginScreen" component={LoginScreen}/>
                                <Stack.Screen name="ModalSignupScreen" component={Signup}/>
                            </Stack.Group>
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
                            <Stack.Screen name="DestroyingLocalDataScreen" component={DestroyingLocalDataScreen}/>
                            <Stack.Screen name="IntroScreen_NoCredentials" component={IntroScreen}/>
                            <Stack.Group screenOptions={{presentation: 'modal'}}>
                                <Stack.Screen name="ModalLoginScreen" component={LoginScreen}/>
                                <Stack.Screen name="ModalSignupScreen" component={Signup}/>
                            </Stack.Group>
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="IntroScreen" component={IntroScreen}/>
                            <Stack.Screen name="Login_Screen" component={LoginScreen}/>
                            <Stack.Screen name="Signup" component={Signup}/>
                            <Stack.Screen name="Tabs" component={Tabs}/>
                            <Stack.Screen name="DestroyingLocalDataScreen" component={DestroyingLocalDataScreen}/>
                        </>
                    )}
                </Stack.Navigator>
          )}
      </CredentialsContext.Consumer>
  )
}




export { Start_Stack };