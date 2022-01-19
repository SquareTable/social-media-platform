import React, {useContext, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';

import {
    WelcomeContainer,
    Avatar,
    SettingsPageItemTouchableOpacity,
    SettingsItemImage,
    SettingsItemText,
    ConfirmLogoutView,
    ConfirmLogoutText,
    ConfirmLogoutButtons,
    ConfirmLogoutButtonText,
    darkModeOn,
    darkModeStyling,
    lightModeStyling,
    BackgroundDarkColor,
    TextLink,
    TextLinkContent
} from '../screens/screenStylings/styling.js';
import {useTheme} from "@react-navigation/native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as Linking from 'expo-linking';
import SocialSquareLogo_B64_png from '../assets/SocialSquareLogo_Base64_png.js';
import * as WebBrowser from 'expo-web-browser';
import { ProfilePictureURIContext } from '../components/ProfilePictureURIContext.js';
import { AllCredentialsStoredContext } from '../components/AllCredentialsStoredContext.js';


const SettingsPage = ({navigation}) => {
     //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    if (storedCredentials) {var {name, email, photoUrl} = storedCredentials}
    const [logoutViewState, setLogoutViewState] = useState(true)
    const [webBrowserResult, setWebBrowserResult] = useState(null)
    const {profilePictureUri, setProfilePictureUri} = useContext(ProfilePictureURIContext);
    const {allCredentialsStoredList, setAllCredentialsStoredList} = useContext(AllCredentialsStoredContext);

    const clearLogin = () => {
        AsyncStorage.removeItem('SocialSquareDMsList');
        AsyncStorage.removeItem('PlayAudioInSilentMode_AppBehaviour_AsyncStorage');
        AsyncStorage.removeItem('UserProfilePicture');
        if (storedCredentials && allCredentialsStoredList) {
            if (allCredentialsStoredList.length == 1 || allCredentialsStoredList.length == 0 || allCredentialsStoredList == undefined || allCredentialsStoredList == null) {
                console.log('Running logout code for when allCredentialsStoredLists length is 1 or 0');
                setProfilePictureUri(SocialSquareLogo_B64_png);
                AsyncStorage.removeItem('socialSquareCredentials').then(() => {
                    setStoredCredentials(null)
                })
                AsyncStorage.removeItem('socialSquare_AllCredentialsList').then(() => {
                    setAllCredentialsStoredList(null)
                })
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }],
                });
            } else {
                console.log('Running logout code for when allCredentialsStoredLists length is not 1 or 0')
                allCredentialsStoredList.splice(storedCredentials.indexLength, 1);
                AsyncStorage.setItem('socialSquare_AllCredentialsList', JSON.stringify(allCredentialsStoredList)).then(() => {
                    setAllCredentialsStoredList(allCredentialsStoredList)
                });
                AsyncStorage.setItem('socialSquareCredentials', JSON.stringify(allCredentialsStoredList[0])).then(() => {
                    setProfilePictureUri(allCredentialsStoredList[0].profilePictureUri)
                    setStoredCredentials(allCredentialsStoredList[0])
                });
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Tabs' }],
                })
            }
        } else {
            setProfilePictureUri(SocialSquareLogo_B64_png);
            AsyncStorage.removeItem('socialSquareCredentials').then(() => {
                setStoredCredentials(null)
            })
            AsyncStorage.removeItem('socialSquare_AllCredentialsList').then(() => {
                setAllCredentialsStoredList(null)
            })
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
            });
        }
    }

    const changeLogoutView = () => {
        if (logoutViewState==true) {
            setLogoutViewState(false)
        }else{
            console.log("Closed Confirm")
            setLogoutViewState(true)
        }
    }

    const {colors} = useTheme();

    const seeAppIntroductionScreenAgainButtonOnPress = () => {
        navigation.replace('IntroScreen')
    }

    const goToLink = async (linkToGoTo) => {
        let result = await WebBrowser.openBrowserAsync(linkToGoTo);
        setWebBrowserResult(result);
    };

    return(
        <> 
            <StatusBar style={colors.StatusBarColor}/>   
            <BackgroundDarkColor style={{backgroundColor: colors.primary}}>
                <ConfirmLogoutView style={{backgroundColor: colors.primary}} viewHidden={logoutViewState}>
                    <ConfirmLogoutText style={{color: colors.tertiary}}>Are you sure you want to logout?</ConfirmLogoutText>
                    <ConfirmLogoutButtons cancelButton={true} onPress={changeLogoutView}>
                        <ConfirmLogoutButtonText cancelButton={true}>Cancel</ConfirmLogoutButtonText>
                    </ConfirmLogoutButtons> 
                    <ConfirmLogoutButtons confirmButton={true} onPress={clearLogin}>
                        <ConfirmLogoutButtonText confirmButton>Confirm</ConfirmLogoutButtonText>
                    </ConfirmLogoutButtons> 
                </ConfirmLogoutView>
                <ScrollView scrollEnabled={logoutViewState}>
                    <WelcomeContainer style={{backgroundColor: colors.primary}}>
                        <Avatar resizeMode="cover" source={{uri: profilePictureUri}} />  
                        <SettingsPageItemTouchableOpacity disabled={!logoutViewState} style={{borderColor: colors.borderColor}} onPress={() => {navigation.navigate('SecuritySettingsScreen')}}>
                            <Icon name="security" size={60} color={colors.tertiary}/>
                            <SettingsItemText style={{color: colors.tertiary}}>Security</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity disabled={!logoutViewState} style={{borderColor: colors.borderColor}} onPress={() => {navigation.navigate('NotificationsSettingsScreen')}}>
                            <Icon name="alarm-light-outline" size={60} color={colors.tertiary}/>
                            <SettingsItemText style={{color: colors.tertiary}}>Notifications</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity disabled={!logoutViewState} style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("AccountSettings")}>
                            <SettingsItemImage style={{tintColor: colors.tertiary}} source={require('./../assets/app_icons/settings.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>Account Settings</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity disabled={!logoutViewState} style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("AppStyling")}>
                            <SettingsItemImage style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/207-eye.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>App Styling</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity disabled={!logoutViewState} style={{borderColor: colors.borderColor}} onPress={() => {navigation.navigate('ReportBugScreen')}}>
                            <SettingsItemImage style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/265-notification.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>Report bug</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity disabled={!logoutViewState} style={{borderColor: colors.borderColor}} onPress={changeLogoutView}>
                            <SettingsItemImage style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/277-exit.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>Logout</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <Text style={{color: colors.tertiary, fontSize: 24, textAlign: 'center'}}>© SquareTable 2022</Text>
                        <Text style={{color: colors.tertiary, fontSize: 24, textAlign: 'center', marginBottom: 10}}>All Rights Reserved</Text>
                        <Text style={{color: colors.tertiary, fontSize: 18, textAlign: 'center', marginBottom: 10}}>Made by Sebastian Webster, Kovid Dev, Didula Semasinghe, and Jacob Bowden</Text>
                        <TouchableOpacity disabled={!logoutViewState} style={{marginHorizontal: '20%', borderColor: colors.borderColor, borderWidth: 5, borderRadius: 20/2}} onPressOut={() => {Linking.openURL('https://github.com/SquareTable/social-media-platform')}}>
                            <View>
                                <Text style={{color: colors.tertiary, fontSize: 16, textAlign: 'center', padding: 7}}>Press here to visit the SocialSquare GitHub repo</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={!logoutViewState} style={{marginHorizontal: '20%', borderColor: colors.borderColor, borderWidth: 5, borderRadius: 20/2, marginTop: 20}} onPress={seeAppIntroductionScreenAgainButtonOnPress}>
                            <View>
                                <Text style={{color: colors.tertiary, fontSize: 16, textAlign: 'center', padding: 7}}>See app introduction screen again</Text>
                            </View>
                        </TouchableOpacity>
                        <TextLink disabled={!logoutViewState} style={{marginTop: 10}} onPress={() => {goToLink('https://squaretable.github.io/social-media-platform/TermsAndConditions')}}>
                            <TextLinkContent style={{color: colors.brand}}>Terms of Service</TextLinkContent>
                        </TextLink>
                        <TextLink disabled={!logoutViewState} onPress={() => {goToLink('https://squaretable.github.io/social-media-platform/PrivacyPolicy')}}>
                            <TextLinkContent style={{color: colors.brand}}>Privacy Policy</TextLinkContent>
                        </TextLink>
                    </WelcomeContainer>
                </ScrollView>
            </BackgroundDarkColor>
        </>
    );
}

export default SettingsPage;
