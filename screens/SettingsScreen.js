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
    BackgroundDarkColor
} from '../screens/screenStylings/styling.js';
import {useTheme} from "@react-navigation/native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as Linking from 'expo-linking';
import SocialSquareLogo_B64_png from '../assets/SocialSquareLogo_Base64_png.js';


const SettingsPage = ({navigation}) => {
     //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    if (storedCredentials) {var {name, email, photoUrl} = storedCredentials}
    const [AvatarImg, setAvatarImage] = useState(SocialSquareLogo_B64_png)
    const [logoutViewState, setLogoutViewState] = useState("false")

    const clearLogin = () => {
        AsyncStorage.removeItem('socialSquareCredentials').then(() => {
            setStoredCredentials(null);
        })
        .catch(error => console.log(error));
        AsyncStorage.removeItem('SocialSquareDMsList');
        AsyncStorage.removeItem('PlayAudioInSilentMode_AppBehaviour_AsyncStorage');
        AsyncStorage.removeItem('UserProfilePicture')
        try {
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
            });
        } catch (e) {
            console.log(e + "Error with resetting navigation after logout from SettingsScreen.js");
        }
    }

    const changeLogoutView = () => {
        if (logoutViewState==true) {
            setLogoutViewState(false)
        }else{
            console.log("Closed Confirm")
            setLogoutViewState(true)
        }
    }

    const {colors} = useTheme();

    const seeAppIntroductionScreenAgainButtonOnPress = () => {
        AsyncStorage.removeItem('HasOpenedSocialSquare');
        alert('The next time you reload the app the introduction screen will show :)')
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
            console.log('Getting profile picture from server from SettingsScreen.js')
        } else {
            setAvatarImage(image)
            console.log('Getting profile picture from AsyncStorage from SettingsScreen.js')
        }
    }

    checkForUserProfilePictureFromAsyncStorage()

    return(
        <> 
            <StatusBar style={colors.StatusBarColor}/>   
            <BackgroundDarkColor style={{backgroundColor: colors.primary}}>
                <ScrollView>
                    <WelcomeContainer style={{backgroundColor: colors.primary}}>                
                    <ConfirmLogoutView style={{backgroundColor: colors.primary}} viewHidden={logoutViewState}>
                        <ConfirmLogoutText style={{color: colors.tertiary}}>Are you sure you want to logout?</ConfirmLogoutText>
                        <ConfirmLogoutButtons cancelButton={true} onPress={changeLogoutView}>
                            <ConfirmLogoutButtonText cancelButton={true}>Cancel</ConfirmLogoutButtonText>
                            </ConfirmLogoutButtons> 
                            <ConfirmLogoutButtons confirmButton={true} onPress={clearLogin}>
                                <ConfirmLogoutButtonText confirmButton>Confirm</ConfirmLogoutButtonText>
                            </ConfirmLogoutButtons> 
                    </ConfirmLogoutView>
                        <Avatar resizeMode="cover" source={{uri: AvatarImg}} />  
                        <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => {navigation.navigate('SecuritySettingsScreen')}}>
                            <Icon name="security" size={60} color='black'/>
                            <SettingsItemText style={{color: colors.tertiary}}>Security</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => {navigation.navigate('NotificationsSettingsScreen')}}>
                            <Icon name="alarm-light-outline" size={60} color='black'/>
                            <SettingsItemText style={{color: colors.tertiary}}>Notifications</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("AccountSettings")}>
                            <SettingsItemImage source={require('./../assets/app_icons/settings.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>Account Settings</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => navigation.navigate("AppStyling")}>
                            <SettingsItemImage source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/207-eye.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>App Styling</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPress={() => {navigation.navigate('ReportBugScreen')}}>
                            <SettingsItemImage source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/265-notification.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>Report bug</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <SettingsPageItemTouchableOpacity style={{borderColor: colors.borderColor}} onPressOut={changeLogoutView}>
                            <SettingsItemImage source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/277-exit.png')}/>
                            <SettingsItemText style={{color: colors.tertiary}}>Logout</SettingsItemText>
                        </SettingsPageItemTouchableOpacity>
                        <Text style={{color: colors.tertiary, fontSize: 24, textAlign: 'center'}}>© SquareTable 2021</Text>
                        <Text style={{color: colors.tertiary, fontSize: 24, textAlign: 'center', marginBottom: 10}}>All Rights Reserved</Text>
                        <Text style={{color: colors.tertiary, fontSize: 18, textAlign: 'center', marginBottom: 10}}>Made by Sebastian Webster, Kovid Dev, and Jacob Bowden</Text>
                        <TouchableOpacity style={{marginHorizontal: '20%', borderColor: colors.borderColor, borderWidth: 5, borderRadius: 20/2}} onPressOut={() => {Linking.openURL('https://github.com/SquareTable/social-media-platform')}}>
                            <View>
                                <Text style={{color: colors.tertiary, fontSize: 16, textAlign: 'center', padding: 7}}>Press here to visit the SocialSquare GitHub repo</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginHorizontal: '20%', borderColor: colors.borderColor, borderWidth: 5, borderRadius: 20/2, marginTop: 20}} onPress={seeAppIntroductionScreenAgainButtonOnPress}>
                            <View>
                                <Text style={{color: colors.tertiary, fontSize: 16, textAlign: 'center', padding: 7}}>See app introduction screen again</Text>
                            </View>
                        </TouchableOpacity>
                    </WelcomeContainer>
                </ScrollView>
            </BackgroundDarkColor>
        </>
    );
}

export default SettingsPage;
