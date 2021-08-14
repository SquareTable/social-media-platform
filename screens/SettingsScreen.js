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
    ConfirmLogoutButtonText
} from '../screens/screenStylings/styling.js';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import { ImageBackground, Linking, ScrollView, Text, View, TouchableOpacity } from 'react-native';


import * as Haptics from 'expo-haptics';
import {darkModeStyling, darkModeOn, lightModeStyling} from '../screens/screenStylings/styling.js';



const SettingsPage = ({navigation}) => {
    if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }

     //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {name, email, photoUrl} = storedCredentials;
    const AvatarImg = photoUrl ? {uri: photoUrl} : require('./../assets/img/Logo.png');
    const [logoutViewState, setLogoutViewState] = useState("false")

    const clearLogin = () => {
        AsyncStorage.removeItem('socialSquareCredentials').then(() => {
            setStoredCredentials("");
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
            });
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            setTimeout(() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); }, 60);
            setTimeout(() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); }, 120);
            setTimeout(() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); }, 180);
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
                <ConfirmLogoutView viewHidden={logoutViewState}>
                   <ConfirmLogoutText>Are you sure you want to logout?</ConfirmLogoutText>
                   <ConfirmLogoutButtons cancelButton={true} onPress={changeLogoutView}>
                       <ConfirmLogoutButtonText cancelButton={true}>Cancel</ConfirmLogoutButtonText>
                    </ConfirmLogoutButtons> 
                    <ConfirmLogoutButtons confirmButton={true} onPress={clearLogin}>
                        <ConfirmLogoutButtonText confirmButton>Confirm</ConfirmLogoutButtonText>
                    </ConfirmLogoutButtons> 
                </ConfirmLogoutView>
                <Avatar resizeMode="cover" source={AvatarImg} />
                <SettingsPageItemTouchableOpacity onPress={() => {alert("ACCOUNT SETTINGS PAGE IS SUS!")}}>
                    <SettingsItemImage source={require('./../assets/img/ThreeDots.png')}/>
                    <SettingsItemText>Account Settings</SettingsItemText>
                </SettingsPageItemTouchableOpacity>
                <SettingsPageItemTouchableOpacity onPress={() => {alert("Jacob is a sussy femboy.")}}>
                    <SettingsItemImage source={require('./../assets/img/ThreeDots.png')}/>
                    <SettingsItemText>Convert To Femboy</SettingsItemText>
                </SettingsPageItemTouchableOpacity>
                <SettingsPageItemTouchableOpacity onPressOut={changeLogoutView}>
                    <SettingsItemImage source={require('./../assets/img/ThreeDots.png')}/>
                    <SettingsItemText>Logout</SettingsItemText>
                </SettingsPageItemTouchableOpacity>
                <Text style={{...styling.textColor, fontSize: 24, textAlign: 'center'}}>© SquareTable 2021</Text>
                <Text style={{...styling.textColor, fontSize: 24, textAlign: 'center', marginBottom: 10}}>All Rights Reserved</Text>
                <Text style={{...styling.textColor, fontSize: 18, textAlign: 'center', marginBottom: 10}}>Made by Sebastian Webster, Kovid Dev, and Jacob Bowden</Text>
                <TouchableOpacity style={{marginHorizontal: '20%', ...styling.borderColor, borderWidth: 5, borderRadius: 20/2}} onPressOut={() => {Linking.openURL('https://github.com/SquareTable/social-media-platform')}}>
                    <View>
                        <Text style={{...styling.textColor, fontSize: 16, textAlign: 'center', padding: 7}}>Press here to visit the SocialSquare GitHub repo</Text>
                    </View>
                </TouchableOpacity>
            </WelcomeContainer>
        </>
    );
}

export default SettingsPage;
