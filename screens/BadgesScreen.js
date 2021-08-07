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
    PageTitle,
    BadgeGridLayout
} from '../screens/screenStylings/styling.js';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import { ImageBackground, ScrollView } from 'react-native';


const BadgesScreen = ({navigation}) => {
     //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {name, email, photoUrl} = storedCredentials;
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
            <PageTitle>Badges</PageTitle>
            <BadgeGridLayout>
                
            </BadgeGridLayout>
            </WelcomeContainer>
        </>
    );
}

export default BadgesScreen;
