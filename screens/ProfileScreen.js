import React, {useContext, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Image, View, Pressable, Text } from 'react-native';

import {
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    WelcomeImage,
    Avatar,
    StyledContainer,
    ProfileHorizontalView,
    ProfileHorizontalViewItem,
    ProfIcons,
    ProfInfoAreaImage,
    ProfileBadgesView,
    ProfileBadgeIcons,
    ProfilePostsSelectionView,
    ProfilePostsSelectionBtns,
    ProfileGridPosts,
    ProfileFeaturedPosts,
    ProfileTopBtns,
    TopButtonIcons,
    BackgroundDarkColor,
    darkModeOn,
    darkModeStyling,
    lightModeStyling,
    ProfileOptionsView,
    ProfileOptionsViewButtons,
    ProfileOptionsViewButtonsText,
    ProfileOptionsViewText,
    ProfileOptionsViewSubtitleText,
    ReportProfileOptionsView,
    ReportProfileOptionsViewButtons,
    ReportProfileOptionsViewButtonsText,
    ReportProfileOptionsViewSubtitleText,
    ReportProfileOptionsViewText,
    ViewHider
} from '../screens/screenStylings/styling.js';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import { ImageBackground, ScrollView, Touchable } from 'react-native';
import images from '../posts/images.js';
import * as Haptics from 'expo-haptics';
import {useTheme} from "@react-navigation/native"


const ProfileScreen = ({navigation, route}) => {
    const {backButtonHidden} = route.params;
    console.log(backButtonHidden)
     //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    if (storedCredentials) {var {name, displayName, email, photoUrl} = storedCredentials;}
    const AvatarImg = photoUrl ? {uri: photoUrl} : require('./../assets/img/Logo.png');
    const [gridViewState, setGridViewState] = useState("flex");
    const [featuredViewState, setFeaturedViewState] = useState("none");

    const clearLogin = () => {
        AsyncStorage.removeItem('socialSquareCredentials').then(() => {
            setStoredCredentials("");
        })
        .catch(error => console.log(error));
    }

    const changeToGrid = () => {
        if (gridViewState=="none") {
            setFeaturedViewState("none")
            setGridViewState("flex")
        }
    }

    const changeToFeatured = () => {
        if (featuredViewState=="none") {
            console.log("SussyBaka")
            setGridViewState("none")
            setFeaturedViewState("flex")
        }
    }

    const goToSettingsScreen = () => {
        navigation.navigate("SettingsScreen");
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }

    const [ProfileOptionsViewState, setProfileOptionsViewState] = useState(true)

    const changeProfilesOptionsView = () => {
        if (ProfileOptionsViewState == true) {
            setProfileOptionsViewState(false)
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setPageElementsState(true);
        }else{
            console.log("Closed Confirm")
            setProfileOptionsViewState(true)
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setPageElementsState(false);
        }
    }

    const ProfileOptionsViewMessageButtonOnPress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        alert("Coming soon");
    }

    const ProfileOptionsViewReportButtonOnPress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        changeProfilesOptionsView();
        changeReportProfilesOptionsView();
    }

    const [ReportProfileOptionsViewState, setReportProfileOptionsViewState] = useState(true)

    const changeReportProfilesOptionsView = () => {
        if (ReportProfileOptionsViewState == true) {
            setReportProfileOptionsViewState(false)
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setPageElementsState(true);
        }else{
            console.log("Closed Confirm")
            setReportProfileOptionsViewState(true)
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setPageElementsState(false);
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

    const [ReportProfile_MayBeUnder13_OptionsViewState, setReportProfile_MayBeUnder13_OptionsViewState] = useState(true)

    const changeReportProfiles_MayBeUnder13_OptionsView = () => {
        if (ReportProfile_MayBeUnder13_OptionsViewState == true) {
            setReportProfile_MayBeUnder13_OptionsViewState(false)
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            changeReportProfilesOptionsView();
        }else{
            console.log("Closed Confirm")
            setReportProfile_MayBeUnder13_OptionsViewState(true)
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            changeReportProfilesOptionsView();
        }
    }

    const [PageElementsState, setPageElementsState] = useState(false);
    const { colors } = useTheme();
    return(
            <BackgroundDarkColor style={{backgroundColor: colors.primary}}> 
                <ProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={ProfileOptionsViewState}>
                   <ProfileOptionsViewText style={{color: colors.tertiary}}>{name || "Couldn't get name"}</ProfileOptionsViewText>
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
                <ReportProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={ReportProfileOptionsViewState}>
                   <ReportProfileOptionsViewText style={{color: colors.tertiary}}>{"Report", name || "Report profile"}</ReportProfileOptionsViewText>
                   <ReportProfileOptionsViewSubtitleText style={{color: colors.tertiary}}>Use this page to report this profile. If anyone is in danger immediately call emergency services. Do Not Wait.</ReportProfileOptionsViewSubtitleText>
                   <ReportProfileOptionsViewButtons greyButton={true} onPress={changeReportProfilesOptionsView}>
                       <ReportProfileOptionsViewButtonsText greyButton={true}>Cancel</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons>
                    <ReportProfileOptionsViewButtons redButton={true} onPress={changeReportProfiles_ContentThatShouldNotBePosted_OptionsView}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>This account is posting content that should not be on SocialSquare</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons>
                    <ReportProfileOptionsViewButtons redButton={true} onPress={changeReportProfiles_MayBeUnder13_OptionsView}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>This account is run by someone under 13</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons> 
                    <ReportProfileOptionsViewButtons redButton={true} onPress={changeReportProfiles_PretendingToBeSomeoneElse_OptionsView}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>This account is pretending to be someone they're not</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons>
                </ReportProfileOptionsView>
                <ReportProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={ReportProfile_ContentThatShouldNotBePosted_OptionsViewState}>
                   <ReportProfileOptionsViewText style={{color: colors.tertiary}}>{"Report", name || "Report profile"}</ReportProfileOptionsViewText>
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
                <ReportProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={ReportProfile_MayBeUnder13_OptionsViewState}>
                   <ReportProfileOptionsViewText style={{color: colors.tertiary}}>{"Report", name || "Report profile"}</ReportProfileOptionsViewText>
                   <ReportProfileOptionsViewSubtitleText style={{color: colors.tertiary}}>User May Be Under 13</ReportProfileOptionsViewSubtitleText>
                   <ReportProfileOptionsViewButtons greyButton={true} onPress={changeReportProfiles_MayBeUnder13_OptionsView}>
                       <ReportProfileOptionsViewButtonsText greyButton={true}>Back</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons>
                    <Text style={{color: colors.tertiary, fontSize: 18, textAlign: 'center', marginTop: 25, marginBottom: 10}}>Everyone must be at least 13 to have a SocialSquare account. In some jurisdictions, this age limit may be higher. If you would like to report an account because it belongs to someone under the age of 13, or someone is impresonating your child who's under 13, please press the report button.</Text>
                    <ReportProfileOptionsViewButtons redButton={true} onPress={() => {alert("Coming soon")}}>
                        <ReportProfileOptionsViewButtonsText redButton={true}>Send report</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons>
                </ReportProfileOptionsView>
                <ReportProfileOptionsView style={{backgroundColor: colors.primary}} viewHidden={ReportProfile_PretendingToBeSomeoneElse_OptionsViewState}>
                   <ReportProfileOptionsViewText style={{color: colors.tertiary}}>{"Report", name || "Report profile"}</ReportProfileOptionsViewText>
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
                <StatusBar style={colors.StatusBarColor}/>
                <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={!PageElementsState}>
                    <WelcomeContainer style={{backgroundColor: colors.primary}}>
                        <ProfileHorizontalView>
                            <ViewHider viewHidden={backButtonHidden}>
                                <TouchableOpacity style={{marginRight: '65%'}} disabled={PageElementsState} onPress={() => {navigation.goBack()}}>
                                    <Image
                                        source={require('../assets/app_icons/back_arrow.png')}
                                        style={{ width: 40, height: 40, tintColor: colors.tertiary}}
                                        resizeMode="contain"
                                        resizeMethod="resize"
                                    />
                                </TouchableOpacity>
                            </ViewHider>
                            <ViewHider viewHidden={!backButtonHidden}>
                                <View style={{minWidth: 40, marginRight: '65%'}}/>
                            </ViewHider>
                            <TouchableOpacity disabled={PageElementsState} onPress={goToSettingsScreen}>
                                <Image
                                    source={require('../assets/app_icons/settings.png')}
                                    style={{ width: 40, height: 40, tintColor: colors.tertiary}}
                                    resizeMode="contain"
                                    resizeMethod="resize"
                                />
                            </TouchableOpacity>
                        </ProfileHorizontalView>
                        <ProfInfoAreaImage>
                            <Avatar resizeMode="cover" source={AvatarImg} />
                            <PageTitle welcome={true}>{displayName || name || "Couldn't get name"}</PageTitle>
                            <SubTitle style={{color: colors.tertiary}}>{name? "@"+name : "Couldn't get @"}</SubTitle>
                            <ProfileBadgesView disabled={PageElementsState} onPress={() => navigation.navigate("BadgesScreen")}>
                                <ProfileBadgeIcons source={require('./../assets/img/TempProfIcons.jpg')}/>
                                <ProfileBadgeIcons source={require('./../assets/img/BgImage1.png')}/>
                                <ProfileBadgeIcons source={require('./../assets/img/TempProfIcons.jpg')}/>
                                <ProfileBadgeIcons source={require('./../assets/img/Toga.jpg')}/>
                                <ProfileBadgeIcons source={require('./../assets/img/TempProfIcons.jpg')}/>
                            </ProfileBadgesView>
                            <SubTitle style={{color: colors.tertiary}} bioText={true} > Bio </SubTitle>
                        </ProfInfoAreaImage>
                        <ProfileHorizontalView>
                            <ProfileHorizontalViewItem profLeftIcon={true}>
                                <SubTitle style={{color: colors.tertiary}} welcome={true}> Followers </SubTitle>
                                <ProfIcons style={{tintColor: colors.tertiary}}source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/114-user.png')}/>
                                <SubTitle style={{color: colors.tertiary}} welcome={true}> 0 </SubTitle>
                            </ProfileHorizontalViewItem>
                            <ProfileHorizontalViewItem profCenterIcon={true}>
                                <SubTitle style={{color: colors.tertiary}} welcome={true}> Following </SubTitle>
                                <ProfIcons style={{tintColor: colors.tertiary}}source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/118-user-check.png')}/>
                                <SubTitle style={{color: colors.tertiary}} welcome={true}> 0 </SubTitle>
                            </ProfileHorizontalViewItem>
                            <ProfileHorizontalViewItem profRightIcon={true}>
                                <SubTitle style={{color: colors.tertiary}} welcome={true}> Likes </SubTitle>
                                    <ProfIcons style={{tintColor: colors.tertiary}} source={require('./../assets/app_icons/heart.png')}/>
                                <SubTitle style={{color: colors.tertiary}} welcome={true}> 0 </SubTitle>
                            </ProfileHorizontalViewItem>
                        </ProfileHorizontalView>
                        <ProfilePostsSelectionView>
                            <ProfilePostsSelectionBtns style={{backgroundColor: colors.primary, borderColor: colors.borderColor, borderWidth: 1}} disabled={PageElementsState} onPress={changeToGrid}>
                                <ProfIcons source={require('./../assets/img/Toga.jpg')}/>
                            </ProfilePostsSelectionBtns>
                            <ProfilePostsSelectionBtns style={{backgroundColor: colors.primary, borderColor: colors.borderColor, borderWidth: 1}} disabled={PageElementsState} onPress={changeToFeatured}>
                                <ProfIcons source={require('./../assets/img/Toga.jpg')}/>
                            </ProfilePostsSelectionBtns>
                        </ProfilePostsSelectionView>
                        <ProfileGridPosts display={gridViewState}>
                            <SubTitle style={{color: colors.tertiary}} profNoPosts={true}>
                                This user has no posts.
                            </SubTitle>
                        </ProfileGridPosts>
                        <ProfileFeaturedPosts display={featuredViewState}>
                            <SubTitle style={{color: colors.tertiary}} profNoPosts={true}>
                                This user has been featured in no posts.
                            </SubTitle>
                        </ProfileFeaturedPosts>
                    </WelcomeContainer>
                    <View style={{flex: 1, position:'absolute', top: '-80%'}}>
                        <TouchableOpacity disabled={PageElementsState} onLongPress={() => {alert("Congratulations you found the Easter Egg on the Profile Screen! Eventually this will actually do something cool :)")}}>
                            <Text style={{color: colors.tertiary, fontWeight: 'bold', fontSize: 26}}>Easter egg</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </BackgroundDarkColor>
    );
}

export default ProfileScreen;
