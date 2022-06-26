import React, {useContext, useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';

import {
    Avatar,
    SettingsPageItemTouchableOpacity,
    SettingsItemImage,
    SettingsItemText,
    BackgroundDarkColor,
    ChatScreen_Title,
    Navigator_BackButton,
    TestText,
    ConfirmLogoutView,
    ConfirmLogoutText,
    ConfirmLogoutButtons,
    ConfirmLogoutButtonText,
    Colors,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon
} from '../screens/screenStylings/styling.js';
import {useTheme} from "@react-navigation/native";

import Icon from 'react-native-vector-icons/Ionicons';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

import axios from 'axios';

//credentials context
import { ImageBackground, ScrollView, Text, TouchableOpacity, View, Image, Platform, ActivityIndicator, Switch } from 'react-native';
import * as Linking from 'expo-linking';
import { ProfilePictureURIContext } from '../components/ProfilePictureURIContext.js';
import { ShowPlaceholderSceeenContext } from '../components/ShowPlaceholderScreenContext.js';
import { LockSocialSquareContext } from '../components/LockSocialSquareContext.js';
import * as LocalAuthentication from 'expo-local-authentication';
import Constants from "expo-constants";
import { OpenAppContext } from '../components/OpenAppContext.js';
import { CredentialsContext } from '../components/CredentialsContext.js';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper.js';
import { AppStylingContext } from '../components/AppStylingContext.js';
import SocialSquareLogo_B64_png from '../assets/SocialSquareLogo_Base64_png.js';
import AppCredits from '../components/AppCredits.js';
const {brand} = Colors;


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
    const [destroyLocalDataMenuHidden, setDestroyLocalDataMenuHidden] = useState(true);
    const [confirmDestroyLocalDataMenuHidden, setConfirmDestroyLocalDataMenuHidden] = useState(true);
    const [message, handleMessage] = useState('');
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {AppStylingContextState, setAppStylingContextState} = useContext(AppStylingContext);
    if (storedCredentials) {var {email} = storedCredentials};
    const [hidePassword, setHidePassword] = useState(true);
    const [destroyingLocalData, setDestroyingLocalData] = useState(false);
    const [prevDestroyingLocalData, setPrevDestroyingLocalData] = useState(false);

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
        if (destroyLocalDataMenuHidden == true) {
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
    }

    const destroyAllData = () => {
        console.warn('Destroying all data')
        setDestroyingLocalData(true)
    }

    useEffect(() => {
        if (destroyingLocalData == true && prevDestroyingLocalData == false) {
            setStoredCredentials(null)
            setAppStylingContextState('Default')
            setProfilePictureUri(SocialSquareLogo_B64_png);
            setDestroyingLocalData(false)
            setPrevDestroyingLocalData(true)
        }
    }, [destroyingLocalData, prevDestroyingLocalData])

    useEffect(() => {
        if (destroyingLocalData == false && prevDestroyingLocalData == true) {
            navigation.replace('DestroyingLocalDataScreen')
        }
    }, [destroyingLocalData, prevDestroyingLocalData])
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
                <ConfirmLogoutView style={{backgroundColor: colors.primary, height: 500}} viewHidden={destroyLocalDataMenuHidden}>
                    <ConfirmLogoutText style={{color: colors.tertiary, fontSize: 24}}>Are you sure you want to delete all locally stored data?</ConfirmLogoutText>
                    <ConfirmLogoutText style={{color: colors.tertiary, fontSize: 14}}>Any data that is not on SocialSquare's servers will be destroyed and will not be able to be recovered. By pressing confirm you are agreeing to take the risk that any data not uploaded will be lost. For destruction of server data AND local data please go to the GDPR settings screen.</ConfirmLogoutText>
                    <ConfirmLogoutButtons cancelButton={true} onPress={() => {setDestroyLocalDataMenuHidden(true)}}>
                        <ConfirmLogoutButtonText cancelButton={true}>Cancel</ConfirmLogoutButtonText>
                    </ConfirmLogoutButtons> 
                    <ConfirmLogoutButtons confirmButton={true} onPress={destroyAllData}>
                        <ConfirmLogoutButtonText confirmButton>Confirm</ConfirmLogoutButtonText>
                    </ConfirmLogoutButtons> 
                </ConfirmLogoutView>
                <ScrollView scrollEnabled={destroyLocalDataMenuHidden} style={{height: '100%', backgroundColor: colors.primary}}>
                    <View style={{backgroundColor: colors.primary}}>
                        <Avatar resizeMode="cover" source={{uri: profilePictureUri}} />
                        <SettingsPageItemTouchableOpacity disabled={!destroyLocalDataMenuHidden} style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("DataControl")}>
                            <SettingsItemImage style={{tintColor: colors.tertiary}} source={require('./../assets/app_icons/settings.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>Data Control</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity disabled={!destroyLocalDataMenuHidden} style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("LoginActivity")}>
                            <SettingsItemImage style={{tintColor: colors.tertiary}} source={require('./../assets/app_icons/settings.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>Login Activity</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity disabled={!destroyLocalDataMenuHidden} style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("MultiFactorAuthentication")}>
                            <SettingsItemImage style={{tintColor: colors.tertiary}} source={require('./../assets/app_icons/settings.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>Multi-Factor Authentication</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity disabled={!destroyLocalDataMenuHidden} style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("LoginAttempts")}>
                            <SettingsItemImage style={{tintColor: colors.tertiary}} source={require('./../assets/app_icons/settings.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>Login Attempts</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flexDirection: 'column', flex: 1}}>
                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10, textAlign: 'center'}}>Show a placeholder screen when leaving SocialSquare to hide screen contents</Text>
                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10, textAlign: 'center'}}>{Platform.OS == 'ios' ? 'Lock SocialSquare with FaceID, TouchID, or password' : Platform.OS == 'android' ? 'Lock SocialSquare with fingerprint, facial, or iris recognition or password.' : 'Error: This platform is not supported'}</Text>
                            </View>
                            <View style={{flex: 0.3, flexDirection: 'column', alignItems: 'center'}}>
                                <Switch
                                    trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                    thumbColor={showPlaceholderScreen ? dark ? colors.teritary : colors.primary : colors.teritary}
                                    ios_backgroundColor={colors.primary}
                                    onValueChange={() => {setContextAndAsyncStorage('ShowPlaceholder')}}
                                    value={showPlaceholderScreen}
                                />
                                {Platform.OS == 'ios' || Platform.OS == 'android' ?
                                    <Switch
                                        trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                        thumbColor={lockSocialSquare ? dark ? colors.teritary : colors.primary : colors.teritary}
                                        ios_backgroundColor={colors.primary}
                                        onValueChange={() => {setContextAndAsyncStorage('LockSocialSquare')}}
                                        value={lockSocialSquare}
                                    />
                                : null}
                            </View>
                        </View>
                        <TouchableOpacity disabled={!destroyLocalDataMenuHidden} onPress={() => {setDestroyLocalDataMenuHidden(false)}} style={{borderColor: colors.borderColor, borderWidth: 2, borderRadius: 20, paddingVertical: 30, alignItems: 'center', marginBottom: 20}}>
                            <Icon name="trash-bin" size={60} color={colors.errorColor}/>
                            <Text style={{color: colors.errorColor, fontSize: 24, textAlign: 'center'}}>Destroy all locally stored data</Text>
                        </TouchableOpacity>
                        <AppCredits/>
                    </View>
                </ScrollView>
            </BackgroundDarkColor>
        </>
    );
}

const UserTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={brand}/>
                </RightIcon>
            )}
        </View>
    )
}

export default SecuritySettingsScreen;
