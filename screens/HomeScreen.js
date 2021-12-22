import React, { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Alert, Dimensions} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from "styled-components";
import Images from "../posts/images.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme, useFocusEffect, useIsFocused, CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Constants from "expo-constants";
import {
    darkModeStyling, 
    darkModeOn, 
    lightModeStyling,
    ProfileOptionsView,
    ProfileOptionsViewText,
    ProfileOptionsViewSubtitleText,
    ProfileOptionsViewButtons,
    ProfileOptionsViewButtonsText,
    ReportProfileOptionsView,
    ReportProfileOptionsViewButtons,
    ReportProfileOptionsViewButtonsText,
    ReportProfileOptionsViewSubtitleText,
    ReportProfileOptionsViewText,
    ChatScreen_Title,
    Navigator_BackButton,
    StyledButton,
    ButtonText
} from '../screens/screenStylings/styling.js';
import ProgressiveImage from '../posts/ProgressiveImage.js';
import { CredentialsContext } from '../components/CredentialsContext.js';
import { AdIDContext } from '../components/AdIDContext.js';
import VisitingProfileScreen from '../screens/VisitingProfileScreen.js';
import devModeOn from '../components/devModeOn.js';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
} from 'expo-ads-admob';
import ScalableProgressiveImage from '../components/ScalableProgressiveImage.js';
import { Viewport } from '@skele/components';
import { Audio } from 'expo-av';
import OfflineNotice from '../components/OfflineNotice.js';
import SwitchToggle from "react-native-switch-toggle";
import { SimpleStylingVersion } from '../components/StylingVersionsFile.js';
import { AppStylingContext } from '../components/AppStylingContext.js';

const HomeScreen = ({navigation}) => {
    // Filter code
    const [showPhotos, setShowPhotos] = useState(undefined);
    const [showVideos, setShowVideos] = useState(undefined);
    const [showAudio, setShowAudio] = useState(undefined);
    const [showThreads, setShowThreads] = useState(undefined);
    const [showPolls, setShowPolls] = useState(undefined);
    const [showCategories, setShowCategories] = useState(undefined);
    const [PlayVideoSoundInSilentMode, setPlayVideoSoundInSilentMode] = useState(undefined)
    const OutputAsyncStorageToConsole = false
    const [updateSimpleStylesWarningHidden, setUpdateSimpleStylesWarningHidden] = useState(true);
    const {AppStylingContextState, setAppStylingContextState} = useContext(AppStylingContext);
    useEffect(() => {
        async function setUp() {
            const showPhotosValue = await AsyncStorage.getItem('ShowPhotos_AppBehaviour_AsyncStorage')
            if (OutputAsyncStorageToConsole) {console.log('ShowPhotos_AppBehaviour_AsyncStorage key is: ' + showPhotosValue)}
            if (showPhotosValue == null) {
                setShowPhotos(true)
                AsyncStorage.setItem('ShowPhotos_AppBehaviour_AsyncStorage', 'true')
            } else if (showPhotosValue == 'true') {
                setShowPhotos(true)
                AsyncStorage.setItem('ShowPhotos_AppBehaviour_AsyncStorage', 'true')
            } else if (showPhotosValue == 'false') {
                setShowPhotos(false)
                AsyncStorage.setItem('ShowPhotos_AppBehaviour_AsyncStorage', 'false')
            } else {
                console.log('Error occured while getting ShowPhotos value in setUp() function in AppBehaviour_HomeScreen.js')
            }

            const showVideosValue = await AsyncStorage.getItem('ShowVideos_AppBehaviour_AsyncStorage')
            if (OutputAsyncStorageToConsole) {console.log('ShowVideos_AppBehaviour_AsyncStorage key is: ' + showVideosValue)}
            if (showVideosValue == null) {
                setShowVideos(true)
                AsyncStorage.setItem('ShowVideos_AppBehaviour_AsyncStorage', 'true')
            } else if (showVideosValue == 'true') {
                setShowVideos(true)
                AsyncStorage.setItem('ShowVideos_AppBehaviour_AsyncStorage', 'true')
            } else if (showVideosValue == 'false') {
                setShowVideos(false)
                AsyncStorage.setItem('ShowVideos_AppBehaviour_AsyncStorage', 'false')
            } else {
                console.log('Error occured while getting ShowVideos value in setUp() function in AppBehaviour_HomeScreen.js')
            }

            const showAudioValue = await AsyncStorage.getItem('ShowAudio_AppBehaviour_AsyncStorage')
            if (OutputAsyncStorageToConsole) {console.log('ShowAudio_AppBehaviour_AsyncStorage key is: ' + showAudioValue)}
            if (showAudioValue == null) {
                setShowAudio(true)
                AsyncStorage.setItem('ShowAudio_AppBehaviour_AsyncStorage', 'true')
            } else if (showAudioValue == 'true') {
                setShowAudio(true)
                AsyncStorage.setItem('ShowAudio_AppBehaviour_AsyncStorage', 'true')
            } else if (showAudioValue == 'false') {
                setShowAudio(false)
                AsyncStorage.setItem('ShowAudio_AppBehaviour_AsyncStorage', 'false')
            } else {
                console.log('Error occured while getting ShowAudio value in setUp() function in AppBehaviour_HomeScreen.js')
            }

            const showPollsValue = await AsyncStorage.getItem('ShowPolls_AppBehaviour_AsyncStorage')
            if (OutputAsyncStorageToConsole) {console.log('ShowPolls_AppBehaviour_AsyncStorage key is: ' + showPollsValue)}
            if (showPollsValue == null) {
                setShowPolls(true)
                AsyncStorage.setItem('ShowPolls_AppBehaviour_AsyncStorage', 'true')
            } else if (showPollsValue == 'true') {
                setShowPolls(true)
                AsyncStorage.setItem('ShowPolls_AppBehaviour_AsyncStorage', 'true')
            } else if (showPollsValue == 'false') {
                setShowPolls(false)
                AsyncStorage.setItem('ShowPolls_AppBehaviour_AsyncStorage', 'false')
            } else {
                console.log('Error occured while getting ShowPolls value in setUp() function in AppBehaviour_HomeScreen.js')
            }

            const showThreadsValue = await AsyncStorage.getItem('ShowThreads_AppBehaviour_AsyncStorage')
            if (OutputAsyncStorageToConsole) {console.log('ShowThreads_AppBehaviour_AsyncStorage key is: ' + showThreadsValue)}
            if (showThreadsValue == null) {
                setShowThreads(true)
                AsyncStorage.setItem('ShowThreads_AppBehaviour_AsyncStorage', 'true')
            } else if (showThreadsValue == 'true') {
                setShowThreads(true)
                AsyncStorage.setItem('ShowThreads_AppBehaviour_AsyncStorage', 'true')
            } else if (showThreadsValue == 'false') {
                setShowThreads(false)
                AsyncStorage.setItem('ShowThreads_AppBehaviour_AsyncStorage', 'false')
            } else {
                console.log('Error occured while getting ShowThreads value in setUp() function in AppBehaviour_HomeScreen.js')
            }

            const value = await AsyncStorage.getItem('PlayAudioInSilentMode_AppBehaviour_AsyncStorage')
            if (OutputAsyncStorageToConsole) {console.log('HomeScreen.js value of PlayAudioInSilentMode_AppBehaviour_AsyncStorage key is: ' + value)}
            if (value == null) {
                setPlayAudioInSilentMode(false)
                AsyncStorage.setItem('PlayAudioInSilentMode_AppBehaviour_AsyncStorage', 'false')
            } else if (value == 'true') {
                setPlayAudioInSilentMode(true)
                AsyncStorage.setItem('PlayAudioInSilentMode_AppBehaviour_AsyncStorage', 'true')
            } else if (value == 'false') {
                setPlayAudioInSilentMode(false)
                AsyncStorage.setItem('PlayAudioInSilentMode_AppBehaviour_AsyncStorage', 'false')
            } else {
                console.log('Error occured in setUp() function in HomeScreen.js')
            }

            const showCategoriesValue = await AsyncStorage.getItem('ShowCategories_AppBehaviour_AsyncStorage')
            if (OutputAsyncStorageToConsole) {console.log('ShowCategories_AppBehaviour_AsyncStorage key is: ' + showCategoriesValue)}
            if (showCategoriesValue == null) {
                setShowCategories(true)
                AsyncStorage.setItem('ShowCategories_AppBehaviour_AsyncStorage', 'true')
            } else if (showCategoriesValue == 'true') {
                setShowCategories(true)
                AsyncStorage.setItem('ShowCategories_AppBehaviour_AsyncStorage', 'true')
            } else if (showCategoriesValue == 'false') {
                setShowCategories(false)
                AsyncStorage.setItem('ShowCategories_AppBehaviour_AsyncStorage', 'false')
            } else {
                console.log('Error occured while getting ShowCategories value in setUp() function in AppBehaviour_HomeScreen.js')
            }

            const PlayVideoSoundInSilentModeValue = await AsyncStorage.getItem('PlayVideoSoundInSilentMode_AppBehaviour_AsyncStorage')
            if (OutputAsyncStorageToConsole) {console.log('HomeScreen.js value of PlayAudioInSilentMode_AppBehaviour_AsyncStorage key is: ' + PlayVideoSoundInSilentMode)}
            if (PlayVideoSoundInSilentModeValue == null) {
                setPlayVideoSoundInSilentMode(false)
                AsyncStorage.setItem('PlayVideoSoundInSilentMode_AppBehaviour_AsyncStorage', 'false')
            } else if (PlayVideoSoundInSilentModeValue == 'true') {
                setPlayVideoSoundInSilentMode(true)
                AsyncStorage.setItem('PlayVideoSoundInSilentMode_AppBehaviour_AsyncStorage', 'true')
            } else if (PlayVideoSoundInSilentModeValue == 'false') {
                setPlayVideoSoundInSilentMode(false)
                AsyncStorage.setItem('PlayVideoSoundInSilentMode_AppBehaviour_AsyncStorage', 'false')
            } else {
                console.log('Error occured in setUp() function in HomeScreen.js')
            }
        }
        setUp()
    }, [])
   
    const setContextAndAsyncStorage = (type) => {
        if (type == 'ShowPhotos') {
            if (showPhotos == true) {
                setShowPhotos(false)
                AsyncStorage.setItem('ShowPhotos_AppBehaviour_AsyncStorage', 'false')
            } else {
                setShowPhotos(true)
                AsyncStorage.setItem('ShowPhotos_AppBehaviour_AsyncStorage', 'true')
            }
        }
        else if (type == 'ShowVideos') {
            if (showVideos == true) {
                setShowVideos(false)
                AsyncStorage.setItem('ShowVideos_AppBehaviour_AsyncStorage', 'false')
            } else {
                setShowVideos(true)
                AsyncStorage.setItem('ShowVideos_AppBehaviour_AsyncStorage', 'true')
            }
        }
        else if (type == 'ShowAudio') {
            if (showAudio == true) {
                setShowAudio(false)
                AsyncStorage.setItem('ShowAudio_AppBehaviour_AsyncStorage', 'false')
            } else {
                setShowAudio(true)
                AsyncStorage.setItem('ShowAudio_AppBehaviour_AsyncStorage', 'true')
            }
        }
        else if (type == 'ShowPolls') {
            if (showPolls == true) {
                setShowPolls(false)
                AsyncStorage.setItem('ShowPolls_AppBehaviour_AsyncStorage', 'false')
            } else {
                setShowPolls(true)
                AsyncStorage.setItem('ShowPolls_AppBehaviour_AsyncStorage', 'true')
            }
        }
        else if (type == 'ShowThreads') {
            if (showThreads == true) {
                setShowThreads(false)
                AsyncStorage.setItem('ShowThreads_AppBehaviour_AsyncStorage', 'false')
            } else {
                setShowThreads(true)
                AsyncStorage.setItem('ShowThreads_AppBehaviour_AsyncStorage', 'true')
            }
        }
        else if (type == 'ShowCategories') {
            if (showCategories == true) {
                setShowCategories(false)
                AsyncStorage.setItem('ShowCategories_AppBehaviour_AsyncStorage', 'false')
            } else {
                setShowCategories(true)
                AsyncStorage.setItem('ShowCategories_AppBehaviour_AsyncStorage', 'true')
            }
        }
        else if (type == 'PlayAudioInSilentMode') {
            if (PlayAudioInSilentMode == true) {
                setPlayAudioInSilentMode(false)
                AsyncStorage.setItem('PlayAudioInSilentMode_AppBehaviour_AsyncStorage', 'false')
            } else {
                setPlayAudioInSilentMode(true)
                AsyncStorage.setItem('PlayAudioInSilentMode_AppBehaviour_AsyncStorage', 'true')
            }
        }
        else if (type == 'PlayVideoSoundInSilentMode') {
            if (PlayVideoSoundInSilentMode == true) {
                setPlayVideoSoundInSilentMode(false)
                AsyncStorage.setItem('PlayVideoSoundInSilentMode_AppBehaviour_AsyncStorage', 'false')
            } else {
                setPlayVideoSoundInSilentMode(true)
                AsyncStorage.setItem('PlayVideoSoundInSilentMode_AppBehaviour_AsyncStorage', 'true')
            }
        }
        else {
            console.error('Wrong value entered')
        }
    }
    // End of filter code
    const [usernameToReport, setUsernameToReport] = useState(null);
    const [postEncrypted, setPostEncrypted] = useState(null);
    const [ProfileOptionsViewState, setProfileOptionsViewState] = useState(true);
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {AdID, setAdID} = useContext(AdIDContext);
    const StatusBarHeight = Constants.statusBarHeight;
    async function unloadAudioFunction() {
        playRecording.unloadAsync;
    }
    if (storedCredentials) {var {name, displayName, email, photoUrl} = storedCredentials}
    if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }
    const {colors, dark, indexNum, stylingType} = useTheme();

    const [Posts, setPosts] = useState([
        { postSource: Images.posts.social_studies_1, profilePictureSource: Images.posts.profile_picture, username: 'sebthemancreator', displayName: 'sebthemancreator', type: 'post', timeUploadedAgo: '4 hours ago', bio: 'Seb and Kovid are cool', encrypted: 'true' },
        { postSource: Images.posts.seb_and_azaria_1, profilePictureSource: Images.posts.profile_picture, username: 'sebthemancreator', displayName: 'sebthemancreator', type: 'post', timeUploadedAgo: '4 hours ago', bio: 'Seb and Kovid are cool', encrypted: 'true' },
        { postSource: Images.posts.seb_and_azaria_2, profilePictureSource: Images.posts.profile_picture, username: 'sebthemancreator', displayName: 'sebthemancreator', type: 'post', timeUploadedAgo: '4 hours ago', bio: 'Seb and Kovid are cool', encrypted: 'true' },
        { postSource: Images.posts.seb_and_azaria_3, profilePictureSource: Images.posts.profile_picture, username: 'sebthemancreator', displayName: 'sebthemancreator', type: 'post', timeUploadedAgo: '4 hours ago', bio: 'Seb and Kovid are cool', encrypted: 'true' },
        { postSource: Images.posts.background, profilePictureSource: Images.posts.profile_picture, username: 'sebthemancreator', displayName: 'sebthemancreator', type: 'post', timeUploadedAgo: '4 hours ago', bio: 'Seb and Kovid are cool', encrypted: 'true' },
        { postSource: Images.posts.apple, profilePictureSource: Images.posts.apple, username: 'ILoveApples', displayName: 'AppleKid', type: 'post', timeUploadedAgo: '4 hours ago', bio: 'Seb and Kovid are cool', encrypted: 'false' },
        { postSource: 'https://github.com/SquareTable/social-media-platform/raw/main/assets/MorningMood_song.mp3', profilePictureSource: Images.posts.profile_picture, username: 'testing_audio', displayName: 'sebthemancreator', type: 'audio', timeUploadedAgo: '1 sec ago', bio: "Hello! This is an audio post. There are quite a few bugs with it right now, but we will be fixing those shortly :) For now just listen to this peaceful song", encrypted: 'false' },
        { postSource: 'https://github.com/SquareTable/social-media-platform/raw/main/assets/ComputerSong.mp3', profilePictureSource: Images.posts.profile_picture, username: 'testing_audio', displayName: 'sebthemancreator', type: 'audio', timeUploadedAgo: '1 sec ago', bio: "Computer error song :) Also we are aware that sometimes the posts play the wrong audio and we will be fixing that shortly lol", encrypted: 'true' },
    ]);
    const goToProfileScreen = (name, userToNavigateTo, profilePictureUrl, displayName) => {
        name? 
        name === userToNavigateTo? navigation.navigate("Welcome", {backButtonHidden: false, imageFromRoute: null}) : navigation.navigate("VisitingProfileScreen", {name: userToNavigateTo, photoUrl: profilePictureUrl, displayName: displayName}) 
        : alert("An error occured");
    }
    
    const changeOptionsView = (PostOwner, PostEncrypted) => {
        if (ProfileOptionsViewState == true) {
            setUsernameToReport(PostOwner);
            setPostEncrypted(PostEncrypted)
            setProfileOptionsViewState(false);
            setFlatListElementsEnabledState(false);
        } else {
            setUsernameToReport(null);
            setPostEncrypted(null);
            setProfileOptionsViewState(true);
            setFlatListElementsEnabledState(true);
        }
    }

    const OptionsViewMessageButtonOnPress = () => {
        alert("Coming soon");
    }

    const OptionsViewReportButtonOnPress = () => {
        setReportProfileOptionsViewState(false);
        setProfileOptionsViewState(true);
    }

    const changeReportProfilesOptionsView = () => {
        if (ReportProfileOptionsViewState == true) {
            setReportProfileOptionsViewState(false);
            setFlatListElementsEnabledState(false);
        } else {
            setReportProfileOptionsViewState(true);
            setFlatListElementsEnabledState(true);
        }
    }

    const changeReportProfiles_ContentThatShouldNotBePosted_OptionsView = () => {
        if (ReportProfile_ContentThatShouldNotBePosted_OptionsViewState == true) {
            setReportProfile_ContentThatShouldNotBePosted_OptionsViewState(false);
        } else {
            setReportProfile_ContentThatShouldNotBePosted_OptionsViewState(true);
        }
    }

    const changeReportProfiles_PretendingToBeSomeoneElse_OptionsView = () => {
        if (ReportProfile_PretendingToBeSomeoneElse_OptionsViewState == true) {
            setReportProfile_PretendingToBeSomeoneElse_OptionsViewState(false);
        } else {
            setReportProfile_PretendingToBeSomeoneElse_OptionsViewState(true);
        }
    }
    const [ReportProfileOptionsViewState, setReportProfileOptionsViewState] = useState(true);
    const [ReportProfile_ContentThatShouldNotBePosted_OptionsViewState, setReportProfile_ContentThatShouldNotBePosted_OptionsViewState] = useState(true);
    const [ReportProfile_PretendingToBeSomeoneElse_OptionsViewState, setReportProfile_PretendingToBeSomeoneElse_OptionsViewState] = useState(true);
    const [FlatListElementsEnabledState, setFlatListElementsEnabledState] = useState(true);
    // Start of checking for update and announce the update
    useEffect(() => {
        async function checkAndAnnounceUpdate() {
            const welcome_message = () => {
                alert("Welcome to SocialSquare, it looks like you have just downloaded this app for the first time! Nice! You are right now on development version " + development_version);
            };
            var development_version = '0.1.12';
            //Get data
            try {
                var development_version_localstorage_value = await AsyncStorage.getItem('development_version')
                if(development_version_localstorage_value !== null) {
                    if (development_version !== development_version_localstorage_value) {
                        console.log(development_version_localstorage_value);
                        var releaseNotes = "Fix all storedCredentials issues (so now usernames etc. show up) and added ads (1 ad gets shown per 5 posts shown)";
                        var alert_on_update = "SocialSquare has been updated to the latest version (dev version " + development_version + "). Changes in this update are: " + releaseNotes;
                        alert(alert_on_update);
                    } else {
                        console.log("Not updated");
                    }
                } else {
                    welcome_message();
                }
            } catch(e) {
                alert(e)
            }
            //Store data
            try {
                await AsyncStorage.setItem('development_version', development_version)
            } catch (e) {
                alert(e)
            }
        }
        checkAndAnnounceUpdate();
    }, [])
    // End of checking for update and announcing the update

    var deviceWidth = Dimensions.get('window').width

    const [showEndOfListMessage, setShowEndOfListMessage] = useState(false);

    const ViewportAwareView = Viewport.Aware(View);

    // Audio play and pause code
    const [playbackStatus, setPlaybackStatus] = useState(null);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [playRecording, setPlayRecording] = useState(undefined);
    const [PlayAudioInSilentMode, setPlayAudioInSilentMode] = useState(undefined);
        async function playAudio(recording_uri) {
            setIntentionallyPaused(false);
            if (playbackStatus != null && playRecording) {
                if (playbackStatus.isLoaded && !playbackStatus.isPlaying) {
                    const status = await playRecording.playAsync()
                    setPlaybackStatus(status);
                    setIsAudioPlaying(true);
                }
            }
            if (!playbackStatus && !playRecording) {
                await Audio.setAudioModeAsync({
                    playsInSilentModeIOS: PlayAudioInSilentMode,
                });
                var play_sound = new Audio.Sound();
                setPlayRecording(play_sound);
                let status_update_num = 0;
                try {
                    console.log("Loading sound")
                    await play_sound.loadAsync(
                        { uri: recording_uri },
                        { shouldPlay: true },
                        { progressUpdateIntervalMillis: 100 }
                    );
                    await play_sound.setVolumeAsync(1);
                    console.log('Loaded Sound');
                    console.log("Playing sound");
                    play_sound.setOnPlaybackStatusUpdate(async (status) => {
                        setPlaybackStatus(status);
                        status_update_num += 1;
                        console.log("Playback status update num = " + status_update_num);
                        if (status.didJustFinish === true) {
                        // audio has finished!
                        await play_sound.unloadAsync()
                        setIsAudioPlaying(false);
                        setPlaybackStatus(null);
                        setPlayRecording(undefined);
                        }
                    })
                    await play_sound.playAsync();
                    setIsAudioPlaying(true);
                    
                } catch (error) {
                    console.log("Error when playing sound:", error);
                    alert("An error has occured. " + error)
                }
            }
        }

        async function pauseAudio(intentionallyPaused) {
            if (intentionallyPaused == true) {
                setIntentionallyPaused(true);
            } else {
                setIntentionallyPaused(false);
            }
            if (playRecording) {
                setIsAudioPlaying(false);
                await playRecording.pauseAsync();
            } else {
                setIsAudioPlaying(false);
            }
        }

        async function unloadAudio() {
            await playRecording.unloadAsync();
            setIsAudioPlaying(false);
            setPlaybackStatus(null);
            setPlayRecording(undefined);
            console.log('Unloaded audio')
        }

        const isFocused = useIsFocused()
        isFocused ? null : playRecording ? unloadAudio() : null


    //End of Audio play and pause code

    const [intentionallyPaused, setIntentionallyPaused] = useState(false);

    const [filterMenuShown, setFilterMenuShown] = useState(true)

    const changeFilterView = () => {
        if (filterMenuShown == false) {
            setFilterMenuShown(true)
            setFlatListElementsEnabledState(true)
        } else {
            setFilterMenuShown(false)
            setFlatListElementsEnabledState(false)
        }
    }

    const [homeScreenSettingsMenuShown, setHomeScreenSettingsMenuShown] = useState(true)

    const changeHomeScreenSettingsMenuView = () => {
        if (homeScreenSettingsMenuShown == false) {
            setHomeScreenSettingsMenuShown(true)
            setFlatListElementsEnabledState(true)
        } else {
            setHomeScreenSettingsMenuShown(false)
            setFlatListElementsEnabledState(false)
        }
    }

    useEffect(() => {
        async function checkToShowUpdateSimpleStylesWarning() {
            const lastVersionUsed = await AsyncStorage.getItem('versionLastShownForSimpleStylingUpdateWarning')
            const simpleStylingData = JSON.parse(await AsyncStorage.getItem('simpleStylingData'))
            let lowestVersion = 9999;
            console.log('LAST VERSION USED IS ' + lastVersionUsed)
            if (simpleStylingData) {
                for (let i = 0; i < simpleStylingData.length; i++) {
                    if (simpleStylingData[i].stylingVersion < lowestVersion) {
                        lowestVersion = simpleStylingData[i].stylingVersion
                    }
                    if (simpleStylingData[i].stylingVersion == undefined) {
                        lowestVersion = 1
                    }
                }
                console.log(lowestVersion)
                console.log(lastVersionUsed)
                if (lastVersionUsed == null) {
                    console.log('Last version used is null. Now running the code for null')
                    if (lowestVersion < SimpleStylingVersion) {
                        if (AppStylingContextState == 'Default' || AppStylingContextState == 'Dark' || AppStylingContextState == 'Light' || AppStylingContextState == 'PureDark' || AppStylingContextState == 'PureLight') {
                            setAppStylingContextState('Default')
                            console.warn('Setting styling to Default')
                        }
                        setUpdateSimpleStylesWarningHidden(false)
                        setFlatListElementsEnabledState(false)
                    }
                    AsyncStorage.setItem('versionLastShownForSimpleStylingUpdateWarning', SimpleStylingVersion.toString())
                } else {
                    if (parseInt(lastVersionUsed) < SimpleStylingVersion) {
                        console.log('Last version used is less than current simple styling version')
                        if (AppStylingContextState == 'Default' || AppStylingContextState == 'Dark' || AppStylingContextState == 'Light' || AppStylingContextState == 'PureDark' || AppStylingContextState == 'PureLight') {
                            setAppStylingContextState('Default')
                            console.warn('Setting styling to Default')
                        }
                        setUpdateSimpleStylesWarningHidden(false)
                        setFlatListElementsEnabledState(false)
                        AsyncStorage.setItem('versionLastShownForSimpleStylingUpdateWarning', SimpleStylingVersion.toString())
                    }
                }
            } else {
                console.log('No simple styling data')
            }
        }
        checkToShowUpdateSimpleStylesWarning()
    }, [])

    return(
        <View
         style={{flex: 1, backgroundColor: colors.primary, paddingTop: StatusBarHeight}}
         >
            <StatusBar color={colors.StatusBarColor}/>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: colors.tertiary, marginLeft: 3}}>SocialSquare BETA</Text>
                <TouchableOpacity style={{position: 'absolute', right: 55}} disabled={!FlatListElementsEnabledState} onPress={changeHomeScreenSettingsMenuView}>
                    <Image
                        source={require('../assets/app_icons/settings.png')}
                        style={{ width: 32, height: 32, tintColor: colors.tertiary}}
                        resizeMode="contain"
                        resizeMethod="resize"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{position: 'absolute', right: 10}} disabled={!FlatListElementsEnabledState} onPress={changeFilterView}>
                    <Image source={require('../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/348-filter.png')} style={{width: 32, height: 32, tintColor: colors.tertiary}}/>
                </TouchableOpacity>
            </View>
            <OfflineNotice bottom={true}/>
            <ProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={updateSimpleStylesWarningHidden}>
                <ScrollView style={{marginHorizontal: 10}}>
                    <Text style={{color: colors.errorColor ? colors.errorColor : 'red', fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>SocialSquare has recently been updated and the custom styles that you currently have are now out of date.</Text>
                    <Text style={{color: colors.tertiary, fontSize: 18, textAlign: 'center', marginVertical: 10}}>At least one of your custom styles are now outdated and SocialSquare now only supports version {SimpleStylingVersion}.</Text>
                    <StyledButton 
                        style={{marginVertical: 20, height: 'auto'}}
                        onPress={() => {
                            setUpdateSimpleStylesWarningHidden(true)
                            navigation.navigate('Profile', {
                                screen: 'Welcome',
                                params: {backButtonHidden: true, imageFromRoute: null, goToStylingMenu: true},
                            });
                        }}
                    >
                        <ButtonText style={{textAlign: 'center'}}>Go to custom stylings screen to update them and never show this message again</ButtonText>
                    </StyledButton>
                    <StyledButton onPress={() => {setUpdateSimpleStylesWarningHidden(true)}} style={{height: 'auto'}}>
                        <ButtonText style={{textAlign: 'center'}}>Ignore this message and never show it again</ButtonText>
                    </StyledButton>
                </ScrollView>
            </ProfileOptionsView>
            <ProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={filterMenuShown}>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
                    <TouchableOpacity style={{position: 'absolute', left: 10}} onPress={changeFilterView}>
                        <Image
                        source={require('../assets/app_icons/back_arrow.png')}
                        style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, tintColor: colors.tertiary}}
                        resizeMode="contain"
                        resizeMethod="resize"
                        />
                    </TouchableOpacity>
                    <Text style={{textAlign: 'center', color: colors.tertiary, fontSize: 30, alignSelf: 'center'}}>Filter</Text>
                </View>
                <ProfileOptionsViewSubtitleText style={{color: colors.tertiary}}>Coming soon</ProfileOptionsViewSubtitleText>
                <ScrollView style={{width: '100%'}}>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                        <View style={{flexDirection: 'column', flex: 1, alignItems: 'center'}}>
                            <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold', marginVertical: 10}}>Photos</Text>
                            <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold', marginVertical: 10}}>Videos</Text>
                            <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold', marginVertical: 10}}>Audio</Text>
                            <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold', marginVertical: 10}}>Threads</Text>
                            <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold', marginVertical: 10}}>Polls</Text>
                            <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold', marginVertical: 10}}>Categories</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                            <SwitchToggle
                                switchOn={showPhotos}
                                onPress={() => {setContextAndAsyncStorage('ShowPhotos')}}
                                circleColorOff={colors.tertiary}
                                circleColorOn={dark? colors.teritary : colors.primary}
                                backgroundColorOn={colors.darkestBlue}
                                backgroundColorOff={colors.borderColor}
                                containerStyle={{
                                    width: 50,
                                    height: 28,
                                    borderRadius: 25,
                                    padding: 5,
                                    marginVertical: 6.7
                                }}
                                circleStyle={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 20,
                                }}
                            />
                            <SwitchToggle
                                switchOn={showVideos}
                                onPress={() => {setContextAndAsyncStorage('ShowVideos')}}
                                circleColorOff={colors.tertiary}
                                circleColorOn={dark? colors.teritary : colors.primary}
                                backgroundColorOn={colors.darkestBlue}
                                backgroundColorOff={colors.borderColor}
                                containerStyle={{
                                    width: 50,
                                    height: 28,
                                    borderRadius: 25,
                                    padding: 5,
                                    marginVertical: 6.7
                                }}
                                circleStyle={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 20,
                                }}
                            />
                            <SwitchToggle
                                switchOn={showAudio}
                                onPress={() => {setContextAndAsyncStorage('ShowAudio')}}
                                circleColorOff={colors.tertiary}
                                circleColorOn={dark? colors.teritary : colors.primary}
                                backgroundColorOn={colors.darkestBlue}
                                backgroundColorOff={colors.borderColor}
                                containerStyle={{
                                    width: 50,
                                    height: 28,
                                    borderRadius: 25,
                                    padding: 5,
                                    marginVertical: 6.7
                                }}
                                circleStyle={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 20,
                                }}
                            />
                            <SwitchToggle
                                switchOn={showThreads}
                                onPress={() => {setContextAndAsyncStorage('ShowThreads')}}
                                circleColorOff={colors.tertiary}
                                circleColorOn={dark? colors.teritary : colors.primary}
                                backgroundColorOn={colors.darkestBlue}
                                backgroundColorOff={colors.borderColor}
                                containerStyle={{
                                    width: 50,
                                    height: 28,
                                    borderRadius: 25,
                                    padding: 5,
                                    marginVertical: 6.7
                                }}
                                circleStyle={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 20,
                                }}
                            />
                            <SwitchToggle
                                switchOn={showPolls}
                                onPress={() => {setContextAndAsyncStorage('ShowPolls')}}
                                circleColorOff={colors.tertiary}
                                circleColorOn={dark? colors.teritary : colors.primary}
                                backgroundColorOn={colors.darkestBlue}
                                backgroundColorOff={colors.borderColor}
                                containerStyle={{
                                    width: 50,
                                    height: 28,
                                    borderRadius: 25,
                                    padding: 5,
                                    marginVertical: 6.7
                                }}
                                circleStyle={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 20,
                                }}
                            />
                            <SwitchToggle
                                switchOn={showCategories}
                                onPress={() => {setContextAndAsyncStorage('ShowCategories')}}
                                circleColorOff={colors.tertiary}
                                circleColorOn={dark? colors.teritary : colors.primary}
                                backgroundColorOn={colors.darkestBlue}
                                backgroundColorOff={colors.borderColor}
                                containerStyle={{
                                    width: 50,
                                    height: 28,
                                    borderRadius: 25,
                                    padding: 5,
                                    marginVertical: 6.7
                                }}
                                circleStyle={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 20,
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </ProfileOptionsView>
            <ProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={homeScreenSettingsMenuShown}>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
                    <TouchableOpacity style={{position: 'absolute', left: 10}} onPress={changeHomeScreenSettingsMenuView}>
                        <Image
                        source={require('../assets/app_icons/back_arrow.png')}
                        style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, tintColor: colors.tertiary}}
                        resizeMode="contain"
                        resizeMethod="resize"
                        />
                    </TouchableOpacity>
                    <Text style={{textAlign: 'center', color: colors.tertiary, fontSize: 24, alignSelf: 'center'}}>Home Screen Settings</Text>
                </View>
                <ScrollView style={{width: '100%'}}>
                    <View style={{flex: 2, flexDirection: 'row', marginHorizontal: 30, marginVertical: 20, justifyContent: 'space-evenly', minHeight: 30, height: 30, maxHeight: 30}}>
                        <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold'}}>Play Audio in Silent Mode</Text>
                        <SwitchToggle
                            switchOn={PlayAudioInSilentMode}
                            onPress={() => {setContextAndAsyncStorage('PlayAudioInSilentMode')}}
                            circleColorOff={colors.tertiary}
                            circleColorOn={dark? colors.teritary : colors.primary}
                            backgroundColorOn={colors.darkestBlue}
                            backgroundColorOff={colors.borderColor}
                            containerStyle={{
                                width: 50,
                                height: 28,
                                borderRadius: 25,
                                padding: 5,
                            }}
                            circleStyle={{
                                width: 20,
                                height: 20,
                                borderRadius: 20,
                            }}
                        />
                    </View>
                    <View style={{flex: 2, flexDirection: 'row', marginHorizontal: 30, marginVertical: 20, justifyContent: 'space-evenly', minHeight: 30, height: 30, maxHeight: 30}}>
                        <Text style={{color: colors.tertiary, fontSize: 18, fontWeight: 'bold'}}>Mute video in Silent Mode</Text>
                        <SwitchToggle
                            switchOn={PlayVideoSoundInSilentMode}
                            onPress={() => {setContextAndAsyncStorage('PlayVideoSoundInSilentMode')}}
                            circleColorOff={colors.tertiary}
                            circleColorOn={dark? colors.teritary : colors.primary}
                            backgroundColorOn={colors.darkestBlue}
                            backgroundColorOff={colors.borderColor}
                            containerStyle={{
                                width: 50,
                                height: 28,
                                borderRadius: 25,
                                padding: 5,
                            }}
                            circleStyle={{
                                width: 20,
                                height: 20,
                                borderRadius: 20,
                            }}
                        />
                    </View>
                </ScrollView>
            </ProfileOptionsView>
            <ProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={ProfileOptionsViewState}>
                <ProfileOptionsViewText style={{color: colors.tertiary}}>{usernameToReport || "Couldn't get name"}</ProfileOptionsViewText>
                <ProfileOptionsViewSubtitleText style={{color: colors.tertiary}}>Options</ProfileOptionsViewSubtitleText>
                <ProfileOptionsViewButtons greyButton={true} onPress={changeOptionsView}>
                    <ProfileOptionsViewButtonsText greyButton={true}>Cancel</ProfileOptionsViewButtonsText>
                </ProfileOptionsViewButtons> 
                <ProfileOptionsViewButtons greyButton={true} onPress={OptionsViewMessageButtonOnPress}>
                    <ProfileOptionsViewButtonsText greyButton={true}>Message</ProfileOptionsViewButtonsText>
                </ProfileOptionsViewButtons>
                <ProfileOptionsViewButtons redButton={true} onPress={OptionsViewReportButtonOnPress}>
                    <ProfileOptionsViewButtonsText redButton={true}>Report</ProfileOptionsViewButtonsText>
                </ProfileOptionsViewButtons> 
            </ProfileOptionsView>
                {postEncrypted == 'false' ?
                    <ReportProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={ReportProfileOptionsViewState} post={true}>
                        <ReportProfileOptionsViewText style={{color: colors.tertiary}}>{"Report " + usernameToReport || "Report profile"}</ReportProfileOptionsViewText>
                        <ReportProfileOptionsViewSubtitleText style={{color: colors.tertiary}}>Use this page to report this profile. If anyone is in danger immediately call emergency services. Do Not Wait.</ReportProfileOptionsViewSubtitleText>
                        <ReportProfileOptionsViewButtons greyButton={true} onPress={changeReportProfilesOptionsView}>
                            <ReportProfileOptionsViewButtonsText greyButton={true}>Cancel</ReportProfileOptionsViewButtonsText>
                        </ReportProfileOptionsViewButtons>
                        <ReportProfileOptionsViewButtons redButton={true} onPress={changeReportProfiles_ContentThatShouldNotBePosted_OptionsView}>
                            <ReportProfileOptionsViewButtonsText redButton={true}>This post is content that should not be on SocialSquare.</ReportProfileOptionsViewButtonsText>
                        </ReportProfileOptionsViewButtons>
                        <ReportProfileOptionsViewButtons redButton={true} onPress={changeReportProfiles_PretendingToBeSomeoneElse_OptionsView}>
                            <ReportProfileOptionsViewButtonsText redButton={true}>This post is pretending to be someone they're not</ReportProfileOptionsViewButtonsText>
                        </ReportProfileOptionsViewButtons>
                    </ReportProfileOptionsView>
                :
                    <ReportProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={ReportProfileOptionsViewState} post={true}>
                        <ReportProfileOptionsViewButtons greyButton={true} onPress={changeReportProfilesOptionsView}>
                            <ReportProfileOptionsViewButtonsText greyButton={true}>Cancel</ReportProfileOptionsViewButtonsText>
                        </ReportProfileOptionsViewButtons>
                        <Text style={{fontSize: 24, color: colors.tertiary, textAlign: 'center', marginVertical: 30}}>This post is encrypted. Because this post is encrypted, SocialSquare cannot look at the post and therefore we can not take any action on it.</Text>
                        <Text style={{fontStyle: 'italic', color: 'red', fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>If anyone is in immediate danger, call emergency services. Do Not Wait.</Text>
                    </ReportProfileOptionsView>
                }
            <ReportProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={ReportProfile_ContentThatShouldNotBePosted_OptionsViewState}>
                <ReportProfileOptionsViewText style={{color: colors.tertiary}}>{"Report " + usernameToReport || "Report profile"}</ReportProfileOptionsViewText>
                <ReportProfileOptionsViewSubtitleText style={{color: colors.tertiary}}>What content are you trying to report?</ReportProfileOptionsViewSubtitleText>
                <ReportProfileOptionsViewButtons padding={true} paddingAmount={'100px'}greyButton={true} onPress={changeReportProfiles_ContentThatShouldNotBePosted_OptionsView}>
                    <ReportProfileOptionsViewButtonsText greyButton={true}>Back</ReportProfileOptionsViewButtonsText>
                </ReportProfileOptionsViewButtons>
                <ScrollView style={{width: '100%'}}>
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>It's spam</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons>
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>Nudity or sexual activity</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>I just don't like it</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>Hate speech or symbols</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>Suicide, self-injury or eating disorders</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>Sale of illegal or regulated goods</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>Violence or dangerous organizations</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>Bullying or harassment</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>Intellectual property violation</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>Scam or fraud</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>False information</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons>
                </ScrollView>
            </ReportProfileOptionsView>
            <ReportProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={ReportProfile_PretendingToBeSomeoneElse_OptionsViewState}>
                <ReportProfileOptionsViewText style={{color: colors.tertiary}}>{"Report " + usernameToReport || "Report profile"}</ReportProfileOptionsViewText>
                <ReportProfileOptionsViewSubtitleText style={{color: colors.tertiary}}>User Is Pretending To Be Someone Else</ReportProfileOptionsViewSubtitleText>
                <ReportProfileOptionsViewButtons greyButton={true} onPress={changeReportProfiles_PretendingToBeSomeoneElse_OptionsView}>
                    <ReportProfileOptionsViewButtonsText greyButton={true}>Back</ReportProfileOptionsViewButtonsText>
                </ReportProfileOptionsViewButtons>
                <ScrollView style={{width: '100%'}}>
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>This account is pretending to be me</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>This account is pretending to be someone I know</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>This account is pretending to be a celebrity or public figure</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>This account is pretending to be a business or organisation</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                </ScrollView>
            </ReportProfileOptionsView>
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 30, color: colors.tertiary, textAlign: 'center', fontWeight: 'bold'}}>Feed coming soon</Text>
                <Text style={{fontSize: 80, color: colors.tertiary, textAlign: 'center', fontWeight: 'bold'}}>😀</Text>
                <View style={{borderColor: colors.borderColor, borderWidth: 3, borderRadius: 20, padding: 30, marginHorizontal: '3%'}}>
                    <Text style={{fontSize: 15, color: colors.tertiary, textAlign: 'center', fontWeight: 'bold'}}>If there is an ad showing in this box that means the code is working lol</Text>
                    <Text style={{fontSize: 15, color: colors.tertiary, textAlign: 'center', fontWeight: 'bold', marginVertical: 20}}>If there is no ad then Google sucks</Text>
                    <View style={{alignSelf: 'center'}}>
                        <AdMobBanner
                            bannerSize="mediumRectangle"
                            adUnitID={AdID}
                            servePersonalizedAds={false}
                            onDidFailToReceiveAdWithError={(e) => {console.log(e)}}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export {HomeScreen};