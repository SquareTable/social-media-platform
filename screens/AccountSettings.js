import React, {useContext, useState} from 'react';
import { StatusBar } from 'expo-status-bar';

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


const AccountSettings = ({navigation}) => {
     //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {name, displayName, email, photoUrl} = storedCredentials;
    const AvatarImg = photoUrl ? {uri: photoUrl} : require('./../assets/img/Logo.png');
    const [logoutViewState, setLogoutViewState] = useState("false")

    const clearLogin = () => {
        AsyncStorage.removeItem('socialSquareCredentials').then(() => {
            setStoredCredentials("");
        })
        .catch(error => console.log(error))
    }

    const changeLogoutView = () => {
        if (logoutViewState==true) {
            setLogoutViewState(false)
        }else{
            console.log("Closed Confirm")
            setLogoutViewState(true)
        }
    }
    

    return(
        <> 
            <StatusBar style="dark"/>   
            <WelcomeContainer>                
                <Avatar resizeMode="cover" source={AvatarImg} />
                <TextLink>
                    <TextLinkContent>Change Profile Picture</TextLinkContent>
                </TextLink>
                <SettingsPageItemTouchableOpacity onPress={() => navigation.navigate("ChangeDisplayNamePage")}>
                    <SettingsItemText titleIfSubTitle={true}>Change Display Name</SettingsItemText>
                    <SettingsItemText subTitle={true}>Current: {displayName|| "Couldn't Get Or None"}</SettingsItemText>
                </SettingsPageItemTouchableOpacity>
                <SettingsPageItemTouchableOpacity onPress={() => navigation.navigate("ChangeUsernamePage")}>
                    <SettingsItemText titleIfSubTitle={true}>Change User Name</SettingsItemText>
                    <SettingsItemText subTitle={true}>Current: {name || "Couldn't get name"}</SettingsItemText>
                </SettingsPageItemTouchableOpacity>
                <SettingsPageItemTouchableOpacity onPress={() => navigation.navigate("ChangeEmailPage")}>
                    <SettingsItemText titleIfSubTitle={true}>Change Email</SettingsItemText>
                    <SettingsItemText subTitle={true}>Current: {email || "Couldn't get email"}</SettingsItemText>
                </SettingsPageItemTouchableOpacity>
                <SettingsPageItemTouchableOpacity onPress={changeLogoutView}>
                    <SettingsItemText titleIfSubTitle={true}>Change Password</SettingsItemText>
                    <SettingsItemText subTitle={true}>Last Changed: {null || "Couldn't get date"}</SettingsItemText>
                </SettingsPageItemTouchableOpacity>
            </WelcomeContainer>
        </>
    );
}

export default AccountSettings;
