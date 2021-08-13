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
import { ImageBackground, ScrollView, Text } from 'react-native';


import * as Haptics from 'expo-haptics';


const SettingsPage = ({navigation}) => {
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
            </WelcomeContainer>
        </>
    );
}

export default SettingsPage;
