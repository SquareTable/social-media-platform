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

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {Image, View, Text, TouchableOpacity} from 'react-native';


const HomeScreenSettings = ({navigation}) => {
    const {colors, dark} = useTheme();
    

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
                <TestText style={{textAlign: 'center', color: colors.tertiary}}>Home Screen Settings</TestText>
            </ChatScreen_Title>
            <WelcomeContainer style={{backgroundColor: colors.primary}}>                
                <View style={{marginTop: -40}}/>
                <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("Filter_HomeScreenSettings")}>
                    <SettingsItemImage style={{tintColor: colors.tertiary}} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/348-filter.png')}/>
                    <SettingsItemText style={{color: colors.tertiary}}>Filter</SettingsItemText>
                </SettingsPageItemTouchableOpacity>
                <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("Algorithm_HomeScreenSettings")}>
                    <SettingsItemImage style={{tintColor: colors.tertiary}} source={require('./../assets/app_icons/settings.png')}/>
                    <SettingsItemText style={{color: colors.tertiary}}>Algorithm</SettingsItemText>
                </SettingsPageItemTouchableOpacity>
                <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("Audio_HomeScreenSettings")}>
                    <FontAwesome name="music" size={60} color={colors.tertiary}/>
                    <SettingsItemText style={{color: colors.tertiary}}>Audio</SettingsItemText>
                </SettingsPageItemTouchableOpacity>
                <Text style={{color: colors.tertiary, fontSize: 24, textAlign: 'center'}}>© SquareTable 2022</Text>
                <Text style={{color: colors.tertiary, fontSize: 24, textAlign: 'center', marginBottom: 10}}>All Rights Reserved</Text>
                <Text style={{color: colors.tertiary, fontSize: 18, textAlign: 'center', marginBottom: 10}}>Made by Sebastian Webster, Kovid Dev, Didula Semasinghe, and Jacob Bowden</Text>
            </WelcomeContainer>
        </>
    );
}

export default HomeScreenSettings;
