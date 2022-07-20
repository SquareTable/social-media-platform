import React, {useContext, useState, useEffect} from 'react';
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
    TestText,
    TextLink,
    TextLinkContent,
    StyledButton,
    ButtonText
} from '../screens/screenStylings/styling.js';
import {useTheme} from "@react-navigation/native";
import { ImageBackground, ScrollView, Text, TouchableOpacity, View, Image, Switch, ActivityIndicator, Alert } from 'react-native';
import { ProfilePictureURIContext } from '../components/ProfilePictureURIContext.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../components/CredentialsContext';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';
import * as IntentLauncher from 'expo-intent-launcher';
import AppCredits from '../components/AppCredits.js';
import Constants from 'expo-constants';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ServerUrlContext } from '../components/ServerUrlContext.js';

var _ = require('lodash');


const NotificationsSettingsScreen = ({navigation}) => {
    const {colors, dark} = useTheme();
    const {profilePictureUri, setProfilePictureUri} = useContext(ProfilePictureURIContext)
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {serverUrl, setServerUrl} = useContext(ServerUrlContext);
    //

    const [notificationsSettingsObject, setNotificationsSettingsObject] = useState({})
    const [originalNotificationsSettingsObject, setOriginalNotificationsSettingsObject] = useState({})
    const changesHaveBeenMade = Object.keys(notificationsSettingsObject).length > 0 ? !_.isEqual(notificationsSettingsObject, originalNotificationsSettingsObject) : false

    const [temp, setTemp] = useState('abc')

    const [showSettings, setShowSettings] = useState(false)
    const [notificationsAllowed, setNotificationsAllowed] = useState(false)
    const [notificationsAllowedObject, setNotificationsAllowedObject] = useState({})
    const [errorOccuredDownloadingNotificationSettings, setErrorOccuredDownloadingNotificationSettings] = useState(false)

    const {_id, privateAccount} = storedCredentials;

    const [savingChanges, setSavingChanges] = useState(false)
    
    const marginVerticalOnSwitches = 4.9
    const fontSizeForText = 15

    const StatusBarHeight = Constants.statusBarHeight;

    const loadNotificationSettings = () => {
        setErrorOccuredDownloadingNotificationSettings(false)
        const url = serverUrl + `/tempRoute/getUserNotificationSettings/${_id}`
        axios.get(url).then(response => {
            const result = response.data
            const {status, message, data} = result;

            if (status !== "SUCCESS") {
                setErrorOccuredDownloadingNotificationSettings(String(message))
            } else {
                console.log(data);
                setNotificationsSettingsObject(_.cloneDeep(data))
                setOriginalNotificationsSettingsObject(_.cloneDeep(data))
                setShowSettings(true)
            }
        }).catch(error => {
            setErrorOccuredDownloadingNotificationSettings(String(error))
        })
    }

    const saveNotificationsSettings = () => {
        setSavingChanges(true)
        const url = serverUrl + '/tempRoute/uploadNotificationsSettings';
        const toSend = {notificationSettings: notificationsSettingsObject, userID: _id}
        axios.post(url, toSend).then(response => {
            const result = response.data
            const {status, message} = result;
            if (status !== "SUCCESS") {
                alert('An error occured: ' + String(message))
                setSavingChanges(false)
            } else {
                setSavingChanges(false)
                navigation.goBack()
            }
        }).catch(error => {
            alert('An error occured: ' + String(error))
            setSavingChanges(false)
        })
    }

    const setContextAndAsyncStorage = (type) => {
        type == 'TextMessages' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.TextMessages = !notificationsSettingsObject.TextMessages
            return notificationsSettingsObject
        })
        : type == 'GainsFollower' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.GainsFollower = !notificationsSettingsObject.GainsFollower
            return notificationsSettingsObject
        })
        : type == 'FollowRequests' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.FollowRequests = !notificationsSettingsObject.FollowRequests
            return notificationsSettingsObject
        })
        : type == 'UpvotesOnMultimediaPosts' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.UpvotesOnMultimediaPosts = !notificationsSettingsObject.UpvotesOnMultimediaPosts
            return notificationsSettingsObject
        })
        : type == 'NeutralVotesOnMultimediaPosts' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.NeutralVotesOnMultimediaPosts = !notificationsSettingsObject.NeutralVotesOnMultimediaPosts
            return notificationsSettingsObject
        })
        : type == 'DownvotesOnMultimediaPosts' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.DownvotesOnMultimediaPosts = !notificationsSettingsObject.DownvotesOnMultimediaPosts
            return notificationsSettingsObject
        })
        : type == 'UpvotesOnVideos' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.UpvotesOnVideos = !notificationsSettingsObject.UpvotesOnVideos
            return notificationsSettingsObject
        })
        : type == 'NeutralVotesOnVideos' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.NeutralVotesOnVideos = !notificationsSettingsObject.NeutralVotesOnVideos
            return notificationsSettingsObject
        })
        : type == 'DownvotesOnVideos' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.DownvotesOnVideos = !notificationsSettingsObject.DownvotesOnVideos
            return notificationsSettingsObject
        })
        : type == 'UpvotesOnPolls' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.UpvotesOnPolls = !notificationsSettingsObject.UpvotesOnPolls
            return notificationsSettingsObject
        })
        : type == 'NeutralVotesOnPolls' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.NeutralVotesOnPolls = !notificationsSettingsObject.NeutralVotesOnPolls
            return notificationsSettingsObject
        })
        : type == 'DownvotesOnPolls' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.DownvotesOnPolls = !notificationsSettingsObject.DownvotesOnPolls
            return notificationsSettingsObject
        })
        : type == 'UpvotesOnThreads' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.UpvotesOnThreads = !notificationsSettingsObject.UpvotesOnThreads
            return notificationsSettingsObject
        })
        : type == 'NeutralVotesOnThreads' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.NeutralVotesOnThreads = !notificationsSettingsObject.NeutralVotesOnThreads
            return notificationsSettingsObject
        })
        : type == 'DownvotesOnThreads' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.DownvotesOnThreads = !notificationsSettingsObject.DownvotesOnThreads
            return notificationsSettingsObject
        })
        : type == 'PersonJoiningCategory' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.PersonJoiningCategory = !notificationsSettingsObject.PersonJoiningCategory
            return notificationsSettingsObject
        })
        : type == 'SendTextMessages' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.SendTextMessages = !notificationsSettingsObject.SendTextMessages
            return notificationsSettingsObject
        })
        : type == 'SendGainsFollower' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.SendGainsFollower = !notificationsSettingsObject.SendGainsFollower
            return notificationsSettingsObject
        })
        : type == 'SendFollowRequests' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.SendFollowRequests = !notificationsSettingsObject.SendFollowRequests
            return notificationsSettingsObject
        })
        : type == 'SendUpvotesOnMultimediaPosts' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.SendUpvotesOnMultimediaPosts = !notificationsSettingsObject.SendUpvotesOnMultimediaPosts
            return notificationsSettingsObject
        })
        : type == 'SendNeutralVotesOnMultimediaPosts' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.SendNeutralVotesOnMultimediaPosts = !notificationsSettingsObject.SendNeutralVotesOnMultimediaPosts
            return notificationsSettingsObject
        })
        : type == 'SendDownvotesOnMultimediaPosts' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.SendDownvotesOnMultimediaPosts = !notificationsSettingsObject.SendDownvotesOnMultimediaPosts
            return notificationsSettingsObject
        })
        : type == 'SendUpvotesOnVideos' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.SendUpvotesOnVideos = !notificationsSettingsObject.SendUpvotesOnVideos
            return notificationsSettingsObject
        })
        : type == 'SendNeutralVotesOnVideos' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.SendNeutralVotesOnVideos = !notificationsSettingsObject.SendNeutralVotesOnVideos
            return notificationsSettingsObject
        })
        : type == 'SendDownvotesOnVideos' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.SendDownvotesOnVideos = !notificationsSettingsObject.SendDownvotesOnVideos
            return notificationsSettingsObject
        })
        : type == 'SendUpvotesOnPolls' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.SendUpvotesOnPolls = !notificationsSettingsObject.SendUpvotesOnPolls
            return notificationsSettingsObject
        })
        : type == 'SendNeutralVotesOnPolls' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.SendNeutralVotesOnPolls = !notificationsSettingsObject.SendNeutralVotesOnPolls
            return notificationsSettingsObject
        })
        : type == 'SendDownvotesOnPolls' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.SendDownvotesOnPolls = !notificationsSettingsObject.SendDownvotesOnPolls
            return notificationsSettingsObject
        })
        : type == 'SendUpvotesOnThreads' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.SendUpvotesOnThreads = !notificationsSettingsObject.SendUpvotesOnThreads
            return notificationsSettingsObject
        })
        : type == 'SendNeutralVotesOnThreads' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.SendNeutralVotesOnThreads = !notificationsSettingsObject.SendNeutralVotesOnThreads
            return notificationsSettingsObject
        })
        : type == 'SendDownvotesOnThreads' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.SendDownvotesOnThreads = !notificationsSettingsObject.SendDownvotesOnThreads
            return notificationsSettingsObject
        })
        : type == 'SendJoiningCategory' ? setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.SendJoiningCategory = !notificationsSettingsObject.SendJoiningCategory
            return notificationsSettingsObject
        })
        : console.error('Wrong type has been passed to setContextAndAsyncStorage function in NotificationSettings')
        setTemp(temp => temp === 'abc' ? 'cba' : 'abc')
    }

    const turnOnAllReceiveNotifications = async () => {
        setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.TextMessages = true
            notificationsSettingsObject.GainsFollower = true
            notificationsSettingsObject.FollowRequests = true
            notificationsSettingsObject.UpvotesOnMultimediaPosts = true
            notificationsSettingsObject.NeutralVotesOnMultimediaPosts = true
            notificationsSettingsObject.DownvotesOnMultimediaPosts = true
            notificationsSettingsObject.UpvotesOnVideos = true
            notificationsSettingsObject.NeutralVotesOnVideos = true
            notificationsSettingsObject.DownvotesOnVideos = true
            notificationsSettingsObject.UpvotesOnPolls = true
            notificationsSettingsObject.NeutralVotesOnPolls = true
            notificationsSettingsObject.DownvotesOnPolls = true
            notificationsSettingsObject.UpvotesOnThreads = true
            notificationsSettingsObject.NeutralVotesOnThreads = true
            notificationsSettingsObject.DownvotesOnThreads = true
            notificationsSettingsObject.PersonJoiningCategory = true
            return notificationsSettingsObject
        })
        setTemp(temp => temp === 'abc' ? 'cba' : 'abc')
    }

    const turnOffAllReceiveNotifications = async () => {
        setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.TextMessages = false
            notificationsSettingsObject.GainsFollower = false
            notificationsSettingsObject.FollowRequests = false
            notificationsSettingsObject.UpvotesOnMultimediaPosts = false
            notificationsSettingsObject.NeutralVotesOnMultimediaPosts = false
            notificationsSettingsObject.DownvotesOnMultimediaPosts = false
            notificationsSettingsObject.UpvotesOnVideos = false
            notificationsSettingsObject.NeutralVotesOnVideos = false
            notificationsSettingsObject.DownvotesOnVideos = false
            notificationsSettingsObject.UpvotesOnPolls = false
            notificationsSettingsObject.NeutralVotesOnPolls = false
            notificationsSettingsObject.DownvotesOnPolls = false
            notificationsSettingsObject.UpvotesOnThreads = false
            notificationsSettingsObject.NeutralVotesOnThreads = false
            notificationsSettingsObject.DownvotesOnThreads = false
            notificationsSettingsObject.PersonJoiningCategory = false
            return notificationsSettingsObject
        })
        setTemp(temp => temp === 'abc' ? 'cba' : 'abc')
    }

    const turnOnAllSendNotifications = async () => {
        setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.SendTextMessages = true
            notificationsSettingsObject.SendGainsFollower = true
            notificationsSettingsObject.SendFollowRequests = true
            notificationsSettingsObject.SendUpvotesOnMultimediaPosts = true
            notificationsSettingsObject.SendNeutralVotesOnMultimediaPosts = true
            notificationsSettingsObject.SendDownvotesOnMultimediaPosts = true
            notificationsSettingsObject.SendUpvotesOnVideos = true
            notificationsSettingsObject.SendNeutralVotesOnVideos = true
            notificationsSettingsObject.SendDownvotesOnVideos = true
            notificationsSettingsObject.SendUpvotesOnPolls = true
            notificationsSettingsObject.SendNeutralVotesOnPolls = true
            notificationsSettingsObject.SendDownvotesOnPolls = true
            notificationsSettingsObject.SendUpvotesOnThreads = true
            notificationsSettingsObject.SendNeutralVotesOnThreads = true
            notificationsSettingsObject.SendDownvotesOnThreads = true
            notificationsSettingsObject.SendJoiningCategory = true
            return notificationsSettingsObject
        })
        setTemp(temp => temp === 'abc' ? 'cba' : 'abc')
    }

    const turnOffAllSendNotifications = async () => {
        setNotificationsSettingsObject(notificationsSettingsObject => {
            notificationsSettingsObject.SendTextMessages = false
            notificationsSettingsObject.SendGainsFollower = false
            notificationsSettingsObject.SendFollowRequests = false
            notificationsSettingsObject.SendUpvotesOnMultimediaPosts = false
            notificationsSettingsObject.SendNeutralVotesOnMultimediaPosts = false
            notificationsSettingsObject.SendDownvotesOnMultimediaPosts = false
            notificationsSettingsObject.SendUpvotesOnVideos = false
            notificationsSettingsObject.SendNeutralVotesOnVideos = false
            notificationsSettingsObject.SendDownvotesOnVideos = false
            notificationsSettingsObject.SendUpvotesOnPolls = false
            notificationsSettingsObject.SendNeutralVotesOnPolls = false
            notificationsSettingsObject.SendDownvotesOnPolls = false
            notificationsSettingsObject.SendUpvotesOnThreads = false
            notificationsSettingsObject.SendNeutralVotesOnThreads = false
            notificationsSettingsObject.SendDownvotesOnThreads = false
            notificationsSettingsObject.SendJoiningCategory = false
            return notificationsSettingsObject
        })
        setTemp(temp => temp === 'abc' ? 'cba' : 'abc')
    }

    useEffect(() => {
        async function getNotificationsSettings() {
            async function allowsNotificationsAsync() {
                const settings = await Notifications.getPermissionsAsync();
                console.log(settings)
                setNotificationsAllowedObject(settings)
                return (
                  settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
                );
            }
            const allowsNotifications = await allowsNotificationsAsync();
            console.log(allowsNotifications)
            setNotificationsAllowed(allowsNotifications);
            if (allowsNotifications) {
                loadNotificationSettings()
            }
        }
        if (storedCredentials) {
            getNotificationsSettings()
        }
    }, [])

    const enableNotifications = async () => {
        if (notificationsAllowedObject.status == 'denied') {
            navigation.goBack()
            if (Platform.OS === 'ios') {
                Linking.openURL('app-settings:')
            } else if (Platform.OS === 'android') {
                import ('expo-intent-launcher').then(IntentLauncher => {
                    IntentLauncher.startActivityAsync(
                        IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
                        { data: 'package:' + pkg },
                    )
                })
            } else if (Platform.OS == 'web') {
                window.open('app-settings:'/*, '_system'*/)
            } else {
                alert('Platform not supported yet.')
            }
        } else {
            const status = await Notifications.requestPermissionsAsync({
                ios: {
                  allowAlert: true,
                  allowBadge: true,
                  allowSound: true,
                  allowAnnouncements: true,
                },
            });
            console.log(status)
            setNotificationsAllowed(status.granted)
            setNotificationsAllowedObject(status)
        }
    }

    return(
        <> 
            <StatusBar style={colors.StatusBarColor}/>
            {storedCredentials ? 
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
                        {savingChanges ?
                            <ActivityIndicator size="small" color={colors.brand} style={{position: 'absolute', top: StatusBarHeight + 12, right: 20}}/>
                        :
                            <TouchableOpacity disabled={!changesHaveBeenMade} style={{position: 'absolute', top: StatusBarHeight + 10, right: 10}} onPress={saveNotificationsSettings}>
                                <Text style={{color: colors.brand, fontSize: 20, fontWeight: 'bold', opacity: changesHaveBeenMade ? 1 : 0.5}}>Save</Text>
                            </TouchableOpacity>
                        }
                    </ChatScreen_Title>
                    {showSettings == true ?
                        <WelcomeContainer style={{backgroundColor: colors.primary, width: '100%', height: '100%'}}>
                            {notificationsAllowed == true ?
                                <ScrollView style={{marginTop: -50, width: '100%', height: '100%', marginBottom: -25}}>
                                    <Avatar resizeMode="cover" source={{uri: profilePictureUri}} />
                                    <TestText style={{textAlign: 'center', color: colors.tertiary}}>Receive notifications</TestText>
                                    <View style={{alignSelf: 'center', alignItems: 'center', alignContent: 'center'}}>
                                        <View style={{flexDirection: 'row', alignContent: 'center'}}>
                                            <TextLink onPress={turnOnAllReceiveNotifications}>
                                                <TextLinkContent style={{color: colors.brand, fontSize: 22}}>Turn On All</TextLinkContent>
                                            </TextLink>
                                            <TextLink style={{marginLeft: 50}} onPress={turnOffAllReceiveNotifications}>
                                                <TextLinkContent style={{color: colors.brand, fontSize: 22}}>Turn Off All</TextLinkContent>
                                            </TextLink>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Text Messages</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.TextMessages ? dark ? colors.tertiary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('TextMessages')}}
                                            value={notificationsSettingsObject.TextMessages}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Someone follows you</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.GainsFollower ? dark ? colors.tertiary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('GainsFollower')}}
                                            value={notificationsSettingsObject.GainsFollower}
                                        />
                                    </View>
                                    {privateAccount ?
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Someone requests to follow you</Text>
                                            <Switch
                                                trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                                thumbColor={notificationsSettingsObject.FollowRequests ? dark ? colors.tertiary : colors.primary : colors.teritary}
                                                ios_backgroundColor={colors.borderColor}
                                                onValueChange={() => {setContextAndAsyncStorage('FollowRequests')}}
                                                value={notificationsSettingsObject.FollowRequests}
                                            />
                                        </View>
                                    : null}
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on multimedia posts</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.UpvotesOnMultimediaPosts ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('UpvotesOnMultimediaPosts')}}
                                            value={notificationsSettingsObject.UpvotesOnMultimediaPosts}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on multimedia posts</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.NeutralVotesOnMultimediaPosts ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('NeutralVotesOnMultimediaPosts')}}
                                            value={notificationsSettingsObject.NeutralVotesOnMultimediaPosts}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on multimedia posts</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.DownvotesOnMultimediaPosts ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('DownvotesOnMultimediaPosts')}}
                                            value={notificationsSettingsObject.DownvotesOnMultimediaPosts}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on videos</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.UpvotesOnVideos ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('UpvotesOnVideos')}}
                                            value={notificationsSettingsObject.UpvotesOnVideos}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on videos</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.NeutralVotesOnVideos ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('NeutralVotesOnVideos')}}
                                            value={notificationsSettingsObject.NeutralVotesOnVideos}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on videos</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.DownvotesOnVideos ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('DownvotesOnVideos')}}
                                            value={notificationsSettingsObject.DownvotesOnVideos}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on polls</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.UpvotesOnPolls ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('UpvotesOnPolls')}}
                                            value={notificationsSettingsObject.UpvotesOnPolls}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on polls</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.NeutralVotesOnPolls ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('NeutralVotesOnPolls')}}
                                            value={notificationsSettingsObject.NeutralVotesOnPolls}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on polls</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.DownvotesOnPolls ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('DownvotesOnPolls')}}
                                            value={notificationsSettingsObject.DownvotesOnPolls}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on threads</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.UpvotesOnThreads ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('UpvotesOnThreads')}}
                                            value={notificationsSettingsObject.UpvotesOnThreads}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on threads</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.NeutralVotesOnThreads ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('NeutralVotesOnThreads')}}
                                            value={notificationsSettingsObject.NeutralVotesOnThreads}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on threads</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.DownvotesOnThreads ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('DownvotesOnThreads')}}
                                            value={notificationsSettingsObject.DownvotesOnThreads}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Person joining a category you own</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.PersonJoiningCategory ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('PersonJoiningCategory')}}
                                            value={notificationsSettingsObject.PersonJoiningCategory}
                                        />
                                    </View>
                                    <TestText style={{textAlign: 'center', color: colors.tertiary}}>Send notifications</TestText>
                                    <View style={{alignSelf: 'center', alignItems: 'center', alignContent: 'center'}}>
                                        <View style={{flexDirection: 'row'}}>
                                            <TextLink onPress={turnOnAllSendNotifications}>
                                                <TextLinkContent style={{color: colors.brand, fontSize: 22}}>Turn On All</TextLinkContent>
                                            </TextLink>
                                            <TextLink style={{marginLeft: 50}} onPress={turnOffAllSendNotifications}>
                                                <TextLinkContent style={{color: colors.brand, fontSize: 22}}>Turn Off All</TextLinkContent>
                                            </TextLink>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Text Messages</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.SendTextMessages ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('SendTextMessages')}}
                                            value={notificationsSettingsObject.SendTextMessages}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Following someone's account</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.SendGainsFollower ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('SendGainsFollower')}}
                                            value={notificationsSettingsObject.SendGainsFollower}
                                        />
                                    </View>
                                    {privateAccount ?
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                            <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Requesting to follow someone's account</Text>
                                            <Switch
                                                trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                                thumbColor={notificationsSettingsObject.SendFollowRequests ? dark ? colors.teritary : colors.primary : colors.teritary}
                                                ios_backgroundColor={colors.borderColor}
                                                onValueChange={() => {setContextAndAsyncStorage('SendFollowRequests')}}
                                                value={notificationsSettingsObject.SendFollowRequests}
                                            />
                                        </View>
                                    : null}
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on multimedia posts</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.SendUpvotesOnMultimediaPosts ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('SendUpvotesOnMultimediaPosts')}}
                                            value={notificationsSettingsObject.SendUpvotesOnMultimediaPosts}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on multimedia posts</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.SendNeutralVotesOnMultimediaPosts ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('SendNeutralVotesOnMultimediaPosts')}}
                                            value={notificationsSettingsObject.SendNeutralVotesOnMultimediaPosts}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on multimedia posts</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.SendDownvotesOnMultimediaPosts ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('SendDownvotesOnMultimediaPosts')}}
                                            value={notificationsSettingsObject.SendDownvotesOnMultimediaPosts}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on videos</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.SendUpvotesOnVideos ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('SendUpvotesOnVideos')}}
                                            value={notificationsSettingsObject.SendUpvotesOnVideos}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on videos</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.SendNeutralVotesOnVideos ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('SendNeutralVotesOnVideos')}}
                                            value={notificationsSettingsObject.SendNeutralVotesOnVideos}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on videos</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.SendDownvotesOnVideos ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('SendDownvotesOnVideos')}}
                                            value={notificationsSettingsObject.SendDownvotesOnVideos}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on polls</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.SendUpvotesOnPolls ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('SendUpvotesOnPolls')}}
                                            value={notificationsSettingsObject.SendUpvotesOnPolls}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on polls</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.SendNeutralVotesOnPolls ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('SendNeutralVotesOnPolls')}}
                                            value={notificationsSettingsObject.SendNeutralVotesOnPolls}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on polls</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.SendDownvotesOnPolls ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('SendDownvotesOnPolls')}}
                                            value={notificationsSettingsObject.SendDownvotesOnPolls}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on threads</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.SendUpvotesOnThreads ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('SendUpvotesOnThreads')}}
                                            value={notificationsSettingsObject.SendUpvotesOnThreads}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on threads</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.SendNeutralVotesOnThreads ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('SendNeutralVotesOnThreads')}}
                                            value={notificationsSettingsObject.SendNeutralVotesOnThreads}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on threads</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.SendDownvotesOnThreads ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('SendDownvotesOnThreads')}}
                                            value={notificationsSettingsObject.SendDownvotesOnThreads}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
                                        <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>You joining a category</Text>
                                        <Switch
                                            trackColor={{false: colors.borderColor, true: colors.darkestBlue}}
                                            thumbColor={notificationsSettingsObject.SendJoiningCategory ? dark ? colors.teritary : colors.primary : colors.teritary}
                                            ios_backgroundColor={colors.borderColor}
                                            onValueChange={() => {setContextAndAsyncStorage('SendJoiningCategory')}}
                                            value={notificationsSettingsObject.SendJoiningCategory}
                                        />
                                    </View>
                                    <AppCredits/>
                                </ScrollView>
                            :
                                <>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.tertiary, textAlign: 'center', marginHorizontal: 10}}>{notificationsAllowedObject.status == 'undetermined' ? 'Notifications have not been enabled for SocialSquare yet.' : notificationsAllowedObject.status == 'denied' ? 'Push notifications for SocialSquare has been disabled in system settings.' : ('SocialSquare notification status is ' + notificationsAllowed + ' and an error has occured.')}</Text>
                                        <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.tertiary, textAlign: 'center', marginVertical: 20, marginHorizontal: 10}}>{notificationsAllowedObject.status != 'denied' ? 'Please enable notifications for SocialSquare to use this feature.' : 'Please go into your device settings and enable notifications for SocialSquare to use this feature.'}</Text>
                                        <View style={{flexDirection: 'row'}}>
                                            {notificationsAllowedObject.status != 'denied' ?
                                                <StyledButton onPress={enableNotifications}>
                                                    <ButtonText>Enable notifications</ButtonText>
                                                </StyledButton>
                                            :
                                                <StyledButton onPress={enableNotifications}>
                                                    <ButtonText>Go to settings</ButtonText>
                                                </StyledButton>
                                            }
                                        </View>
                                    </View>
                                </>
                            }
                        </WelcomeContainer>
                    : errorOccuredDownloadingNotificationSettings ?
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
                            <Text style={{color: colors.errorColor, fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>An error occured:</Text>
                            <Text style={{color: colors.errorColor, fontSize: 20, textAlign: 'center', marginVertical: 20}}>{errorOccuredDownloadingNotificationSettings}</Text>
                            <TouchableOpacity onPress={loadNotificationSettings}>
                                <Ionicons name="reload" size={50} color={colors.errorColor} />
                            </TouchableOpacity>
                        </View>
                    :
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size="large" color={colors.brand} />
                        </View>
                    }
                </BackgroundDarkColor>
            :
                <>
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
                    <View style={{flex: 1, justifyContent: 'center', marginHorizontal: '2%'}}>
                        <Text style={{color: colors.tertiary, fontSize: 20, textAlign: 'center', marginBottom: 20}}>Please login to change notifications settings</Text>
                        <StyledButton onPress={() => {navigation.navigate('ModalLoginScreen', {modal: true})}}>
                            <ButtonText> Login </ButtonText>
                        </StyledButton>
                        <StyledButton style={{backgroundColor: colors.primary, color: colors.tertiary}} signUpButton={true} onPress={() => navigation.navigate('ModalSignupScreen', {modal: true, Modal_NoCredentials: true})}>
                                <ButtonText signUpButton={true} style={{color: colors.tertiary, top: -9.5}}> Signup </ButtonText>
                        </StyledButton>
                    </View>
                </>
            }   
        </>
    );
}

export default NotificationsSettingsScreen;