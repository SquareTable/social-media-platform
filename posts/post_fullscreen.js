import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView, TouchableNativeFeedbackBase} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from "expo-constants";
import styled from "styled-components";
import Images from "../posts/images.js";
import ProgressiveImage from './ProgressiveImage.js';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@react-navigation/native';
import { CredentialsContext } from '../components/CredentialsContext.js';

const StatusBarHeight = Constants.statusBarHeight;
import {
    darkModeStyling, 
    darkModeOn, 
    lightModeStyling, 
    ProfileOptionsView, 
    ProfileOptionsViewButtons,
    ProfileOptionsViewButtonsText,
    ProfileOptionsViewSubtitleText,
    ProfileOptionsViewText,
    ReportProfileOptionsView,
    ReportProfileOptionsViewButtons,
    ReportProfileOptionsViewButtonsText,
    ReportProfileOptionsViewSubtitleText,
    ReportProfileOptionsViewText,
    Colors,
    FlexRow_NOJustifyContent,
    Post_Fullscreen_Title,
    SubTitle,
    Navigator_BackButton,
    TestText,
    Post_Fullscreen_Title_BackButton,
    Chat_Info_Icon_Styling
} from '../screens/screenStylings/styling.js';
import devModeOn from '../components/devModeOn.js';

const Post_FullScreen = ({route, navigation}) => {
    if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }
    const {post_id, profilePictureSource, username} = route.params;
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {name} = storedCredentials;
    const goToProfileScreen = () => {
        name ?
        navigation.navigate('ProfileScreen_FromFindScreenPost', { backButtonHidden: false })
        : alert("Error occured")
    }
    const [ProfileOptionsViewState, setProfileOptionsViewState] = useState(true);
    const [ReportProfileOptionsViewState, setReportProfileOptionsViewState] = useState(true);
    const changeProfilesOptionsView = () => {
        if (ProfileOptionsViewState == true) {
            setProfileOptionsViewState(false)
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setPageElementsState(false);
        }else{
            console.log("Closed Confirm")
            setProfileOptionsViewState(true)
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setPageElementsState(true);
        }
    }
    const ProfileOptionsViewMessageButtonOnPress = () => {
        alert("Coming soon");
    }
    const ProfileOptionsViewReportButtonOnPress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        changeProfilesOptionsView();
        changeReportProfilesOptionsView();
    }
    const changeReportProfilesOptionsView = () => {
        if (ReportProfileOptionsViewState == true) {
            setReportProfileOptionsViewState(false)
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setPageElementsState(false);
        }else{
            console.log("Closed Confirm")
            setReportProfileOptionsViewState(true)
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setPageElementsState(true);
        }
    }
    const [ReportProfile_ContentThatShouldNotBePosted_OptionsViewState, setReportProfile_ContentThatShouldNotBePosted_OptionsViewState] = useState(true)
    const changeReportProfiles_ContentThatShouldNotBePosted_OptionsView = () => {
        if (ReportProfile_ContentThatShouldNotBePosted_OptionsViewState == true) {
            setReportProfile_ContentThatShouldNotBePosted_OptionsViewState(false)
            changeReportProfilesOptionsView();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }else{
            console.log("Closed Confirm")
            setReportProfile_ContentThatShouldNotBePosted_OptionsViewState(true)
            changeReportProfilesOptionsView();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    }
    const [ReportProfile_PretendingToBeSomeoneElse_OptionsViewState, setReportProfile_PretendingToBeSomeoneElse_OptionsViewState] = useState(true)
    const changeReportProfiles_PretendingToBeSomeoneElse_OptionsView = () => {
        if (ReportProfile_PretendingToBeSomeoneElse_OptionsViewState == true) {
            setReportProfile_PretendingToBeSomeoneElse_OptionsViewState(false)
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }else{
            console.log("Closed Confirm")
            setReportProfile_PretendingToBeSomeoneElse_OptionsViewState(true)
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    }
    const [PageElementsState, setPageElementsState] = useState(true);
    const {tertiary, primary} = Colors;
    const {colors, dark} = useTheme();
    return(
        <View style={{backgroundColor: primary, height: '100%'}}>
            <ProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={ProfileOptionsViewState}>
                  <ProfileOptionsViewText style={{color: colors.tertiary}}>{username || "Couldn't get name"}</ProfileOptionsViewText>
                  <ProfileOptionsViewSubtitleText style={{color: colors.tertiary}}>Options</ProfileOptionsViewSubtitleText>
                  <ProfileOptionsViewButtons greyButton={true} onPress={changeProfilesOptionsView}>
                      <ProfileOptionsViewButtonsText greyButton={true}>Cancel</ProfileOptionsViewButtonsText>
                   </ProfileOptionsViewButtons> 
                   <ProfileOptionsViewButtons greyButton={true} onPress={ProfileOptionsViewMessageButtonOnPress}>
                      <ProfileOptionsViewButtonsText greyButton={true}>Message</ProfileOptionsViewButtonsText>
                   </ProfileOptionsViewButtons>
                   <ProfileOptionsViewButtons redButton={true} onPress={ProfileOptionsViewReportButtonOnPress}>
                       <ProfileOptionsViewButtonsText redButton={true}>Report</ProfileOptionsViewButtonsText>
                   </ProfileOptionsViewButtons> 
               </ProfileOptionsView>
               <ReportProfileOptionsView style={{backgroundColor: colors.primary}} post={true} viewHidden={ReportProfileOptionsViewState}>
                  <ReportProfileOptionsViewText style={{color: colors.tertiary}}>{"Report " + username || "Report profile"}</ReportProfileOptionsViewText>
                  <ReportProfileOptionsViewSubtitleText style={{color: colors.tertiary}}>Use this page to report this profile. If anyone is in danger immediately call emergency services. Do Not Wait.</ReportProfileOptionsViewSubtitleText>
                  <ReportProfileOptionsViewButtons greyButton={true} onPress={changeReportProfilesOptionsView}>
                      <ReportProfileOptionsViewButtonsText greyButton={true}>Cancel</ReportProfileOptionsViewButtonsText>
                   </ReportProfileOptionsViewButtons>
                   <ReportProfileOptionsViewButtons redButton={true} onPress={changeReportProfiles_ContentThatShouldNotBePosted_OptionsView}>
                       <ReportProfileOptionsViewButtonsText redButton={true}>This account is posting content that should not be on SocialSquare</ReportProfileOptionsViewButtonsText>
                   </ReportProfileOptionsViewButtons>
                   <ReportProfileOptionsViewButtons redButton={true} onPress={changeReportProfiles_PretendingToBeSomeoneElse_OptionsView}>
                       <ReportProfileOptionsViewButtonsText redButton={true}>This account is pretending to be someone they're not</ReportProfileOptionsViewButtonsText>
                   </ReportProfileOptionsViewButtons>
               </ReportProfileOptionsView>
               <ReportProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={ReportProfile_ContentThatShouldNotBePosted_OptionsViewState}>
                  <ReportProfileOptionsViewText style={{color: colors.tertiary}}>{"Report " + username || "Report profile"}</ReportProfileOptionsViewText>
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
                  <ReportProfileOptionsViewText style={{color: colors.tertiary}}>{"Report " + username || "Report profile"}</ReportProfileOptionsViewText>
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
                <View style={{backgroundColor: colors.primary, height: '100%', width: '100%'}}>
                    <SafeAreaView style={{backgroundColor: colors.primary, height: '100%'}}>
                        <Post_Fullscreen_Title style={{borderWidth: 0}}>
                            <Post_Fullscreen_Title_BackButton style={{borderColor: colors.tertiary}} onPress={() => {navigation.goBack()}}>
                                <Image
                                source={require('../assets/app_icons/back_arrow.png')}
                                style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, tintColor: colors.tertiary}}
                                resizeMode="contain"
                                resizeMethod="resize"
                                />
                            </Post_Fullscreen_Title_BackButton>
                            <TestText style={{textAlign: 'center', color: colors.tertiary}}>Find</TestText>
                        </Post_Fullscreen_Title>
                        <ScrollView style={{backgroundColor: colors.primary}} scrollEnabled={PageElementsState}>
                            <View style={{minWidth: 500, maxWidth: 500, width: 500, backgroundColor: colors.primary, alignSelf: 'center', zIndex: 100}}>
                                <View style={{maxWidth: 500, minWidth: 500, width: 500, alignContent: 'center', alignItems: 'center', alignSelf: 'center',}}>
                                    <View style={{maxWidth: 400, minWidth: 400}}>
                                        <View style={{flex: 2, flexDirection:'row'}}>
                                            <View style={{width:60}}>
                                                <TouchableOpacity onPressOut={goToProfileScreen} disabled={!PageElementsState}>
                                                    <Image
                                                        source={profilePictureSource || require('../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/266-question.png')}
                                                        style={{minHeight: 40, minWidth: 40, width: 40, height: 40, maxWidth: 40, maxHeight: 40, borderRadius: 40/2, position:'absolute', left:13}}
                                                        resizeMode="contain"
                                                        resizeMethod="resize"
                                                    />
                                                    <View style={{width:'100%', minHeight:42, height:42}}/>
                                                </TouchableOpacity>
                                            </View>
                                            <View>
                                                <TouchableOpacity onPressOut={goToProfileScreen} disabled={!PageElementsState}>
                                                    <Text style={{color: colors.tertiary, textAlign: 'left', fontWeight:'bold', fontSize: 20, textAlignVertical:'bottom'}}>{username || "Couldn't get name"}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{position: 'absolute', right: 20}}>
                                                <TouchableOpacity onPress={changeProfilesOptionsView} disabled={!PageElementsState}>
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
                                            {
                                                devModeOn?
                                                /* Image.resolveAssetSource(post_id).height*/
                                                    <ProgressiveImage
                                                        source={dark? post_id || require('../assets/app_icons/cannot_get_post_darkmode.png') : post_id || require('../assets/app_icons/cannot_get_post_lightmode.png')}
                                                        style={{height: 400, width: 400}}
                                                        resizeMode="contain"
                                                        resizeMethod="resize"
                                                    />
                                                :
                                                Image.getSize(post_id, (width, height) => {
                                                    <ProgressiveImage
                                                        source={dark? post_id || require('../assets/app_icons/cannot_get_post_darkmode.png') : post_id || require('../assets/app_icons/cannot_get_post_lightmode.png')}
                                                        style={{minHeight: height, minWidth: width, width: width, height: height, maxWidth: width, maxHeight: height}}
                                                        resizeMode="contain"
                                                        resizeMethod="resize"
                                                    />
                                                })
                                            }
                                        </View>
                                        <View style={{flex: 2, flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
                                            <View style={{height: 50, width: 65}}>
                                                <TouchableOpacity disabled={!PageElementsState} onPress={() => {alert("The Like Button does not work yet. We will add functionality to this very shortly.")}}>
                                                    <Image
                                                        source={Images.posts.heart}
                                                        style={{...styling.like_comment_save_buttons, tintColor: colors.tertiary}}
                                                        resizeMode="contain"
                                                        resizeMethod="resize"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{width: 50}}>
                                                <TouchableOpacity disabled={!PageElementsState} onPress={() => {alert("The Comment Button does not work yet. We will add functionality to this very shortly.")}}>
                                                    <Image
                                                        source={Images.posts.message_bubbles}
                                                        style={{...styling.like_comment_save_buttons, tintColor: colors.tertiary}}
                                                        resizeMode="contain"
                                                        resizeMethod="resize"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{width:50, position:'absolute', right: 20}}>
                                                <TouchableOpacity disabled={!PageElementsState} onPress={() => {alert("The Save Button does not work yet. We will add functionality to this very shortly.")}}>
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
                        </ScrollView>
                    </SafeAreaView>
                </View>
        </View>
    );
};

export default Post_FullScreen;