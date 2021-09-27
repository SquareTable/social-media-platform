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
    BackgroundDarkColor
} from '../screens/screenStylings/styling.js';
import {useTheme} from "@react-navigation/native";

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as Linking from 'expo-linking';


const SettingsPage = ({navigation}) => {
     //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    if (storedCredentials) {var {name, email, photoUrl} = storedCredentials}
    const AvatarImg = photoUrl ? {uri: photoUrl} : require('./../assets/img/Logo.png');
    const [logoutViewState, setLogoutViewState] = useState("false")

    const clearLogin = () => {
        AsyncStorage.removeItem('socialSquareCredentials').then(() => {
            setStoredCredentials(null);
        })
        .catch(error => console.log(error));
        AsyncStorage.removeItem('SocialSquareDMsList');
        AsyncStorage.removeItem('PlayAudioInSilentMode_AppBehaviour_AsyncStorage');
        try {
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
            });
        } catch (e) {
            console.log(e + "Error with resetting navigation after logout from SettingsScreen.js");
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

    return(
        <> 
            <StatusBar style={colors.StatusBarColor}/>   
            <BackgroundDarkColor style={{backgroundColor: colors.primary}}>
                <ScrollView>
                    <WelcomeContainer style={{backgroundColor: colors.primary}}>                
                    <ConfirmLogoutView style={{backgroundColor: colors.primary}} viewHidden={logoutViewState}>
                        <ConfirmLogoutText style={{color: colors.tertiary}}>Are you sure you want to logout?</ConfirmLogoutText>
                        <ConfirmLogoutButtons cancelButton={true} onPress={changeLogoutView}>
                            <ConfirmLogoutButtonText cancelButton={true}>Cancel</ConfirmLogoutButtonText>
                            </ConfirmLogoutButtons> 
                            <ConfirmLogoutButtons confirmButton={true} onPress={clearLogin}>
                                <ConfirmLogoutButtonText confirmButton>Confirm</ConfirmLogoutButtonText>
                            </ConfirmLogoutButtons> 
                    </ConfirmLogoutView>
                        <Avatar resizeMode="cover" source={AvatarImg} />
                        
                        <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("AccountSettings")}>
                            <SettingsItemImage source={require('./../assets/app_icons/settings.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>Account Settings</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("AppBehaviour")}>
                            <SettingsItemImage source={require('./../assets/app_icons/settings.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>App Behaviour</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => {navigation.navigate('ReportBugScreen')}}>
                            <SettingsItemImage source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/265-notification.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>Report bug</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPressOut={changeLogoutView}>
                            <SettingsItemImage source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/277-exit.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>Logout</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <Text style={{color: colors.tertiary, fontSize: 24, textAlign: 'center'}}>© SquareTable 2021</Text>
                        <Text style={{color: colors.tertiary, fontSize: 24, textAlign: 'center', marginBottom: 10}}>All Rights Reserved</Text>
                        <Text style={{color: colors.tertiary, fontSize: 18, textAlign: 'center', marginBottom: 10}}>Made by Sebastian Webster, Kovid Dev, and Jacob Bowden</Text>
                        <TouchableOpacity style={{marginHorizontal: '20%', borderColor: colors.borderColor, borderWidth: 5, borderRadius: 20/2}} onPressOut={() => {Linking.openURL('https://github.com/SquareTable/social-media-platform')}}>
                            <View>
                                <Text style={{color: colors.tertiary, fontSize: 16, textAlign: 'center', padding: 7}}>Press here to visit the SocialSquare GitHub repo</Text>
                            </View>
                        </TouchableOpacity>
                    </WelcomeContainer>
                </ScrollView>
            </BackgroundDarkColor>
        </>
    );
}

export default SettingsPage;
