import React from 'react';

import {Colors} from './../components/styles'
const {primary, tertiary} = Colors;

//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import ProfileScreen from './../screens/ProfileScreen';
import SettingsPage from './../screens/SettingsPage';
import BadgesScreen from '../screens/BadgesScreen.js';

const Stack = createStackNavigator();

//credentials context
import { CredentialsContext } from './../components/CredentialsContext';


const RootStack = () => {
    return(
        <CredentialsContext.Consumer>
            {({storedCredentials}) => (
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: 'transparent',
                            },
                            headerTintColor: tertiary,
                            headerTransparent: true,
                            headerTitle: '',
                            headerLeftContainerStyle: {
                                paddingLeft: 20,
                            },
                        }}
                        initialRouteName="Login"
                    >
                        {storedCredentials ? (
                            <>
                                <Stack.Screen name="Welcome" component={ProfileScreen}/>
                                <Stack.Screen name="SettingsPage" component={SettingsPage}/>
                                <Stack.Screen name="BadgesScreen" component={BadgesScreen}/>
                            </>
                        ) : ( 
                            <>
                                <Stack.Screen name="Login" component={Login}/>
                                <Stack.Screen name="Signup" component={Signup}/>
                            </>
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </CredentialsContext.Consumer>
    )
}

export default RootStack;

