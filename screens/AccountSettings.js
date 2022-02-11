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
    SettingsHorizontalView,
    ChatScreen_Title,
    Navigator_BackButton,
    StyledButton,
    ButtonText,
    TestText
} from '../screens/screenStylings/styling.js';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import { ImageBackground, ScrollView, Settings } from 'react-native';
import { ProfilePictureURIContext } from '../components/ProfilePictureURIContext.js';

import {Image, View, Text} from 'react-native';


const AccountSettings = ({navigation}) => {
    const {colors, dark} = useTheme();
     //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    if (storedCredentials) {var {name, displayName, email, photoUrl} = storedCredentials}
    const {profilePictureUri, setProfilePictureUri} = useContext(ProfilePictureURIContext)
    

    return(
        <> 
            <StatusBar style={colors.StatusBarColor}/>   
            <ChatScreen_Title style={{backgroundColor: colors.primary, borderWidth: 0}}>
                <Navigator_BackButton onPress={() => {navigation.goBack()}}>
                    <Image
                    source={require('../assets/app_icons/back_arrow.png')}
                    style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                    resizeMode="contain"
                    resizeMethod="resize"
                    />
                </Navigator_BackButton>
                <TestText style={{textAlign: 'center', color: colors.tertiary}}>Account Settings</TestText>
            </ChatScreen_Title>
            {storedCredentials ?
                <WelcomeContainer style={{backgroundColor: colors.primary}}>                
                    <Avatar resizeMode="cover" source={{uri: profilePictureUri}} style={{marginTop: -40}}/>
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
            :
                <View style={{flex: 1, justifyContent: 'center', marginHorizontal: '2%'}}>
                    <Text style={{color: colors.tertiary, fontSize: 20, textAlign: 'center', marginBottom: 20}}>Please login to change account settings</Text>
                    <StyledButton onPress={() => {navigation.navigate('ModalLoginScreen', {modal: true})}}>
                        <ButtonText> Login </ButtonText>
                    </StyledButton>
                    <StyledButton style={{backgroundColor: colors.primary, color: colors.tertiary}} signUpButton={true} onPress={() => navigation.navigate('ModalSignupScreen', {modal: true, Modal_NoCredentials: true})}>
                            <ButtonText signUpButton={true} style={{color: colors.tertiary, top: -9.5}}> Signup </ButtonText>
                    </StyledButton>
                </View>
            }
        </>
    );
}

export default AccountSettings;
