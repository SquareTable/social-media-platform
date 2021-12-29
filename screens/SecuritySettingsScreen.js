import React, {useContext, useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import SwitchToggle from "react-native-switch-toggle";

import {
    Avatar,
    SettingsPageItemTouchableOpacity,
    SettingsItemImage,
    SettingsItemText,
    BackgroundDarkColor,
    ChatScreen_Title,
    Navigator_BackButton,
    TestText
} from '../screens/screenStylings/styling.js';
import {useTheme} from "@react-navigation/native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { ImageBackground, ScrollView, Text, TouchableOpacity, View, Image, Platform } from 'react-native';
import * as Linking from 'expo-linking';
import { ProfilePictureURIContext } from '../components/ProfilePictureURIContext.js';
import { ShowPlaceholderSceeenContext } from '../components/ShowPlaceholderScreenContext.js';
import { LockSocialSquareContext } from '../components/LockSocialSquareContext.js';
import * as LocalAuthentication from 'expo-local-authentication';
import Constants from "expo-constants";
import { OpenAppContext } from '../components/OpenAppContext.js';


const SecuritySettingsScreen = ({navigation}) => {
    const {colors, dark} = useTheme();
    const {profilePictureUri, setProfilePictureUri} = useContext(ProfilePictureURIContext);
    const {showPlaceholderScreen, setShowPlaceholderScreen} = useContext(ShowPlaceholderSceeenContext)
    const {lockSocialSquare, setLockSocialSquare} = useContext(LockSocialSquareContext)
    const [biometricsSupported, setBiometricsSupported] = useState(false)
    const [biometricsEnrolled, setBiometricsEnrolled] = useState(false)
    const [AppEnvironment, setAppEnvironment] = useState(undefined)
    const marginVerticalOnSwitches = 11
    const fontSizeForText = 15
    const {openApp, setOpenApp} = useContext(OpenAppContext)

    useEffect(() => {
        async function getBiometricsSupportData() {
            const biometricsSupported = await LocalAuthentication.hasHardwareAsync()
            const biometricsEnrolled = await LocalAuthentication.isEnrolledAsync()
            const AppEnvironment = Constants.appOwnership
            setBiometricsSupported(biometricsSupported)
            setBiometricsEnrolled(biometricsEnrolled)
            setAppEnvironment(AppEnvironment)
            console.log('Biometrics hardware has been found on the device: ' + biometricsSupported)
            console.log('Biometric profile has been enrolled on device: ' + biometricsEnrolled)
            console.log('App Environment: ' + AppEnvironment)
        }
        getBiometricsSupportData()
    })

    const setContextAndAsyncStorage = (type) => {
        if (type == 'ShowPlaceholder') {
            if (lockSocialSquare == true) {
                alert('Please disable locking SocialSquare with biometrics or password to be able to turn off the SocialSquare placeholder screen showing on app exit')
            } else {
                AsyncStorage.setItem('ShowPlaceholderScreen', showPlaceholderScreen == true ? 'false' : 'true')
                setShowPlaceholderScreen(showPlaceholderScreen => !showPlaceholderScreen)
            }
        } else if (type == 'LockSocialSquare') {
            if (lockSocialSquare == true) {
                AsyncStorage.setItem('LockSocialSquare', 'false')
                setLockSocialSquare(false)
            } else if (LocalAuthentication.SecurityLevel == 0) {
                alert("This feature cannot be enabled because there are no authentication profiles on your device to use. Please cereate a biometric profile or password on your device to use this feature.")
            } else if (AppEnvironment == 'expo') {
                alert("Cannot activate SocialSquare automatic locking because you are currently running SocialSquare in Expo Go. Expo Go does not support biometric features. Please run an Apple App Store or Google Play Store version of SocialSquare for this feature to work.")
            } else {
                setOpenApp(false)
                const authenticate = async () => {
                    const biometricAuth = await LocalAuthentication.authenticateAsync({
                      promptMessage: 'Please authenticate to allow for biometric scanning',
                      disableDeviceFallback: false,
                      fallbackLabel: "Unlock with password"
                    });
                    checkIfAuthenticationWasASuccess(biometricAuth)
                }
                const checkIfAuthenticationWasASuccess = (authenticationObject) => {
                    if (authenticationObject.success == false) {
                        setOpenApp(true)
                        alert('An error occured. Please try again.')
                    } else {
                        setOpenApp(true)
                        AsyncStorage.setItem('LockSocialSquare', 'true')
                        if (showPlaceholderScreen == false && lockSocialSquare == false) {
                            setShowPlaceholderScreen(true)
                            AsyncStorage.setItem('ShowPlaceholderScreen', 'true')
                        }
                        setLockSocialSquare(true)
                    }
                }
                authenticate()
            }
        } else {
            console.error('Wrong type was passed into setContextAndAsyncStorage for SocialSquareSettings.js: ' + type)
        }
    }
    return(
        <> 
            <StatusBar style={colors.StatusBarColor}/>   
            <BackgroundDarkColor style={{backgroundColor: colors.primary}}>
                <ChatScreen_Title style={{backgroundColor: colors.primary, borderWidth: 0, height: 'auto', paddingBottom: 5}}>
                    <Navigator_BackButton onPress={() => {navigation.goBack()}}>
                        <Image
                        source={require('../assets/app_icons/back_arrow.png')}
                        style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                        resizeMode="contain"
                        resizeMethod="resize"
                        />
                    </Navigator_BackButton>
                    <TestText style={{textAlign: 'center', color: colors.tertiary}}>Security Settings</TestText>
                </ChatScreen_Title>
                <ScrollView style={{height: '100%', backgroundColor: colors.primary}}>
                    <View style={{backgroundColor: colors.primary}}>
                        <Avatar resizeMode="cover" source={{uri: profilePictureUri}} />
                        <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("GDPRCompliance")}>
                            <SettingsItemImage style={{tintColor: colors.tertiary}} source={require('./../assets/app_icons/settings.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>GDPR Compliance</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("LoginActivity")}>
                            <SettingsItemImage style={{tintColor: colors.tertiary}} source={require('./../assets/app_icons/settings.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>Login Activity</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("2FA")}>
                            <SettingsItemImage style={{tintColor: colors.tertiary}} source={require('./../assets/app_icons/settings.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>Two Factor Authentication</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flexDirection: 'column', flex: 1}}>
                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10, textAlign: 'center'}}>Show a placeholder screen when leaving SocialSquare to hide screen contents</Text>
                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10, textAlign: 'center'}}>{Platform.OS == 'ios' ? 'Lock SocialSquare with FaceID, TouchID, or password' : Platform.OS == 'android' ? 'Lock SocialSquare with fingerprint, facial, or iris recognition or password.' : null}</Text>
                            </View>
                            <View style={{flex: 0.3, flexDirection: 'column', alignItems: 'center'}}>
                                <SwitchToggle
                                    switchOn={showPlaceholderScreen}
                                    onPress={() => {setContextAndAsyncStorage('ShowPlaceholder')}}
                                    circleColorOff={colors.tertiary}
                                    circleColorOn={dark? colors.teritary : colors.primary}
                                    backgroundColorOn={colors.darkestBlue}
                                    backgroundColorOff={colors.borderColor}
                                    containerStyle={{
                                        width: 50,
                                        height: 28,
                                        borderRadius: 25,
                                        padding: 5,
                                        marginVertical: marginVerticalOnSwitches
                                    }}
                                    circleStyle={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 20,
                                    }}
                                />
                                {Platform.OS == 'ios' || Platform.OS == 'android' ?
                                    <SwitchToggle
                                        switchOn={lockSocialSquare}
                                        onPress={() => {setContextAndAsyncStorage('LockSocialSquare')}}
                                        circleColorOff={colors.tertiary}
                                        circleColorOn={dark? colors.teritary : colors.primary}
                                        backgroundColorOn={colors.darkestBlue}
                                        backgroundColorOff={colors.borderColor}
                                        containerStyle={{
                                            width: 50,
                                            height: 28,
                                            borderRadius: 25,
                                            padding: 5,
                                            marginVertical: marginVerticalOnSwitches
                                        }}
                                        circleStyle={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: 20,
                                        }}
                                    />
                                : null}
                            </View>
                        </View>
                        <Text style={{color: colors.tertiary, fontSize: 24, textAlign: 'center'}}>© SquareTable 2021</Text>
                        <Text style={{color: colors.tertiary, fontSize: 24, textAlign: 'center', marginBottom: 10}}>All Rights Reserved</Text>
                        <Text style={{color: colors.tertiary, fontSize: 18, textAlign: 'center', marginBottom: 10}}>Made by Sebastian Webster, Kovid Dev, and Jacob Bowden</Text>
                    </View>
                </ScrollView>
            </BackgroundDarkColor>
        </>
    );
}

export default SecuritySettingsScreen;
