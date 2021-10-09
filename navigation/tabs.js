import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import FindScreen from '../screens/FindScreen';
import ChatScreen from '../screens/ChatScreen';
import PostScreen from '../screens/PostScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BadgesScreen from '../screens/BadgesScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {ChatScreen_Stack, ProfileScreenToSettings_StackNavigation, RootStack, SettingsToBadges_StackNavigation, FindScreen_Stack, post_screen_navigator, home_screen_post_to_profile_screen} from '../navigation/StackNavigator.js'
import AppStyling from '../screens/AppStylingScreen';
import {darkModeStyling, darkModeOn, lightModeStyling, darkModeStyling_navFocusedColor, lightModeStyling_navFocusedColor, darkModeStyling_navNonFocusedColor, lightModeStyling_navNonFocusedColor} from '../screens/screenStylings/styling.js';
import * as Haptics from 'expo-haptics';
import { CredentialsContext } from '../components/CredentialsContext';


const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
        style={{
            top: 10,
            justifyContent: 'center',
            alignItems: 'center',
            /*... styles.shadow*/
        }}
        onPress={onPress}
    >
        <View style={{
            width: 50,
            height: 50,
            borderRadius: 35,
            backgroundColor: 'transparent',
        }}>
            {children}
        </View>
    </TouchableOpacity>
);


const Tabs = ({navigation}) => {

    const {colors} = useTheme();
    const haptic_feedback_options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false
    };
    const onHomeScreenNavigate = () => {
        navigation.navigate("Home");
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    const onFindScreenNavigate = () => {
        navigation.navigate("Find");
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    const onPostScreenNavigate = () => {
        navigation.navigate("Post");
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    const onChatScreenNavigate = () => {
        navigation.navigate('Chat');
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    const onProfileScreenNavigate = () => {
        navigation.navigate('Profile', {
            screen: 'Welcome',
            params: { backButtonHidden: true },
        });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
        const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
        if (storedCredentials) {var {photoUrl} = storedCredentials}
    return(
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    /*position: 'absolute',*/
                    bottom: 0, /*Change the margin from the bottom of the screen for the tab navigator*/
                    left: 0, /*Change the margin from the left of the screen for the tab navigator*/
                    right: 0, /*Change the margin from the right of the screen for the tab navigator*/
                    elevation: 0,
                    backgroundColor: colors.primary,
                    height: 75,
                    /*...styles.shadow*/
                }
            }}
        >
            <Tab.Screen name="Home" component={home_screen_post_to_profile_screen} options={{
                tabBarIcon: ({focused}) => (
                    <TouchableOpacity style={{backgroundColor: colors.primary, width: '100%', height: 75, marginTop: 30}} onPressIn={() => {onHomeScreenNavigate()}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image
                                source={require('../assets/app_icons/home.png')}
                                resizeMode = 'contain'
                                style={{
                                    width: 35,
                                    height: 35,
                                    tintColor: focused ? colors.navFocusedColor : colors.navNonFocusedColor
                                }}
                            />
                            <Text style={{color: focused ? colors.navFocusedColor : colors.navNonFocusedColor, fontSize: 10,}}>HOME</Text>
                        </View>
                    </TouchableOpacity>
                ),
            }} />
            <Tab.Screen name="Find" component={FindScreen_Stack} options={{
                tabBarIcon: ({focused}) => (
                    <TouchableOpacity style={{backgroundColor: colors.primary, width: '100%', height: 75, marginTop: 30}} onPressIn={() => {onFindScreenNavigate()}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image
                                source={require('../assets/app_icons/find.png')}
                                resizeMode = 'contain'
                                style={{
                                    width: 35,
                                    height: 35,
                                    tintColor: focused ? colors.navFocusedColor : colors.navNonFocusedColor
                                }}
                            />
                            <Text style={{color: focused ? colors.navFocusedColor : colors.navNonFocusedColor, fontSize: 10,}}>FIND</Text>
                        </View>
                    </TouchableOpacity>
                ),
            }} />
            <Tab.Screen name="Post" component={post_screen_navigator} 
            options={{
                tabBarIcon: ({focused}) => (
                    <TouchableOpacity onPressIn={() => {onPostScreenNavigate()}}>
                        <Image 
                            source={require('../assets/app_icons/test3.png')}
                            resizeMode="contain"
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50/2
                            }}
                        />
                    </TouchableOpacity>
                ),
                tabBarButton: (props) => (
                    <CustomTabBarButton {...props} />
                )
            }}/>
            <Tab.Screen name="Chat" component={ChatScreen_Stack} options={{
                tabBarIcon: ({focused}) => (
                    <TouchableOpacity style={{backgroundColor: colors.primary, width: '100%', height: 75, marginTop: 30}} onPressIn={() => {onChatScreenNavigate()}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image
                                source={require('../assets/app_icons/chat.png')}
                                resizeMode = 'contain'
                                style={{
                                    width: 35,
                                    height: 35,
                                    tintColor: focused ? colors.navFocusedColor : colors.navNonFocusedColor
                                }}
                            />
                            <Text style={{color: focused ? colors.navFocusedColor : colors.navNonFocusedColor, fontSize: 10,}}>CHAT</Text>
                        </View>
                    </TouchableOpacity>
                ),
            }}/>
            <Tab.Screen name="Profile" component={RootStack} options={{
                tabBarIcon: ({focused}) => (
                    <TouchableOpacity style={{backgroundColor: colors.primary, width: '100%', height: 75, marginTop: 30}} onPressIn={onProfileScreenNavigate}>
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image
                                source={photoUrl ? {uri: photoUrl} : require('./../assets/img/Logo.png')}
                                resizeMode = 'contain'
                                style={{
                                    width: 35,
                                    height: 35,
                                    borderWidth: 3,
                                    borderColor: focused ? colors.navFocusedColor : colors.navNonFocusedColor,
                                    borderRadius: 40/2
                                }}
                            />
                            <Text style={{color: focused ? colors.navFocusedColor : colors.navNonFocusedColor, fontSize: 10,}}>PROFILE</Text>
                        </View>
                    </TouchableOpacity>
                ),
            }}/>
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#88C0D0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.5,
        elevation: 5
    }
});

export default Tabs;