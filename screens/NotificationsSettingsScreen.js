import React, {useContext, useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import SwitchToggle from "react-native-switch-toggle";

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
import { ImageBackground, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { ProfilePictureURIContext } from '../components/ProfilePictureURIContext.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../components/CredentialsContext';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';
import * as IntentLauncher from 'expo-intent-launcher';
import AppCredits from '../components/AppCredits.js';


const NotificationsSettingsScreen = ({navigation}) => {
    const {colors, dark} = useTheme();
    const {profilePictureUri, setProfilePictureUri} = useContext(ProfilePictureURIContext)
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    // Receive notifications
    const [textMessages, setTextMessages] = useState(true)
    const [upvotesOnPosts, setUpvotesOnPosts] = useState(true)
    const [neutralVotesOnPosts, setNeutralVotesOnPosts] = useState(true)
    const [downvotesOnPosts, setDownvotesOnPosts] = useState(true)
    const [upvotesOnVideos, setUpvotesOnVideos] = useState(true)
    const [neutralVotesOnVideos, setNeutralVotesOnVideos] = useState(true)
    const [downvotesOnVideos, setDownvotesOnVideos] = useState(true)
    const [upvotesOnPolls, setUpvotesOnPolls] = useState(true)
    const [neutralVotesOnPolls, setNeutralVotesOnPolls] = useState(true)
    const [downvotesOnPolls, setDownvotesOnPolls] = useState(true)
    const [upvotesOnThreads, setUpvotesOnThreads] = useState(true)
    const [neutralVotesOnThreads, setNeutralVotesOnThreads] = useState(true)
    const [downvotesOnThreads, setDownvotesOnThreads] = useState(true)
    const [personJoiningCategory, setPersonJoiningCategory] = useState(true)
    // Send notifications
    const [sendTextMessages, setSendTextMessages] = useState(true)
    const [sendUpvotesOnPosts, setSendUpvotesOnPosts] = useState(true)
    const [sendNeutralVotesOnPosts, setSendNeutralVotesOnPosts] = useState(true)
    const [sendDownvotesOnPosts, setSendDownvotesOnPosts] = useState(true)
    const [sendUpvotesOnVideos, setSendUpvotesOnVideos] = useState(true)
    const [sendNeutralVotesOnVideos, setSendNeutralVotesOnVideos] = useState(true)
    const [sendDownvotesOnVideos, setSendDownvotesOnVideos] = useState(true)
    const [sendUpvotesOnPolls, setSendUpvotesOnPolls] = useState(true)
    const [sendNeutralVotesOnPolls, setSendNeutralVotesOnPolls] = useState(true)
    const [sendDownvotesOnPolls, setSendDownvotesOnPolls] = useState(true)
    const [sendUpvotesOnThreads, setSendUpvotesOnThreads] = useState(true)
    const [sendNeutralVotesOnThreads, setSendNeutralVotesOnThreads] = useState(true)
    const [sendDownvotesOnThreads, setSendDownvotesOnThreads] = useState(true)
    const [sendJoiningCategory, setSendJoiningCategory] = useState(true)
    //
    const [showSettings, setShowSettings] = useState(false)
    const [notificationsAllowed, setNotificationsAllowed] = useState(false)
    const [notificationsAllowedObject, setNotificationsAllowedObject] = useState({})
    
    const marginVerticalOnSwitches = 4.9
    const fontSizeForText = 15

    const setContextAndAsyncStorage = (type) => {
        type == 'TextMessages' ? setTextMessages(textMessages => !textMessages)
        : type == 'UpvotesOnPosts' ? setUpvotesOnPosts(upvotesOnPolls => !upvotesOnPolls)
        : type == 'NeutralVotesOnPosts' ? setNeutralVotesOnPosts(neutralVotesOnPosts => !neutralVotesOnPosts)
        : type == 'DownvotesOnPosts' ? setDownvotesOnPosts(downvotesOnPosts => !downvotesOnPosts)
        : type == 'UpvotesOnVideos' ? setUpvotesOnVideos(upvotesOnVideos => !upvotesOnVideos)
        : type == 'NeutralVotesOnVideos' ? setNeutralVotesOnVideos(neutralVotesOnVideos => !neutralVotesOnVideos)
        : type == 'DownvotesOnVideos' ? setDownvotesOnVideos(downvotesOnVideos => !downvotesOnVideos)
        : type == 'UpvotesOnPolls' ? setUpvotesOnPolls(upvotesOnPolls => !upvotesOnPolls)
        : type == 'NeutralVotesOnPolls' ? setNeutralVotesOnPolls(neutralVotesOnPolls => !neutralVotesOnPolls)
        : type == 'DownvotesOnPolls' ? setDownvotesOnPolls(downvotesOnPolls => !downvotesOnPolls)
        : type == 'UpvotesOnThreads' ? setUpvotesOnThreads(upvotesOnThreads => !upvotesOnThreads)
        : type == 'NeutralVotesOnThreads' ? setNeutralVotesOnThreads(neutralVotesOnThreads => !neutralVotesOnThreads)
        : type == 'DownvotesOnThreads' ? setDownvotesOnThreads(downvotesOnThreads => !downvotesOnThreads)
        : type == 'PersonJoiningCategory' ? setPersonJoiningCategory(personJoiningCategory => !personJoiningCategory)
        : type == 'SendTextMessages' ? setSendTextMessages(sendTextMessages => !sendTextMessages)
        : type == 'SendUpvotesOnPosts' ? setSendUpvotesOnPosts(sendUpvotesOnPolls => !sendUpvotesOnPolls)
        : type == 'SendNeutralVotesOnPosts' ? setSendNeutralVotesOnPosts(sendNeutralVotesOnPosts => !sendNeutralVotesOnPosts)
        : type == 'SendDownvotesOnPosts' ? setSendDownvotesOnPosts(sendDownvotesOnPosts => !sendDownvotesOnPosts)
        : type == 'SendUpvotesOnVideos' ? setSendUpvotesOnVideos(sendUpvotesOnVideos => !sendUpvotesOnVideos)
        : type == 'SendNeutralVotesOnVideos' ? setSendNeutralVotesOnVideos(sendNeutralVotesOnVideos => !sendNeutralVotesOnVideos)
        : type == 'SendDownvotesOnVideos' ? setSendDownvotesOnVideos(sendDownvotesOnVideos => !sendDownvotesOnVideos)
        : type == 'SendUpvotesOnPolls' ? setSendUpvotesOnPolls(sendUpvotesOnPolls => !sendUpvotesOnPolls)
        : type == 'SendNeutralVotesOnPolls' ? setSendNeutralVotesOnPolls(sendNeutralVotesOnPolls => !sendNeutralVotesOnPolls)
        : type == 'SendDownvotesOnPolls' ? setSendDownvotesOnPolls(sendDownvotesOnPolls => !sendDownvotesOnPolls)
        : type == 'SendUpvotesOnThreads' ? setSendUpvotesOnThreads(sendUpvotesOnThreads => !sendUpvotesOnThreads)
        : type == 'SendNeutralVotesOnThreads' ? setSendNeutralVotesOnThreads(sendNeutralVotesOnThreads => !sendNeutralVotesOnThreads)
        : type == 'SendDownvotesOnThreads' ? setSendDownvotesOnThreads(sendDownvotesOnThreads => !sendDownvotesOnThreads)
        : type == 'SendJoiningCategory' ? setSendJoiningCategory(sendJoiningCategory => !sendJoiningCategory)
        : console.error('Wrong type has been passed to setContextAndAsyncStorage function in NotificationSettings')
        const settingsObject = {
            TextMessages: type == 'TextMessages' ? !textMessages : textMessages,
            UpvotesOnPosts: type == 'UpvotesOnPosts' ? !upvotesOnPosts : upvotesOnPosts,
            NeutralVotesOnPosts: type == 'NeutralVotesOnPosts' ? !neutralVotesOnPosts : neutralVotesOnPosts,
            DownvotesOnPosts: type == 'DownvotesOnPosts' ? !downvotesOnPosts : downvotesOnPosts,
            UpvotesOnVideos: type == 'UpvotesOnVideos' ? !upvotesOnVideos : upvotesOnVideos,
            NeutralVotesOnVideos: type == 'NeutralVotesOnVideos' ? !neutralVotesOnVideos : neutralVotesOnVideos,
            DownvotesOnVideos: type == 'DownvotesOnVideos' ? !downvotesOnVideos : downvotesOnVideos,
            UpvotesOnPolls: type == 'UpvotesOnPolls' ? !upvotesOnPolls : upvotesOnPolls,
            NeutralVotesOnPolls: type == 'NeutralVotesOnPolls' ? !neutralVotesOnPolls : neutralVotesOnPolls,
            DownvotesOnPolls: type == 'DownvotesOnPolls' ? !downvotesOnPolls : downvotesOnPolls,
            UpvotesOnThreads: type == 'UpvotesOnThreads' ? !upvotesOnThreads : upvotesOnThreads,
            NeutralVotesOnThreads: type == 'NeutralVotesOnThreads' ? !neutralVotesOnThreads : neutralVotesOnThreads,
            DownvotesOnThreads: type == 'DownvotesOnThreads' ? !downvotesOnThreads : downvotesOnThreads,
            PersonJoiningCategory: type == 'PersonJoiningCategory' ? !personJoiningCategory : personJoiningCategory,
            SendTextMessages: type == 'SendTextMessages' ? !sendTextMessages : sendTextMessages,
            SendUpvotesOnPosts: type == 'SendUpvotesOnPosts' ? !sendUpvotesOnPosts : sendUpvotesOnPosts,
            SendNeutralVotesOnPosts: type == 'SendNeutralVotesOnPosts' ? !sendNeutralVotesOnPosts : sendNeutralVotesOnPosts,
            SendDownvotesOnPosts: type == 'SendDownvotesOnPosts' ? !sendDownvotesOnPosts : sendDownvotesOnPosts,
            SendUpvotesOnVideos: type == 'SendUpvotesOnVideos' ? !sendUpvotesOnVideos : sendUpvotesOnVideos,
            SendNeutralVotesOnVideos: type == 'SendNeutralVotesOnVideos' ? !sendNeutralVotesOnVideos : sendNeutralVotesOnVideos,
            SendDownvotesOnVideos: type == 'SendDownvotesOnVideos' ? !sendDownvotesOnVideos : sendDownvotesOnVideos,
            SendUpvotesOnPolls: type == 'SendUpvotesOnPolls' ? !sendUpvotesOnPolls : sendUpvotesOnPolls,
            SendNeutralVotesOnPolls: type == 'SendNeutralVotesOnPolls' ? !sendNeutralVotesOnPolls : sendNeutralVotesOnPolls,
            SendDownvotesOnPolls: type == 'SendDownvotesOnPolls' ? !sendDownvotesOnPolls : sendDownvotesOnPolls,
            SendUpvotesOnThreads: type == 'SendUpvotesOnThreads' ? !sendUpvotesOnThreads : sendUpvotesOnThreads,
            SendNeutralVotesOnThreads: type == 'SendNeutralVotesOnThreads' ? !sendNeutralVotesOnThreads : sendNeutralVotesOnThreads,
            SendDownvotesOnThreads: type == 'SendDownvotesOnThreads' ? !sendDownvotesOnThreads : sendDownvotesOnThreads,
            SendJoiningCategory: type == 'SendJoiningCategory' ? !sendJoiningCategory : sendJoiningCategory
        }
        AsyncStorage.setItem('NotificationsSettings', JSON.stringify(settingsObject))
    }

    const turnOnAllReceiveNotifications = async () => {
        setTextMessages(true)
        setUpvotesOnPosts(true)
        setNeutralVotesOnPosts(true)
        setDownvotesOnPosts(true)
        setUpvotesOnVideos(true)
        setNeutralVotesOnVideos(true)
        setDownvotesOnVideos(true)
        setUpvotesOnPolls(true)
        setNeutralVotesOnPolls(true)
        setDownvotesOnPolls(true)
        setUpvotesOnThreads(true)
        setNeutralVotesOnThreads(true)
        setDownvotesOnThreads(true)
        setPersonJoiningCategory(true)
        const asyncStorageData = JSON.parse(await AsyncStorage.getItem('NotificationsSettings'));
        const settingsObject = {
            TextMessages: true,
            UpvotesOnPosts: true,
            NeutralVotesOnPosts: true,
            DownvotesOnPosts: true,
            UpvotesOnVideos: true,
            NeutralVotesOnVideos: true,
            DownvotesOnVideos: true,
            UpvotesOnPolls: true,
            NeutralVotesOnPolls: true,
            DownvotesOnPolls: true,
            UpvotesOnThreads: true,
            NeutralVotesOnThreads: true,
            DownvotesOnThreads: true,
            PersonJoiningCategory: true,
            SendTextMessages: asyncStorageData.SendTextMessages,
            SendUpvotesOnPosts: asyncStorageData.SendUpvotesOnPosts,
            SendNeutralVotesOnPosts: asyncStorageData.SendNeutralVotesOnPosts,
            SendDownvotesOnPosts: asyncStorageData.SendDownvotesOnPosts,
            SendUpvotesOnVideos: asyncStorageData.SendUpvotesOnVideos,
            SendNeutralVotesOnVideos: asyncStorageData.SendNeutralVotesOnVideos,
            SendDownvotesOnVideos: asyncStorageData.SendDownvotesOnVideos,
            SendUpvotesOnPolls: asyncStorageData.SendUpvotesOnPolls,
            SendNeutralVotesOnPolls: asyncStorageData.SendNeutralVotesOnPolls,
            SendDownvotesOnPolls: asyncStorageData.SendDownvotesOnPolls,
            SendUpvotesOnThreads: asyncStorageData.SendUpvotesOnThreads,
            SendNeutralVotesOnThreads: asyncStorageData.SendNeutralVotesOnThreads,
            SendDownvotesOnThreads: asyncStorageData.SendDownvotesOnThreads,
            SendJoiningCategory: asyncStorageData.SendJoiningCategory
        }
        AsyncStorage.setItem('NotificationsSettings', JSON.stringify(settingsObject))
    }

    const turnOffAllReceiveNotifications = async () => {
        setTextMessages(false)
        setUpvotesOnPosts(false)
        setNeutralVotesOnPosts(false)
        setDownvotesOnPosts(false)
        setUpvotesOnVideos(false)
        setNeutralVotesOnVideos(false)
        setDownvotesOnVideos(false)
        setUpvotesOnPolls(false)
        setNeutralVotesOnPolls(false)
        setDownvotesOnPolls(false)
        setUpvotesOnThreads(false)
        setNeutralVotesOnThreads(false)
        setDownvotesOnThreads(false)
        setPersonJoiningCategory(false)
        const asyncStorageData = JSON.parse(await AsyncStorage.getItem('NotificationsSettings'));
        const settingsObject = {
            TextMessages: false,
            UpvotesOnPosts: false,
            NeutralVotesOnPosts: false,
            DownvotesOnPosts: false,
            UpvotesOnVideos: false,
            NeutralVotesOnVideos: false,
            DownvotesOnVideos: false,
            UpvotesOnPolls: false,
            NeutralVotesOnPolls: false,
            DownvotesOnPolls: false,
            UpvotesOnThreads: false,
            NeutralVotesOnThreads: false,
            DownvotesOnThreads: false,
            PersonJoiningCategory: false,
            SendTextMessages: asyncStorageData.SendTextMessages,
            SendUpvotesOnPosts: asyncStorageData.SendUpvotesOnPosts,
            SendNeutralVotesOnPosts: asyncStorageData.SendNeutralVotesOnPosts,
            SendDownvotesOnPosts: asyncStorageData.SendDownvotesOnPosts,
            SendUpvotesOnVideos: asyncStorageData.SendUpvotesOnVideos,
            SendNeutralVotesOnVideos: asyncStorageData.SendNeutralVotesOnVideos,
            SendDownvotesOnVideos: asyncStorageData.SendDownvotesOnVideos,
            SendUpvotesOnPolls: asyncStorageData.SendUpvotesOnPolls,
            SendNeutralVotesOnPolls: asyncStorageData.SendNeutralVotesOnPolls,
            SendDownvotesOnPolls: asyncStorageData.SendDownvotesOnPolls,
            SendUpvotesOnThreads: asyncStorageData.SendUpvotesOnThreads,
            SendNeutralVotesOnThreads: asyncStorageData.SendNeutralVotesOnThreads,
            SendDownvotesOnThreads: asyncStorageData.SendDownvotesOnThreads,
            SendJoiningCategory: asyncStorageData.SendJoiningCategory
        }
        AsyncStorage.setItem('NotificationsSettings', JSON.stringify(settingsObject))
    }

    const turnOnAllSendNotifications = async () => {
        setSendTextMessages(true)
        setSendUpvotesOnPosts(true)
        setSendNeutralVotesOnPosts(true)
        setSendDownvotesOnPosts(true)
        setSendUpvotesOnVideos(true)
        setSendNeutralVotesOnVideos(true)
        setSendDownvotesOnVideos(true)
        setSendUpvotesOnPolls(true)
        setSendNeutralVotesOnPolls(true)
        setSendDownvotesOnPolls(true)
        setSendUpvotesOnThreads(true)
        setSendNeutralVotesOnThreads(true)
        setSendDownvotesOnThreads(true)
        setSendJoiningCategory(true)
        const asyncStorageData = JSON.parse(await AsyncStorage.getItem('NotificationsSettings'));
        const settingsObject = {
            TextMessages: asyncStorageData.TextMessages,
            UpvotesOnPosts: asyncStorageData.UpvotesOnPosts,
            NeutralVotesOnPosts: asyncStorageData.NeutralVotesOnPosts,
            DownvotesOnPosts: asyncStorageData.DownvotesOnPosts,
            UpvotesOnVideos: asyncStorageData.UpvotesOnVideos,
            NeutralVotesOnVideos: asyncStorageData.NeutralVotesOnVideos,
            DownvotesOnVideos: asyncStorageData.DownvotesOnVideos,
            UpvotesOnPolls: asyncStorageData.UpvotesOnPolls,
            NeutralVotesOnPolls: asyncStorageData.NeutralVotesOnPolls,
            DownvotesOnPolls: asyncStorageData.DownvotesOnPolls,
            UpvotesOnThreads: asyncStorageData.UpvotesOnThreads,
            NeutralVotesOnThreads: asyncStorageData.NeutralVotesOnThreads,
            DownvotesOnThreads: asyncStorageData.DownvotesOnThreads,
            PersonJoiningCategory: asyncStorageData.PersonJoiningCategory,
            SendTextMessages: true,
            SendUpvotesOnPosts: true,
            SendNeutralVotesOnPosts: true,
            SendDownvotesOnPosts: true,
            SendUpvotesOnVideos: true,
            SendNeutralVotesOnVideos: true,
            SendDownvotesOnVideos: true,
            SendUpvotesOnPolls: true,
            SendNeutralVotesOnPolls: true,
            SendDownvotesOnPolls: true,
            SendUpvotesOnThreads: true,
            SendNeutralVotesOnThreads: true,
            SendDownvotesOnThreads: true,
            SendJoiningCategory: true
        }
        AsyncStorage.setItem('NotificationsSettings', JSON.stringify(settingsObject))
    }

    const turnOffAllSendNotifications = async () => {
        setSendTextMessages(false)
        setSendUpvotesOnPosts(false)
        setSendNeutralVotesOnPosts(false)
        setSendDownvotesOnPosts(false)
        setSendUpvotesOnVideos(false)
        setSendNeutralVotesOnVideos(false)
        setSendDownvotesOnVideos(false)
        setSendUpvotesOnPolls(false)
        setSendNeutralVotesOnPolls(false)
        setSendDownvotesOnPolls(false)
        setSendUpvotesOnThreads(false)
        setSendNeutralVotesOnThreads(false)
        setSendDownvotesOnThreads(false)
        setSendJoiningCategory(false)
        const asyncStorageData = JSON.parse(await AsyncStorage.getItem('NotificationsSettings'));
        const settingsObject = {
            TextMessages: asyncStorageData.TextMessages,
            UpvotesOnPosts: asyncStorageData.UpvotesOnPosts,
            NeutralVotesOnPosts: asyncStorageData.NeutralVotesOnPosts,
            DownvotesOnPosts: asyncStorageData.DownvotesOnPosts,
            UpvotesOnVideos: asyncStorageData.UpvotesOnVideos,
            NeutralVotesOnVideos: asyncStorageData.NeutralVotesOnVideos,
            DownvotesOnVideos: asyncStorageData.DownvotesOnVideos,
            UpvotesOnPolls: asyncStorageData.UpvotesOnPolls,
            NeutralVotesOnPolls: asyncStorageData.NeutralVotesOnPolls,
            DownvotesOnPolls: asyncStorageData.DownvotesOnPolls,
            UpvotesOnThreads: asyncStorageData.UpvotesOnThreads,
            NeutralVotesOnThreads: asyncStorageData.NeutralVotesOnThreads,
            DownvotesOnThreads: asyncStorageData.DownvotesOnThreads,
            PersonJoiningCategory: asyncStorageData.PersonJoiningCategory,
            SendTextMessages: false,
            SendUpvotesOnPosts: false,
            SendNeutralVotesOnPosts: false,
            SendDownvotesOnPosts: false,
            SendUpvotesOnVideos: false,
            SendNeutralVotesOnVideos: false,
            SendDownvotesOnVideos: false,
            SendUpvotesOnPolls: false,
            SendNeutralVotesOnPolls: false,
            SendDownvotesOnPolls: false,
            SendUpvotesOnThreads: false,
            SendNeutralVotesOnThreads: false,
            SendDownvotesOnThreads: false,
            SendJoiningCategory: false
        }
        AsyncStorage.setItem('NotificationsSettings', JSON.stringify(settingsObject))
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
            await AsyncStorage.getItem('NotificationsSettings').then((data) => {
                if (data == null) {
                    //turnOnAllSendNotifications()
                    //turnOnAllReceiveNotifications()
                    const settingsObject = {
                        TextMessages: true,
                        UpvotesOnPosts: true,
                        NeutralVotesOnPosts: true,
                        DownvotesOnPosts: true,
                        UpvotesOnVideos: true,
                        NeutralVotesOnVideos: true,
                        DownvotesOnVideos: true,
                        UpvotesOnPolls: true,
                        NeutralVotesOnPolls: true,
                        DownvotesOnPolls: true,
                        UpvotesOnThreads: true,
                        NeutralVotesOnThreads: true,
                        DownvotesOnThreads: true,
                        PersonJoiningCategory: true,
                        SendTextMessages: true,
                        SendUpvotesOnPosts: true,
                        SendNeutralVotesOnPosts: true,
                        SendDownvotesOnPosts: true,
                        SendUpvotesOnVideos: true,
                        SendNeutralVotesOnVideos: true,
                        SendDownvotesOnVideos: true,
                        SendUpvotesOnPolls: true,
                        SendNeutralVotesOnPolls: true,
                        SendDownvotesOnPolls: true,
                        SendUpvotesOnThreads: true,
                        SendNeutralVotesOnThreads: true,
                        SendDownvotesOnThreads: true,
                        SendJoiningCategory: true
                    }
                    AsyncStorage.setItem('NotificationsSettings', JSON.stringify(settingsObject))
                    setShowSettings(true)
                } else {
                    let dataToStringify = {}
                    let dataParsed = JSON.parse(data)
                    if (dataParsed.TextMessages == undefined) {
                        dataToStringify.TextMessages = true
                        setTextMessages(true)
                    } else {
                        dataToStringify.TextMessages = dataParsed.TextMessages
                        setTextMessages(dataParsed.TextMessages)
                    }
                    if (dataParsed.UpvotesOnPosts == undefined) {
                        dataToStringify.UpvotesOnPosts = true;
                        setUpvotesOnPosts(true)
                    } else {
                        dataToStringify.UpvotesOnPosts = dataParsed.UpvotesOnPosts
                        setUpvotesOnPosts(dataParsed.UpvotesOnPosts)
                    }
                    if (dataParsed.NeutralVotesOnPosts == undefined) {
                        dataToStringify.NeutralVotesOnPosts = true
                        setNeutralVotesOnPosts(true)
                    } else {
                        dataToStringify.NeutralVotesOnPosts = dataParsed.NeutralVotesOnPosts
                        setNeutralVotesOnPosts(dataParsed.NeutralVotesOnPosts)
                    }
                    if (dataParsed.DownvotesOnPosts == undefined) {
                        dataToStringify.DownvotesOnPosts = true
                        setDownvotesOnPosts(true)
                    } else {
                        dataToStringify.DownvotesOnPosts = dataParsed.DownvotesOnPosts
                        setDownvotesOnPosts(dataParsed.DownvotesOnPosts)
                    }
                    if (dataParsed.UpvotesOnVideos == undefined) {
                        dataToStringify.UpvotesOnVideos = true
                        setUpvotesOnVideos(true)
                    } else {
                        dataToStringify.UpvotesOnVideos = dataParsed.UpvotesOnVideos
                        setUpvotesOnVideos(dataParsed.UpvotesOnVideos)
                    }
                    if (dataParsed.NeutralVotesOnVideos == undefined) {
                        dataToStringify.NeutralVotesOnVideos = true
                        setNeutralVotesOnVideos(true)
                    } else {
                        dataToStringify.NeutralVotesOnVideos = dataParsed.NeutralVotesOnVideos
                        setNeutralVotesOnVideos(dataParsed.NeutralVotesOnVideos)
                    }
                    if (dataParsed.DownvotesOnVideos == undefined) {
                        dataToStringify.DownvotesOnVideos = true
                        setDownvotesOnVideos(true)
                    } else {
                        dataToStringify.DownvotesOnVideos = dataParsed.DownvotesOnVideos
                        setDownvotesOnVideos(dataParsed.DownvotesOnVideos)
                    }
                    if (dataParsed.UpvotesOnPolls == undefined) {
                        dataToStringify.UpvotesOnPolls = true
                        setUpvotesOnPolls(true)
                    } else {
                        dataToStringify.UpvotesOnPolls = dataParsed.UpvotesOnPolls
                        setUpvotesOnPolls(dataParsed.UpvotesOnPolls)
                    }
                    if (dataParsed.NeutralVotesOnPolls == undefined) {
                        dataToStringify.NeutralVotesOnPolls = true
                        setNeutralVotesOnPolls(true)
                    } else {
                        dataToStringify.NeutralVotesOnPolls = dataParsed.NeutralVotesOnPolls
                        setNeutralVotesOnPolls(dataParsed.NeutralVotesOnPolls)
                    }
                    if (dataParsed.DownvotesOnPolls == undefined) {
                        dataToStringify.DownvotesOnPolls = true
                        setDownvotesOnPolls(true)
                    } else {
                        dataToStringify.DownvotesOnPolls = dataParsed.DownvotesOnPolls
                        setDownvotesOnPolls(dataParsed.DownvotesOnPolls)
                    }
                    if (dataParsed.UpvotesOnThreads == undefined) {
                        dataToStringify.UpvotesOnThreads = true
                        setUpvotesOnThreads(true)
                    } else {
                        dataToStringify.UpvotesOnThreads = dataParsed.UpvotesOnThreads
                        setUpvotesOnThreads(dataParsed.UpvotesOnThreads)
                    }
                    if (dataParsed.NeutralVotesOnThreads == undefined) {
                        dataToStringify.NeutralVotesOnThreads = true
                        setNeutralVotesOnThreads(true)
                    } else {
                        dataToStringify.NeutralVotesOnThreads = dataParsed.NeutralVotesOnThreads
                        setNeutralVotesOnThreads(dataParsed.NeutralVotesOnThreads)
                    }
                    if (dataParsed.DownvotesOnThreads == undefined) {
                        dataToStringify.DownvotesOnThreads = true
                        setDownvotesOnThreads(true)
                    } else {
                        dataToStringify.DownvotesOnThreads = dataParsed.DownvotesOnThreads
                        setDownvotesOnThreads(dataParsed.DownvotesOnThreads)
                    }
                    if (dataParsed.PersonJoiningCategory == undefined) {
                        dataToStringify.PersonJoiningCategory = true
                        setPersonJoiningCategory(true)
                    } else {
                        dataToStringify.PersonJoiningCategory = dataParsed.PersonJoiningCategory
                        setPersonJoiningCategory(dataParsed.PersonJoiningCategory)
                    }
                    if (dataParsed.SendTextMessages == undefined) {
                        dataToStringify.SendTextMessages = true
                        setSendTextMessages(true)
                    } else {
                        dataToStringify.SendTextMessages = dataParsed.SendTextMessages
                        setSendTextMessages(dataParsed.SendTextMessages)
                    }
                    if (dataParsed.SendUpvotesOnPosts == undefined) {
                        dataToStringify.SendUpvotesOnPosts = true
                        setSendUpvotesOnPosts(true)
                    } else {
                        dataToStringify.SendUpvotesOnPosts = dataParsed.SendUpvotesOnPosts
                        setSendUpvotesOnPosts(dataParsed.SendUpvotesOnPosts)
                    }
                    if (dataParsed.SendNeutralVotesOnPosts == undefined) {
                        dataToStringify.SendNeutralVotesOnPosts = true
                        setSendNeutralVotesOnPosts(true)
                    } else {
                        dataToStringify.SendNeutralVotesOnPosts = dataParsed.SendNeutralVotesOnPosts
                        setSendNeutralVotesOnPosts(dataParsed.SendNeutralVotesOnPosts)
                    }
                    if (dataParsed.SendDownvotesOnPosts == undefined) {
                        dataToStringify.SendDownvotesOnPosts = true
                        setSendDownvotesOnPosts(true)
                    } else {
                        dataToStringify.SendDownvotesOnPosts = dataParsed.SendDownvotesOnPosts
                        setSendDownvotesOnPosts(dataParsed.SendDownvotesOnPosts)
                    }
                    if (dataParsed.SendUpvotesOnVideos == undefined) {
                        dataToStringify.SendUpvotesOnVideos = true
                        setSendUpvotesOnVideos(true)
                    } else {
                        dataToStringify.SendUpvotesOnVideos = dataParsed.SendUpvotesOnVideos
                        setSendUpvotesOnVideos(dataParsed.SendUpvotesOnVideos)
                    }
                    if (dataParsed.SendNeutralVotesOnVideos == undefined) {
                        dataToStringify.SendNeutralVotesOnVideos = true
                        setSendNeutralVotesOnVideos(true)
                    } else {
                        dataToStringify.SendNeutralVotesOnVideos = dataParsed.SendNeutralVotesOnVideos
                        setSendNeutralVotesOnVideos(dataParsed.SendNeutralVotesOnVideos)
                    }
                    if (dataParsed.SendDownvotesOnVideos == undefined) {
                        dataToStringify.SendDownvotesOnVideos = true
                        setSendDownvotesOnVideos(true)
                    } else {
                        dataToStringify.SendDownvotesOnVideos = dataParsed.SendDownvotesOnVideos
                        setSendDownvotesOnVideos(dataParsed.SendDownvotesOnVideos)
                    }
                    if (dataParsed.SendUpvotesOnPolls == undefined) {
                        dataToStringify.SendUpvotesOnPolls = true
                        setSendUpvotesOnPolls(true)
                    } else {
                        dataToStringify.SendUpvotesOnPolls = dataParsed.SendUpvotesOnPolls
                        setSendUpvotesOnPolls(dataParsed.SendUpvotesOnPolls)
                    }
                    if (dataParsed.SendNeutralVotesOnPolls == undefined) {
                        dataToStringify.SendNeutralVotesOnPolls = true
                        setSendNeutralVotesOnPolls(true)
                    } else {
                        dataToStringify.SendNeutralVotesOnPolls = dataParsed.SendNeutralVotesOnPolls
                        setSendNeutralVotesOnPolls(dataParsed.SendNeutralVotesOnPolls)
                    }
                    if (dataParsed.SendDownvotesOnPolls == undefined) {
                        dataToStringify.SendDownvotesOnPolls = true
                        setSendDownvotesOnPolls(true)
                    } else {
                        dataToStringify.SendDownvotesOnPolls = dataParsed.SendDownvotesOnPolls
                        setSendDownvotesOnPolls(dataParsed.SendDownvotesOnPolls)
                    }
                    if (dataParsed.SendUpvotesOnThreads == undefined) {
                        dataToStringify.SendUpvotesOnThreads = true
                        setSendUpvotesOnThreads(true)
                    } else {
                        dataToStringify.SendUpvotesOnThreads = dataParsed.SendUpvotesOnThreads
                        setSendUpvotesOnThreads(dataParsed.SendUpvotesOnThreads)
                    }
                    if (dataParsed.SendNeutralVotesOnThreads == undefined) {
                        dataToStringify.SendNeutralVotesOnThreads = true
                        setSendNeutralVotesOnThreads(true)
                    } else {
                        dataToStringify.SendNeutralVotesOnThreads = dataParsed.SendNeutralVotesOnThreads
                        setSendNeutralVotesOnThreads(dataParsed.SendNeutralVotesOnThreads)
                    }
                    if (dataParsed.SendDownvotesOnThreads == undefined) {
                        dataToStringify.SendDownvotesOnThreads = true
                        setSendDownvotesOnThreads(true)
                    } else {
                        dataToStringify.SendDownvotesOnThreads = dataParsed.SendDownvotesOnThreads
                        setSendDownvotesOnThreads(dataParsed.SendDownvotesOnThreads)
                    }
                    if (dataParsed.SendJoiningCategory == undefined) {
                        dataToStringify.SendJoiningCategory = true
                        setSendJoiningCategory(true)
                    } else {
                        dataToStringify.SendJoiningCategory = dataParsed.SendJoiningCategory
                        setSendJoiningCategory(dataParsed.SendJoiningCategory)
                    }
                    AsyncStorage.setItem('NotificationSettings', JSON.stringify(dataToStringify)).catch((e) => {console.error(e)})
                    setShowSettings(true)
                }
            }).catch((e) => console.error(e))
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
                    </ChatScreen_Title>
                    <WelcomeContainer style={{backgroundColor: colors.primary, width: '100%', height: '100%'}}>
                        {showSettings == true ?
                            <>
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
                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                            <View style={{flexDirection: 'column', flex: 1}}>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Text Messages</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on your posts</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on your posts</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on your posts</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on your videos</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on your videos</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on your videos</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on your polls</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on your polls</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on your polls</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on your threads</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on your threads</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on your threads</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Person joining a category you are in</Text>
                                            </View>
                                            <View style={{flex: 0.3, flexDirection: 'column', alignItems: 'center'}}>
                                                <SwitchToggle
                                                    switchOn={textMessages}
                                                    onPress={() => {setContextAndAsyncStorage('TextMessages')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={upvotesOnPosts}
                                                    onPress={() => {setContextAndAsyncStorage('UpvotesOnPosts')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={neutralVotesOnPosts}
                                                    onPress={() => {setContextAndAsyncStorage('NeutralVotesOnPosts')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={downvotesOnPosts}
                                                    onPress={() => {setContextAndAsyncStorage('DownvotesOnPosts')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={upvotesOnVideos}
                                                    onPress={() => {setContextAndAsyncStorage('UpvotesOnVideos')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={neutralVotesOnVideos}
                                                    onPress={() => {setContextAndAsyncStorage('NeutralVotesOnVideos')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={downvotesOnVideos}
                                                    onPress={() => {setContextAndAsyncStorage('DownvotesOnVideos')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={upvotesOnPolls}
                                                    onPress={() => {setContextAndAsyncStorage('UpvotesOnPolls')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={neutralVotesOnPolls}
                                                    onPress={() => {setContextAndAsyncStorage('NeutralVotesOnPolls')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={downvotesOnPolls}
                                                    onPress={() => {setContextAndAsyncStorage('DownvotesOnPolls')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={upvotesOnThreads}
                                                    onPress={() => {setContextAndAsyncStorage('UpvotesOnThreads')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={neutralVotesOnThreads}
                                                    onPress={() => {setContextAndAsyncStorage('NeutralVotesOnThreads')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={downvotesOnThreads}
                                                    onPress={() => {setContextAndAsyncStorage('DownvotesOnThreads')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={personJoiningCategory}
                                                    onPress={() => {setContextAndAsyncStorage('PersonJoiningCategory')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                            </View>
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
                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                            <View style={{flexDirection: 'column', flex: 1}}>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Text Messages</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on posts</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on posts</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on posts</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on videos</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on videos</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on videos</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on polls</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on polls</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on polls</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Upvotes on threads</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Neutral votes on threads</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>Downvotes on threads</Text>
                                                <Text style={{color: colors.tertiary, fontSize: fontSizeForText, fontWeight: 'bold', marginVertical: 10}}>You joining a category</Text>
                                            </View>
                                            <View style={{flex: 0.3, flexDirection: 'column', alignItems: 'center'}}>
                                                <SwitchToggle
                                                    switchOn={sendTextMessages}
                                                    onPress={() => {setContextAndAsyncStorage('SendTextMessages')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={sendUpvotesOnPosts}
                                                    onPress={() => {setContextAndAsyncStorage('SendUpvotesOnPosts')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={sendNeutralVotesOnPosts}
                                                    onPress={() => {setContextAndAsyncStorage('SendNeutralVotesOnPosts')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={sendDownvotesOnPosts}
                                                    onPress={() => {setContextAndAsyncStorage('SendDownvotesOnPosts')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={sendUpvotesOnVideos}
                                                    onPress={() => {setContextAndAsyncStorage('SendUpvotesOnVideos')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={sendNeutralVotesOnVideos}
                                                    onPress={() => {setContextAndAsyncStorage('SendNeutralVotesOnVideos')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={sendDownvotesOnVideos}
                                                    onPress={() => {setContextAndAsyncStorage('SendDownvotesOnVideos')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={sendUpvotesOnPolls}
                                                    onPress={() => {setContextAndAsyncStorage('SendUpvotesOnPolls')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={sendNeutralVotesOnPolls}
                                                    onPress={() => {setContextAndAsyncStorage('SendNeutralVotesOnPolls')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={sendDownvotesOnPolls}
                                                    onPress={() => {setContextAndAsyncStorage('SendDownvotesOnPolls')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={sendUpvotesOnThreads}
                                                    onPress={() => {setContextAndAsyncStorage('SendUpvotesOnThreads')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={sendNeutralVotesOnThreads}
                                                    onPress={() => {setContextAndAsyncStorage('SendNeutralVotesOnThreads')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={sendDownvotesOnThreads}
                                                    onPress={() => {setContextAndAsyncStorage('SendDownvotesOnThreads')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                                <SwitchToggle
                                                    switchOn={sendJoiningCategory}
                                                    onPress={() => {setContextAndAsyncStorage('SendJoiningCategory')}}
                                                    circleColorOff={colors.tertiary}
                                                    circleColorOn={dark? colors.teritary : colors.primary}
                                                    backgroundColorOn={colors.darkestBlue}
                                                    backgroundColorOff={colors.borderColor}
                                                    containerStyle={{
                                                        width: 50,
                                                        height: 28,
                                                        borderRadius: 25,
                                                        padding: 5,
                                                        marginVertical: marginVerticalOnSwitches
                                                    }}
                                                    circleStyle={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: 20,
                                                    }}
                                                />
                                            </View>
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
                            </>                 
                        : <TestText style={{textAlign: 'center', color: colors.tertiary, marginVertical: 30}}>Loading...</TestText>}
                    </WelcomeContainer>
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