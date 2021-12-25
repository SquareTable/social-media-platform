import React, {useContext, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {useTheme} from "@react-navigation/native";

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
    TextLinkContent,
    TextLink,
    SettingsHorizontalView
} from '../screens/screenStylings/styling.js';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import { ImageBackground, ScrollView, Settings } from 'react-native';
import { ProfilePictureURIContext } from '../components/ProfilePictureURIContext.js';


const AccountSettings = ({navigation}) => {
    const {colors, dark} = useTheme();
     //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {name, displayName, email, photoUrl} = storedCredentials;
    const {profilePictureUri, setProfilePictureUri} = useContext(ProfilePictureURIContext)
    

    return(
        <> 
            <StatusBar style={colors.StatusBarColor}/>   
            <WelcomeContainer style={{backgroundColor: colors.primary}}>                
                <Avatar resizeMode="cover" source={{uri: profilePictureUri}} />
                <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("ChangeDisplayNamePage")}>
                    <SettingsItemText style={{color: colors.tertiary}} titleIfSubTitle={true}>Change Display Name</SettingsItemText>
                    <SettingsItemText style={{color: colors.tertiary}} subTitle={true}>Current: {displayName|| "Couldn't Get Or None"}</SettingsItemText>
                </SettingsPageItemTouchableOpacity>
                <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("ChangeUsernamePage")}>
                    <SettingsItemText style={{color: colors.tertiary}} titleIfSubTitle={true}>Change User Name</SettingsItemText>
                    <SettingsItemText style={{color: colors.tertiary}} subTitle={true}>Current: {name || "Couldn't get name"}</SettingsItemText>
                </SettingsPageItemTouchableOpacity>
                <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("ChangeEmailPage")}>
                    <SettingsItemText style={{color: colors.tertiary}} titleIfSubTitle={true}>Change Email</SettingsItemText>
                    <SettingsItemText style={{color: colors.tertiary}} subTitle={true}>Current: {email || "Couldn't get email"}</SettingsItemText>
                </SettingsPageItemTouchableOpacity>
                <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => {alert("Coming soon")}}>
                    <SettingsItemText style={{color: colors.tertiary}} titleIfSubTitle={true}>Change Password</SettingsItemText>
                    <SettingsItemText style={{color: colors.tertiary}} subTitle={true}>Last Changed: {null || "Couldn't get date"}</SettingsItemText>
                </SettingsPageItemTouchableOpacity>
            </WelcomeContainer>
        </>
    );
}

export default AccountSettings;
