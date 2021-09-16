import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Alert} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from "expo-constants";
import styled from "styled-components";
import Images from "../posts/images.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';
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
import VisitingProfileScreen from '../screens/VisitingProfileScreen.js';
import devModeOn from '../components/devModeOn.js';


const HomeScreen = ({navigation}) => {
    const [usernameToReport, setUsernameToReport] = useState(null);
    const [ProfileOptionsViewState, setProfileOptionsViewState] = useState(true);
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {name, displayName, email, photoUrl} = storedCredentials;
    if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }
    const {colors, dark} = useTheme();
    const [Posts, setPosts] = useState([
        { postSource: Images.posts.social_studies_1, profilePictureSource: Images.posts.profile_picture, username: 'sebthemancreator', displayName: 'sebthemancreator' },
        { postSource: Images.posts.social_studies_2, profilePictureSource: Images.posts.profile_picture, username: 'sebthemancreator', displayName: 'sebthemancreator' },
        { postSource: Images.posts.social_studies_3, profilePictureSource: Images.posts.profile_picture, username: 'sebthemancreator', displayName: 'sebthemancreator' },
        { postSource: Images.posts.social_studies_4, profilePictureSource: Images.posts.profile_picture, username: 'sebthemancreator', displayName: 'sebthemancreator' },
        { postSource: Images.posts.social_studies_5, profilePictureSource: Images.posts.profile_picture, username: 'sebthemancreator', displayName: 'sebthemancreator' },
        { postSource: Images.posts.apple, profilePictureSource: Images.posts.apple, username: 'ILoveApples', displayName: 'AppleKid' }
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
        var development_version = '0.1.10';
        //Get data
        try {
            var development_version_localstorage_value = await AsyncStorage.getItem('development_version')
            if(development_version_localstorage_value !== null) {
            if (development_version !== development_version_localstorage_value) {
                console.log(development_version_localstorage_value);
                var releaseNotes = "Add App Introduction Screens and also revamp the Audio Post Page";
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
    return(
        <SafeAreaView
         style={{flex: 1, backgroundColor: colors.primary, paddingLeft: 10}}
         >
            <Text style={{fontSize: 30, fontWeight: 'bold', alignContent: 'center', alignItems: 'center', alignSelf: 'center', color: colors.tertiary}}>SocialSquare</Text>
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
            <FlatList 
                data={Posts}
                scrollEnabled={FlatListElementsEnabledState}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => 'key'+index}
                renderItem={({ item }) => ( 
                    <View style={{minWidth: 500, maxWidth: 500, width: 500, backgroundColor: colors.primary, alignSelf: 'center', zIndex: 100}}>
                        <View style={{maxWidth: 500, minWidth: 500, width: 500, alignContent: 'center', alignItems: 'center', alignSelf: 'center',}}>
                            <View style={{maxWidth: 400, minWidth: 400}}>
                                <View style={{flex: 2, flexDirection:'row'}}>
                                    <View style={{width:60}}>
                                        <TouchableOpacity disabled={!FlatListElementsEnabledState} onPress={() => goToProfileScreen(name, item.username, item.profilePictureSource, item.displayName)}>
                                            <Image
                                                source={item.profilePictureSource || require('../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/266-question.png')}
                                                style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, position:'absolute', left:13}}
                                                resizeMode="contain"
                                                resizeMethod="resize"
                                            />
                                            <View style={{width:'100%', minHeight:42, height:42}}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity disabled={!FlatListElementsEnabledState} onPress={() => goToProfileScreen(name, item.username, item.profilePictureSource, item.displayName)}>
                                            <Text style={{color: colors.tertiary, textAlign: 'left', fontWeight:'bold', fontSize: 20, textAlignVertical:'bottom'}}>{item.displayName || item.username || "Couldn't get name"}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{position: 'absolute', right: 20}}>
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
                                <View style={{backgroundColor: colors.primary, maxWidth: 400, minWidth: 400}}>
                                    <ProgressiveImage
                                        source={dark? item.postSource || require('../assets/app_icons/cannot_get_post_darkmode.png') : item.postSource || require('../assets/app_icons/cannot_get_post_lightmode.png')}
                                        style={{minHeight: 400, minWidth: 400, width: 400, height: 400, maxWidth: 400, maxHeight: 400}}
                                        resizeMode="contain"
                                        resizeMethod="resize"
                                    />
                                </View>
                                <View style={{flex: 2, flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
                                    <View style={{height: 50, width: 65}}>
                                        <TouchableOpacity disabled={!FlatListElementsEnabledState} onPress={() => {alert("The Like Button does not work yet. We will add functionality to this very shortly.")}}>
                                            <Image
                                                source={Images.posts.heart}
                                                style={{...styling.like_comment_save_buttons, tintColor: colors.tertiary}}
                                                resizeMode="contain"
                                                resizeMethod="resize"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{width: 50}}>
                                        <TouchableOpacity disabled={!FlatListElementsEnabledState} onPress={() => {alert("The Comment Button does not work yet. We will add functionality to this very shortly.")}}>
                                            <Image
                                                source={Images.posts.message_bubbles}
                                                style={{...styling.like_comment_save_buttons, tintColor: colors.tertiary}}
                                                resizeMode="contain"
                                                resizeMethod="resize"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{width:50, position:'absolute', right: 20}}>
                                        <TouchableOpacity disabled={!FlatListElementsEnabledState} onPress={() => {alert("The Save Button does not work yet. We will add functionality to this very shortly.")}}>
                                            <Image
                                                source={Images.posts.bookmark}
                                                style={{...styling.like_comment_save_buttons, tintColor: colors.tertiary}}
                                                resizeMode="contain"
                                                resizeMethod="resize"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;