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
import {darkModeStyling, darkModeOn, lightModeStyling, darkModeStyling_navFocusedColor, lightModeStyling_navFocusedColor, darkModeStyling_navNonFocusedColor, lightModeStyling_navNonFocusedColor, Avatar, ProfileOptionsView} from '../screens/screenStylings/styling.js';
import * as Haptics from 'expo-haptics';
import { CredentialsContext } from '../components/CredentialsContext';
import SocialSquareLogo_B64_png from '../assets/SocialSquareLogo_Base64_png';

//axios
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    const [currentTab, setCurrentTab] = useState('Home')
    const {colors} = useTheme();
    const haptic_feedback_options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false
    };
    const onHomeScreenNavigate = () => {
        if (currentTab == 'Home') {
            navigation.navigate("Home");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            console.log('Home screen is focused already')
        } else {
            setCurrentTab('Home')
            navigation.navigate("Home");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    }
    const onFindScreenNavigate = () => {
        if (currentTab == 'Find') {
            navigation.navigate("Find");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            console.log('Find screen is already focused')
        } else {
            setCurrentTab('Find')
            navigation.navigate("Find");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    }
    const onPostScreenNavigate = () => {
        if (currentTab == 'Post') {
            navigation.navigate("Post");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            console.log('Post screen is already focused')
        } else {
            navigation.navigate("Post");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setCurrentTab('Post')
        }
    }
    const onChatScreenNavigate = () => {
        if (currentTab == 'Chat') {
            navigation.navigate('Chat');
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            console.log('Chat screen is already focused')
        } else {
            navigation.navigate('Chat');
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setCurrentTab('Chat')
        }
    }
    const onProfileScreenNavigate = () => {
        navigation.navigate('Profile', {
            screen: 'Welcome',
            params: { backButtonHidden: true, imageFromRoute: null, goToStylingMenu: false },
        });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setCurrentTab('Profile')
    }
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    if (storedCredentials) {var {name} = storedCredentials}

    const [AvatarImage, setAvatarImage] = useState(SocialSquareLogo_B64_png)
    const getProfilePicture = () => {
        const url = `https://nameless-dawn-41038.herokuapp.com/user/getProfilePic/${name}`;

        axios.get(url).then((response) => {
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCCESS') {
                console.log('GETTING PROFILE PICTURE FOR TABS.JS WAS NOT A SUCCESS')
                console.log(status)
                console.log(message)
            } else {
                console.log(status)
                console.log(message)
                axios.get(`https://nameless-dawn-41038.herokuapp.com/getImage/${data}`)
                .then((response) => {
                    const result = response.data;
                    const {message, status, data} = result;
                    console.log(status)
                    console.log(message)
                    console.log(data)
                    //set image
                    if (message == 'No profile image.' && status == 'FAILED') {
                        console.log('Setting logo to SocialSquare logo')
                        setAvatarImage(SocialSquareLogo_B64_png)
                    } else if (data) {
                        //convert back to image
                        console.log('Setting logo in tab bar to profile logo')
                        var base64Icon = `data:image/jpg;base64,${data}`
                        setAvatarImage(base64Icon)
                        const SetUserPfpToAsyncStorage = async () => {await AsyncStorage.setItem('UserProfilePicture', base64Icon)}
                        SetUserPfpToAsyncStorage()
                    } else {
                        console.log('Setting logo to SocialSquare logo')
                        setAvatarImage(SocialSquareLogo_B64_png)
                    }
                })
                .catch(function (error) {
                    console.log("Image not recieved")
                    console.log(error);
                });
            }
            //setSubmitting(false);

        }).catch(error => {
            console.log(error);
            //setSubmitting(false);
            handleMessage("An error occured. Try checking your network connection and retry.");
        })
    }
    const CheckForAsyncStoragePfp = async () => {
        if (await AsyncStorage.getItem('UserProfilePicture') != null) {
            console.log('Loading profile picture from AsyncStorage in tabs.js')
            setAvatarImage(await AsyncStorage.getItem('UserProfilePicture'))
        } else {
            console.log('There is no profile picture in AsyncStorage. Loading profile picture for tabs.js')
            getProfilePicture()
        }
    }
    CheckForAsyncStoragePfp()
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
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
                    <TouchableOpacity style={{backgroundColor: colors.primary, width: '100%', height: 75, marginTop: 30}} onPressIn={() => {onProfileScreenNavigate()}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image
                                source={{uri: AvatarImage}}
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