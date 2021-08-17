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
} from '../screens/screenStylings/styling.js';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import { ImageBackground, ScrollView, Touchable } from 'react-native';
import images from '../posts/images.js';
import * as Haptics from 'expo-haptics';


const ProfileScreen = ({navigation}) => {
     //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {name, displayName, email, photoUrl} = storedCredentials;
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
        }else{
            console.log("Closed Confirm")
            setProfileOptionsViewState(true)
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
        }else{
            console.log("Closed Confirm")
            setReportProfileOptionsViewState(true)
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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


    return(
            <BackgroundDarkColor> 
                <ProfileOptionsView viewHidden={ProfileOptionsViewState}>
                   <ProfileOptionsViewText>{name || "Couldn't get name"}</ProfileOptionsViewText>
                   <ProfileOptionsViewSubtitleText>Options</ProfileOptionsViewSubtitleText>
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
                <ReportProfileOptionsView viewHidden={ReportProfileOptionsViewState}>
                   <ReportProfileOptionsViewText>{"Report", name || "Report profile"}</ReportProfileOptionsViewText>
                   <ReportProfileOptionsViewSubtitleText>Use this page to report this profile. If anyone is in danger immediately call emergency services. Do Not Wait.</ReportProfileOptionsViewSubtitleText>
                   <ReportProfileOptionsViewButtons greyButton={true} onPress={changeReportProfilesOptionsView}>
                       <ReportProfileOptionsViewButtonsText greyButton={true}>Cancel</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons>
                    <ScrollView style={{width: '100%'}}>
                    <ReportProfileOptionsViewButtons redButton={true} onPress={changeReportProfiles_ContentThatShouldNotBePosted_OptionsView}>
                            <ReportProfileOptionsViewButtonsText redButton={true}>This account is posting content that should not be on SocialSquare</ReportProfileOptionsViewButtonsText>
                        </ReportProfileOptionsViewButtons>
                        <ReportProfileOptionsViewButtons redButton={true} onPress={changeReportProfiles_MayBeUnder13_OptionsView}>
                            <ReportProfileOptionsViewButtonsText redButton={true}>The user may be under 13</ReportProfileOptionsViewButtonsText>
                        </ReportProfileOptionsViewButtons> 
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
                <ReportProfileOptionsView viewHidden={ReportProfile_ContentThatShouldNotBePosted_OptionsViewState}>
                   <ReportProfileOptionsViewText>{"Report", name || "Report profile"}</ReportProfileOptionsViewText>
                   <ReportProfileOptionsViewSubtitleText>What content are you trying to report?</ReportProfileOptionsViewSubtitleText>
                   <ReportProfileOptionsViewButtons greyButton={true} onPress={changeReportProfiles_ContentThatShouldNotBePosted_OptionsView}>
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
                <ReportProfileOptionsView viewHidden={changeReportProfiles_MayBeUnder13_OptionsView}>
                   <ReportProfileOptionsViewText>{"Report", name || "Report profile"}</ReportProfileOptionsViewText>
                   <ReportProfileOptionsViewSubtitleText>User May Be Under 13</ReportProfileOptionsViewSubtitleText>
                   <ReportProfileOptionsViewButtons greyButton={true} onPress={changeReportProfilesOptionsView}>
                       <ReportProfileOptionsViewButtonsText greyButton={true}>Cancel</ReportProfileOptionsViewButtonsText>
                    </ReportProfileOptionsViewButtons>
                    <ScrollView style={{width: '100%'}}>
                        <ReportProfileOptionsViewButtons redButton={true} onPress={changeReportProfiles_ContentThatShouldNotBePosted_OptionsView}>
                            <ReportProfileOptionsViewButtonsText redButton={true}>This account is posting content that should not be on SocialSquare</ReportProfileOptionsViewButtonsText>
                        </ReportProfileOptionsViewButtons>
                    </ScrollView>
                </ReportProfileOptionsView>
                <StatusBar style="dark"/>
                <ScrollView>
                    <WelcomeContainer>
                        <ProfileHorizontalView>
                            <TouchableOpacity style={{marginLeft: '0%', marginRight: '70%'}} onPress={changeProfilesOptionsView}>
                                <Image
                                    source={require('../assets/img/ThreeDots.png')}
                                    style={{ width: 40, height: 40, ...styling.tintColor}}
                                    resizeMode="contain"
                                    resizeMethod="resize"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={goToSettingsScreen}>
                                <Image
                                    source={require('../assets/app_icons/settings.png')}
                                    style={{ width: 40, height: 40, ...styling.tintColor}}
                                    resizeMode="contain"
                                    resizeMethod="resize"
                                />
                            </TouchableOpacity>
                        </ProfileHorizontalView>
                        <ProfInfoAreaImage>
                            <Avatar resizeMode="cover" source={AvatarImg} />
                            <PageTitle welcome={true}>{displayName || name || "Couldn't get name"}</PageTitle>
                            <SubTitle>{"@"+name}</SubTitle>
                            <ProfileBadgesView onPress={() => navigation.navigate("BadgesScreen")}>
                                <ProfileBadgeIcons source={require('./../assets/img/TempProfIcons.jpg')}/>
                                <ProfileBadgeIcons source={require('./../assets/img/BgImage1.png')}/>
                                <ProfileBadgeIcons source={require('./../assets/img/TempProfIcons.jpg')}/>
                                <ProfileBadgeIcons source={require('./../assets/img/Toga.jpg')}/>
                                <ProfileBadgeIcons source={require('./../assets/img/TempProfIcons.jpg')}/>
                            </ProfileBadgesView>
                            <SubTitle bioText={true} > Bio </SubTitle>
                        </ProfInfoAreaImage>
                        <ProfileHorizontalView>
                            <ProfileHorizontalViewItem profLeftIcon={true}>
                                <SubTitle welcome={true}> Followers </SubTitle>
                                <ProfIcons style={styling.tintColor}source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/114-user.png')}/>
                                <SubTitle welcome={true}> 0 </SubTitle>
                            </ProfileHorizontalViewItem>
                            <ProfileHorizontalViewItem profCenterIcon={true}>
                                <SubTitle welcome={true}> Following </SubTitle>
                                    <ProfIcons source={require('./../assets/img/BgImage1.png')}/>
                                <SubTitle welcome={true}> 0 </SubTitle>
                            </ProfileHorizontalViewItem>
                            <ProfileHorizontalViewItem profRightIcon={true}>
                                <SubTitle welcome={true}> Likes </SubTitle>
                                    <ProfIcons style={styling.tintColor} source={require('./../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/219-heart.png')}/>
                                <SubTitle welcome={true}> 0 </SubTitle>
                            </ProfileHorizontalViewItem>
                        </ProfileHorizontalView>
                        <ProfilePostsSelectionView>
                            <ProfilePostsSelectionBtns onPress={changeToGrid}>
                                <ProfIcons source={require('./../assets/img/Toga.jpg')}/>
                            </ProfilePostsSelectionBtns>
                            <ProfilePostsSelectionBtns onPress={changeToFeatured}>
                                <ProfIcons source={require('./../assets/img/Toga.jpg')}/>
                            </ProfilePostsSelectionBtns>
                        </ProfilePostsSelectionView>
                        <ProfileGridPosts display={gridViewState}>
                            <SubTitle profNoPosts={true}>
                                This user has no posts.
                            </SubTitle>
                        </ProfileGridPosts>
                        <ProfileFeaturedPosts display={featuredViewState}>
                            <SubTitle profNoPosts={true}>
                                This user has been featured in no posts.
                            </SubTitle>
                        </ProfileFeaturedPosts>
                    </WelcomeContainer>
                    <View style={{flex: 1, position:'absolute', top: '-80%'}}>
                        <TouchableOpacity onLongPress={() => {alert("Congratulations you found the Easter Egg on the Profile Screen! Eventually this will actually do something cool :)")}}>
                            <Text style={{...styling.textColor, fontWeight: 'bold', fontSize: 26}}>Easter egg</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </BackgroundDarkColor>
    );
}

export default ProfileScreen;
