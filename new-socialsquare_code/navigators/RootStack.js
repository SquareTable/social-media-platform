import React from 'react';

import {Colors} from './../components/styles'
const {primary, tertiary} = Colors;

//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import SettingsPage from './../screens/SettingsPage';
import AccountBadges from './../screens/AccountBadges';
import AccountSettings from '../screens/AccountSettings';
import ChangeDisplayNamePage from '../screens/ChangeDisplayNamePage';
import ChangeUsernamePage from '../screens/ChangeUsernamePage';
import ChangeEmailPage from '../screens/ChangeEmailPage';
import PostScreen from '../screens/PostScreen';
import MultiMediaUploadPage from '../screens/PostScreens/MultiMediaUploadPage';
import ThreadUploadPage from '../screens/PostScreens/ThreadUploadPage';
import PollUploadPage from '../screens/PostScreens/PollUploadPage';
import ViewPollPostPage from './../screens/ViewPollPostPage';
import SearchScreen from '../screens/SearchScreen';
import ProfilePages from '../screens/ProfilePages';
import MultiMediaUploadPreview from '../screens/PostScreens/MultiMediaUploadPreview';
import ViewImagePostPage from '../screens/ViewImagePostPage';
import CategoryHome from '../screens/CategoryHome';
import CategoryCreationPage from '../screens/CategoryCreationPage';
import CategoryViewPage from '../screens/CategoryViewPage';
import ThreadViewPage from '../screens/ThreadViewPage';
import CommentViewPage from '../screens/CommentViewPage';
import SelectCategorySearchScreen from '../screens/SelectCategorySearchScreen';

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
                                <Stack.Screen name="Welcome" component={Welcome}/>
                                <Stack.Screen name="CategoryHome" component={CategoryHome}/>
                                <Stack.Screen name="CategoryCreationPage" component={CategoryCreationPage}/>
                                <Stack.Screen name="ViewImagePostPage" component={ViewImagePostPage}/>
                                <Stack.Screen name="ViewPollPostPage" component={ViewPollPostPage}/>
                                <Stack.Screen name="SettingsPage" component={SettingsPage}/>
                                <Stack.Screen name="AccountBadges" component={AccountBadges}/>
                                <Stack.Screen name="AccountSettings" component={AccountSettings}/>
                                <Stack.Screen name="ChangeDisplayNamePage" component={ChangeDisplayNamePage}/>
                                <Stack.Screen name="ChangeUsernamePage" component={ChangeUsernamePage}/>
                                <Stack.Screen name="ChangeEmailPage" component={ChangeEmailPage}/>
                                <Stack.Screen name="PostScreen" component={PostScreen}/>
                                <Stack.Screen name="SearchScreen" component={SearchScreen}/>
                                <Stack.Screen name="CategoryViewPage" component={CategoryViewPage}/>
                                <Stack.Screen name="ThreadViewPage" component={ThreadViewPage}/>
                                <Stack.Screen name="CommentViewPage" component={CommentViewPage}/>
                                <Stack.Screen name="ProfilePages" component={ProfilePages}/>
                                <Stack.Screen name="MultiMediaUploadPage" component={MultiMediaUploadPage}/>
                                <Stack.Screen name="MultiMediaUploadPreview" component={MultiMediaUploadPreview}/>
                                <Stack.Screen name="ThreadUploadPage" component={ThreadUploadPage}/>
                                <Stack.Screen name="SelectCategorySearchScreen" component={SelectCategorySearchScreen}/>
                                <Stack.Screen name="PollUploadPage" component={PollUploadPage}/>
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
