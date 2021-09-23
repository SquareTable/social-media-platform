import React, { useState, useContext, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Alert, Dimensions} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from "expo-constants";
import styled from "styled-components";
import Images from "../posts/images.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
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
    ReportProfileOptionsViewText
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

const HomeScreen = ({navigation}) => {
    const [usernameToReport, setUsernameToReport] = useState(null);
    const [ProfileOptionsViewState, setProfileOptionsViewState] = useState(true);
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {AdID, setAdID} = useContext(AdIDContext);
    if (storedCredentials) {var {name, displayName, email, photoUrl} = storedCredentials}
    if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }
    const {colors, dark} = useTheme();
    const [Posts, setPosts] = useState([
        { postSource: Images.posts.social_studies_1, profilePictureSource: Images.posts.profile_picture, username: 'testing_progressive_images', displayName: 'testing_progressive_imgs', type: 'post', timeUploadedAgo: '1 sec ago', bio: 'We are currently testing posts with progressive images, so if your internet is slow it will show a thumbnail image while the post is downloading. This post is the only post that will have a progressive image on it, and once we have finished testing it we will put it on all posts.' },
        { postSource: Images.posts.social_studies_1, profilePictureSource: Images.posts.profile_picture, username: 'sebthemancreator', displayName: 'sebthemancreator', type: 'post', timeUploadedAgo: '4 hours ago', bio: 'Seb and Kovid are cool' },
        { postSource: Images.posts.social_studies_2, profilePictureSource: Images.posts.profile_picture, username: 'sebthemancreator', displayName: 'sebthemancreator', type: 'post', timeUploadedAgo: '4 hours ago', bio: 'Seb and Kovid are cool' },
        { postSource: Images.posts.social_studies_3, profilePictureSource: Images.posts.profile_picture, username: 'sebthemancreator', displayName: 'sebthemancreator', type: 'post', timeUploadedAgo: '4 hours ago', bio: 'Seb and Kovid are cool' },
        { postSource: Images.posts.social_studies_4, profilePictureSource: Images.posts.profile_picture, username: 'sebthemancreator', displayName: 'sebthemancreator', type: 'post', timeUploadedAgo: '4 hours ago', bio: 'Seb and Kovid are cool' },
        { postSource: Images.posts.social_studies_5, profilePictureSource: Images.posts.profile_picture, username: 'sebthemancreator', displayName: 'sebthemancreator', type: 'post', timeUploadedAgo: '4 hours ago', bio: 'Seb and Kovid are cool' },
        { postSource: Images.posts.apple, profilePictureSource: Images.posts.apple, username: 'ILoveApples', displayName: 'AppleKid', type: 'post', timeUploadedAgo: '4 hours ago', bio: 'Seb and Kovid are cool' },
        { postSource: 'https://github.com/SquareTable/social-media-platform/raw/main/assets/test_audio.mp3', profilePictureSource: Images.posts.profile_picture, username: 'testing_audio', displayName: 'sebthemancreator', type: 'audio', timeUploadedAgo: '1 sec ago', bio: "Hello! This is an audio post. There are quite a few bugs with it right now, but we will be fixing those shortly :) For now just listen to me say hi until I run out of breath lol" },
        { postSource: 'https://github.com/SquareTable/social-media-platform/raw/main/assets/sussy_baka_jacob.mp3', profilePictureSource: Images.posts.profile_picture, username: 'testing_audio', displayName: 'sebthemancreator', type: 'audio', timeUploadedAgo: '1 sec ago', bio: "Why does Jacob have to be such a sussy baka! :( Also we are aware that sometimes the posts play the wrong audio and we will be fixing that shortly lol" },
    ]);
    const goToProfileScreen = (name, userToNavigateTo, profilePictureUrl, displayName) => {
        name? 
        name === userToNavigateTo? navigation.navigate("Welcome", {backButtonHidden: false}) : navigation.navigate("VisitingProfileScreen", {name: userToNavigateTo, photoUrl: profilePictureUrl, displayName: displayName}) 
        : alert("An error occured");
    }
    
    const changeOptionsView = (PostOwner) => {
        if (ProfileOptionsViewState == true) {
            setUsernameToReport(PostOwner);
            setProfileOptionsViewState(false);
            setFlatListElementsEnabledState(false);
        } else {
            setUsernameToReport(null);
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
    // End of checking for update and announcing the update

    var deviceWidth = Dimensions.get('window').width

    const [showEndOfListMessage, setShowEndOfListMessage] = useState(false);

    const ViewportAwareView = Viewport.Aware(View);

    // Audio play and pause code
    const [playbackStatus, setPlaybackStatus] = useState(null);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [playRecording, setPlayRecording] = useState(undefined)
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
                    playsInSilentModeIOS: true,
                }); 
                var play_sound = new Audio.Sound();
                setPlayRecording(play_sound);
                let status_update_num = 0;
                try {
                    console.log("Loading sound")
                    await play_sound.loadAsync(
                        { uri: recording_uri },
                        { shouldPlay: true },
                        { progressUpdateIntervalMillis: 100 },
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
        }

    //End of Audio play and pause code

    const [intentionallyPaused, setIntentionallyPaused] = useState(false);

    return(
        <SafeAreaView
         style={{flex: 1, backgroundColor: colors.primary, paddingLeft: 10}}
         >
            <Text style={{fontSize: 30, fontWeight: 'bold', alignContent: 'center', alignItems: 'center', alignSelf: 'center', color: colors.tertiary}}>SocialSquare BETA</Text>
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
            <Viewport.Tracker>
                <FlatList 
                    data={Posts}
                    scrollEnabled={FlatListElementsEnabledState}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => 'key'+index}
                    onEndReached={() => {setShowEndOfListMessage(true)}}
                    ListFooterComponent={<Text style={{color: colors.tertiary, borderColor: colors.borderColor, borderWidth: 3, fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingVertical: 10}}>It looks like you have reached the end</Text>}
                    renderItem={({ item, index }) => ( 
                        <View>
                            {item.type == 'post' ?
                            <View style={{marginBottom: 20}}>
                                <View style={{flex: 2, flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10}}>
                                    <TouchableOpacity disabled={!FlatListElementsEnabledState} onPress={() => goToProfileScreen(name, item.username, item.profilePictureSource, item.displayName)}>
                                        <Image
                                            source={item.profilePictureSource || require('../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/266-question.png')}
                                            style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2}}
                                            resizeMode="contain"
                                            resizeMethod="resize"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity disabled={!FlatListElementsEnabledState} onPress={() => goToProfileScreen(name, item.username, item.profilePictureSource, item.displayName)}>
                                        <Text numberOfLines={1} style={{color: colors.tertiary, textAlign: 'left', fontWeight:'bold', fontSize: 20, textAlignVertical:'bottom', marginLeft: 10, marginRight: 100, flex: 1}}>{item.displayName || item.username || "Couldn't get name"}</Text>
                                    </TouchableOpacity>
                                    <View style={{position: 'absolute', right: 10}}>
                                        <TouchableOpacity disabled={!FlatListElementsEnabledState} onPress={() => changeOptionsView(item.username)}>
                                            <Image
                                                source={require('../assets/app_icons/3dots.png')}
                                                style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, tintColor: colors.tertiary}}
                                                resizeMode="contain"
                                                resizeMethod="resize"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View>
                                    <ScalableProgressiveImage
                                        source={dark? item.postSource || require('../assets/app_icons/cannot_get_post_darkmode.png') : item.postSource || require('../assets/app_icons/cannot_get_post_lightmode.png')}
                                        width={deviceWidth}
                                        height={1000}
                                    />
                                </View>
                                <View style={{flex: 2, flexDirection: 'row', marginTop: 10}}>
                                    <TouchableOpacity style={{marginLeft: '1%'}} disabled={!FlatListElementsEnabledState} onPress={() => {alert("The Like Button does not work yet. We will add functionality to this very shortly.")}}>
                                        <Image
                                            source={Images.posts.heart}
                                            style={{width: 40, height: 40, tintColor: colors.tertiary}}
                                            resizeMode="contain"
                                            resizeMethod="resize"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{marginHorizontal: '8%'}} disabled={!FlatListElementsEnabledState} onPress={() => {alert("The Comment Button does not work yet. We will add functionality to this very shortly.")}}>
                                        <Image
                                            source={Images.posts.message_bubbles}
                                            style={{width: 40, height: 40, tintColor: colors.tertiary}}
                                            resizeMode="contain"
                                            resizeMethod="resize"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{marginLeft: '50%'}} disabled={!FlatListElementsEnabledState} onPress={() => {alert("The Save Button does not work yet. We will add functionality to this very shortly.")}}>
                                        <Image
                                            source={Images.posts.bookmark}
                                            style={{width: 40, height: 40, tintColor: colors.tertiary}}
                                            resizeMode="contain"
                                            resizeMethod="resize"
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex: 2, flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10}}>
                                    <Text style={{color: colors.tertiary, fontSize: 16, marginLeft: 2, fontWeight: 'bold'}}>{item.timeUploadedAgo}</Text>
                                    <Text style={{color: colors.tertiary, fontSize: 16, marginLeft: 10, flex: 1, marginRight: 5}}>{item.bio}</Text>
                                </View>
                            </View>
                            : null}
                            {item.type == 'audio' ?
                                <ViewportAwareView
                                    onViewportEnter={() => {intentionallyPaused? null : playAudio(item.postSource)}}
                                    onViewportLeave={() => {unloadAudio()}}
                                    preTriggerRatio={-0.5} // Makes it so half of the element has to be shown before it triggers onViewportEnter
                                >
                                    <View style={{marginBottom: 20}}>
                                        <View style={{flex: 2, flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10, marginHorizontal: 10}}>
                                            <TouchableOpacity disabled={!FlatListElementsEnabledState} onPress={() => goToProfileScreen(name, item.username, item.profilePictureSource, item.displayName)}>
                                                <Image
                                                    source={item.profilePictureSource || require('../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/266-question.png')}
                                                    style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2}}
                                                    resizeMode="cover"
                                                    resizeMethod="resize"
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity disabled={!FlatListElementsEnabledState} onPress={() => goToProfileScreen(name, item.username, item.profilePictureSource, item.displayName)}>
                                                <Text numberOfLines={1} style={{color: colors.tertiary, textAlign: 'left', fontWeight:'bold', fontSize: 20, textAlignVertical:'bottom', marginLeft: 10, marginRight: 100, flex: 1}}>{item.displayName || item.username || "Couldn't get name"}</Text>
                                            </TouchableOpacity>
                                            <View style={{position: 'absolute', right: 10}}>
                                                <TouchableOpacity disabled={!FlatListElementsEnabledState} onPress={() => changeOptionsView(item.username)}>
                                                    <Image
                                                        source={require('../assets/app_icons/3dots.png')}
                                                        style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, tintColor: colors.tertiary}}
                                                        resizeMode="contain"
                                                        resizeMethod="resize"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{backgroundColor: colors.borderColor, flex: 2, justifyContent: 'center', alignItems: 'center', marginTop: 10, height: deviceWidth, width: deviceWidth}}>
                                            {playbackStatus ? 
                                            playbackStatus.isBuffering? 
                                            <View>
                                                <Text style={{color: colors.tertiary, fontSize: 24, textAlign: 'center', fontWeight: 'bold'}}>BUFFERING</Text> 
                                                <Icon
                                                    name="musical-notes-sharp"
                                                    size={200}
                                                    color={colors.tertiary}
                                                />
                                            </View>
                                            : playbackStatus.isPlaying? 
                                            <TouchableOpacity onPress={() => {pauseAudio(true)}}>
                                                <Icon 
                                                    name="pause-circle-outline"
                                                    size={200}
                                                    color={colors.tertiary}
                                                />
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => {playAudio(item.postSource)}}>
                                                <Icon 
                                                    name="play-circle-outline"
                                                    size={200}
                                                    color={colors.tertiary}
                                                /> 
                                            </TouchableOpacity>
                                            : 
                                            <View>
                                                <Icon
                                                    name="musical-notes-sharp"
                                                    size={200}
                                                    color={colors.tertiary}
                                                />
                                            </View>}
                                        </View>
                                        <View style={{flex: 2, flexDirection: 'row', marginTop: 10}}>
                                            <TouchableOpacity style={{marginHorizontal: '1%'}} disabled={!FlatListElementsEnabledState} onPress={() => {alert("The Like Button does not work yet. We will add functionality to this very shortly.")}}>
                                                <Image
                                                    source={Images.posts.heart}
                                                    style={{width: 40, height: 40, tintColor: colors.tertiary}}
                                                    resizeMode="contain"
                                                    resizeMethod="resize"
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginHorizontal: '8%'}} disabled={!FlatListElementsEnabledState} onPress={() => {alert("The Comment Button does not work yet. We will add functionality to this very shortly.")}}>
                                                <Image
                                                    source={Images.posts.message_bubbles}
                                                    style={{width: 40, height: 40, tintColor: colors.tertiary}}
                                                    resizeMode="contain"
                                                    resizeMethod="resize"
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft: '50%'}} disabled={!FlatListElementsEnabledState} onPress={() => {alert("The Save Button does not work yet. We will add functionality to this very shortly.")}}>
                                                <Image
                                                    source={Images.posts.bookmark}
                                                    style={{width: 40, height: 40, tintColor: colors.tertiary}}
                                                    resizeMode="contain"
                                                    resizeMethod="resize"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{flex: 2, flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10}}>
                                            <Text style={{color: colors.tertiary, fontSize: 16, marginLeft: 2, fontWeight: 'bold'}}>{item.timeUploadedAgo}</Text>
                                            <Text style={{color: colors.tertiary, fontSize: 16, marginLeft: 10, flex: 1}}>{item.bio}</Text>
                                        </View>
                                    </View>
                                </ViewportAwareView>     
                            : null}
                            {index % 4 == 0 && index != 0 ? 
                            <View style={{alignSelf: 'center'}}>
                                <AdMobBanner
                                    bannerSize="mediumRectangle"
                                    adUnitID={AdID}
                                    servePersonalizedAds={false}
                                    onDidFailToReceiveAdWithError={(e) => {console.log(e)}}
                                />
                            </View> : null}
                        </View>
                    )}
                />
            </Viewport.Tracker>
        </SafeAreaView>
    );
};

export default HomeScreen;