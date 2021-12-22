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
    darkModeOn,
    darkModeStyling,
    lightModeStyling,
    BackgroundDarkColor,
    ChatScreen_Title,
    Navigator_BackButton,
    TestText
} from '../screens/screenStylings/styling.js';
import {useTheme} from "@react-navigation/native";
import { ImageBackground, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { ProfilePictureURIContext } from '../components/ProfilePictureURIContext.js';


const NotificationsSettingsScreen = ({navigation}) => {
    const {colors, dark} = useTheme();
    const {profilePictureUri, setProfilePictureUri} = useContext(ProfilePictureURIContext)
    return(
        <> 
            <StatusBar style={colors.StatusBarColor}/>   
            <BackgroundDarkColor style={{backgroundColor: colors.primary}}>
                <ChatScreen_Title style={{backgroundColor: colors.primary, borderWidth: 0}}>
                    <Navigator_BackButton onPress={() => {navigation.goBack()}}>
                        <Image
                        source={require('../assets/app_icons/back_arrow.png')}
                        style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                        resizeMode="contain"
                        resizeMethod="resize"
                        />
                    </Navigator_BackButton>
                    <TestText style={{textAlign: 'center', color: colors.tertiary}}>Notifications Settings</TestText>
                </ChatScreen_Title>
                <ScrollView>
                    <WelcomeContainer style={{backgroundColor: colors.primary, marginTop: -50}}>
                        <Avatar resizeMode="cover" source={{uri: profilePictureUri}} />
                        <Text style={{fontSize: 30, fontWeight: 'bold', color: colors.tertiary}}>Coming soon :0</Text>
                        <Text style={{fontSize: 100, fontWeight: 'bold', color: colors.tertiary}}>🚧</Text>
                        <Text style={{color: colors.tertiary, fontSize: 24, textAlign: 'center'}}>© SquareTable 2021</Text>
                        <Text style={{color: colors.tertiary, fontSize: 24, textAlign: 'center', marginBottom: 10}}>All Rights Reserved</Text>
                        <Text style={{color: colors.tertiary, fontSize: 18, textAlign: 'center', marginBottom: 10}}>Made by Sebastian Webster, Kovid Dev, and Jacob Bowden</Text>
                    </WelcomeContainer>
                </ScrollView>
            </BackgroundDarkColor>
        </>
    );
}

export default NotificationsSettingsScreen;
