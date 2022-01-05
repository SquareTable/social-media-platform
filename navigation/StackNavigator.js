import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import {darkModeStyling, darkModeOn, lightModeStyling} from '../screens/screenStylings/styling.js';

import {Colors} from '../screens/screenStylings/styling.js'
const {primary, tertiary} = Colors;

import ProfileScreen from "../screens/ProfileScreen";
import VisitingProfileScreen from "../screens/VisitingProfileScreen.js";
import SettingsScreen from "../screens/SettingsScreen";
import { HomeScreen } from "../screens/HomeScreen";
import BadgesScreen from "../screens/BadgesScreen";
import LoginScreen from "../screens/LoginScreen";
import AccountSettings from "../screens/AccountSettings";
import Signup from "../screens/Signup.js";

import { NavigationImages } from '../navigation/navigationImages.js';

import { CredentialsContext } from "../components/CredentialsContext.js";
import { NavigationContainer, useTheme } from '@react-navigation/native';
import FindScreen from "../screens/FindScreen.js";
import Post from "../posts/post.js";
import Post_FullScreen from "../posts/post_fullscreen.js";
import ProfilePages from '../screens/ProfilePages.js'

import PostScreen from '../screens/PostScreen';
import MultiMediaUploadPage from '../screens/PostScreens/MultiMediaUploadPage';
import ThreadUploadPage from '../screens/PostScreens/ThreadUploadPage';
import PollUploadPage from '../screens/PostScreens/PollUploadPage';
import AudioUploadPage from '../screens/PostScreens/AudioUploadPage';
import MultiMediaUploadPreview from '../screens/PostScreens/MultiMediaUploadPreview'
import SelectCategorySearchScreen from '../screens/SelectCategorySearchScreen'

import AccountBadges from "../screens/AccountBadges.js";
import ChangeDisplayNamePage from "../screens/ChangeDisplayNamePage";
import ChangeUsernamePage from "../screens/ChangeUsernamePage";
import ChangeEmailPage from "../screens/ChangeEmailPage";

import ReportBugScreen from "../screens/ReportBugScreen.js";
import ChatScreenNavigator from "../screens/ChatScreenNavigator.js";
import RecordAudioPage from "../screens/PostScreens/RecordAudioPage.js";
import SendAudioPage from "../screens/PostScreens/SendAudioPage.js";

import AppStyling from '../screens/AppStyling.js';

import CategoryViewPage from '../screens/CategoryViewPage'
import CommentViewPage from '../screens/CommentViewPage'
import ThreadViewPage from '../screens/ThreadViewPage'
import ViewImagePostPage from '../screens/ViewImagePostPage'
import ViewPollPostPage from '../screens/ViewPollPostPage'
import CategoryHome from '../screens/CategoryHome'
import CategoryCreationPage from "../screens/CategoryCreationPage.js";
import TakeImage_Camera from "../screens/TakeImage_Camera.js";
import GDPRCompliance from "../screens/SecuritySettingsScreens/GDPRCompliance.js";
import SecuritySettingsScreen from "../screens/SecuritySettingsScreen.js";
import LoginActivity from "../screens/SecuritySettingsScreens/LoginActivity.js";
import TwoFA from "../screens/SecuritySettingsScreens/2FA.js";
import WhatIsStoredOnOurServers from "../screens/SecuritySettingsScreens/WhatIsStoredOnOurServers.js";
import NotificationsSettingsScreen from "../screens/NotificationsSettingsScreen.js";
import ProfileStats from "../screens/ProfileStats.js";
import SimpleStylingMenu from "../screens/SimpleStylingScreens/SimpleStylingMenu.js";
import EditSimpleStyle from "../screens/SimpleStylingScreens/EditSimpleStyle.js";
import Simple_ColorPickerScreen from "../screens/SimpleStylingScreens/ColorPicker.js";
import BuiltInStylingMenu from "../screens/BuiltInStylingMenu.js";


const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};



const ChatScreen_Stack = () => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: colors.tertiary,
        headerTransparent: true,
        title: '',
        headerLeftContainerStyle: {
            paddingLeft: 20,
        },
        headerLeft: null
      }}
    >
      <Stack.Screen name="ChatScreenNavigator" component={ChatScreenNavigator}/>
      <Stack.Screen name="Welcome" component={ProfileScreen}/>
      <Stack.Screen name="VisitingProfileScreen" component={VisitingProfileScreen}/>
    </Stack.Navigator>
  );
};

const RootStack = () => {
  const { colors } = useTheme();
  return(
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: 'transparent',
            },
            headerTintColor: colors.tertiary,
            headerTransparent: true,
            title: '',
            headerLeftContainerStyle: {
                paddingLeft: 20,
            },
        }}
    >
      <Stack.Screen name="Welcome" component={ProfileScreen}/>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen}/>
      <Stack.Screen name="BadgesScreen" component={BadgesScreen}/>
      <Stack.Screen name="AccountBadges" component={AccountBadges}/>
      <Stack.Screen name="AccountSettings" component={AccountSettings}/>
      <Stack.Screen name="ChangeDisplayNamePage" component={ChangeDisplayNamePage}/>
      <Stack.Screen name="ChangeUsernamePage" component={ChangeUsernamePage}/>
      <Stack.Screen name="ChangeEmailPage" component={ChangeEmailPage}/>
      <Stack.Screen name="ReportBugScreen" component={ReportBugScreen}/>
      <Stack.Screen name="CategoryViewPage" component={CategoryViewPage}/>
      <Stack.Screen name="CommentViewPage" component={CommentViewPage}/>
      <Stack.Screen name="ThreadViewPage" component={ThreadViewPage}/>
      <Stack.Screen name="ViewImagePostPage" component={ViewImagePostPage}/>
      <Stack.Screen name="ViewPollPostPage" component={ViewPollPostPage}/>
      <Stack.Screen name="CategoryHome" component={CategoryHome}/>
      <Stack.Screen name="CategoryCreationPage" component={CategoryCreationPage}/>
      <Stack.Screen name="TakeImage_Camera" component={TakeImage_Camera}/>
      <Stack.Group screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: colors.tertiary,
          headerTransparent: true,
          title: '',
          headerLeftContainerStyle: {
              paddingLeft: 20,
          },
          headerLeft: null
        }}
      >
        <Stack.Screen name="AppStyling" component={AppStyling}/>
        <Stack.Screen name="GDPRCompliance" component={GDPRCompliance}/>
        <Stack.Screen name="SecuritySettingsScreen" component={SecuritySettingsScreen}/>
        <Stack.Screen name="LoginActivity" component={LoginActivity}/>
        <Stack.Screen name="2FA" component={TwoFA}/>
        <Stack.Screen name="WhatIsStoredOnOurServers" component={WhatIsStoredOnOurServers}/>
        <Stack.Screen name="NotificationsSettingsScreen" component={NotificationsSettingsScreen}/>
        <Stack.Screen name="ProfileStats" component={ProfileStats}/>
        <Stack.Screen name="SimpleStylingMenu" component={SimpleStylingMenu}/>
        <Stack.Screen name="EditSimpleStyle" component={EditSimpleStyle}options={{gestureEnabled: false}}/>
        <Stack.Screen name="Simple_ColorPickerScreen" component={Simple_ColorPickerScreen}/>
        <Stack.Screen name="BuiltInStylingMenu" component={BuiltInStylingMenu}/>
      </Stack.Group>
    </Stack.Navigator>
  );
};

const FindScreen_Stack = () => {
  if (darkModeOn === true) {
    var styling = darkModeStyling;
  } else {
    var styling = lightModeStyling;
  }
  const { colors } = useTheme();
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: 'transparent',
      },
      headerTintColor: colors.tertiary,
      headerTransparent: true,
      title: '',
      headerLeftContainerStyle: {
          paddingLeft: 20,
      },
    }}>
      <Stack.Group screenOptions={{headerLeft: null}}>
        <Stack.Screen name="FindScreen" component={FindScreen}/>
        <Stack.Screen name="ProfilePages" component={ProfilePages}/>
        <Stack.Screen name="Post_FullScreen" component={Post_FullScreen}/>
        <Stack.Screen name="ProfileStats" component={ProfileStats}/>
      </Stack.Group>
      <Stack.Screen name="ProfileScreen_FromFindScreenPost" component={ProfileScreen}/>
      <Stack.Screen name="CategoryViewPage" component={CategoryViewPage}/>
      <Stack.Screen name="CommentviewPage" component={CommentViewPage}/>
      <Stack.Screen name="ThreadViewPage" component={ThreadViewPage}/>
      <Stack.Screen name="ViewImagePostPage" component={ViewImagePostPage}/>
      <Stack.Screen name="ViewPollPostPage" component={ViewPollPostPage}/>
      <Stack.Screen name="ThreadUploadPage" component={ThreadUploadPage}/>
    </Stack.Navigator>
  );
};

const home_screen_post_to_profile_screen = () => {
  const { colors } = useTheme();
  return(
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: 'transparent',
      },
      headerTintColor: colors.tertiary,
      headerTransparent: true,
      title: '',
      headerLeft: null,
      headerLeftContainerStyle: {
          paddingLeft: 20,
      },
    }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen}/>
      <Stack.Screen name="Welcome" component={ProfileScreen}/>
      <Stack.Screen name="VisitingProfileScreen" component={VisitingProfileScreen}/>
    </Stack.Navigator>
  )
}

const post_screen_navigator = () => {
  const { colors } = useTheme();
  return(
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: 'transparent',
      },
      headerTintColor: colors.tertiary,
      headerTransparent: true,
      title: '',
      headerLeftContainerStyle: {
        paddingLeft: 20,
      },
    }}>
      <Stack.Screen name="PostScreen" component={PostScreen}/>
      <Stack.Screen name="MultiMediaUploadPage" component={MultiMediaUploadPage}/>
      <Stack.Screen name="ThreadUploadPage" component={ThreadUploadPage}/>
      <Stack.Screen name="PollUploadPage" component={PollUploadPage}/>
      <Stack.Screen name="AudioUploadPage" component={AudioUploadPage}/>
      <Stack.Group screenOptions={{headerLeft: null, gestureEnabled: false}}>
        <Stack.Screen name="RecordAudioPage" component={RecordAudioPage}/>
      </Stack.Group>
      <Stack.Group screenOptions={{headerLeft: null}}>
        <Stack.Screen name="SendAudioPage" component={SendAudioPage}/>
      </Stack.Group>
      <Stack.Screen name="MultiMediaUploadPreview" component={MultiMediaUploadPreview}/>
      <Stack.Screen name="SelectCategorySearchScreen" component={SelectCategorySearchScreen}/>
      <Stack.Screen name="TakeImage_Camera" component={TakeImage_Camera}/>
      <Stack.Screen name="CategoryCreationPage" component={CategoryCreationPage}/>
    </Stack.Navigator>
  )
}




export { 
  ChatScreen_Stack,
  RootStack, 
  FindScreen_Stack, 
  home_screen_post_to_profile_screen, 
  post_screen_navigator,
};

/* OLD ROOTSTACK

const RootStack = () => {
  return(
      <CredentialsContext.Consumer>
          {({storedCredentials}) => (
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: 'transparent',
                        },
                        headerTintColor: tertiary,
                        headerTransparent: true,
                        title: '',
                        headerLeftContainerStyle: {
                            paddingLeft: 20,
                        },
                    }}
                    initialRouteName="LoginScreen"
                >
                    {storedCredentials ? (
                        <>
                            <Stack.Screen name="Welcome" component={ProfileScreen}/>
                            <Stack.Screen name="SettingsScreen" component={SettingsScreen}/>
                            <Stack.Screen name="BadgesScreen" component={BadgesScreen}/>
                        </>
                    ) : ( 
                        <>
                            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                            <Stack.Screen name="Signup" component={Signup}/>
                        </>
                    )}
                </Stack.Navigator>
          )}
      </CredentialsContext.Consumer>
  )
}

*/

/* old chat navigator settings

headerStyle: {
            borderBottomWidth: 3,
            ...styling.navBackgroundColor,
            ...styling.borderColor
          },
          titleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
            ...styling.textColor
          },
          headerBackTitleStyle: {
            ...styling.textColor,
          },
          title: 'Chat (Not working yet)',
        }}

*/