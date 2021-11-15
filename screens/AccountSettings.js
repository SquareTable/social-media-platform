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
import SocialSquareLogo_B64_png from '../assets/SocialSquareLogo_Base64_png.js';


const AccountSettings = ({navigation}) => {
    const {colors, dark} = useTheme();
     //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {name, displayName, email, photoUrl} = storedCredentials;
    const [AvatarImg, setAvatarImage] = useState(SocialSquareLogo_B64_png)
    const [logoutViewState, setLogoutViewState] = useState("false")

    const clearLogin = () => {
        AsyncStorage.removeItem('socialSquareCredentials').then(() => {
            setStoredCredentials("");
        })
        .catch(error => console.log(error))
    }

    const getProfilePicture = () => {
        const url = `https://nameless-dawn-41038.herokuapp.com/user/getProfilePic/${name}`;

        axios.get(url).then((response) => {
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCCESS') {
                handleMessage(message, status);
                console.log(status)
                console.log(message)
            } else {
                console.log(status)
                console.log(message)
                axios.get(`https://nameless-dawn-41038.herokuapp.com/getImage/${data}`)
                .then((response) => {
                    const result = response.data;
                    const {message, status, data} = result;
                    console.log(status)
                    console.log(message)
                    console.log(data)
                    //set image
                    if (message == 'No profile image.' && status == 'FAILED') {
                        console.log('Setting logo to SocialSquare logo')
                        setAvatarImage(SocialSquareLogo_B64_png)
                    } else if (data) {
                        //convert back to image
                        console.log('Setting logo to profile logo')
                        var base64Icon = `data:image/jpg;base64,${data}`
                        setAvatarImage(base64Icon)
                        AsyncStorage.setItem('UserProfilePicture', base64Icon)
                    } else {
                        console.log('Setting logo to SocialSquare logo')
                        setAvatarImage(SocialSquareLogo_B64_png)
                    }
                })
                .catch(function (error) {
                    console.log("Image not recieved")
                    console.log(error);
                });
            }
            //setSubmitting(false);

        }).catch(error => {
            console.log(error);
            //setSubmitting(false);
            handleMessage("An error occured. Try checking your network connection and retry.");
        })
    }

    const checkForUserProfilePictureFromAsyncStorage = async () => {
        const image = await AsyncStorage.getItem('UserProfilePicture')
        if (image == null) {
            getProfilePicture()
            console.log('Getting profile picture from server from SecuritySettingsScreen.js')
        } else {
            setAvatarImage(image)
            console.log('Getting profile picture from AsyncStorage from SecuritySettingsScreen.js')
        }
    }

    checkForUserProfilePictureFromAsyncStorage()
    

    return(
        <> 
            <StatusBar style={colors.StatusBarColor}/>   
            <WelcomeContainer style={{backgroundColor: colors.primary}}>                
                <Avatar resizeMode="cover" source={{uri: AvatarImg}} />
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
