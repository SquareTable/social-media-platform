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
import ChatScreen from "../screens/ChatScreen";
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
import ChatInformationScreen from "../screens/ChatInformationScreen.js";
import CreateChatScreen from "../screens/CreateChatScreen.js";
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



const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};



const ChatScreen_Stack = () => {
  if (darkModeOn === true) {
    var styling = darkModeStyling;
  } else {
    var styling = lightModeStyling;
  }
  const { colors } = useTheme();
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="ChatScreenNavigator" component={ChatScreenNavigator}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: colors.tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
              paddingLeft: 20,
          },
        }}
      />
      <Stack.Screen name="Chat" component={ChatScreen}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: colors.tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
              paddingLeft: 20,
          },
          headerLeft: null
        }}
      />
      <Stack.Screen name="ChatInformationScreen" component={ChatInformationScreen}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: colors.tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
              paddingLeft: 20,
          },
          headerLeft: null
        }}
      />
      <Stack.Screen name="CreateChatScreen" component={CreateChatScreen}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: colors.tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
              paddingLeft: 20,
          },
          headerLeft: null
        }}
      />
      <Stack.Screen name="Welcome" component={ProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: colors.tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
              paddingLeft: 20,
          },
          headerLeft: null
        }}
      />
      <Stack.Screen name="VisitingProfileScreen" component={VisitingProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: colors.tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
              paddingLeft: 20,
          },
          headerLeft: null
        }}
      />
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
            headerTitle: '',
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
                <Stack.Screen 
                  name="AppStyling" 
                  component={AppStyling}
                  options={{
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTintColor: colors.tertiary,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        paddingLeft: 20,
                    },
                    headerLeft: null
                }}
                />
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
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="FindScreen" component={FindScreen}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: colors.tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
              paddingLeft: 20,
          },
          headerLeft: null
        }}
      />
      <Stack.Screen name="ProfilePages" component={ProfilePages}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: colors.tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
              paddingLeft: 20,
          },
          headerLeft: null
        }}
      />
      <Stack.Screen name="Post_FullScreen" component={Post_FullScreen}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: colors.tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
              paddingLeft: 20,
          },
          headerLeft: null
        }}
      />
      <Stack.Screen name="ProfileScreen_FromFindScreenPost" component={ProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: colors.tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
              paddingLeft: 20,
          },
          headerLeft: null
        }}
      />
      <Stack.Screen name="CategoryViewPage" component={CategoryViewPage}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: colors.tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
              paddingLeft: 20,
          },
        }}
      />
      <Stack.Screen name="CommentviewPage" component={CommentViewPage}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: colors.tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
              paddingLeft: 20,
          },
        }}
      />
      <Stack.Screen name="ThreadViewPage" component={ThreadViewPage}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: colors.tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
              paddingLeft: 20,
          },
        }}
      />
      <Stack.Screen name="ViewImagePostPage" component={ViewImagePostPage}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: colors.tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
              paddingLeft: 20,
          },
        }}
      />
      <Stack.Screen name="ViewPollPostPage" component={ViewPollPostPage}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: colors.tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
              paddingLeft: 20,
          },
        }}
      />
      <Stack.Screen name="ThreadUploadPage" component={ThreadUploadPage}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: colors.tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
              paddingLeft: 20,
          },
        }}
      />
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
      headerTitle: '',
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
    <Stack.Navigator>
      <Stack.Screen name="PostScreen" component={PostScreen}
      options={{
        headerStyle: {
            backgroundColor: 'transparent',
        },
        headerTintColor: colors.tertiary,
        headerTransparent: true,
        headerTitle: '',
        headerLeftContainerStyle: {
            paddingLeft: 20,
        },
    }}/>
      <Stack.Screen name="MultiMediaUploadPage" component={MultiMediaUploadPage}
      options={{
        headerStyle: {
            backgroundColor: 'transparent',
        },
        headerTintColor: colors.tertiary,
        headerTransparent: true,
        headerTitle: '',
        headerLeftContainerStyle: {
            paddingLeft: 20,
        },
    }}/>
      <Stack.Screen name="ThreadUploadPage" component={ThreadUploadPage}
      options={{
        headerStyle: {
            backgroundColor: 'transparent',
        },
        headerTintColor: colors.tertiary,
        headerTransparent: true,
        headerTitle: '',
        headerLeftContainerStyle: {
            paddingLeft: 20,
        },
    }}/>
      <Stack.Screen name="PollUploadPage" component={PollUploadPage}
      options={{
        headerStyle: {
            backgroundColor: 'transparent',
        },
        headerTintColor: colors.tertiary,
        headerTransparent: true,
        headerTitle: '',
        headerLeftContainerStyle: {
            paddingLeft: 20,
        },
    }}/>
      <Stack.Screen name="AudioUploadPage" component={AudioUploadPage}
      options={{
        headerStyle: {
            backgroundColor: 'transparent',
        },
        headerTintColor: colors.tertiary,
        headerTransparent: true,
        headerTitle: '',
        headerLeftContainerStyle: {
            paddingLeft: 20,
        },
        headerLeft: null,
        gestureEnabled: false
    }}/>
      <Stack.Screen name="RecordAudioPage" component={RecordAudioPage}
      options={{
        headerStyle: {
            backgroundColor: 'transparent',
        },
        headerTintColor: colors.tertiary,
        headerTransparent: true,
        headerTitle: '',
        headerLeftContainerStyle: {
            paddingLeft: 20,
        },
        headerLeft: null,
        gestureEnabled: false
    }}/>
    <Stack.Screen name="SendAudioPage" component={SendAudioPage}
      options={{
        headerStyle: {
            backgroundColor: 'transparent',
        },
        headerTintColor: colors.tertiary,
        headerTransparent: true,
        headerTitle: '',
        headerLeftContainerStyle: {
            paddingLeft: 20,
        },
        headerLeft: null,
        gestureEnabled: false
    }}/>
    <Stack.Screen name="MultiMediaUploadPreview" component={MultiMediaUploadPreview}
      options={{
        headerStyle: {
            backgroundColor: 'transparent',
        },
        headerTintColor: colors.tertiary,
        headerTransparent: true,
        headerTitle: '',
        headerLeftContainerStyle: {
            paddingLeft: 20,
        },
    }}/>
    <Stack.Screen name="SelectCategorySearchScreen" component={SelectCategorySearchScreen}
      options={{
        headerStyle: {
            backgroundColor: 'transparent',
        },
        headerTintColor: colors.tertiary,
        headerTransparent: true,
        headerTitle: '',
        headerLeftContainerStyle: {
            paddingLeft: 20,
        },
    }}/>
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
                        headerTitle: '',
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
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
            ...styling.textColor
          },
          headerBackTitleStyle: {
            ...styling.textColor,
          },
          headerTitle: 'Chat (Not working yet)',
        }}

*/