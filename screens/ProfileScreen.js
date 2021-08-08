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
    lightModeStyling
} from '../screens/screenStylings/styling.js';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../components/CredentialsContext';
import { ImageBackground, ScrollView, Touchable } from 'react-native';
import images from '../posts/images.js';


const ProfileScreen = ({navigation}) => {
     //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {name, email, photoUrl} = storedCredentials;
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
    }

    if (darkModeOn === true) {
        var styling = darkModeStyling;
    } else {
        var styling = lightModeStyling;
    }

    return(
        <>   
            <BackgroundDarkColor> 
                <StatusBar style="dark"/>
                <ScrollView>
                    <WelcomeContainer>
                        <ProfileHorizontalView>
                            <TouchableOpacity style={{marginLeft: '0%', marginRight: '70%'}} onPressIn={() => {alert("Jacob is a sussy femboy!")}}>
                                <Image
                                    source={require('../assets/img/ThreeDots.png')}
                                    style={{ width: 40, height: 40}}
                                    resizeMode="contain"
                                    resizeMethod="resize"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={goToSettingsScreen}>
                                <Image
                                    source={require('../assets/app_icons/settings.png')}
                                    style={{ width: 40, height: 40,}}
                                    resizeMode="contain"
                                    resizeMethod="resize"
                                />
                            </TouchableOpacity>
                        </ProfileHorizontalView>
                        <ProfInfoAreaImage>
                            <Avatar resizeMode="cover" source={AvatarImg} />
                            <PageTitle welcome={true}>{name || "Couldn't get name"}</PageTitle>
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
                                <ProfIcons source={require('./../assets/img/TempProfIcons.jpg')}/>
                                <SubTitle welcome={true}> 0 </SubTitle>
                            </ProfileHorizontalViewItem>
                            <ProfileHorizontalViewItem profCenterIcon={true}>
                                <SubTitle welcome={true}> Following </SubTitle>
                                    <ProfIcons source={require('./../assets/img/BgImage1.png')}/>
                                <SubTitle welcome={true}> 0 </SubTitle>
                            </ProfileHorizontalViewItem>
                            <ProfileHorizontalViewItem profRightIcon={true}>
                                <SubTitle welcome={true}> Likes </SubTitle>
                                    <ProfIcons source={require('./../assets/img/Toga.jpg')}/>
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
                    <Text style={{position: 'absolute', top: '-80%', ...styling.textColor, fontWeight: 'bold', fontSize: 26}}>Easter egg</Text>
                </ScrollView>
            </BackgroundDarkColor>
        </>
    );
}

export default ProfileScreen;
