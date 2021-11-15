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
    BackgroundDarkColor,
    ChatScreen_Title,
    Navigator_BackButton,
    TestText
} from '../screens/screenStylings/styling.js';
import {useTheme} from "@react-navigation/native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import * as Linking from 'expo-linking';
import SocialSquareLogo_B64_png from '../assets/SocialSquareLogo_Base64_png.js';


const SecuritySettingsScreen = ({navigation}) => {
     //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    if (storedCredentials) {var {name, email, photoUrl} = storedCredentials}
    const [AvatarImg, setAvatarImage] = useState(SocialSquareLogo_B64_png)
    const {colors, dark} = useTheme();

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
                    <TestText style={{textAlign: 'center', color: colors.tertiary}}>Security Settings</TestText>
                </ChatScreen_Title>
                <ScrollView>
                    <WelcomeContainer style={{backgroundColor: colors.primary, marginTop: -50}}>
                        <Avatar resizeMode="cover" source={{uri: AvatarImg}} />
                        <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("GDPRCompliance")}>
                            <SettingsItemImage source={require('./../assets/app_icons/settings.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>GDPR Compliance</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("LoginActivity")}>
                            <SettingsItemImage source={require('./../assets/app_icons/settings.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>Login Activity</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("2FA")}>
                            <SettingsItemImage source={require('./../assets/app_icons/settings.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>Two Factor Authentication</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <Text style={{color: colors.tertiary, fontSize: 24, textAlign: 'center'}}>© SquareTable 2021</Text>
                        <Text style={{color: colors.tertiary, fontSize: 24, textAlign: 'center', marginBottom: 10}}>All Rights Reserved</Text>
                        <Text style={{color: colors.tertiary, fontSize: 18, textAlign: 'center', marginBottom: 10}}>Made by Sebastian Webster, Kovid Dev, and Jacob Bowden</Text>
                    </WelcomeContainer>
                </ScrollView>
            </BackgroundDarkColor>
        </>
    );
}

export default SecuritySettingsScreen;
